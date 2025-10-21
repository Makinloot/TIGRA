import { Table } from "antd";
import React, { useEffect, useState } from "react";

const CrmPayment = () => {
  const [paymentData, setPaymentData] = useState([]);

  const columns = [
    {
      title: "vin",
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
      title: "Vehicle",
      dataIndex: "vehicleInfo",
      key: "vehicleInfo",
      render: (_, record) => renderVehicleInfoCell(record),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Warehouse",
      dataIndex: "warehouse",
      key: "warehouse",
    },
  ];

  // function to render Make, Model, Year together in the same column of Table row
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
  const renderVehicleInfoCell = (record) => {
    const primary =
      [record.make, record.model, record.year]
        .filter(Boolean)
        .join(" ")
        .trim() || "-";

    const additionalVehicles = extractAdditionalVehicles(record);
    return (
      <div style={{ cursor: "not-allowed" }} title={"field_not_editable"}>
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

  useEffect(() => {
    const loadPaymentData = async () => {
      try {
        const response = await fetch("http://localhost:3000/vehicles");

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const filterUnpaid = data.filter((item) => item.payment === false);
        setPaymentData(filterUnpaid);
      } catch (error) {
        console.error("Error loading payment data:", error);
      }
    };

    loadPaymentData();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={paymentData} rowKey="id" />
    </div>
  );
};

export default CrmPayment;
