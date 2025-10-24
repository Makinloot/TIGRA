import React, { useState, useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
  Row,
  Col,
  Space,
  message,
  Divider,
} from "antd";
import { validateVIN } from "../../utils/cmsUtils";
import DriverAnalyticsPopup from "../DriverAnalyticsPopup";
import { useCopartLocations } from "../../context/copartLocationsContext";

// TODO-FX: Connect to i18n library.
const t = (key) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

const MAX_VEHICLES = 5;

// USA phone number validator
const validateUSAPhone = (phone) => {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) return true;
  if (cleaned.length === 11 && cleaned[0] === "1") return true;
  return false;
};

const { Option } = Select;

const AddDispatchModal = ({ open, onClose, onSuccess }) => {
  const { locations } = useCopartLocations();
  const routeOptions = useMemo(() => {
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
        options.push({
          key: pairKey,
          label: `${state} - ${city}`,
          value: `${state} - ${city}`,
        });
      });
    });

    return options;
  }, [locations]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [driverStats, setDriverStats] = useState(null);
  const [showDriverAnalytics, setShowDriverAnalytics] = useState(false);
  const [auctionOptions, setAuctionOptions] = useState([]);
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const formRef = useRef();
  const vinDecodeCacheRef = useRef({});

  useEffect(() => {
    if (open && formRef.current) {
      const currentVehicles = formRef.current.getFieldValue("vehicles");
      if (!Array.isArray(currentVehicles) || currentVehicles.length === 0) {
        formRef.current.setFieldsValue({ vehicles: [{}] });
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const fetchOptions = async () => {
      try {
        const [auctionsResponse, warehousesResponse] = await Promise.all([
          axios.get("http://localhost:3000/auctions"),
          axios.get("http://localhost:3000/warehouses"),
        ]);

        const mappedAuctions = (auctionsResponse.data ?? [])
          .map((auction) => {
            const name = auction?.name?.trim();
            if (!name) {
              return null;
            }
            return { value: name, label: name };
          })
          .filter(Boolean);

        const mappedWarehouses = (warehousesResponse.data ?? [])
          .map((warehouse) => {
            const name = warehouse?.name?.trim();
            if (!name) {
              return null;
            }
            return { value: name, label: name };
          })
          .filter(Boolean);

        setAuctionOptions(mappedAuctions);
        setWarehouseOptions(mappedWarehouses);
      } catch (error) {
        console.error("Failed to fetch options:", error);
        message.error(t("failed_to_fetch_reference_data"));
      }
    };

    fetchOptions();
  }, [open]);
  const decodeVinForVehicle = async (
    vin,
    index,
    { showMessages = true } = {}
  ) => {
    const form = formRef.current;
    if (!form || !vin) return;

    const hideMessage = showMessages
      ? message.loading(`${t("decoding_vin")}...`, 0)
      : null;

    try {
      const { data } = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`
      );

      const decoded = data?.Results?.[0] ?? {};
      const make = decoded?.Make?.trim() ?? "";
      const model = decoded?.Model?.trim() ?? "";
      const year = decoded?.ModelYear?.trim() ?? "";

      const updatedVehicles = (form.getFieldValue("vehicles") || []).map(
        (vehicle) => ({ ...vehicle })
      );
      updatedVehicles[index] = {
        ...(updatedVehicles[index] || {}),
        vin,
        make,
        model,
        year,
      };
      form.setFieldsValue({ vehicles: updatedVehicles });
      form.validateFields([["vehicles", index, "vin"]]);

      vinDecodeCacheRef.current[index] = vin;

      if (showMessages) {
        if (!make || !model || !year) {
          message.warning(t("vin_decode_partial"));
        } else {
          message.success(t("vin_decode_success"));
        }
      }
    } catch (error) {
      console.error("Failed to decode VIN via NHTSA:", error);
      if (showMessages) {
        message.error(t("failed_to_parse_vin"));
      }
      vinDecodeCacheRef.current[index] = undefined;
    } finally {
      if (typeof hideMessage === "function") {
        hideMessage();
      }
    }
  };

  const handleVehicleVinChange = async (
    value,
    index,
    { showErrors = false } = {}
  ) => {
    const form = formRef.current;
    if (!form) return;

    const rawVin = value ?? "";
    const vin = rawVin.toString().trim().toUpperCase();

    const existingVehicles = form.getFieldValue("vehicles") || [];
    const vehicles = existingVehicles.map((vehicle) => ({ ...vehicle }));
    vehicles[index] = {
      ...(vehicles[index] || {}),
      vin,
      make: "",
      model: "",
      year: "",
    };

    if (vehicles[index].vin !== existingVehicles[index]?.vin) {
      form.setFieldsValue({ vehicles });
    }

    if (!vin) {
      vinDecodeCacheRef.current[index] = undefined;
      if (showErrors) {
        form.validateFields([["vehicles", index, "vin"]]);
      }
      return;
    }

    if (vin.length < 17) {
      vinDecodeCacheRef.current[index] = undefined;
      return;
    }

    if (!validateVIN(vin)) {
      vinDecodeCacheRef.current[index] = undefined;
      if (showErrors) {
        message.error(t("invalid_vin_format"));
      }
      return;
    }

    if (vinDecodeCacheRef.current[index] === vin) {
      return;
    }

    await decodeVinForVehicle(vin, index, { showMessages: true });
  };

  // API call to add new vehicle in the system at @POST /vehicles
  const handleSubmit = async () => {
    if (!formRef.current) return;

    const values = formRef.current.getFieldsValue(true);
    const { isPaid, storageFee, vehicles = [], ...sanitizedValues } = values;
    const formattedPickupDate = sanitizedValues.pickupDate
      ? moment(sanitizedValues.pickupDate).format("DD/MM")
      : undefined;
    const formattedDeliveryDate = sanitizedValues.deliveryDate
      ? moment(sanitizedValues.deliveryDate).format("DD/MM")
      : undefined;

    const normalizedVehicles = (vehicles || [])
      .map((vehicle = {}) => ({
        ...vehicle,
        vin: vehicle?.vin?.toString().trim().toUpperCase() || "",
      }))
      .filter((vehicle) => vehicle.vin);

    if (normalizedVehicles.length === 0) {
      message.error(t("vin_is_required"));
      return;
    }

    const [primaryVehicle, ...additionalVehicles] = normalizedVehicles;

    const normalizedValues = {
      ...sanitizedValues,
      pickupDate: formattedPickupDate,
      deliveryDate: formattedDeliveryDate,
    };

    const flattenedExtraVehicles = {};
    additionalVehicles.forEach((vehicle, index) => {
      const suffix = index + 2;
      flattenedExtraVehicles[`vin${suffix}`] = vehicle?.vin || "";
      flattenedExtraVehicles[`make${suffix}`] = vehicle?.make || "";
      flattenedExtraVehicles[`model${suffix}`] = vehicle?.model || "";
      flattenedExtraVehicles[`year${suffix}`] = vehicle?.year || "";
    });

    // console.log("Dispatch form values:", normalizedValues);
    setIsSubmitting(true);

    try {
      // Auto-generate creation date
      const finalData = {
        ...normalizedValues,
        ...flattenedExtraVehicles,
        vin: primaryVehicle.vin,
        make: primaryVehicle.make,
        model: primaryVehicle.model,
        year: primaryVehicle.year,
        additionalVehicles,
      };

      const response = await axios.post(
        "http://localhost:3000/vehicles",
        finalData
      );

      const savedDispatch = response.data ?? {};
      const recordId = savedDispatch._id ?? savedDispatch.id;

      const normalizedDispatch = {
        ...savedDispatch,
        id: recordId,
        _id: recordId,
      };

      console.log("DATA FROM API", normalizedDispatch);
      message.success(t("dispatch_created_successfully"));
      onSuccess?.(normalizedDispatch);
      onClose();
    } catch (error) {
      console.error("Failed to create dispatch:", error);
      
      // Display validation errors from backend
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        errors.forEach((err) => message.error(err));
      } else if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error(t("failed_to_create_dispatch"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    formRef.current?.resetFields();
    formRef.current?.setFieldsValue({ vehicles: [{}] });
    setDriverStats(null);
    setShowDriverAnalytics(false);
    onClose();
  };

  return (
    <Modal
      title={t("add_new_dispatch")}
      open={open}
      onCancel={handleCancel}
      width={800}
      centered
      style={{ maxHeight: "95vh" }}
      bodyStyle={{
        maxHeight: "calc(95vh - 140px)",
        overflowY: "auto",
        overflowX: "hidden",
      }}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          {t("cancel")}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isSubmitting}
          onClick={() => formRef.current?.submit()}
        >
          {t("create_dispatch")}
        </Button>,
      ]}
    >
      <Form
        ref={formRef}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ vehicles: [{}] }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Form.List name="vehicles">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    style={{
                      border: "1px solid #f0f0f0",
                      borderRadius: 8,
                      padding: 16,
                    }}
                  >
                    <Row gutter={[16, 16]} align="middle">
                      <Col xs={24} sm={index > 0 ? 16 : 24}>
                        <Form.Item
                          name={[field.name, "vin"]}
                          fieldKey={[field.fieldKey, "vin"]}
                          label={
                            fields.length > 1
                              ? `${t("vin")} #${index + 1}`
                              : t("vin")
                          }
                          rules={[
                            {
                              validator: (_, value) => {
                                if (!value) {
                                  return index === 0
                                    ? Promise.reject(
                                        new Error(t("vin_is_required"))
                                      )
                                    : Promise.resolve();
                                }
                                return validateVIN(value)
                                  ? Promise.resolve()
                                  : Promise.reject(
                                      new Error(t("invalid_vin_format"))
                                    );
                              },
                            },
                          ]}
                          validateTrigger="onBlur"
                        >
                          <Input
                            placeholder={t("enter_17_character_vin")}
                            onChange={(e) =>
                              handleVehicleVinChange(e.target.value, field.name)
                            }
                            onBlur={(e) =>
                              handleVehicleVinChange(
                                e.target.value,
                                field.name,
                                {
                                  showErrors: true,
                                }
                              )
                            }
                            maxLength={17}
                          />
                        </Form.Item>
                      </Col>
                      {index > 0 && (
                        <Col
                          xs={24}
                          sm={8}
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            type="link"
                            danger
                            onClick={() => remove(field.name)}
                          >
                            {t("remove_vehicle")}
                          </Button>
                        </Col>
                      )}
                    </Row>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={8}>
                        <Form.Item
                          name={[field.name, "make"]}
                          fieldKey={[field.fieldKey, "make"]}
                          label={t("make")}
                        >
                          <Input disabled />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={8}>
                        <Form.Item
                          name={[field.name, "model"]}
                          fieldKey={[field.fieldKey, "model"]}
                          label={t("model")}
                        >
                          <Input disabled />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={8}>
                        <Form.Item
                          name={[field.name, "year"]}
                          fieldKey={[field.fieldKey, "year"]}
                          label={t("year")}
                        >
                          <Input disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add({})}
                  disabled={fields.length >= MAX_VEHICLES}
                  block
                  title={
                    fields.length >= MAX_VEHICLES
                      ? t("vehicle_limit_reached")
                      : undefined
                  }
                >
                  {t("add_another_vehicle")}
                </Button>
              </>
            )}
          </Form.List>

          <Divider orientation="left">{t("logistics_details")}</Divider>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="auction"
                label={t("auction")}
                rules={[{ required: true, message: t("auction_is_required") }]}
              >
                <Select
                  placeholder={t("select_auction")}
                  loading={!auctionOptions.length}
                  options={auctionOptions}
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="warehouse"
                label={t("warehouse")}
                rules={[
                  { required: true, message: t("warehouse_is_required") },
                ]}
              >
                <Select
                  placeholder={t("select_warehouse")}
                  loading={!warehouseOptions.length}
                  options={warehouseOptions}
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="pickupDate"
                label={t("pickup_date")}
                rules={[
                  { required: true, message: t("pickup_date_is_required") },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      const today = moment().startOf("day");
                      if (value.isBefore(today)) {
                        return Promise.reject(
                          new Error(t("pickup_date_cannot_be_in_the_past"))
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder={t("select_pickup_date")}
                  disabledDate={(current) => {
                    return current && current < moment().startOf("day");
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="deliveryDate"
                label={t("delivery_date")}
                dependencies={["pickupDate"]}
                rules={[
                  { required: true, message: t("delivery_date_is_required") },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value) return Promise.resolve();
                      const pickupDate = getFieldValue("pickupDate");
                      if (pickupDate && value.isBefore(pickupDate)) {
                        return Promise.reject(
                          new Error(t("delivery_date_cannot_be_before_pickup_date"))
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder={t("select_delivery_date")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="driverNumber"
                label={t("driver_number")}
                rules={[
                  { required: true, message: t("driver_number_is_required") },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      if (!validateUSAPhone(value)) {
                        return Promise.reject(
                          new Error(t("invalid_usa_phone_number_format"))
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  placeholder={t("enter_driver_number")}
                  maxLength={15}
                />
              </Form.Item>
            </Col>
            <Form.Item
              noStyle
              shouldUpdate={(prev, curr) => prev.auction !== curr.auction}
            >
              {({ getFieldValue }) => {
                const selectedAuction = getFieldValue("auction");
                const isCopartSelected =
                  typeof selectedAuction === "string" &&
                  selectedAuction.toLowerCase().includes("copart");

                return (
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="route"
                      label={t("route")}
                      rules={[
                        { required: true, message: t("route_is_required") },
                      ]}
                    >
                      {isCopartSelected ? (
                        <Select placeholder={t("select_route")} showSearch>
                          {routeOptions.map((option) => (
                            <Option key={option.key} value={option.value}>
                              {option.label}
                            </Option>
                          ))}
                        </Select>
                      ) : (
                        <Input placeholder={t("enter_route_from_to")} />
                      )}
                    </Form.Item>
                  </Col>
                );
              }}
            </Form.Item>
          </Row>

          <Divider orientation="left">{t("financials")}</Divider>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="price"
                label={t("price")}
                rules={[
                  { required: true, message: t("price_is_required") },
                  {
                    type: "number",
                    min: 0,
                    message: t("price_must_be_non_negative"),
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder={t("enter_price")}
                  prefix="$"
                  min={0}
                  precision={2}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="comment" label={t("comment")}>
                <Input.TextArea placeholder={t("enter_comment")} rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </Space>
      </Form>

      <DriverAnalyticsPopup
        stats={driverStats}
        open={showDriverAnalytics}
        onClose={() => setShowDriverAnalytics(false)}
      />
    </Modal>
  );
};

AddDispatchModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default AddDispatchModal;
