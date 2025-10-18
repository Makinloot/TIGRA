import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import {
  Modal,
  Steps,
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
} from "antd";
import { validateVIN } from "../../utils/cmsUtils";
import {
  getMockDriverStats,
  mockAuctions,
  mockWarehouses,
} from "../../mocks/_mockData";
import DriverAnalyticsPopup from "../DriverAnalyticsPopup";

// TODO-FX: Connect to i18n library.
const t = (key) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

const { Step } = Steps;
const { Option } = Select;
const MAX_VEHICLES = 5;

const AddDispatchModal = ({ open, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [driverStats, setDriverStats] = useState(null);
  const [showDriverAnalytics, setShowDriverAnalytics] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    if (open && formRef.current) {
      const vehicles = formRef.current.getFieldValue("vehicles");
      if (!vehicles || vehicles.length === 0) {
        formRef.current.setFieldsValue({ vehicles: [{}] });
      }
    }
  }, [open]);

  const steps = [
    {
      title: t("core_info"),
      description: t("vin_auction_warehouse"),
    },
    {
      title: t("logistics_details"),
      description: t("pickup_delivery_dates"),
    },
    {
      title: t("financials"),
      description: t("price_payment_status"),
    },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleVehicleVinBlur = async (value, index) => {
    const form = formRef.current;
    if (!form) return;

    const vin = value?.toString().trim().toUpperCase();
    if (!vin) {
      return;
    }

    if (!validateVIN(vin)) {
      message.error(t("invalid_vin_format"));
      return;
    }

    const existingVehicles = form.getFieldValue("vehicles") || [];
    const vehicles = existingVehicles.map((vehicle) => ({ ...vehicle }));
    vehicles[index] = {
      ...(vehicles[index] || {}),
      vin,
      make: "",
      model: "",
      year: "",
    };
    form.setFieldsValue({ vehicles });
    form.validateFields([["vehicles", index, "vin"]]);

    const hideMessage = message.loading(`${t("decoding_vin")}...`, 0);

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

      if (!make || !model || !year) {
        message.warning(t("vin_decode_partial"));
      } else {
        message.success(t("vin_decode_success"));
      }
    } catch (error) {
      console.error("Failed to decode VIN via NHTSA:", error);
      message.error(t("failed_to_parse_vin"));
    } finally {
      if (typeof hideMessage === "function") {
        hideMessage();
      }
    }
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
        vehicles: normalizedVehicles,
        creationDate: moment().format("DD/MM/YYYY HH:mm"),
      };

      const response = await axios.post(
        "http://localhost:3000/vehicles",
        finalData
      );
      const data = response.data;
      // console.log("DATA FROM API", data);
      message.success(t("dispatch_created_successfully"));
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Failed to create dispatch:", error);
      message.error(t("failed_to_create_dispatch"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    formRef.current?.resetFields();
    formRef.current?.setFieldsValue({ vehicles: [{}] });
    setCurrentStep(0);
    setDriverStats(null);
    setShowDriverAnalytics(false);
    onClose();
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0: // Core Info
        return (
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
                              onBlur={(e) =>
                                handleVehicleVinBlur(e.target.value, field.name)
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

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="auction"
                  label={t("auction")}
                  rules={[{ required: true, message: t("auction_is_required") }]}
                >
                  <Select
                    placeholder={t("select_auction")}
                    options={[
                      {
                        value: "copart",
                        label: "Copart",
                      },
                      {
                        value: "iaai",
                        label: "IAAI",
                      },
                      {
                        value: "manheim",
                        label: "Manheim",
                      },
                    ]}
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
                    options={[
                      {
                        value: "Barami",
                        label: "Barami",
                      },
                      {
                        value: "Poti",
                        label: "Poti",
                      },
                      {
                        value: "Tbilisi",
                        label: "Tbilisi",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Space>
        );

      case 1: // Logistics Details
        return (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="pickupDate"
                label={t("pickup_date")}
                rules={[
                  { required: true, message: t("pickup_date_is_required") },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder={t("select_pickup_date")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="deliveryDate"
                label={t("delivery_date")}
                rules={[
                  { required: true, message: t("delivery_date_is_required") },
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
                ]}
              >
                <Input placeholder={t("enter_driver_number")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="route"
                label={t("route")}
                rules={[{ required: true, message: t("route_is_required") }]}
              >
                <Input placeholder={t("enter_route_from_to")} />
              </Form.Item>
            </Col>
          </Row>
        );

      case 2: // Financials
        return (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="price"
                label={t("price")}
                rules={[{ required: true, message: t("price_is_required") }]}
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
            {/* <Col xs={24} sm={12}>
              <Form.Item
                name="isPaid"
                label={t("payment_status")}
                rules={[
                  { required: true, message: t("payment_status_is_required") },
                ]}
              >
                <Select placeholder={t("select_payment_status")}>
                  <Option value={false}>{t("pending")}</Option>
                  <Option value={true}>{t("paid")}</Option>
                </Select>
              </Form.Item>
            </Col> */}
            {/* <Col xs={24} sm={12}>
              <Form.Item
                name="storageFee"
                label={t("storage_fee")}
                rules={[
                  { required: true, message: t("storage_fee_is_required") },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder={t("enter_storage_fee")}
                  prefix="$"
                  min={0}
                  precision={2}
                  initialValue={0}
                />
              </Form.Item>
            </Col> */}
            <Col xs={24}>
              <Form.Item
                name="comment"
                label={t("comment")}
                rules={[{ required: true, message: t("comment_is_required") }]}
              >
                <Input.TextArea placeholder={t("enter_comment")} rows={3} />
              </Form.Item>
            </Col>
          </Row>
        );

      default:
        return null;
    }
  };

  const isStepComplete = (step) => {
    const form = formRef.current;
    if (!form) return false;

    switch (step) {
      case 0:
        return (
          (form.getFieldValue("vehicles")?.[0]?.vin || "") &&
          form.getFieldValue("auction") &&
          form.getFieldValue("warehouse")
        );
      case 1:
        return (
          form.getFieldValue("pickupDate") &&
          form.getFieldValue("deliveryDate") &&
          form.getFieldValue("driverNumber") &&
          form.getFieldValue("route")
        );
      case 2:
        return (
          form.getFieldValue("price") !== undefined &&
          form.getFieldValue("comment")
        );
      default:
        return false;
    }
  };

  const canProceed = () => {
    return true; // Temporarily allow proceeding for testing UI
  };

  const canSubmit = () => {
    return steps.every((_, index) => isStepComplete(index));
  };

  return (
    <Modal
      title={t("add_new_dispatch")}
      open={open}
      onCancel={handleCancel}
      width={800}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          {t("cancel")}
        </Button>,
        currentStep > 0 && (
          <Button key="prev" onClick={prev}>
            {t("previous")}
          </Button>
        ),
        currentStep < steps.length - 1 ? (
          <Button
            key="next"
            type="primary"
            onClick={next}
            disabled={!canProceed()}
          >
            {t("next")}
          </Button>
        ) : (
          <Button
            key="submit"
            type="primary"
            loading={isSubmitting}
            onClick={() => formRef.current?.submit()}
            disabled={!canSubmit()}
          >
            {t("create_dispatch")}
          </Button>
        ),
      ]}
    >
      <div style={{ marginBottom: 24 }}>
        <Steps current={currentStep} size="small">
          {steps.map((step, index) => (
            <Step
              key={index}
              title={step.title}
              description={step.description}
            />
          ))}
        </Steps>
      </div>

      <Form
        ref={formRef}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ vehicles: [{}] }}
      >
        {renderStepContent(currentStep)}
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
