import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Steps, Descriptions, Image, Spin, Alert } from "antd";
import PropTypes from "prop-types";
import { getPublicTrackingData } from "../../mocks/_mockData";

// TODO-FX: Connect to i18n library.
const t = (key) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

const StatusPage = () => {
  const { vin } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dispatchData, setDispatchData] = useState(null);

  // Define the fixed status progression steps
  const STEPS = [
    { key: "at_auction", title: t("at_auction") },
    { key: "in_transit", title: t("in_transit") },
    { key: "at_warehouse", title: t("at_warehouse") },
    { key: "delivered", title: t("delivered") },
  ];

  // Function to map dispatch status to step index
  const getStatusIndex = (status) => {
    const stepIndex = STEPS.findIndex((step) => step.key === status);
    return stepIndex >= 0 ? stepIndex : 0; // Default to first step if status not found
  };

  // Simulate API call to fetch dispatch data
  const fetchDispatchData = async (vin) => {
    try {
      setLoading(true);
      setError(null);

      // TODO-FX: Replace with real API call.
      // API Endpoint: GET /api/public/track/{vin}
      // Expected Data: { vin: '...', status: 'in_transit', estimatedDelivery: '...', photos: { pickup: [...], delivery: [...] }, details: { make: '...', model: '...' }, history: [{ date: '...', status: '...' }] }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get mock data from the shared mock data function
      const mockData = getPublicTrackingData(vin);

      if (!mockData) {
        throw new Error("VIN not found");
      }

      setDispatchData(mockData);
    } catch {
      setError(t("vin_not_found"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (vin) {
      fetchDispatchData(vin);
    }
  }, [vin]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "24px" }}>
        <Alert
          message={error}
          description={t("please_check_vin_and_try_again")}
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!dispatchData) {
    return null;
  }

  const statusIndex = getStatusIndex(dispatchData.status);

  return (
    <div style={{ padding: "24px" }}>
      {/* Status Steps */}
      <Card style={{ marginBottom: "24px" }}>
        <Steps current={statusIndex} size="small">
          {STEPS.map((step, index) => (
            <Steps.Step
              key={step.key}
              title={step.title}
              description={
                index === statusIndex
                  ? t("current_status")
                  : index < statusIndex
                  ? t("completed")
                  : t("pending")
              }
            />
          ))}
        </Steps>
      </Card>

      {/* Vehicle Details and Photos */}
      <Row gutter={[24, 24]}>
        {/* Left Column: Vehicle Details */}
        <Col xs={24} md={12}>
          <Card title={t("vehicle_details")} bordered={false}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label={t("vin")}>
                {dispatchData.vin}
              </Descriptions.Item>
              <Descriptions.Item label={t("make")}>
                {dispatchData.details.make}
              </Descriptions.Item>
              <Descriptions.Item label={t("model")}>
                {dispatchData.details.model}
              </Descriptions.Item>
              <Descriptions.Item label={t("estimated_delivery")}>
                {new Date(dispatchData.estimatedDelivery).toLocaleDateString()}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Right Column: Photos */}
        <Col xs={24} md={12}>
          <Card title={t("pickup_photos")} bordered={false}>
            {dispatchData.photos.pickup &&
            dispatchData.photos.pickup.length > 0 ? (
              <Image.PreviewGroup>
                <Row gutter={[8, 8]}>
                  {dispatchData.photos.pickup.map((photo, index) => (
                    <Col key={index} xs={24} sm={12} md={8}>
                      <Image
                        src={photo}
                        alt={`${t("pickup_photo")} ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </Image.PreviewGroup>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#999",
                }}
              >
                {t("no_photos_available")}
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

StatusPage.propTypes = {};

export default StatusPage;
