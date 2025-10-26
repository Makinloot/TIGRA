import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Layout, Menu, Avatar, Badge, Dropdown, Row, Col, Space } from "antd";
import {
  DashboardOutlined,
  GlobalOutlined,
  SettingOutlined,
  BellOutlined,
  UserOutlined,
  AreaChartOutlined,
  CheckSquareOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  MessageOutlined,
  ProjectOutlined,
  CalendarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

const { Header, Sider, Content } = Layout;

// TODO-FX: Connect to i18n library.
const t = (key) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

const CrmLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const handleCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const menuItems = [
    // {
    //   key: "/crm/tasks",
    //   icon: <CheckCircleOutlined />,
    //   label: <Link to="/crm/tasks">{t("my_tasks")}</Link>,
    // },
    {
      key: "/crm/dispatch",
      icon: <DashboardOutlined />,
      label: <Link to="/crm/dispatch">{t("dispatch_dashboard")}</Link>,
    },
    {
      key: "/crm/payment",
      icon: <DashboardOutlined />,
      label: <Link to="/crm/payment">{t("Payment Dashboard")}</Link>,
    },
    // {
    //   key: "/crm/pipeline",
    //   icon: <ProjectOutlined />,
    //   label: <Link to="/crm/pipeline">{t("dispatch_pipeline")}</Link>,
    // },
    // {
    //   key: "/crm/calendar",
    //   icon: <CalendarOutlined />,
    //   label: <Link to="/crm/calendar">{t("dispatch_calendar")}</Link>,
    // },
    // {
    //   key: "/crm/archive",
    //   icon: <CheckSquareOutlined />,
    //   label: <Link to="/crm/archive">{t("archive_paid")}</Link>,
    // },
    {
      key: "/crm/cancelled",
      icon: <DeleteOutlined />,
      label: <Link to="/crm/cancelled">{t("cancelled_list")}</Link>,
    },
    {
      key: "/crm/offer-dispatch",
      icon: <MessageOutlined />,
      label: <Link to="/crm/offer-dispatch">{t("offer_dispatch")}</Link>,
    },
    // {
    //   key: "/crm/logistics",
    //   icon: <GlobalOutlined />,
    //   label: <Link to="/crm/logistics">{t("logistics_control")}</Link>,
    // },
    {
      key: "/crm/statistics",
      icon: <AreaChartOutlined />,
      label: <Link to="/crm/statistics">{t("statistics")}</Link>,
    },
    {
      key: "/crm/admin",
      icon: <SettingOutlined />,
      label: t("administration_tools"),
      children: [
        {
          key: "/crm/admin/acl",
          icon: <SettingOutlined />,
          label: <Link to="/crm/admin/acl">{t("access_control_admin")}</Link>,
        },
        {
          key: "/crm/admin/users",
          icon: <UserOutlined />,
          label: <Link to="/crm/admin/users">{t("user_management")}</Link>,
        },
      ],
    },
  ];

  const userMenuItems = [
    {
      key: "profile",
      label: t("profile"),
    },
    {
      key: "logout",
      label: t("logout"),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={handleCollapse}
        theme="dark"
      >
        <div style={{ padding: "16px 16px 16px 16px" }}>
          <h2 style={{ color: "white", margin: 0, textAlign: "center" }}>
            {collapsed ? "CRM" : t("crm_system")}
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: "0 16px" }}>
          <Row justify="end">
            <Col>
              <Space size="middle">
                <Link to="/crm/messages">
                  <Badge count={3}>
                    <Avatar shape="square" icon={<MessageOutlined />} />
                  </Badge>
                </Link>
                <Badge dot>
                  <Avatar shape="square" icon={<BellOutlined />} />
                </Badge>
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  arrow
                >
                  <Avatar icon={<UserOutlined />} />
                </Dropdown>
              </Space>
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: "24px", background: "#f0f2f5" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

CrmLayout.propTypes = {
  // No props required for layout component
};

export default CrmLayout;
