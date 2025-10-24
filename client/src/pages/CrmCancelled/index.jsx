import React, { useState, useEffect, useCallback, useMemo } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import {
  Table,
  Spin,
  Alert,
  Empty,
  Row,
  Col,
  Space,
  Card,
  Tag,
  Tooltip,
  Typography,
  Button,
  Input,
  Select,
  message,
} from "antd";
import {
  extractAdditionalVehicles,
  renderVehicleInfoCell as renderVehicleInfoCellUtil,
  renderEditableCell as renderEditableCellUtil,
} from "../../utils/TableFunctions";
import {
  CloseCircleOutlined,
  CameraOutlined,
  UserOutlined,
  HistoryOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import AuditLogDrawer from "../../components/AuditLogDrawer";
import PropTypes from "prop-types";
import { mockCancelledDispatches } from "../../mocks/_mockData";
import "./index.css";

const { Column } = Table;
const { Text } = Typography;

// TODO-FX: Connect to i18n library.
const t = (key) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

const CrmCancelled = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dispatches, setDispatches] = useState([]);
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState(false);
  const [selectedDispatchId, setSelectedDispatchId] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [savingCell, setSavingCell] = useState(false);
  const [editIntentCell, setEditIntentCell] = useState(null);
  const [auctionOptions, setAuctionOptions] = useState([]);
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [auctionOptionsLoading, setAuctionOptionsLoading] = useState(false);
  const [warehouseOptionsLoading, setWarehouseOptionsLoading] = useState(false);
  const [copartRouteOptions, setCopartRouteOptions] = useState([]);

  // Fetch cancelled vehicles from API
  useEffect(() => {
    const fetchCancelledDispatches = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("http://localhost:3000/vehicles");
        const rawData = Array.isArray(response.data) ? response.data : [];
        const canceledVehicles = rawData.filter((item) => item?.canceled === true);

        setDispatches(canceledVehicles);
      } catch (err) {
        setError(t("failed_to_load_cancelled_dispatches"));
        console.error("Failed to load cancelled dispatch vehicles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCancelledDispatches();
  }, []);

  // Fetch reference data
  useEffect(() => {
    const fetchReferenceOptions = async () => {
      setAuctionOptionsLoading(true);
      setWarehouseOptionsLoading(true);

      try {
        const [auctionsResponse, warehousesResponse] = await Promise.all([
          axios.get("http://localhost:3000/auctions"),
          axios.get("http://localhost:3000/warehouses"),
        ]);

        const mappedAuctions = (auctionsResponse.data ?? [])
          .map((auction) => {
            const name = auction?.name?.trim();
            if (!name) return null;
            return { value: name, label: name };
          })
          .filter(Boolean);

        const mappedWarehouses = (warehousesResponse.data ?? [])
          .map((warehouse) => {
            const name = warehouse?.name?.trim();
            if (!name) return null;
            return { value: name, label: name };
          })
          .filter(Boolean);

        setAuctionOptions(mappedAuctions);
        setWarehouseOptions(mappedWarehouses);
      } catch (err) {
        console.error("Failed to fetch reference options:", err);
        message.error(t("failed_to_fetch_reference_data"));
      } finally {
        setAuctionOptionsLoading(false);
        setWarehouseOptionsLoading(false);
      }
    };

    fetchReferenceOptions();
  }, []);

  // Setup edit intent click handler
  useEffect(() => {
    const resetIntentOnOutsideClick = (event) => {
      if (!event.target.closest("[data-editable-cell='true']")) {
        setEditIntentCell(null);
      }
    };

    document.addEventListener("click", resetIntentOnOutsideClick);
    return () => {
      document.removeEventListener("click", resetIntentOnOutsideClick);
    };
  }, []);

  // Render payment status (cancelled status)
  const renderPaymentStatus = (status) => {
    if (status === "cancelled") {
      return (
        <Tag color="red" icon={<CloseCircleOutlined />}>
          {t("cancelled")}
        </Tag>
      );
    }
    return <Tag>{status}</Tag>;
  };

  // Render photo status
  const renderPhotoStatus = (status) => {
    return (
      <Tooltip
        title={
          status === "complete" ? t("photos_complete") : t("photos_missing")
        }
      >
        <CameraOutlined
          style={{ color: status === "complete" ? "green" : "red" }}
        />
      </Tooltip>
    );
  };

  // Render appointment indicators
  const renderAppointmentIndicators = (value, record) => {
    return (
      <Space>
        {record?.isAppointmentR1 && <Tag color="blue">R1</Tag>}
        {record?.isAppointmentR2 && <Tag color="purple">R2</Tag>}
      </Space>
    );
  };

  // Copy text to clipboard
  const copyTextToClipboard = useCallback(
    async (text) => {
      if (typeof text !== "string" || text.trim() === "") {
        return;
      }

      try {
        if (
          typeof navigator !== "undefined" &&
          navigator?.clipboard?.writeText
        ) {
          await navigator.clipboard.writeText(text);
        } else {
          const tempInput = document.createElement("textarea");
          tempInput.value = text;
          tempInput.style.position = "fixed";
          tempInput.style.top = "-1000px";
          document.body.appendChild(tempInput);
          tempInput.focus();
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);
        }

        message.success(t("copied_to_clipboard"));
      } catch (error) {
        console.error("Failed to copy text:", error);
        message.error(t("failed_to_copy_to_clipboard"));
      }
    },
    []
  );

  // Start editing a cell
  const startEditing = useCallback(
    (record, dataIndex, value) => {
      if (savingCell) return;
      if (record?.id === undefined || record?.id === null) {
        message.error(t("vehicle_id_is_required"));
        return;
      }

      setEditingCell({ id: record.id, dataIndex });
      setEditingValue(value ?? "");
    },
    [savingCell]
  );

  // Cancel editing
  const cancelEditing = () => {
    setEditingCell(null);
    setEditingValue("");
    setEditIntentCell(null);
  };

  // Save cell changes
  const handleSave = async (record, dataIndex, value, additionalFields = {}) => {
    if (record?.id === undefined || record?.id === null) {
      message.error(t("vehicle_id_is_required"));
      cancelEditing();
      return;
    }

    // Apply uppercase only to VIN-related fields, not to comments or other text fields
    const shouldUppercase =
      dataIndex.startsWith("vin") ||
      dataIndex.startsWith("make") ||
      dataIndex.startsWith("model") ||
      dataIndex.startsWith("year");

    const trimmedValue =
      typeof value === "string"
        ? shouldUppercase
          ? value.trim().toUpperCase()
          : value.trim()
        : value;

    const originalValue = record[dataIndex];

    if (
      trimmedValue === originalValue ||
      (trimmedValue === "" && originalValue === undefined)
    ) {
      cancelEditing();
      return;
    }

    let payloadValue;
    if (dataIndex === "price") {
      payloadValue = Number(trimmedValue);
    } else if (shouldUppercase) {
      payloadValue = trimmedValue || null;
    } else {
      payloadValue = trimmedValue;
    }

    if (dataIndex === "price" && Number.isNaN(payloadValue)) {
      message.error(t("invalid_price_value"));
      return;
    }

    // Immediate state update for better UX (optimistic update)
    const optimisticUpdate = {
      ...record,
      [dataIndex]: payloadValue,
      ...additionalFields, // Include additional fields (e.g., auto-updated delivery date)
    };

    setDispatches((prev) =>
      prev.map((item) =>
        String(item.id) === String(record.id) ? optimisticUpdate : item
      )
    );

    try {
      setSavingCell(true);
      const payload = { 
        [dataIndex]: payloadValue,
        ...additionalFields // Include additional fields in the request
      };
      const response = await axios.put(
        `http://localhost:3000/vehicles/${record.id}`,
        payload
      );

      const updatedVehicle = {
        ...record,
        ...response.data,
      };

      setDispatches((prev) =>
        prev.map((item) =>
          String(item.id) === String(record.id) ? updatedVehicle : item
        )
      );

      message.success(t("dispatch_updated_successfully"));
    } catch (err) {
      console.error("Failed to update dispatch:", err);
      message.error(t("failed_to_update_dispatch"));
      
      // Revert optimistic update on error
      setDispatches((prev) =>
        prev.map((item) =>
          String(item.id) === String(record.id) ? record : item
        )
      );
    } finally {
      setSavingCell(false);
      cancelEditing();
    }
  };

  // Render editable cell wrapper
  const renderEditableCell = (dataIndex, options = {}) => {
    return renderEditableCellUtil(dataIndex, options, {
      editingCell,
      editingValue,
      setEditingValue,
      handleSave,
      cancelEditing,
      savingCell,
      startEditing,
      copyTextToClipboard,
      editIntentCell,
      setEditIntentCell,
    });
  };

  // Render vehicle info cell wrapper
  const renderVehicleInfoCell = (record) => {
    return renderVehicleInfoCellUtil(record, t);
  };

  // Placeholder functions for missing handlers
  const openVinModal = (record) => {
    console.log("VIN modal not implemented for cancelled vehicles:", record);
  };

  // Handle audit log
  const openAuditLog = (dispatchId) => {
    setSelectedDispatchId(dispatchId);
    setIsAuditDrawerOpen(true);
  };

  // CSV export configuration
  const csvHeaders = [
    { label: t("vin"), key: "vin" },
    { label: t("make"), key: "vehicleInfo.make" },
    { label: t("model"), key: "vehicleInfo.model" },
    { label: t("year"), key: "vehicleInfo.year" },
    { label: t("auction"), key: "auction" },
    { label: t("pickup_date"), key: "pickupDate" },
    { label: t("delivery_date"), key: "deliveryDate" },
    { label: t("price"), key: "price" },
    { label: t("payment_status"), key: "paymentStatus" },
    { label: t("cancellation_reason"), key: "cancellationReason" },
  ];

  // TODO-FX: Connect to i18n library.
  const csvData = dispatches.map((item) => ({
    ...item,
    "vehicleInfo.make": item.vehicleInfo?.make || "",
    "vehicleInfo.model": item.vehicleInfo?.model || "",
    "vehicleInfo.year": item.vehicleInfo?.year || "",
  }));

  const columns = [
    {
      title: t("vin"),
      dataIndex: "vin",
      key: "vin",
      render: (_, record) => {
        const additionalVehicles = extractAdditionalVehicles(record);
        return (
          <div
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
            onClick={() => openVinModal(record)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                openVinModal(record);
              }
            }}
          >
            <div>{record.vin ?? "-"}</div>
            {additionalVehicles.map((vehicle, index) => (
              <div
                key={`vin-display-${vehicle.vin || index}`}
                style={{ marginTop: 8 }}
              >
                {vehicle.vin}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: t("Vehicle"),
      dataIndex: "vehicleInfo",
      key: "vehicleInfo",
      render: (_, record) => renderVehicleInfoCell(record),
    },
    {
      title: t("auction"),
      dataIndex: "auction",
      key: "auction",
      sorter: (a, b) => {
        const left = (a.auction ?? "").toString().toLowerCase();
        const right = (b.auction ?? "").toString().toLowerCase();
        if (left < right) return -1;
        if (left > right) return 1;
        return 0;
      },
      sortDirections: ["ascend", "descend"],
      render: renderEditableCell("auction", {
        inputType: "select",
        selectOptions: auctionOptions,
        loading: auctionOptionsLoading,
        placeholder: t("select_auction"),
      }),
    },
    {
      title: t("comment"),
      dataIndex: "comment",
      key: "comment",
      render: renderEditableCell("comment"),
    },
    {
      title: t("warehouse"),
      dataIndex: "warehouse",
      key: "warehouse",
      sorter: (a, b) => {
        const left = (a.warehouse ?? "").toString().toLowerCase();
        const right = (b.warehouse ?? "").toString().toLowerCase();
        if (left < right) return -1;
        if (left > right) return 1;
        return 0;
      },
      sortDirections: ["ascend", "descend"],
      render: renderEditableCell("warehouse", {
        inputType: "select",
        selectOptions: warehouseOptions,
        loading: warehouseOptionsLoading,
        placeholder: t("select_warehouse"),
      }),
    },
    {
      title: t("driver_number"),
      dataIndex: "driverNumber",
      key: "driverNumber",
      render: renderEditableCell("driverNumber", {
        copyOnClick: (cellValue) =>
          typeof cellValue === "string" ? cellValue : cellValue ?? "",
      }),
    },
    {
      title: t("route"),
      dataIndex: "route",
      key: "route",
      sorter: (a, b) => {
        const left = (a.route ?? "").toString().toLowerCase();
        const right = (b.route ?? "").toString().toLowerCase();
        if (left < right) return -1;
        if (left > right) return 1;
        return 0;
      },
      sortDirections: ["ascend", "descend"],
      render: renderEditableCell("route", {
        renderEditing: ({ record, cancelEditing, handleSave, savingCell }) => {
          const auctionValue = record?.auction;
          const isCopartAuction =
            typeof auctionValue === "string" &&
            auctionValue.toLowerCase().includes("copart");

          if (isCopartAuction) {
            const currentValue =
              editingValue && editingValue !== ""
                ? editingValue
                : record?.route ?? undefined;

            const hasCurrent =
              currentValue === undefined
                ? true
                : copartRouteOptions.some(
                    (option) => option.value === currentValue
                  );
            const selectOptions = hasCurrent
              ? copartRouteOptions
              : [
                  { label: currentValue, value: currentValue },
                  ...copartRouteOptions,
                ];

            return (
              <Select
                value={currentValue}
                onChange={(selectedValue) => {
                  setEditingValue(selectedValue ?? "");
                  handleSave(record, "route", selectedValue ?? "");
                }}
                onBlur={() => {
                  if (!savingCell) {
                    cancelEditing();
                  }
                }}
                options={selectOptions}
                showSearch
                optionFilterProp="label"
                placeholder={t("select_route")}
                disabled={savingCell}
                autoFocus
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            );
          }

          return (
            <Input
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              onBlur={() => handleSave(record, "route", editingValue)}
              onPressEnter={() => handleSave(record, "route", editingValue)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  cancelEditing();
                }
              }}
              autoFocus
              disabled={savingCell}
            />
          );
        },
      }),
    },
    {
      title: t("price"),
      dataIndex: "price",
      key: "price",
      render: renderEditableCell("price"),
    },
  ];

  // Handle loading state
  if (loading) {
    return (
      <Row justify="center" align="middle" style={{ minHeight: "400px" }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Alert
            message={t("error")}
            description={error}
            type="error"
            showIcon
          />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Card
        title={t("cancelled_list")}
        extra={
          <Space>
            <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename={`${t("cancelled_list")
                .toLowerCase()
                .replace(" ", "-")}-export.csv`}
            >
              <Button
                icon={<DownloadOutlined />}
                disabled={loading || dispatches.length === 0}
              >
                {t("export_to_csv")} {/* TODO-FX: Connect to i18n library. */}
              </Button>
            </CSVLink>
            <Text type="secondary">{t("showing_cancelled_dispatches")}</Text>
          </Space>
        }
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Table */}
          <Table
            dataSource={dispatches}
            columns={columns}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} ${t("of")} ${total} ${t(
                  "dispatches"
                )}`,
            }}
            scroll={{ x: 1800 }}
            locale={{
              emptyText: (
                <Empty
                  description={t("no_cancelled_dispatches_found")}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              ),
            }}
          />
        </Space>
      </Card>

      <AuditLogDrawer
        dispatchId={selectedDispatchId}
        open={isAuditDrawerOpen}
        onClose={() => {
          setIsAuditDrawerOpen(false);
          setSelectedDispatchId(null);
        }}
      />
    </>
  );
};

CrmCancelled.propTypes = {
  // Add props when needed
};

export default CrmCancelled;
