import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPacking } from "../../../../store/packingSlice";
import { Button, IconButton, TextField } from "@mui/material";
import { usePermissions } from "../../../../hooks/usePermissions";
import DeleteIcon from "@mui/icons-material/Delete";

const BatchPackingFormPage14 = ({ isReport }) => {
  const dispatch = useDispatch();
  const { requestForAnalysisPacking } = useSelector((state) => state.packing);
  const { hasPermission } = usePermissions();
  const permission = {
    canReadProduction: isReport ? true : hasPermission('production', 'read'),
    canReadQA: isReport ? true : hasPermission('qa', 'read'),
    canEditProduction: isReport ? true : hasPermission('production', 'update'),
    canEditQA: isReport ? true : hasPermission('qa', 'update')
  };

  // If user cannot read, show access denied
  if (!(permission.canReadProduction || permission.canReadQA)) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
      }}>
        Access denied!!
      </div>
    );
  }
  const handleBatchInfoChange = (field, value) => {
    if (!permission.canEditProduction) return;

    dispatch(
      setPacking({
        requestForAnalysisPacking: {
          ...requestForAnalysisPacking,
          batchInfo: { ...requestForAnalysisPacking.batchInfo, [field]: value },
        },
      })
    );
  };

  const handleQAChange = (field, value) => {
    // QA can edit QA-specific fields
    const qaFields = [
      
      'dateCollected', 'collectedBy', 'quantityOfSample', 
      'containerNumbers', 'qaOfficer', 'qaManager'
    ];

    if (qaFields.includes(field) && !permission.canEditQA) return;

    dispatch(
      setPacking({
        requestForAnalysisPacking: {
          ...requestForAnalysisPacking,
          qa: { ...requestForAnalysisPacking.qa, [field]: value },
        },
      })
    );
  };

  const handleObservationChange = (index, field, value) => {
    if (!permission.canEditQA) return;

    const updatedObservations = [...requestForAnalysisPacking.qaObservations];
    updatedObservations[index] = {
      ...updatedObservations[index],
      [field]: value,
    };
    dispatch(
      setPacking({
        requestForAnalysisPacking: {
          ...requestForAnalysisPacking,
          qaObservations: updatedObservations,
        },
      })
    );
  };

  // Add new observation row
  const addObservationRow = () => {
    // Only QA can add rows
    if (!permission.canEditQA) return;

    const newRow = {
      parameter: "",
      statusMixing: "",
      remarks: "",
    };
    dispatch(
      setPacking({
        requestForAnalysisPacking: {
          ...requestForAnalysisPacking,
          qaObservations: [...requestForAnalysisPacking.qaObservations, newRow],
        },
      })
    );
  };

  // Delete observation row
  const deleteObservationRow = (index) => {
    // Only QA can delete rows
    if (!permission.canEditQA) return;

    const updatedObservations = requestForAnalysisPacking.qaObservations.filter(
      (_, idx) => idx !== index
    );
    dispatch(
      setPacking({
        requestForAnalysisPacking: {
          ...requestForAnalysisPacking,
          qaObservations: updatedObservations,
        },
      })
    );
  };

  return (
    <div className="p-4 mb-4">
      <h3 className="text-center">Request for Analysis</h3>

      <table
        border="1"
        cellPadding="5"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <tbody>
          {/* Row 1 */}
          <tr className="border p-2">
            <td className="border p-2">Product</td>
            <td colSpan="4">
              <input
                type="text"
                style={{ width: "100%" }}
                value={requestForAnalysisPacking.batchInfo.product}
                onChange={(e) =>
                  handleBatchInfoChange("product", e.target.value)
                }
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
            </td>
            <td className="border p-2">QC#</td>
            <td>
              <input
                type="text"
                value={requestForAnalysisPacking.batchInfo.qcNumber}
                onChange={(e) =>
                  handleBatchInfoChange("qcNumber", e.target.value)
                }
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
            </td>
          </tr>

          {/* Row 2 */}
          <tr className="border p-2">
            <td className="border p-2">Section</td>
            <td colSpan="4">
              <input
                type="text"
                style={{ width: "100%" }}
                value={requestForAnalysisPacking.batchInfo.section}
                onChange={(e) =>
                  handleBatchInfoChange("section", e.target.value)
                }
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
            </td>
            <td className="border p-2">Stage</td>
            <td>
              <input
                type="text"
                value={requestForAnalysisPacking.batchInfo.stage}
                onChange={(e) => handleBatchInfoChange("stage", e.target.value)}
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
            </td>
          </tr>

          {/* Row 3 */}
          <tr className="border p-2">
            <td className="border p-2">Batch #</td>
            <td>
              <input
                type="text"
                value={requestForAnalysisPacking.batchInfo.batchNumber}
                onChange={(e) =>
                  handleBatchInfoChange("batchNumber", e.target.value)
                }
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
            </td>
            <td className="border p-2">Mfg. Date</td>
            <td colSpan="2">
              <input
                type="date"
                value={requestForAnalysisPacking.batchInfo.mfgDate}
                onChange={(e) =>
                  handleBatchInfoChange("mfgDate", e.target.value)
                }
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
            </td>
            <td className="border p-2">Batch Size</td>
            <td colSpan="2">
              <input
                type="text"
                value={requestForAnalysisPacking.batchInfo.bSize}
                onChange={(e) => handleBatchInfoChange("bSize", e.target.value)}
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
            </td>
          </tr>

          {/* Row 4 */}
          <tr className="border p-2">
            <td className="border p-2">Pack Size</td>
            <td>
              <input
                type="text"
                value={requestForAnalysisPacking.batchInfo.packSize}
                onChange={(e) =>
                  handleBatchInfoChange("packSize", e.target.value)
                }
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
            </td>
            <td className="border p-2">Exp. Date</td>
            <td colSpan="2">
              <input
                type="date"
                value={requestForAnalysisPacking.batchInfo.expDate}
                onChange={(e) =>
                  handleBatchInfoChange("expDate", e.target.value)
                }
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
            </td>
            <td className="border p-2">Sample quantity</td>
            <td colSpan="2">
              <input
                type="text"
                value={requestForAnalysisPacking.batchInfo.sampleQuantity}
                onChange={(e) =>
                  handleBatchInfoChange("sampleQuantity", e.target.value)
                }
              />
            </td>
          </tr>

          {/* Row 5 */}
          <tr className="border p-2">
            <td className="border p-2">Weight per unit</td>
            <td>
              <input
                type="text"
                value={requestForAnalysisPacking.batchInfo.weightPerUnit}
                onChange={(e) =>
                  handleBatchInfoChange("weightPerUnit", e.target.value)
                }
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
            </td>
            <td className="border p-2">Date</td>
            <td>
              <input
                type="date"
                value={requestForAnalysisPacking.batchInfo.date}
                onChange={(e) => handleBatchInfoChange("date", e.target.value)}
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
            </td>
            <td className="border p-2">Time</td>
            <td colSpan="2">
              <input
                type="time"
                value={requestForAnalysisPacking.batchInfo.time}
                onChange={(e) => handleBatchInfoChange("time", e.target.value)}
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mb-4">
        <table cellPadding="5" style={{ width: "100%", textAlign: "center" }}>
          <tbody>
            <tr>
              <td>
                <strong>Sample Type: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={requestForAnalysisPacking.qa.sampleType || ""}
                  onChange={(e) => handleQAChange("sampleType", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
                />
              </td>
              <td>
                <strong>Release Required For: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={requestForAnalysisPacking.qa.releaseRequiredFor || ""}
                  onChange={(e) =>
                    handleQAChange("releaseRequiredFor", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Signature: </strong>
              </td>
              <td colSpan="1">
                <input
                  type="text"
                  value={requestForAnalysisPacking.qa.signature || ""}
                  onChange={(e) => handleQAChange("signature", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-bold mb-2 text-center">
        FOR QUALITY ASSURANCE DEPARTMENT USE ONLY
      </h2>
      <div className="mb-4">
        <table
          border="1"
          cellPadding="5"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <tbody>
            <tr className="border p-2">
              <td>
                <strong>Sample collected on:</strong>
              </td>
              <td colSpan="2" className="border p-2">
                At:
                <input
                  type="date"
                  value={requestForAnalysisPacking.qa.dateCollected || ""}
                  onChange={(e) =>
                    handleQAChange("dateCollected", e.target.value)
                  }
                  readOnly={!permission.canEditQA}
                  disabled={!permission.canEditQA}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
              <td colSpan="2">
                By:
                <input
                  type="text"
                  value={requestForAnalysisPacking.qa.collectedBy || ""}
                  onChange={(e) =>
                    handleQAChange("collectedBy", e.target.value)
                  }
                  readOnly={!permission.canEditQA}
                  disabled={!permission.canEditQA}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                <strong>Quantity of sample:</strong>
              </td>
              <td colSpan="2" className="border p-2">
                <input
                  type="text"
                  value={requestForAnalysisPacking.qa.quantityOfSample || ""}
                  onChange={(e) =>
                    handleQAChange("quantityOfSample", e.target.value)
                  }
                  readOnly={!permission.canEditQA}
                  disabled={!permission.canEditQA}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
              <td className="border p-2">
                <strong> Container Number(s):</strong>
              </td>
              <td colSpan="2" className="border p-2">
                <input
                  type="text"
                  value={requestForAnalysisPacking.qa.containerNumbers || ""}
                  onChange={(e) =>
                    handleQAChange("containerNumbers", e.target.value)
                  }
                  readOnly={!permission.canEditQA}
                  disabled={!permission.canEditQA}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <p>
          <strong>Observations during Sampling:</strong>
        </p>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-center">
                Parameters
              </th>
              <th className="border border-gray-300 p-2">OK</th>
              <th className="border border-gray-300 p-2">Not OK</th>
              <th className="border border-gray-300 p-2 text-center">
                Remarks
              </th>
              <th className="border border-gray-300 p-2 actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requestForAnalysisPacking.qaObservations.map(
              (observation, index) => (
                <tr key={index}>
                  <td
                    className="border border-gray-300 p-2"
                    
                  >
                    <TextField
                      multiline
                      
                      value={observation.parameter}
                      onChange={(e) =>
                        handleObservationChange(
                          index,
                          "parameter",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditQA,
                        disabled: !permission.canEditQA
                      }}
                      className="w-full  p-1"
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <input
                      style={{ width: "100px" }}
                      type="radio"
                      name={`statusPacking-${index}`}
                      value="OK"
                      checked={observation.statusPacking === "OK"}
                      onChange={() =>
                        handleObservationChange(index, "statusPacking", "OK")
                      }
                      disabled={!permission.canEditQA}
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <input
                      style={{ width: "100px" }}
                      type="radio"
                      name={`statusPacking-${index}`}
                      value="Not OK"
                      checked={observation.statusPacking === "Not OK"}
                      onChange={() =>
                        handleObservationChange(index, "statusPacking", "Not OK")
                      }
                      disabled={!permission.canEditQA}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <TextField
                      
                      multiline
                      value={observation.remarks}
                      onChange={(e) =>
                        handleObservationChange(
                          index,
                          "remarks",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditQA,
                        disabled: !permission.canEditQA
                      }}
                      className="w-full p-1"
                    />
                  </td>
                  <td className="border border-gray-300 p-2 actions-column">
                    <IconButton
                      onClick={() => deleteObservationRow(index)}
                      disabled={!permission.canEditQA}
                    >
                      <DeleteIcon color={permission.canEditQA ? "error" : "disabled"} />
                    </IconButton>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <Button
          variant="contained" 
          color="primary" 
          onClick={addObservationRow} 
          className="mt-4"
          disabled={!permission.canEditQA}
        >
          Add Observation Row
        </Button>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
        className="mt-4"
      >
        <div>
          <p>
            <strong>QA Officer:</strong>
            <input
              value={requestForAnalysisPacking.qaOfficer || ""}
              onChange={(e) =>
                dispatch(
                  setPacking({
                    requestForAnalysisPacking: {
                      ...requestForAnalysisPacking,
                      qaOfficer: e.target.value,
                    },
                  })
                )
              }
              readOnly={!permission.canEditQA}
              disabled={!permission.canEditQA}
              className="ml-2 border border-gray-300 p-1"
            />
          </p>
        </div>
        <div>
          <p>
            <strong>QA Manager:</strong>
            <input
              value={requestForAnalysisPacking.qaManager || ""}
              onChange={(e) =>
                dispatch(
                  setPacking({
                    requestForAnalysisPacking: {
                      ...requestForAnalysisPacking,
                      qaManager: e.target.value,
                    },
                  })
                )
              }
              readOnly={!permission.canEditQA}
              disabled={!permission.canEditQA}
              className="ml-2 border border-gray-300 p-1"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default BatchPackingFormPage14;
