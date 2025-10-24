import React from "react";
import { Input, Select, DatePicker } from "antd";
import moment from "moment";

/**
 * Extracts additional vehicles from a record
 * Pure utility function that processes vehicle data
 * @param {Object} record - The vehicle record containing additional vehicles
 * @returns {Array} Array of unique additional vehicles
 */
export const extractAdditionalVehicles = (record) => {
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

/**
 * Renders vehicle information cell with primary and additional vehicles
 * @param {Object} record - The vehicle record
 * @param {Function} t - Translation function
 * @returns {JSX.Element} Rendered vehicle info cell
 */
export const renderVehicleInfoCell = (record, t) => {
  const primary =
    [record.make, record.model, record.year].filter(Boolean).join(" ").trim() ||
    "-";

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

/**
 * Creates an editable cell renderer with support for various input types
 * @param {string} dataIndex - The data field name
 * @param {Object} options - Configuration options for the cell
 * @param {Object} handlers - Object containing handler functions
 * @param {Object} handlers.editingCell - Current editing cell state
 * @param {string} handlers.editingValue - Current editing value
 * @param {Function} handlers.setEditingValue - Function to update editing value
 * @param {Function} handlers.handleSave - Function to save cell changes
 * @param {Function} handlers.cancelEditing - Function to cancel editing
 * @param {boolean} handlers.savingCell - Whether cell is currently saving
 * @param {Function} handlers.startEditing - Function to start editing
 * @param {Function} handlers.copyTextToClipboard - Function to copy text
 * @param {Object} handlers.editIntentCell - Current edit intent cell state
 * @param {Function} handlers.setEditIntentCell - Function to set edit intent
 * @returns {Function} Cell renderer function
 */
export const renderEditableCell = (dataIndex, options = {}, handlers = {}) => {
  return (value, record, recordIndex) => {
    const {
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
    } = handlers;

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

      if (options.inputType === "date") {
        // Use native HTML5 date input for reliable date picking
        // Parse existing value from DD/MM format to YYYY-MM-DD for the input
        const currentYear = new Date().getFullYear();
        let inputValue = "";

        if (
          editingValue &&
          typeof editingValue === "string" &&
          editingValue.trim()
        ) {
          // Try to parse DD/MM format
          const parts = editingValue.split("/");
          if (parts.length === 2) {
            const day = parts[0].padStart(2, "0");
            const month = parts[1].padStart(2, "0");
            inputValue = `${currentYear}-${month}-${day}`;
          }
        }

        // Set minimum date based on field type
        let minDate = "";
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];

        if (dataIndex === "pickupDate") {
          // Pickup date cannot be in the past
          minDate = todayStr;
        } else if (dataIndex === "deliveryDate") {
          // Delivery date cannot be before pickup date
          const pickupDate = record?.pickupDate;
          if (pickupDate && typeof pickupDate === "string") {
            const pickupParts = pickupDate.split("/");
            if (pickupParts.length === 2) {
              const day = pickupParts[0].padStart(2, "0");
              const month = pickupParts[1].padStart(2, "0");
              minDate = `${currentYear}-${month}-${day}`;
            }
          } else {
            // If no pickup date, at least prevent past dates
            minDate = todayStr;
          }
        }

        return (
          <input
            type="date"
            value={inputValue}
            min={minDate}
            onChange={(e) => {
              const selectedDate = e.target.value; // YYYY-MM-DD format
              if (selectedDate) {
                // Convert to DD/MM format
                const dateObj = new Date(selectedDate);
                const day = String(dateObj.getDate()).padStart(2, "0");
                const month = String(dateObj.getMonth() + 1).padStart(2, "0");
                const formattedDate = `${day}/${month}`;
                setEditingValue(formattedDate);

                // If updating pickup date and it's after delivery date, auto-update delivery date
                if (dataIndex === "pickupDate") {
                  const deliveryDate = record?.deliveryDate;
                  if (deliveryDate && typeof deliveryDate === "string") {
                    const deliveryParts = deliveryDate.split("/");
                    if (deliveryParts.length === 2) {
                      const currentYear = new Date().getFullYear();
                      const deliveryDay = deliveryParts[0].padStart(2, "0");
                      const deliveryMonth = deliveryParts[1].padStart(2, "0");
                      const deliveryDateStr = `${currentYear}-${deliveryMonth}-${deliveryDay}`;

                      // Compare dates: if pickup is after delivery, update delivery to match pickup
                      if (selectedDate > deliveryDateStr) {
                        // Save pickup date with updated delivery date
                        handleSave(record, dataIndex, formattedDate, {
                          deliveryDate: formattedDate,
                        });
                        return;
                      }
                    }
                  }
                }

                handleSave(record, dataIndex, formattedDate);
              }
            }}
            onBlur={() => {
              if (!savingCell) {
                cancelEditing();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                cancelEditing();
              }
            }}
            disabled={savingCell}
            autoFocus
            style={{
              width: "100%",
              padding: "4px 11px",
              border: "1px solid #d9d9d9",
              borderRadius: "6px",
              fontSize: "14px",
              lineHeight: "1.5715",
              transition: "all 0.3s",
            }}
          />
        );
      }

      if (
        dataIndex === "route" &&
        typeof options.renderEditing === "function"
      ) {
        return options.renderEditing({
          value,
          record,
          recordIndex,
          cancelEditing,
          handleSave,
          savingCell,
        });
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
      record.id ??
      record._id ??
      record.vin ??
      record.dispatchNumber ??
      recordIndex;
    const cellKey = `${String(cellIdentifierSource)}::${dataIndex}`;

    const handleActivation = () => {
      if (options.readOnly) {
        return;
      }

      // Columns that require double-click: vin, vehicleInfo, driverNumber
      const requiresDoubleClick = 
        dataIndex === "vin" || 
        dataIndex === "vehicleInfo" || 
        dataIndex === "driverNumber";

      if (requiresDoubleClick) {
        // Double-click behavior for specific columns
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
      } else {
        // Single-click behavior for all other columns
        startEditing(record, dataIndex, value);
        setEditIntentCell(null);
      }
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
