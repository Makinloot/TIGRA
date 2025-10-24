import React, { useState, useEffect } from "react";
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
} from "antd";
import {
  extractAdditionalVehicles,
  renderVehicleInfoCell as renderVehicleInfoCellUtil,
} from "../../utils/TableFunctions";
import {
  CloseCircleOutlined,
  CameraOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import AuditLogDrawer from "../../components/AuditLogDrawer";
import PropTypes from "prop-types";
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

  // Fetch cancelled vehicles from API
  useEffect(() => {
    const fetchCancelledDispatches = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("http://localhost:3000/vehicles");
        const rawData = Array.isArray(response.data) ? response.data : [];
        const canceledVehicles = rawData.filter(
          (item) => item?.canceled === true
        );

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

  // Render vehicle info cell wrapper
  const renderVehicleInfoCell = (record) => {
    return renderVehicleInfoCellUtil(record, t);
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
          <div>
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
      render: (value) => value ?? "-",
    },
    {
      title: t("comment"),
      dataIndex: "comment",
      key: "comment",
      render: (value) => value ?? "-",
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
      render: (value) => value ?? "-",
    },
    {
      title: t("driver_number"),
      dataIndex: "driverNumber",
      key: "driverNumber",
      render: (value) => value ?? "-",
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
      render: (value) => value ?? "-",
    },
    {
      title: t("price"),
      dataIndex: "price",
      key: "price",
      render: (value) => (value !== undefined && value !== null ? value : "-"),
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
