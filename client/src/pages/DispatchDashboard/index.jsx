import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CSVLink } from "react-csv";
import moment from "moment";
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Tag,
  Tooltip,
  Input,
  Select,
  DatePicker,
  Space,
  Alert,
  Empty,
  Skeleton,
  Popconfirm,
  Dropdown,
  Statistic,
  Modal,
  message,
  Form,
  Divider,
  Typography,
  Spin,
} from "antd";
import {
  PlusOutlined,
  DownloadOutlined,
  HistoryOutlined,
  CloseCircleOutlined,
  PauseCircleOutlined,
  FilterOutlined,
  SearchOutlined,
  ClearOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CameraOutlined,
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddDispatchModal from "../../components/AddDispatchModal";
import CancelDispatchModal from "../../components/CancelDispatchModal";
import AuditLogDrawer from "../../components/AuditLogDrawer";
import { holdPayment } from "../../utils/cmsUtils";
import PropTypes from "prop-types";
import {
  mockDispatchVehicles,
  mockTasks,
  SYSTEM_ROLES,
} from "../../mocks/_mockData";
import "./index.css";
import axios from "axios";

const { Column } = Table;
const { RangePicker } = DatePicker;
const { Text } = Typography;

// TODO-FX: Connect to i18n library.
const t = (key) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

const MAX_VEHICLE_SLOTS = 5;

const normalizeVehicleVinData = (vehicle) => {
  if (!vehicle || typeof vehicle !== "object") {
    return vehicle;
  }

  const normalized = { ...vehicle };

  for (let slotNumber = 2; slotNumber <= MAX_VEHICLE_SLOTS; slotNumber += 1) {
    const vinKey = `vin${slotNumber}`;
    const makeKey = `make${slotNumber}`;
    const modelKey = `model${slotNumber}`;
    const yearKey = `year${slotNumber}`;

    if (!normalized[vinKey]) {
      delete normalized[vinKey];
      delete normalized[makeKey];
      delete normalized[modelKey];
      delete normalized[yearKey];
    }
  }

  if (Array.isArray(normalized.additionalVehicles)) {
    normalized.additionalVehicles = normalized.additionalVehicles.filter(
      (vehicleEntry) => vehicleEntry && vehicleEntry.vin
    );
  }

  return normalized;
};

const extractAdditionalVehicles = (record) => {
  const additional = Array.isArray(record.additionalVehicles)
    ? record.additionalVehicles.filter((vehicle) => vehicle?.vin)
    : [];

  for (let i = 2; i <= 5; i += 1) {
    const vinKey = `vin${i}`;
    const makeKey = `make${i}`;
    const modelKey = `model${i}`;
    const yearKey = `year${i}`;

    if (record[vinKey]) {
      additional.push({
        vin: record[vinKey],
        make: record[makeKey],
        model: record[modelKey],
        year: record[yearKey],
      });
    }
  }

  const uniqueByVin = [];
  const seen = new Set();

  additional.forEach((vehicle) => {
    const vin = vehicle?.vin;
    if (!vin || seen.has(vin)) return;
    seen.add(vin);
    uniqueByVin.push(vehicle);
  });

  return uniqueByVin;
};

const handleDeleteDispatchFactory =
  ({ t, setDispatches, setFilteredDispatches }) =>
  async (dispatch) => {
    const idToDelete = dispatch?.id;

    if (idToDelete === undefined || idToDelete === null) {
      message.error(t("vehicle_id_is_required"));
      return;
    }

    const idToDeleteString = String(idToDelete);

    try {
      await axios.delete(`http://localhost:3000/vehicles/${idToDeleteString}`);

      setDispatches((prev) =>
        prev.filter((item) => String(item.id) !== idToDeleteString)
      );
      setFilteredDispatches((prev) =>
        prev.filter((item) => String(item.id) !== idToDeleteString)
      );

      message.success(t("dispatch_deleted_successfully"));
    } catch (error) {
      console.error("Failed to delete dispatch:", error);
      message.error(t("failed_to_delete_dispatch"));
    }
  };

const DispatchDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dispatches, setDispatches] = useState([]);
  const [filteredDispatches, setFilteredDispatches] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState(false);
  const [selectedDispatchId, setSelectedDispatchId] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [savingCell, setSavingCell] = useState(false);
  const [isVinModalOpen, setIsVinModalOpen] = useState(false);
  const [vinModalRecord, setVinModalRecord] = useState(null);
  const [vinModalOriginalId, setVinModalOriginalId] = useState(null);
  const [vinModalSubmitting, setVinModalSubmitting] = useState(false);
  const [vinModalSlots, setVinModalSlots] = useState([]);
  const [vinForm] = Form.useForm();
  const [togglingAppointmentId, setTogglingAppointmentId] = useState(null);
  const [auctionOptions, setAuctionOptions] = useState([]);
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [auctionOptionsLoading, setAuctionOptionsLoading] = useState(false);
  const [warehouseOptionsLoading, setWarehouseOptionsLoading] = useState(false);
  const [editIntentCell, setEditIntentCell] = useState(null);

  const handleDeleteDispatch = useMemo(
    () =>
      handleDeleteDispatchFactory({
        t,
        setDispatches,
        setFilteredDispatches,
      }),
    [t]
  );

  const copyTextToClipboard = useCallback(
    async (text) => {
      if (typeof text !== "string" || text.trim() === "") {
        return;
      }

      const valueToCopy = text;

      try {
        if (
          typeof navigator !== "undefined" &&
          navigator?.clipboard?.writeText
        ) {
          await navigator.clipboard.writeText(valueToCopy);
        } else {
          const tempInput = document.createElement("textarea");
          tempInput.value = valueToCopy;
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
    [t]
  );

  const handleToggleAppointment = useCallback(
    async (record, slotKey) => {
      if (record?.id === undefined || record?.id === null) {
        message.error(t("vehicle_id_is_required"));
        return;
      }

      const recordIdString = String(record.id);
      const currentAppointment = record.appointment ?? {};
      const normalizedAppointment = {
        auction: Boolean(currentAppointment.auction),
        warehouse: Boolean(currentAppointment.warehouse),
      };

      const updatedAppointment = {
        ...normalizedAppointment,
        [slotKey]: !normalizedAppointment[slotKey],
      };

      setTogglingAppointmentId(recordIdString);

      try {
        const response = await axios.put(
          `http://localhost:3000/vehicles/${record.id}`,
          { appointment: updatedAppointment }
        );

        const updatedVehicle = response.data;

        setDispatches((prev) =>
          prev.map((item) =>
            String(item.id) === recordIdString
              ? { ...item, ...updatedVehicle }
              : item
          )
        );
        setFilteredDispatches((prev) =>
          prev.map((item) =>
            String(item.id) === recordIdString
              ? { ...item, ...updatedVehicle }
              : item
          )
        );

        message.success(t("dispatch_updated_successfully"));
      } catch (error) {
        console.error("Failed to toggle appointment:", error);
        message.error(t("failed_to_update_dispatch"));
      } finally {
        setTogglingAppointmentId(null);
      }
    },
    [t]
  );

  // Filter states
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  // Fetch vehicles from API
  useEffect(() => {
    const fetchDispatches = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("http://localhost:3000/vehicles");
        const data = Array.isArray(response.data)
          ? response.data.map((item) => normalizeVehicleVinData(item))
          : [];
        // console.log("DATAAA", data);
        setDispatches(data);
        setFilteredDispatches(data);
      } catch (err) {
        setError(t("failed_to_load_dispatches"));
        console.error("Failed to load dispatch vehicles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDispatches();
  }, []);

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

  // Apply filters
  useEffect(() => {
    let filtered = dispatches;

    // Search filter (VIN, driver, warehouse, vehicle info)
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter((dispatch) => {
        const vinValues = [
          dispatch.vin,
          ...extractAdditionalVehicles(dispatch).map((v) => v.vin),
        ]
          .filter(Boolean)
          .map((value) => value.toString().toLowerCase());
        const makeValues = [
          dispatch.make,
          ...extractAdditionalVehicles(dispatch).map((v) => v.make),
        ]
          .filter(Boolean)
          .map((value) => value.toString().toLowerCase());
        const modelValues = [
          dispatch.model,
          ...extractAdditionalVehicles(dispatch).map((v) => v.model),
        ]
          .filter(Boolean)
          .map((value) => value.toString().toLowerCase());
        const yearValues = [
          dispatch.year,
          ...extractAdditionalVehicles(dispatch).map((v) => v.year),
        ]
          .filter(Boolean)
          .map((value) => value.toString().toLowerCase());

        const driver = (dispatch.driverNumber ?? "").toLowerCase();
        const warehouse = (dispatch.warehouse ?? "").toLowerCase();

        const matchesVin = vinValues.some((vin) => vin.includes(searchLower));
        const matchesMake = makeValues.some((make) =>
          make.includes(searchLower)
        );
        const matchesModel = modelValues.some((model) =>
          model.includes(searchLower)
        );
        const matchesYear = yearValues.some((year) =>
          year.includes(searchLower)
        );

        return (
          matchesVin ||
          matchesMake ||
          matchesModel ||
          matchesYear ||
          driver.includes(searchLower) ||
          warehouse.includes(searchLower)
        );
      });
    }

    // Status filter
    if (statusFilter.length > 0) {
      filtered = filtered.filter((dispatch) =>
        dispatch.dispatchStatus
          ? statusFilter.includes(dispatch.dispatchStatus)
          : false
      );
    }

    // Date range filter (pickup date)
    if (dateRange && dateRange.length === 2) {
      filtered = filtered.filter((dispatch) => {
        if (!dispatch.pickupDate) {
          return false;
        }

        const pickupMoment = moment(
          dispatch.pickupDate,
          ["YYYY-MM-DD", "DD/MM"],
          true
        );

        if (!pickupMoment.isValid()) {
          return false;
        }

        const startMoment = dateRange[0]?.clone()?.startOf("day");
        const endMoment = dateRange[1]?.clone()?.endOf("day");

        if (!startMoment || !endMoment) {
          return true;
        }

        return (
          pickupMoment.isSameOrAfter(startMoment, "day") &&
          pickupMoment.isSameOrBefore(endMoment, "day")
        );
      });
    }

    setFilteredDispatches(filtered);
  }, [dispatches, searchValue, statusFilter, dateRange]);

  // Get row style based on appointment flags, fall back to status coloring
  const getRowClassName = (record) => {
    const appointment = record.appointment ?? {};
    const hasAuction =
      appointment.auction === undefined ? null : Boolean(appointment.auction);
    const hasWarehouse =
      appointment.warehouse === undefined
        ? null
        : Boolean(appointment.warehouse);

    if (hasAuction !== null || hasWarehouse !== null) {
      const auctionValue = hasAuction ?? false;
      const warehouseValue = hasWarehouse ?? false;

      if (auctionValue && warehouseValue) {
        return "dispatch-row-appointment-both";
      }

      if (!auctionValue && !warehouseValue) {
        return "dispatch-row-appointment-none";
      }

      return "dispatch-row-appointment-partial";
    }

    switch (record.dispatchStatus) {
      case "new":
        return "dispatch-row-new";
      case "overdue":
        return "dispatch-row-overdue";
      case "paid":
        return "dispatch-row-paid";
      case "on_hold":
        return "dispatch-row-on-hold"; // Police tape styling
      default:
        return "";
    }
  };

  const buildVinSlots = useCallback((record) => {
    if (!record) return [];

    const slots = [];
    const additionalVehicles = Array.isArray(record.additionalVehicles)
      ? record.additionalVehicles
      : [];

    for (let slotNumber = 1; slotNumber <= MAX_VEHICLE_SLOTS; slotNumber += 1) {
      const flatKey = slotNumber === 1 ? "vin" : `vin${slotNumber}`;
      const additionalIndex = slotNumber === 1 ? null : slotNumber - 2;
      const arrayVehicle =
        slotNumber > 1 && additionalIndex >= 0
          ? additionalVehicles[additionalIndex]
          : null;
      const hasFlatKey = Object.prototype.hasOwnProperty.call(record, flatKey);
      const value =
        slotNumber === 1
          ? record.vin ?? ""
          : record[flatKey] ?? arrayVehicle?.vin ?? "";

      const shouldInclude =
        slotNumber === 1 || value || hasFlatKey || arrayVehicle;

      if (shouldInclude) {
        slots.push({
          slotNumber,
          flatKey,
          additionalIndex: slotNumber === 1 ? null : additionalIndex,
          value,
        });
      }
    }

    return slots;
  }, []);

  // Render payment status with dynamic timers (Spec §2)
  // const renderPaymentStatus = (status, record) => {
  //   // Green status - Paid
  //   if (status === "paid") {
  //     return (
  //       <Tag color="green" icon={<CheckCircleOutlined />}>
  //         {t("paid")}
  //       </Tag>
  //     );
  //   }

  //   // Orange status - On Hold (Police Tape)
  //   if (status === "on_hold") {
  //     return (
  //       <Tag color="orange" icon={<PauseCircleOutlined />}>
  //         {t("on_hold")}
  //       </Tag>
  //     );
  //   }

  //   // Red status - Overdue
  //   if (status === "overdue") {
  //     return (
  //       <Tag color="red" icon={<ExclamationCircleOutlined />}>
  //         {t("payment_overdue")}
  //       </Tag>
  //     );
  //   }

  //   // Yellow status - Pending with countdown timer (Spec §2)
  //   if (status === "pending" && record.deliveryDate) {
  //     const deliveryDate = new Date(record.deliveryDate);
  //     const now = new Date();

  //     if (deliveryDate > now) {
  //       // Show countdown timer for pending payments
  //       return (
  //         <Statistic.Timer
  //           title={t("payment_due_in")}
  //           value={deliveryDate}
  //           format="D[d] H[h] m[m] s[s]"
  //           size="small"
  //           type="countdown"
  //           onFinish={() => {
  //             // When timer expires, could trigger status update
  //             console.log("Payment timer expired for dispatch:", record.id);
  //           }}
  //         />
  //       );
  //     } else {
  //       // Past due date - should be overdue
  //       return (
  //         <Tag color="red" icon={<ExclamationCircleOutlined />}>
  //           {t("payment_overdue")}
  //         </Tag>
  //       );
  //     }
  //   }

  //   // Default pending status
  //   return (
  //     <Tag color="blue" icon={<ClockCircleOutlined />}>
  //       {t("pending")}
  //     </Tag>
  //   );
  // };

  // Render photo status
  // const renderPhotoStatus = (status) => {
  //   return (
  //     <Tooltip
  //       title={
  //         status === "complete" ? t("photos_complete") : t("photos_missing")
  //       }
  //     >
  //       <Badge
  //         status={status === "complete" ? "success" : "error"}
  //         text={<CameraOutlined />}
  //       />
  //     </Tooltip>
  //   );
  // };

  // Clear all filters
  const clearFilters = () => {
    setSearchValue("");
    setStatusFilter([]);
    setDateRange([]);
  };

  // Refetch dispatches data
  const refetchDispatches = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/vehicles");
      const data = response.data;
      setDispatches(data);
      setFilteredDispatches(data);
    } catch (err) {
      setError(t("failed_to_load_dispatches"));
      console.error("Failed to refetch dispatch vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle payment hold (Spec §5.2)
  // const handleHoldPayment = async (dispatchId) => {
  //   Modal.confirm({
  //     title: t("confirm_hold_payment"),
  //     content: t("hold_payment_warning"),
  //     okText: t("confirm"),
  //     cancelText: t("cancel"),
  //     okType: "danger",
  //     onOk: async () => {
  //       try {
  //         await holdPayment(dispatchId);

  //         // Update local state to reflect on_hold status
  //         setDispatches((prevDispatches) =>
  //           prevDispatches.map((dispatch) =>
  //             dispatch.id === dispatchId
  //               ? {
  //                   ...dispatch,
  //                   paymentStatus: "on_hold",
  //                   dispatchStatus: "on_hold",
  //                 }
  //               : dispatch
  //           )
  //         );

  //         // TODO-FX: Auto-create QC investigation task and open task modal
  //         // Enhancement: After payment hold, automatically create a QC investigation task
  //         // This connects the payment hold workflow to the formal task management system
  //         const dispatch = dispatches.find((d) => d.id === dispatchId);
  //         if (dispatch) {
  //           // Create QC investigation task
  //           const qcTask = {
  //             id: `qc_${dispatchId}_${Date.now()}`,
  //             title: t("qc_issue_investigation"),
  //             status: "pending",
  //             assignedTo: "role_2", // Logistics/Shipping Coordinator
  //             relatedVin: dispatch.vin,
  //             createdBy: "role_3", // Payment role (current user)
  //             dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  //               .toISOString()
  //               .split("T")[0], // 7 days from now
  //           };

  //           // TODO-FX: Replace with real API call to create task
  //           // For now, add to mockTasks array
  //           mockTasks.push(qcTask);

  //           // TODO-FX: Open the Add New Task modal in DispatchDetailsDrawer with pre-filled data
  //           // This requires cross-component communication (Context or global state)
  //           // For now, just show a success message indicating task was created
  //           message.success(
  //             `${t("payment_held_successfully")} ${t("qc_task_created")}`
  //           );
  //         } else {
  //           message.success(t("payment_held_successfully"));
  //         }
  //       } catch (error) {
  //         console.error("Failed to hold payment:", error);
  //         message.error(t("failed_to_hold_payment"));
  //       }
  //     },
  //   });
  // };

  // Handle view details (placeholder for future implementation)
  const handleViewDetails = (dispatchId) => {
    // TODO-FX: Implement view details modal
    console.log("Viewing details for dispatch:", dispatchId);
    message.info(t("view_details_not_implemented"));
  };

  // Handle audit log
  const openAuditLog = (dispatchId) => {
    setSelectedDispatchId(dispatchId);
    setIsAuditDrawerOpen(true);
  };

  // Handle cancel dispatch
  const openCancelModal = (dispatchId) => {
    setSelectedDispatchId(dispatchId);
    setIsCancelModalOpen(true);
  };

  // Handle cancel modal success
  const handleCancelSuccess = () => {
    // Update local state to reflect cancelled status
    setDispatches((prevDispatches) =>
      prevDispatches.map((dispatch) =>
        dispatch.id === selectedDispatchId
          ? { ...dispatch, dispatchStatus: "cancelled" }
          : dispatch
      )
    );
    setIsCancelModalOpen(false);
    setSelectedDispatchId(null);
  };

  // CSV export configuration
  const csvHeaders = [
    { label: t("vin"), key: "vin" },
    { label: t("vehicleInfo"), key: "vehicleInfo" },
    { label: t("auction"), key: "auction" },
    { label: t("pickup_date"), key: "pickupDate" },
    { label: t("delivery_date"), key: "deliveryDate" },
    { label: t("comment"), key: "comment" },
    { label: t("warehouse"), key: "warehouse" },
    { label: t("driver_number"), key: "driverNumber" },
    { label: t("route"), key: "route" },
    { label: t("price"), key: "price" },
  ];

  // TODO-FX: Connect to i18n library.
  const csvData = filteredDispatches.map((item) => ({
    vin: item.vin ?? "",
    vehicleInfo: [item.make, item.model, item.year].filter(Boolean).join(" "),
    auction: item.auction ?? "",
    pickupDate: item.pickupDate ?? "",
    deliveryDate: item.deliveryDate ?? "",
    comment: item.comment ?? "",
    warehouse: item.warehouse ?? "",
    driverNumber: item.driverNumber ?? "",
    route: item.route ?? "",
    price: item.price ?? "",
  }));

  // Menu props for dropdown button
  const menuProps = (record) => ({
    items: [
      {
        key: "audit",
        icon: <HistoryOutlined />,
        label: t("audit_log"),
        onClick: () => openAuditLog(record.id),
      },
      // {
      //   key: "hold",
      //   icon: <PauseCircleOutlined />,
      //   label: t("hold_payment"),
      //   onClick: () => handleHoldPayment(record.id),
      //   disabled:
      //     record.paymentStatus === "paid" || record.paymentStatus === "on_hold",
      // },
      {
        key: "cancel",
        icon: <CloseCircleOutlined />,
        label: t("cancel_dispatch"),
        danger: true,
        onClick: () => openCancelModal(record.id),
        disabled:
          record.dispatchStatus === "completed" ||
          record.dispatchStatus === "cancelled",
      },
    ],
  });

  const openVinModal = (record) => {
    if (savingCell) return;

    const slots = buildVinSlots(record);

    setVinModalRecord(record);
    setVinModalOriginalId(record.id);
    setVinModalSlots(slots);

    vinForm.resetFields();

    const initialFields = slots.reduce((acc, slot) => {
      acc[slot.flatKey] = slot.value ?? "";
      return acc;
    }, {});

    vinForm.setFieldsValue(initialFields);

    setIsVinModalOpen(true);
  };

  const handleAddVinSlot = () => {
    if (vinModalSlots.length >= MAX_VEHICLE_SLOTS) return;

    const existingSlotNumbers = vinModalSlots.map((slot) => slot.slotNumber);
    let nextSlotNumber = null;

    for (let candidate = 2; candidate <= MAX_VEHICLE_SLOTS; candidate += 1) {
      if (!existingSlotNumbers.includes(candidate)) {
        nextSlotNumber = candidate;
        break;
      }
    }

    if (!nextSlotNumber) {
      return;
    }

    const flatKey = `vin${nextSlotNumber}`;

    const newSlot = {
      slotNumber: nextSlotNumber,
      flatKey,
      additionalIndex: nextSlotNumber - 2,
      value: "",
    };

    const updatedSlots = [...vinModalSlots, newSlot].sort(
      (a, b) => a.slotNumber - b.slotNumber
    );

    setVinModalSlots(updatedSlots);
    vinForm.setFieldsValue({
      [flatKey]: "",
    });
  };

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
    [savingCell, t]
  );

  const cancelEditing = () => {
    setEditingCell(null);
    setEditingValue("");
    setEditIntentCell(null);
  };

  const handleSave = async (record, dataIndex, value) => {
    if (record?.id === undefined || record?.id === null) {
      message.error(t("vehicle_id_is_required"));
      cancelEditing();
      return;
    }

    const trimmedValue =
      typeof value === "string" ? value.trim().toUpperCase() : value;
    const originalValue = record[dataIndex];

    if (
      trimmedValue === originalValue ||
      (trimmedValue === "" && originalValue === undefined)
    ) {
      cancelEditing();
      return;
    }

    if (dataIndex === "vin" && !trimmedValue) {
      message.error(t("vin_is_required"));
      return;
    }

    let payloadValue;
    if (dataIndex === "price") {
      payloadValue = Number(trimmedValue);
    } else if (
      dataIndex.startsWith("vin") ||
      dataIndex.startsWith("make") ||
      dataIndex.startsWith("model") ||
      dataIndex.startsWith("year")
    ) {
      payloadValue = trimmedValue || null;
    } else {
      payloadValue = trimmedValue;
    }

    if (dataIndex === "price" && Number.isNaN(payloadValue)) {
      message.error(t("invalid_price_value"));
      return;
    }

    try {
      setSavingCell(true);
      const payload = { [dataIndex]: payloadValue };
      const response = await axios.put(
        `http://localhost:3000/vehicles/${record.id}`,
        payload
      );

      const updatedVehicleRaw = {
        ...record,
        ...response.data,
      };
      const updatedVehicle = normalizeVehicleVinData(updatedVehicleRaw);

      if (updatedVehicle.id === undefined || updatedVehicle.id === null) {
        updatedVehicle.id = record.id;
      }

      setDispatches((prev) =>
        prev.map((item) =>
          String(item.id) === String(record.id) ? updatedVehicle : item
        )
      );
      setFilteredDispatches((prev) =>
        prev.map((item) =>
          String(item.id) === String(record.id) ? updatedVehicle : item
        )
      );

      message.success(t("dispatch_updated_successfully"));
    } catch (err) {
      console.error("Failed to update dispatch:", err);
      message.error(t("failed_to_update_dispatch"));
    } finally {
      setSavingCell(false);
      cancelEditing();
    }
  };

  const renderEditableCell = (dataIndex, options = {}) => {
    return (value, record, recordIndex) => {
      const isEditing =
        editingCell &&
        String(editingCell.id) === String(record.id) &&
        editingCell.dataIndex === dataIndex;
      if (isEditing) {
        if (options.inputType === "select") {
          const selectValue =
            editingValue && editingValue !== "" ? editingValue : undefined;

          return (
            <Select
              value={selectValue}
              onChange={(selectedValue) => {
                setEditingValue(selectedValue ?? "");
                handleSave(record, dataIndex, selectedValue ?? "");
              }}
              options={options.selectOptions ?? []}
              loading={options.loading}
              showSearch
              optionFilterProp="label"
              placeholder={options.placeholder}
              disabled={savingCell}
              autoFocus
              onBlur={() => {
                if (!savingCell) {
                  cancelEditing();
                }
              }}
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
            onBlur={() => handleSave(record, dataIndex, editingValue)}
            onPressEnter={() => handleSave(record, dataIndex, editingValue)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                cancelEditing();
              }
            }}
            autoFocus
            disabled={savingCell}
          />
        );
      }

      const displayValue = options.renderDisplay
        ? options.renderDisplay(value, record)
        : value;

      let displayContent = displayValue;
      if (
        displayContent === null ||
        displayContent === undefined ||
        (typeof displayContent === "string" && displayContent.trim() === "")
      ) {
        displayContent = "-";
      }

      const extraContent = options.renderExtra
        ? options.renderExtra(record)
        : null;

      const cellIdentifierSource =
        record.id ?? record._id ?? record.vin ?? record.dispatchNumber ?? recordIndex;
      const cellKey = `${String(cellIdentifierSource)}::${dataIndex}`;

      const handleActivation = () => {
        if (options.readOnly) {
          return;
        }

        if (editIntentCell?.cellKey === cellKey) {
          startEditing(record, dataIndex, value);
          setEditIntentCell(null);
          return;
        }

        if (typeof options.copyOnClick === "function") {
          const textToCopy = options.copyOnClick(value, record);
          if (textToCopy !== undefined && textToCopy !== null) {
            const normalizedText =
              typeof textToCopy === "string"
                ? textToCopy
                : String(textToCopy ?? "");
            if (normalizedText.trim() !== "") {
              copyTextToClipboard(normalizedText);
            }
          }
        }

        setEditIntentCell({ cellKey });
      };

      return (
        <div
          role="button"
          tabIndex={0}
          data-editable-cell="true"
          style={{ cursor: options.readOnly ? "not-allowed" : "pointer" }}
          onClick={handleActivation}
          onKeyDown={(e) => {
            if (!options.readOnly && (e.key === "Enter" || e.key === " ")) {
              handleActivation();
            }
          }}
        >
          <div>{displayContent}</div>
          {extraContent}
        </div>
      );
    };
  };

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

  const renderVehicleInfoCell = (record) => {
    const primary =
      [record.make, record.model, record.year]
        .filter(Boolean)
        .join(" ")
        .trim() || "-";

    const additionalVehicles = extractAdditionalVehicles(record);
    return (
      <div style={{ cursor: "not-allowed" }} title={t("field_not_editable")}>
        <div>{primary}</div>
        {additionalVehicles.map((vehicle, index) => {
          const label = [vehicle.make, vehicle.model, vehicle.year]
            .filter(Boolean)
            .join(" ")
            .trim();
          if (!label) return null;
          return (
            <div
              key={`vehicle-info-${vehicle.vin || index}`}
              style={{ marginTop: 8 }}
            >
              {label}
            </div>
          );
        })}
      </div>
    );
  };

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
      title: t("vehicleInfo"),
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
      title: t("pickup_date"),
      dataIndex: "pickupDate",
      key: "pickupDate",
      sorter: (a, b) => {
        const formats = [moment.ISO_8601, "YYYY-MM-DD", "DD/MM"].map(
          (fmt) => fmt
        );
        const left = moment(a.pickupDate, formats, true);
        const right = moment(b.pickupDate, formats, true);

        if (!left.isValid() && !right.isValid()) return 0;
        if (!left.isValid()) return 1;
        if (!right.isValid()) return -1;

        return left.valueOf() - right.valueOf();
      },
      sortDirections: ["ascend", "descend"],
      render: renderEditableCell("pickupDate"),
    },
    {
      title: t("delivery_date"),
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      sorter: (a, b) => {
        const formats = [moment.ISO_8601, "YYYY-MM-DD", "DD/MM"].map(
          (fmt) => fmt
        );
        const left = moment(a.deliveryDate, formats, true);
        const right = moment(b.deliveryDate, formats, true);

        if (!left.isValid() && !right.isValid()) return 0;
        if (!left.isValid()) return 1;
        if (!right.isValid()) return -1;

        return left.valueOf() - right.valueOf();
      },
      sortDirections: ["ascend", "descend"],
      render: renderEditableCell("deliveryDate"),
    },
    {
      title: t("appointment"),
      dataIndex: "appointment",
      key: "appointment",
      sorter: (a, b) => {
        const appointmentA = a.appointment ?? {};
        const appointmentB = b.appointment ?? {};

        const score = (appointment) => {
          const auction = Boolean(appointment.auction);
          const warehouse = Boolean(appointment.warehouse);

          if (auction && warehouse) return 0; // both true
          if (!auction && !warehouse) return 1; // both false
          if (!auction && warehouse) return 2; // only warehouse
          if (auction && !warehouse) return 3; // only auction

          return 4;
        };

        const scoreA = score(appointmentA);
        const scoreB = score(appointmentB);

        if (scoreA !== scoreB) {
          return scoreA - scoreB;
        }

        return 0;
      },
      sortDirections: ["ascend", "descend"],
      render: (_, record) => {
        const appointment = record.appointment ?? {};
        const slots = [
          { key: "auction", label: "A" },
          { key: "warehouse", label: "W" },
        ];

        const tagsToRender = slots.filter(
          ({ key }) => appointment[key] !== undefined
        );

        if (!tagsToRender.length) {
          return <span>-</span>;
        }

        const recordIdString =
          record.id !== undefined && record.id !== null
            ? String(record.id)
            : null;
        const isToggling =
          recordIdString !== null && togglingAppointmentId === recordIdString;

        return (
          <Space size="small">
            {tagsToRender.map(({ key, label }) => (
              <Tag
                key={`${record.id ?? record.vin ?? label}-${key}`}
                style={{
                  cursor: isToggling ? "not-allowed" : "pointer",
                  opacity: isToggling ? 0.6 : 1,
                }}
                onClick={() => {
                  if (!isToggling) {
                    handleToggleAppointment(record, key);
                  }
                }}
                color={appointment[key] ? "green" : "red"}
              >
                {label}
              </Tag>
            ))}
          </Space>
        );
      },
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
      render: renderEditableCell("route"),
    },
    {
      title: t("price"),
      dataIndex: "price",
      key: "price",
      render: renderEditableCell("price"),
    },
    {
      title: t("actions"),
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Dropdown.Button
            menu={menuProps(record)}
            onClick={() => handleViewDetails(record.id)}
            size="small"
          >
            {t("view_details")}
          </Dropdown.Button>
          <Popconfirm
            title={t("confirm_delete_dispatch")}
            description={t("delete_dispatch_warning")}
            okText={t("confirm")}
            cancelText={t("cancel")}
            onConfirm={() => handleDeleteDispatch(record)}
          >
            <Button danger icon={<DeleteOutlined />} size="small">
              {t("delete")}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title={t("dispatch_dashboard")}
        extra={
          <Space>
            <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename={`${t("dispatch_dashboard")
                .toLowerCase()
                .replace(" ", "-")}-export.csv`}
            >
              <Button
                icon={<DownloadOutlined />}
                disabled={loading || filteredDispatches.length === 0}
              >
                {t("export_to_csv")} {/* TODO-FX: Connect to i18n library. */}
              </Button>
            </CSVLink>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsAddModalOpen(true)}
            >
              {t("add_new_dispatch")}
            </Button>
          </Space>
        }
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Filters Section */}
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Input
                placeholder={t("search_by_vin_driver_etc")}
                prefix={<SearchOutlined />}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Select
                mode="multiple"
                placeholder={t("filter_by_status")}
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: "100%" }}
                allowClear
              >
                <Select.Option value="new">{t("new")}</Select.Option>
                <Select.Option value="pending_payment">
                  {t("pending_payment")}
                </Select.Option>
                <Select.Option value="overdue">{t("overdue")}</Select.Option>
                <Select.Option value="paid">{t("paid")}</Select.Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <RangePicker
                placeholder={[t("pickup_date_from"), t("pickup_date_to")]}
                value={dateRange}
                onChange={setDateRange}
                style={{ width: "100%" }}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Space>
                <Button
                  type="primary"
                  icon={<FilterOutlined />}
                  disabled={
                    !searchValue &&
                    statusFilter.length === 0 &&
                    (!dateRange || dateRange.length === 0)
                  }
                >
                  {t("apply_filters")}
                </Button>
                <Button
                  icon={<ClearOutlined />}
                  onClick={clearFilters}
                  disabled={
                    !searchValue &&
                    statusFilter.length === 0 &&
                    (!dateRange || dateRange.length === 0)
                  }
                >
                  {t("clear")}
                </Button>
              </Space>
            </Col>
          </Row>

          {/* Table */}
          <Table
            dataSource={filteredDispatches}
            columns={columns}
            rowKey="id"
            rowClassName={getRowClassName}
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
                  description={t("no_dispatches_found")}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              ),
            }}
          />
        </Space>
      </Card>

      <AddDispatchModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={refetchDispatches}
      />

      <CancelDispatchModal
        open={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setSelectedDispatchId(null);
        }}
        dispatchId={selectedDispatchId}
        onSuccess={handleCancelSuccess}
      />

      <AuditLogDrawer
        dispatchId={selectedDispatchId}
        open={isAuditDrawerOpen}
        onClose={() => {
          setIsAuditDrawerOpen(false);
          setSelectedDispatchId(null);
        }}
      />

      {/* this modal opens vin edit modal */}
      <Modal
        open={isVinModalOpen}
        title={t("edit_vins")}
        okText={t("save")}
        cancelText={t("cancel")}
        confirmLoading={vinModalSubmitting}
        onOk={() => vinForm.submit()}
        onCancel={() => {
          setIsVinModalOpen(false);
          setVinModalRecord(null);
          setVinModalOriginalId(null);
          setVinModalSlots([]);
          vinForm.resetFields();
        }}
      >
        <Form
          form={vinForm}
          layout="vertical"
          onFinish={async (values) => {
            if (!vinModalRecord) return;

            const slots = vinModalSlots;

            if (!slots.length) {
              message.error(t("vin_is_required"));
              return;
            }

            const normalizedEntries = slots.map((slot) => {
              const rawValue = values[slot.flatKey];
              const normalized =
                typeof rawValue === "string"
                  ? rawValue.trim().toUpperCase()
                  : rawValue ?? "";
              return { slot, value: normalized };
            });

            const primaryEntry = normalizedEntries.find(
              (entry) => entry.slot.flatKey === "vin"
            );

            if (!primaryEntry || !primaryEntry.value) {
              message.error(t("vin_is_required"));
              return;
            }

            const payload = { vin: primaryEntry.value };

            const updatedAdditionalVehicles = Array.isArray(
              vinModalRecord.additionalVehicles
            )
              ? vinModalRecord.additionalVehicles.map((vehicle) => ({
                  ...vehicle,
                }))
              : [];

            normalizedEntries.forEach(({ slot, value }) => {
              if (slot.flatKey !== "vin") {
                const hadValueBefore =
                  Boolean(slot.value) ||
                  Object.prototype.hasOwnProperty.call(
                    vinModalRecord,
                    slot.flatKey
                  );

                if (value) {
                  payload[slot.flatKey] = value;
                } else if (hadValueBefore) {
                  payload[slot.flatKey] = null;
                }
              }

              if (slot.additionalIndex !== null) {
                const idx = slot.additionalIndex;

                if (value) {
                  if (!updatedAdditionalVehicles[idx]) {
                    updatedAdditionalVehicles[idx] = {};
                  }
                  updatedAdditionalVehicles[idx] = {
                    ...updatedAdditionalVehicles[idx],
                    vin: value,
                  };
                } else if (updatedAdditionalVehicles[idx]) {
                  updatedAdditionalVehicles[idx] = null;
                }
              }
            });

            const cleanedAdditionalVehicles = updatedAdditionalVehicles.filter(
              (vehicle) => vehicle && vehicle.vin
            );

            payload.additionalVehicles = cleanedAdditionalVehicles;

            setVinModalSubmitting(true);

            try {
              if (
                vinModalOriginalId === undefined ||
                vinModalOriginalId === null
              ) {
                message.error(t("vehicle_id_is_required"));
                return;
              }

              const response = await axios.put(
                `http://localhost:3000/vehicles/${vinModalOriginalId}`,
                payload
              );

              const updatedVehicleRaw = {
                ...vinModalRecord,
                ...response.data,
              };
              const updatedVehicle = normalizeVehicleVinData(updatedVehicleRaw);

              if (
                updatedVehicle.id === undefined ||
                updatedVehicle.id === null
              ) {
                updatedVehicle.id = vinModalOriginalId;
              }

              setDispatches((prev) =>
                prev.map((item) =>
                  String(item.id) === String(vinModalOriginalId)
                    ? updatedVehicle
                    : item
                )
              );
              setFilteredDispatches((prev) =>
                prev.map((item) =>
                  String(item.id) === String(vinModalOriginalId)
                    ? updatedVehicle
                    : item
                )
              );

              await refetchDispatches();

              message.success(t("dispatch_updated_successfully"));

              setIsVinModalOpen(false);
              setVinModalRecord(null);
              setVinModalOriginalId(null);
              setVinModalSlots([]);
              vinForm.resetFields();
            } catch (error) {
              console.error("Failed to update VINs:", error);
              message.error(t("failed_to_update_dispatch"));
            } finally {
              setVinModalSubmitting(false);
            }
          }}
        >
          {vinModalRecord ? (
            vinModalSlots.length ? (
              <>
                {vinModalSlots.map((slot) => (
                  <Form.Item
                    key={slot.flatKey}
                    name={slot.flatKey}
                    label={`${t("vin")} #${slot.slotNumber}`}
                    rules={
                      slot.flatKey === "vin"
                        ? [{ required: true, message: t("vin_is_required") }]
                        : []
                    }
                  >
                    <Input maxLength={17} placeholder={t("enter_vin")} />
                  </Form.Item>
                ))}

                {vinModalSlots.length < MAX_VEHICLE_SLOTS && (
                  <Button
                    type="dashed"
                    block
                    icon={<PlusOutlined />}
                    onClick={handleAddVinSlot}
                    style={{ marginBottom: 12 }}
                  >
                    {t("add_another_vin_code")}
                  </Button>
                )}

                {vinModalSlots.length > 1 && (
                  <>
                    <Divider />
                    <p style={{ marginBottom: 0, color: "#8c8c8c" }}>
                      {t("vin_update_info")}
                    </p>
                  </>
                )}
              </>
            ) : (
              <Skeleton active paragraph={{ rows: 3 }} />
            )
          ) : (
            <Skeleton active paragraph={{ rows: 3 }} />
          )}
        </Form>
      </Modal>
    </>
  );
};

DispatchDashboard.propTypes = {
  // Add props when needed
};

export default DispatchDashboard;
