import React from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setDispensing } from "../../../../store/dispensingSlice";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";

const BatchManufacturingFormPage1 = () => {
  const dispatch = useDispatch();
  const dispensing = useSelector((state) => state.dispensing);

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
    } else if (name === "remarks") {
      dispatch(setDispensing({ ...dispensing, remarks: value }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setDispensing({
        ...dispensing,
        checkboxes: { ...dispensing.checkboxes, [name]: value },
      })
    );
  };

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

        <div className="flex justify-center items-center mb-4">
          <div className="mt-6">
            <h5 className="text-lg font-semibold mb-4">
              Ensure that there should be no remnants of the Previous Batch
              Dispensed related to the following:
            </h5>
            <div className="grid grid-cols-2 gap-4 text-center">
              {[
                "cartons",
                "documents",
                "rawMaterial",
                "remnantOfPreviousProduct",
              ].map((item) => (
                <div key={item} className="flex flex-col items-center">
                  <h6 className="mb-2">
                    {item.charAt(0).toUpperCase() +
                      item.slice(1).replace(/([A-Z])/g, " $1")}
                  </h6>
                  <RadioGroup
                    row
                    name={item}
                    value={dispensing.checkboxes[item]}
                    onChange={handleCheckboxChange}
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

        <div className="flex justify-center items-center mb-4">
          <div className="mt-6">
            <h5 className="text-lg font-semibold mb-4">
              Check the cleanliness of the following:
            </h5>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                "area",
                "weighingBalance",
                "dispensingBoard",
                "scoops",
                "pallets",
              ].map((item) => (
                <div key={item} className="flex flex-col items-center">
                  <h6 className="mb-2">
                    {item.charAt(0).toUpperCase() +
                      item.slice(1).replace(/([A-Z])/g, " $1")}
                  </h6>
                  <RadioGroup
                    row
                    name={item}
                    value={dispensing.checkboxes[item]}
                    onChange={handleCheckboxChange}
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
                  value={dispensing.remarks || ""}
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
