import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CSVLink } from "react-csv";
import moment from "moment";
import {
  extractAdditionalVehicles,
  renderVehicleInfoCell as renderVehicleInfoCellUtil,
  renderEditableCell as renderEditableCellUtil,
} from "../../utils/TableFunctions";
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
import { useCopartLocations } from "../../context/copartLocationsContext";

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
  const [cancelForm] = Form.useForm();
  const [togglingAppointmentId, setTogglingAppointmentId] = useState(null);
  const [auctionOptions, setAuctionOptions] = useState([]);
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [auctionOptionsLoading, setAuctionOptionsLoading] = useState(false);
  const [warehouseOptionsLoading, setWarehouseOptionsLoading] = useState(false);
  const [editIntentCell, setEditIntentCell] = useState(null);
  const { locations } = useCopartLocations();

  const copartRouteOptions = useMemo(() => {
    if (!Array.isArray(locations)) {
      return [];
    }

    const seenPairs = new Set();
    const options = [];

    locations.forEach((stateEntry = {}) => {
      const stateRaw = stateEntry?.state;
      const state = typeof stateRaw === "string" ? stateRaw.trim() : "";
      if (!state) {
        return;
      }

      const stateLocations = Array.isArray(stateEntry.locations)
        ? stateEntry.locations
        : [];

      stateLocations.forEach((locationEntry = {}) => {
        const cityRaw = locationEntry?.city ?? locationEntry?.name;
        const city = typeof cityRaw === "string" ? cityRaw.trim() : "";
        if (!city) {
          return;
        }

        const pairKey = `${state.toUpperCase()}-${city.toUpperCase()}`;
        if (seenPairs.has(pairKey)) {
          return;
        }

        seenPairs.add(pairKey);
        const label = `${state} - ${city}`;
        options.push({ label, value: label });
      });
    });

    return options;
  }, [locations]);

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
        const rawData = Array.isArray(response.data) ? response.data : [];
        console.log(rawData);
        const activeVehicles = rawData.filter(
          (item) => item?.canceled !== true
        );
        const normalizedData = activeVehicles.map((item) =>
          normalizeVehicleVinData(item)
        );

        setDispatches(normalizedData);
        setFilteredDispatches(normalizedData);
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

  // Clear all filters
  const clearFilters = () => {
    setSearchValue("");
    setStatusFilter([]);
    setDateRange([]);
  };

  // Refetch dispatches data (filters out cancelled vehicles)
  const refetchDispatches = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/vehicles");
      const rawData = Array.isArray(response.data) ? response.data : [];
      const activeVehicles = rawData.filter((item) => item?.canceled !== true);
      const normalizedData = activeVehicles.map((item) =>
        normalizeVehicleVinData(item)
      );

      setDispatches(normalizedData);
      setFilteredDispatches(normalizedData);
    } catch (err) {
      setError(t("failed_to_load_dispatches"));
      console.error("Failed to refetch dispatch vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle audit log
  const openAuditLog = (dispatchId) => {
    setSelectedDispatchId(dispatchId);
    setIsAuditDrawerOpen(true);
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

  const openCancelModal = (dispatchId) => {
    setSelectedDispatchId(dispatchId);
    setIsCancelModalOpen(true);
    cancelForm.resetFields();
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
    cancelForm.resetFields();
    setSelectedDispatchId(null);
  };

  const handleCancelModalOk = async () => {
    try {
      const { cancelReason } = await cancelForm.validateFields();

      if (selectedDispatchId === null || selectedDispatchId === undefined) {
        message.error(t("vehicle_id_is_required"));
        return;
      }

      const idString = String(selectedDispatchId);
      const payload = {
        comment: cancelReason,
        canceled: true,
      };

      const response = await axios.put(
        `http://localhost:3000/vehicles/${idString}`,
        payload
      );

      const updatedVehicleRaw = response?.data
        ? normalizeVehicleVinData(response.data)
        : null;
      const updatedVehicle = (current) => {
        const base = {
          ...current,
          ...(updatedVehicleRaw ?? {}),
          comment: cancelReason,
          canceled: true,
        };
        if (
          updatedVehicleRaw?.id === undefined ||
          updatedVehicleRaw?.id === null
        ) {
          base.id = current.id ?? selectedDispatchId;
        }
        return base;
      };

      setDispatches((prev) =>
        prev
          .map((item) =>
            String(item.id) === idString ? updatedVehicle(item) : item
          )
          .filter((item) => item?.canceled !== true)
      );
      setFilteredDispatches((prev) =>
        prev
          .map((item) =>
            String(item.id) === idString ? updatedVehicle(item) : item
          )
          .filter((item) => item?.canceled !== true)
      );

      message.success(t("dispatch_cancelled_successfully"));
      closeCancelModal();
    } catch (error) {
      if (error?.errorFields) {
        // Validation errors are handled by AntD form; do nothing here.
        return;
      }
      console.error("Failed to cancel dispatch:", error);
      message.error(t("failed_to_cancel_dispatch"));
    }
  };

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

      let initialValue = value ?? "";
      if (
        dataIndex === "route" &&
        typeof initialValue === "string" &&
        initialValue.trim() === "" &&
        typeof record.route === "string"
      ) {
        initialValue = record.route;
      }

      setEditingCell({ id: record.id, dataIndex });
      setEditingValue(initialValue ?? "");
    },
    [savingCell, t]
  );

  const cancelEditing = () => {
    setEditingCell(null);
    setEditingValue("");
    setEditIntentCell(null);
  };

  const handleSave = async (
    record,
    dataIndex,
    value,
    additionalFields = {}
  ) => {
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

    if (dataIndex === "vin" && !trimmedValue) {
      message.error(t("vin_is_required"));
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
      prev
        .map((item) =>
          String(item.id) === String(record.id) ? optimisticUpdate : item
        )
        .filter((item) => item?.canceled !== true)
    );
    setFilteredDispatches((prev) =>
      prev
        .map((item) =>
          String(item.id) === String(record.id) ? optimisticUpdate : item
        )
        .filter((item) => item?.canceled !== true)
    );

    try {
      setSavingCell(true);
      const payload = {
        [dataIndex]: payloadValue,
        ...additionalFields, // Include additional fields in the request
      };
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

      // Filter out cancelled vehicles from both states
      setDispatches((prev) =>
        prev
          .map((item) =>
            String(item.id) === String(record.id) ? updatedVehicle : item
          )
          .filter((item) => item?.canceled !== true)
      );
      setFilteredDispatches((prev) =>
        prev
          .map((item) =>
            String(item.id) === String(record.id) ? updatedVehicle : item
          )
          .filter((item) => item?.canceled !== true)
      );

      message.success(t("dispatch_updated_successfully"));
    } catch (err) {
      console.error("Failed to update dispatch:", err);
      message.error(t("failed_to_update_dispatch"));

      // Revert optimistic update on error
      setDispatches((prev) =>
        prev
          .map((item) =>
            String(item.id) === String(record.id) ? record : item
          )
          .filter((item) => item?.canceled !== true)
      );
      setFilteredDispatches((prev) =>
        prev
          .map((item) =>
            String(item.id) === String(record.id) ? record : item
          )
          .filter((item) => item?.canceled !== true)
      );
    } finally {
      setSavingCell(false);
      cancelEditing();
    }
  };

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
    return renderVehicleInfoCellUtil(record, t);
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
      width: "15%",
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
      width: "10%",
      render: (_, record) => renderVehicleInfoCell(record),
    },
    {
      title: t("auction"),
      dataIndex: "auction",
      key: "auction",
      width: "7%",
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
      title: t("pickup"),
      dataIndex: "pickupDate",
      key: "pickupDate",
      width: "6.5%",
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
      render: renderEditableCell("pickupDate", {
        inputType: "date",
        placeholder: t("select_pickup_date"),
      }),
    },
    {
      title: t("delivery"),
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      width: "6.5%",
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
      render: renderEditableCell("deliveryDate", {
        inputType: "date",
        placeholder: t("select_delivery_date"),
      }),
    },
    {
      title: t("app"),
      dataIndex: "appointment",
      key: "appointment",
      width: "7%",
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
      ellipsis: true,
      width: "8%",
    },
    {
      title: t("warehouse"),
      dataIndex: "warehouse",
      key: "warehouse",
      width: "10%",
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
      title: t("number"),
      dataIndex: "driverNumber",
      key: "driverNumber",
      width: "10%",
      render: renderEditableCell("driverNumber", {
        copyOnClick: (cellValue) =>
          typeof cellValue === "string" ? cellValue : cellValue ?? "",
      }),
    },
    {
      title: t("route"),
      dataIndex: "route",
      key: "route",
      width: "10%",
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
      width: "5%",
    },
    {
      title: t("actions"),
      dataIndex: "actions",
      key: "actions",
      width: "10%",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
          }}
        >
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => openCancelModal(record.id)}
          >
            {t("cancel")}
          </Button>
          <Popconfirm
            title={t("confirm_delete_dispatch")}
            okText={t("confirm")}
            cancelText={t("cancel")}
            onConfirm={() => handleDeleteDispatch(record)}
          >
            <Button danger icon={<DeleteOutlined />} size="small">
              {t("delete")}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        centered
        title={t("cancel_dispatch")}
        open={isCancelModalOpen}
        okText={t("confirm")}
        cancelText={t("cancel")}
        onOk={handleCancelModalOk}
        onCancel={closeCancelModal}
      >
        <Form form={cancelForm} layout="vertical">
          <Form.Item
            name="cancelReason"
            label={t("cancellation_reason")}
            rules={[
              { required: true, message: t("cancellation_reason_required") },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder={t("enter_cancellation_reason")}
              allowClear
            />
          </Form.Item>
        </Form>
      </Modal>
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
              <Space>
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
            scroll={{ x: 1700 }}
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
        onSuccess={(newDispatch) => {
          // Add new dispatch to state directly without refetching
          if (newDispatch && !newDispatch.canceled) {
            const normalizedDispatch = normalizeVehicleVinData(newDispatch);
            setDispatches((prev) => [normalizedDispatch, ...prev]);
            setFilteredDispatches((prev) => [normalizedDispatch, ...prev]);
          }
        }}
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

              // Update state directly without refetching to prevent cancelled rows from reappearing
              setDispatches((prev) =>
                prev
                  .map((item) =>
                    String(item.id) === String(vinModalOriginalId)
                      ? updatedVehicle
                      : item
                  )
                  .filter((item) => item?.canceled !== true)
              );
              setFilteredDispatches((prev) =>
                prev
                  .map((item) =>
                    String(item.id) === String(vinModalOriginalId)
                      ? updatedVehicle
                      : item
                  )
                  .filter((item) => item?.canceled !== true)
              );

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
