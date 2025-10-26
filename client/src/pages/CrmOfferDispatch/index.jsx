import { Button, Divider, Form, Input, Row, Select, Table } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import { useCopartLocations } from "../../context/copartLocationsContext";
import axios from "axios";

const CrmOfferDispatch = () => {
  const [form] = Form.useForm();
  const [selectedAuction, setSelectedAuction] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vinData, setVinData] = useState({ vin: "", make: "", model: "", year: "" });
  const [isDecodingVin, setIsDecodingVin] = useState(false);
  const { locations, iaaLocations } = useCopartLocations();

  const columns = [
    {
      title: "Driver number",
      dataIndex: "driverNumber",
      key: "driverNumber",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
  ];

  // Helper function to build route options from location data
  const buildRouteOptions = (locationData) => {
    if (!Array.isArray(locationData)) {
      return [];
    }

    const seenPairs = new Set();
    const options = [];

    locationData.forEach((stateEntry = {}) => {
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
  };

  // Copart route options
  const copartRouteOptions = useMemo(
    () => buildRouteOptions(locations),
    [locations]
  );

  // IAA route options
  const iaaRouteOptions = useMemo(
    () => buildRouteOptions(iaaLocations),
    [iaaLocations]
  );

  // Get current location options based on selected auction
  const currentLocationOptions =
    selectedAuction === "copart"
      ? copartRouteOptions
      : selectedAuction === "iaa"
      ? iaaRouteOptions
      : [];

  // Decode VIN using NHTSA API
  const decodeVIN = async (vin) => {
    if (!vin || vin.length !== 17) return;

    setIsDecodingVin(true);
    try {
      const { data } = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`
      );

      const decoded = data?.Results?.[0] ?? {};
      const make = decoded?.Make?.trim() ?? "";
      const model = decoded?.Model?.trim() ?? "";
      const year = decoded?.ModelYear?.trim() ?? "";

      setVinData({ vin, make, model, year });

      // Update dispatch data with VIN info
      updateDispatchData(vin, make, model, year, selectedLocation);
    } catch (error) {
      console.error("Failed to decode VIN via NHTSA:", error);
    } finally {
      setIsDecodingVin(false);
    }
  };

  // Update dispatch data field
  const updateDispatchData = (vin, make, model, year, location) => {
    const parts = [];
    
    if (vin) {
      parts.push(vin);
    }
    if (make && model && year) {
      parts.push(`${make}, ${model}, ${year}`);
    }
    if (location) {
      parts.push(`${location} TO `);
    }
    
    const content = parts.join("\n");
    form.setFieldsValue({ content });
  };

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      // Convert 'to' field to array of strings
      const payload = {
        ...values,
        to: values.to
          ? values.to
              .split(",")
              .map((num) => num.trim())
              .filter((num) => num.length > 0)
              .map((num) => (num.startsWith("+") ? num : `+${num}`))
          : [],
      };

      const response = await axios.post(
        "http://localhost:3000/open-phone/send-message",
        payload
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      // Keep button disabled for 2 seconds
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const fetchDriversStatistics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/statistics/drivers"
        );
        const data = response.data;
        console.log(data);
        setDrivers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDriversStatistics();
  }, []);

  // Filter drivers based on selected location
  useEffect(() => {
    if (!selectedLocation || drivers.length === 0) {
      setFilteredDrivers([]);
      return;
    }

    const filtered = drivers
      .map((driver) => {
        // Find the route that matches the selected location
        const matchingRoute = driver.routes.find(
          (routeObj) => routeObj.route === selectedLocation
        );

        if (matchingRoute) {
          return {
            driverNumber: driver.driverNumber,
            count: matchingRoute.count,
          };
        }
        return null;
      })
      .filter((item) => item !== null);

    setFilteredDrivers(filtered);

    // Update dispatch data field with selected location
    if (selectedLocation) {
      updateDispatchData(
        vinData.vin,
        vinData.make,
        vinData.model,
        vinData.year,
        selectedLocation
      );
    }
  }, [selectedLocation, drivers, form, vinData]);

  return (
    <>
      <p>first select auction</p>
      <Row>
        <Button
          type={selectedAuction === "copart" ? "primary" : "default"}
          onClick={() => {
            setSelectedAuction("copart");
            setSelectedLocation("");
          }}
        >
          Copart
        </Button>
        <Button
          type={selectedAuction === "iaa" ? "primary" : "default"}
          onClick={() => {
            setSelectedAuction("iaa");
            setSelectedLocation("");
          }}
        >
          IAA
        </Button>
      </Row>
      <p>now select location</p>
      <Row>
        <Select
          style={{ width: 300 }}
          value={selectedLocation || undefined}
          onChange={(value) => setSelectedLocation(value)}
          options={currentLocationOptions}
          placeholder="Select a location"
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          disabled={currentLocationOptions.length === 0}
        />
      </Row>
      <Table
        columns={columns}
        dataSource={filteredDrivers}
        rowKey="driverNumber"
        pagination={false}
      />
      <Divider />
      <Form
        form={form}
        onFinish={onFinish}
        disabled={filteredDrivers.length === 0}
      >
        <Form.Item label="VIN Code">
          <Input
            placeholder="Enter 17-character VIN"
            maxLength={17}
            value={vinData.vin}
            onChange={(e) => {
              const vin = e.target.value.toUpperCase();
              setVinData({ ...vinData, vin });
              if (vin.length === 17) {
                decodeVIN(vin);
              }
            }}
            suffix={isDecodingVin ? "Decoding..." : ""}
          />
          {vinData.make && vinData.model && vinData.year && (
            <div style={{ marginTop: 8, color: "#52c41a" }}>
              ✓ {vinData.make} {vinData.model} {vinData.year}
            </div>
          )}
        </Form.Item>
        <Form.Item
          label="Driver number"
          name="to"
          rules={[
            { required: true, message: "Please enter driver number" },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                const numbers = value
                  .split(",")
                  .map((num) => num.trim())
                  .filter((num) => num.length > 0);

                for (const num of numbers) {
                  const cleaned = num.replace(/\D/g, "");
                  if (cleaned.length !== 10 && cleaned.length !== 11) {
                    return Promise.reject(
                      new Error(
                        `Invalid USA phone number: ${num}. Must be 10 or 11 digits.`
                      )
                    );
                  }
                  if (cleaned.length === 11 && cleaned[0] !== "1") {
                    return Promise.reject(
                      new Error(
                        `Invalid USA phone number: ${num}. 11-digit numbers must start with 1.`
                      )
                    );
                  }
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="1234567890" />
        </Form.Item>
        <Form.Item
          label="Dispatch data"
          name="content"
          rules={[{ required: true, message: "Please enter dispatch data" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter dispatch information" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CrmOfferDispatch;
