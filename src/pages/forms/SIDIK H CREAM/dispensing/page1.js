import React from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setscDispensing } from "../../../../store/sidikcream/dispensingSlice";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";

const BatchManufacturingFormPage1 = () => {
  const dispatch = useDispatch();
  const scdispensing = useSelector((state) => state.scdispensing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // if (name in scdispensing.batchInfo) {
    //     dispatch(setscDispensing({ ...scdispensing, batchInfo: { ...scdispensing.batchInfo, [name]: value } }));
    if (name in scdispensing.batchRecord) {
      dispatch(
        setscDispensing({
          ...scdispensing,
          batchRecord: { ...scdispensing.batchRecord, [name]: value },
        })
      );
    } else if (name in scdispensing.authorization) {
      dispatch(
        setscDispensing({
          ...scdispensing,
          authorization: { ...scdispensing.authorization, [name]: value },
        })
      );
    } else if (name in scdispensing.tempAndHumidity) {
      dispatch(
        setscDispensing({
          ...scdispensing,
          tempAndHumidity: { ...scdispensing.tempAndHumidity, [name]: value },
        })
      );
    } else if (name === "remarks") {
      dispatch(setscDispensing({ ...scdispensing, remarks: value }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setscDispensing({
        ...scdispensing,
        checkboxes: { ...scdispensing.checkboxes, [name]: value },
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
                  value={scdispensing.batchRecord.date || ""}
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
                  value={scdispensing.batchRecord.lineClearance || ""}
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
                  value={scdispensing.batchRecord.department || ""}
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
                  value={scdispensing.batchRecord.section || ""}
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
                  value={scdispensing.batchRecord.currentProduct || ""}
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
                  value={scdispensing.batchRecord.currentProductBatchNo || ""}
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
                  value={scdispensing.batchRecord.previousProduct || ""}
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
                  value={scdispensing.batchRecord.previousProductBatchNo || ""}
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
                  value={scdispensing.batchRecord.signature || ""}
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
                    value={scdispensing.checkboxes[item]}
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
                    value={scdispensing.checkboxes[item]}
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
                  value={scdispensing.tempAndHumidity.temperature || ""}
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
                  value={scdispensing.tempAndHumidity.humidity || ""}
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
                  value={scdispensing.remarks || ""}
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
                  value={scdispensing.authorization.authorizedForUse || ""}
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
                  value={scdispensing.authorization.dateAndTime || ""}
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
