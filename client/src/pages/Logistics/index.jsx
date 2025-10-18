import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import {
  Table,
  Tag,
  Select,
  Spin,
  Alert,
  Empty,
  Row,
  Col,
  Space,
  Card,
  Button,
} from "antd";
import { ReloadOutlined, DownloadOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { mockLogisticsVehicles } from "../../mocks/_mockData";

const { Option } = Select;

// TODO-FX: Connect to i18n library.
const t = (key) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

// Status color mapping for Tags
const statusColors = {
  at_auction: "blue",
  pending_pickup: "orange",
  in_transit: "purple",
  delivered: "green",
  cancelled: "red",
};

// Available status options for the Select dropdown
const statusOptions = [
  { value: "at_auction", label: t("at_auction") },
  { value: "pending_pickup", label: t("pending_pickup") },
  { value: "in_transit", label: t("in_transit") },
  { value: "delivered", label: t("delivered") },
  { value: "cancelled", label: t("cancelled") },
];

const LogisticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  // Simulate API fetch
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO-FX: Replace with real API call.
      // API Endpoint: GET /api/logistics/vehicles
      // Expected Data: Array<{id: string, vehicleTitle: string, vin: string, auctionLocation: string, status: string}>
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

      setVehicles(mockLogisticsVehicles);
    } catch (err) {
      setError(t("failed_to_load_vehicles"));
      console.error("Failed to load logistics vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Handle status change
  const handleStatusChange = async (vehicleId, newStatus) => {
    try {
      // TODO-FX: Implement API call (PUT /api/logistics/vehicles/{id})
      // API Endpoint: PUT /api/logistics/vehicles/{vehicleId}
      // Payload: { status: newStatus }
      // Expected Response: Updated vehicle object

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update local state
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.id === vehicleId ? { ...vehicle, status: newStatus } : vehicle
        )
      );
    } catch (err) {
      console.error("Failed to update vehicle status:", err);
      // TODO-FX: Show error notification to user
    }
  };

  // Define table columns
  const columns = [
    {
      title: t("vehicle"),
      dataIndex: "vehicleTitle",
      key: "vehicleTitle",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: t("vin"),
      dataIndex: "vin",
      key: "vin",
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: t("location"),
      dataIndex: "auctionLocation",
      key: "auctionLocation",
      responsive: ["md", "lg", "xl"],
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status] || "default"}>{t(status)}</Tag>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: t("actions"),
      key: "actions",
      render: (record) => (
        <Select
          defaultValue={record.status}
          style={{ minWidth: "120px" }}
          onChange={(value) => handleStatusChange(record.id, value)}
          options={statusOptions}
        />
      ),
      responsive: ["lg", "xl"],
    },
  ];

  // CSV export configuration
  const csvHeaders = [
    { label: t("vehicle"), key: "vehicleTitle" },
    { label: t("vin"), key: "vin" },
    { label: t("location"), key: "auctionLocation" },
    { label: t("status"), key: "status" },
  ];

  // TODO-FX: Connect to i18n library.
  const csvData = vehicles;

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
    <Card
      title={t("logistics_control")}
      extra={
        <Space>
          <CSVLink
            data={csvData}
            headers={csvHeaders}
            filename={`${t("logistics_control")
              .toLowerCase()
              .replace(" ", "-")}-export.csv`}
          >
            <Button
              icon={<DownloadOutlined />}
              disabled={loading || vehicles.length === 0}
            >
              {t("export_to_csv")} {/* TODO-FX: Connect to i18n library. */}
            </Button>
          </CSVLink>
          <Button
            icon={<ReloadOutlined />}
            loading={loading}
            onClick={fetchVehicles}
          >
            {t("refresh_data")}
          </Button>
        </Space>
      }
    >
      <Table
        columns={columns}
        dataSource={vehicles}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} ${t("of")} ${total} ${t("vehicles")}`,
        }}
        scroll={{ x: 800 }}
        locale={{
          emptyText: (
            <Empty
              description={t("no_vehicles_found")}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
      />
    </Card>
  );
};

LogisticsPage.propTypes = {
  // Add props when needed
};

export default LogisticsPage;
