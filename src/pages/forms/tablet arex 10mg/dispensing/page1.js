import React, { useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setDispensing } from "../../../../store/dispensingSlice";
import { FormControlLabel, Radio, RadioGroup, TextField, Button } from "@mui/material";
import { Plus, Trash2 } from "lucide-react";

const BatchManufacturingFormPage1 = () => {
  const dispatch = useDispatch();
  const dispensing = useSelector((state) => state.dispensing);
  const [newLabels, setNewLabels] = useState({
    remnants: "",
    cleanliness: ""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // if (name in dispensing.batchInfo) {
    //     dispatch(setDispensing({ ...dispensing, batchInfo: { ...dispensing.batchInfo, [name]: value } }));
    if (name in dispensing.batchRecord) {
      dispatch(
        setDispensing({
          ...dispensing,
          batchRecord: { ...dispensing.batchRecord, [name]: value },
        })
      );
    } else if (name in dispensing.authorization) {
      dispatch(
        setDispensing({
          ...dispensing,
          authorization: { ...dispensing.authorization, [name]: value },
        })
      );
    } else if (name in dispensing.tempAndHumidity) {
      dispatch(
        setDispensing({
          ...dispensing,
          tempAndHumidity: { ...dispensing.tempAndHumidity, [name]: value },
        })
      );
    } 
  };

 
  const handleCheckboxChange = (section, label, value) => {
    dispatch(
      setDispensing({
        ...dispensing,
        checkboxes: {
          ...dispensing.checkboxes,
          [section]: {
            ...dispensing.checkboxes[section],
            values: {
              ...dispensing.checkboxes[section]?.values,
              [label]: value
            }
          }
        }
      })
    );
  };

  const handleAddLabel = (section) => {
    const newLabel = newLabels[section].trim();
    if (newLabel) {
      dispatch(
        setDispensing({
          ...dispensing,
          checkboxes: {
            ...dispensing.checkboxes,
            [section]: {
              ...dispensing.checkboxes[section],
              labels: [...(dispensing.checkboxes[section]?.labels || []), newLabel]
            }
          }
        })
      );
      setNewLabels(prev => ({
        ...prev,
        [section]: ""
      }));
    }
  };

  const handleDeleteLabel = (section, labelToDelete) => {
    const updatedLabels = dispensing.checkboxes[section]?.labels.filter(
      label => label !== labelToDelete
    );
    const updatedValues = { ...dispensing.checkboxes[section]?.values };
    delete updatedValues[labelToDelete];

    dispatch(
      setDispensing({
        ...dispensing,
        checkboxes: {
          ...dispensing.checkboxes,
          [section]: {
            ...dispensing.checkboxes[section],
            labels: updatedLabels,
            values: updatedValues
          }
        }
      })
    );
  };

  const renderCheckboxSection = (title, section) => (
    <div className="flex justify-center items-center mb-4">
      <div className="mt-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-lg font-semibold">{title}</h5>
          <div className="flex gap-2">
            <TextField
              size="small"
              value={newLabels[section]}
              onChange={(e) => setNewLabels(prev => ({
                ...prev,
                [section]: e.target.value
              }))}
              // placeholder="Enter new label"
              className="w-48"
            />
            <Button
              variant="contained"
              onClick={() => handleAddLabel(section)}
              className="bg-blue-500 hover:bg-blue-600"
              startIcon={<Plus className="w-4 h-4" />}
            >
              Add
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(dispensing.checkboxes[section]?.labels || []).map((label) => (
            <div key={label} className="flex flex-col items-center rounded-lg p-3 relative">
              <Button
                onClick={() => handleDeleteLabel(section, label)}
                className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                size="small"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <h6 className="mb-2 text-center">{label}</h6>
              <RadioGroup
                row
                value={dispensing.checkboxes[section]?.values?.[label] || ""}
                onChange={(e) => handleCheckboxChange(section, label, e.target.value)}
                // className="justify-center"
                style={{ justifyContent: "center" }}
              >
                <FormControlLabel
                  value="satisfactory"
                  control={<Radio />}
                  label="✔️"
                />
                <FormControlLabel
                  value="unsatisfactory"
                  control={<Radio />}
                  label="❌"
                />
                <FormControlLabel
                  value="notApplicable"
                  control={<Radio />}
                  label="—"
                />
              </RadioGroup>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="max-w-4xl mx-auto p-4 ">
      <Card.Body>
        {/* <h2 className="text-lg font-bold mb-2 text-center">FOR QUALITY ASSURANCE DEPARTMENT USE ONLY</h2> */}

        <table className="w-full mb-4" style={{ textAlign: "center" }}>
          <tbody>
            <tr>
              <td>
                <strong>Date & Time:</strong>
              </td>
              <td>
                <input
                  type="datetime-local"
                  name="date"
                  value={dispensing.batchRecord.date || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>Line Clearance Required For:</strong>
              </td>
              <td>
                <input
                  type="text"
                  name="lineClearance"
                  value={dispensing.batchRecord.lineClearance || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1"
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Department:</strong>
              </td>
              <td>
                <input
                  type="text"
                  name="department"
                  value={dispensing.batchRecord.department || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>Section:</strong>
              </td>
              <td>
                <input
                  type="text"
                  name="section"
                  value={dispensing.batchRecord.section || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1"
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Current Product:</strong>
              </td>
              <td>
                <input
                  type="text"
                  name="currentProduct"
                  value={dispensing.batchRecord.currentProduct || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>Current Product Batch #:</strong>
              </td>
              <td>
                <input
                  type="text"
                  name="currentProductBatchNo"
                  value={dispensing.batchRecord.currentProductBatchNo || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1"
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Previous Product:</strong>
              </td>
              <td>
                <input
                  type="text"
                  name="previousProduct"
                  value={dispensing.batchRecord.previousProduct || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>Previous Product Batch #:</strong>
              </td>
              <td>
                <input
                  type="text"
                  name="previousProductBatchNo"
                  value={dispensing.batchRecord.previousProductBatchNo || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1"
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Signature:</strong>
              </td>
              <td>
                <input
                  type="text"
                  name="signature"
                  value={dispensing.batchRecord.signature || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1"
                />
              </td>
            </tr>
          </tbody>
        </table>

        {renderCheckboxSection(
          "Ensure that there should be no remnants of the Previous Batch Dispensed related to the following:", 
          "remnants"
        )}
        
        {renderCheckboxSection(
          "Check the cleanliness of the following:", 
          "cleanliness"
        )}

        <h4>• Check the Temperature & Humidity of the Area:-</h4>

        <table className="w-full mb-4" style={{ textAlign: "center" }}>
          <tbody>
            <tr>
              <td>
                <strong>Temperature:</strong>
              </td>
              <td>
                <input
                  type="text"
                  name="temperature"
                  value={dispensing.tempAndHumidity.temperature || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>Humidity:</strong>
              </td>
              <td>
                <input
                  type="text"
                  name="humidity"
                  value={dispensing.tempAndHumidity.humidity || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1"
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Remarks:</strong>
              </td>
              <td colSpan={4}>
                <TextField
                  fullWidth
                  multiline
                  name="remarks"
                  value={dispensing.tempAndHumidity.remarks || ""}
                  onChange={handleInputChange}
                />
              </td>
            </tr>

            <tr>
              <td>
                <strong>Authorized For Use (Sign.):</strong>
              </td>
              <td>
                <input
                  type="text"
                  name="authorizedForUse"
                  value={dispensing.authorization.authorizedForUse || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>Date & Time of Authorization:</strong>
              </td>
              <td>
                <input
                  type="datetime-local"
                  name="dateAndTime"
                  value={dispensing.authorization.dateAndTime || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <p className="text-sm text-gray-600 mt-4 text-center">
          <strong>Note:</strong> ✔️ = Satisfactory, ❌ = Unsatisfactory, — = Not
          Applicable
        </p>
      </Card.Body>
    </Card>
  );
};

export default BatchManufacturingFormPage1;
