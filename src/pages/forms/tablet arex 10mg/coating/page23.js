import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCoatingRecord } from "../../../../store/coatingSlice";
import { Button, IconButton, TextField } from '@mui/material';
import { usePermissions } from "../../../../hooks/usePermissions";
import DeleteIcon from "@mui/icons-material/Delete";

const BatchManufacturingFormPage23 = ({ isReport }) => {
  const dispatch = useDispatch();
  const { requestForAnalysis } = useSelector((state) => state.coating);
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
      setCoatingRecord({
        requestForAnalysis: {
          ...requestForAnalysis,
          batchInfo: { ...requestForAnalysis.batchInfo, [field]: value },
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
      setCoatingRecord({
        requestForAnalysis: {
          ...requestForAnalysis,
          qa: { ...requestForAnalysis.qa, [field]: value },
        },
      })
    );
  };

  const handleObservationChange = (index, field, value) => {
    if (!permission.canEditQA) return;

    const updatedObservations = [...requestForAnalysis.qaObservations];
    updatedObservations[index] = {
      ...updatedObservations[index],
      [field]: value,
    };
    dispatch(
      setCoatingRecord({
        requestForAnalysis: {
          ...requestForAnalysis,
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
      statusCoating: "",
      remarks: "",
    };
    dispatch(
      setCoatingRecord({
        requestForAnalysis: {
          ...requestForAnalysis,
          qaObservations: [...requestForAnalysis.qaObservations, newRow],
        },
      })
    );
  };

  // Delete observation row
  const deleteObservationRow = (index) => {
    // Only QA can delete rows
    if (!permission.canEditQA) return;

    const updatedObservations = requestForAnalysis.qaObservations.filter(
      (_, idx) => idx !== index
    );
    dispatch(
      setCoatingRecord({
        requestForAnalysis: {
          ...requestForAnalysis,
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
                value={requestForAnalysis.batchInfo.product}
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
                value={requestForAnalysis.batchInfo.qcNumber}
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
                value={requestForAnalysis.batchInfo.section}
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
                value={requestForAnalysis.batchInfo.stage}
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
                value={requestForAnalysis.batchInfo.batchNumber}
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
                value={requestForAnalysis.batchInfo.mfgDate}
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
                value={requestForAnalysis.batchInfo.bSize}
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
                value={requestForAnalysis.batchInfo.packSize}
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
                value={requestForAnalysis.batchInfo.expDate}
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
                value={requestForAnalysis.batchInfo.sampleQuantity}
                onChange={(e) =>
                  handleBatchInfoChange("sampleQuantity", e.target.value)
                }
                readOnly={!permission.canEditProduction}
          disabled={!permission.canEditProduction}
              />
            </td>
          </tr>

          {/* Row 5 */}
          <tr className="border p-2">
            <td className="border p-2">Weight per unit</td>
            <td>
              <input
                type="text"
                value={requestForAnalysis.batchInfo.weightPerUnit}
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
                value={requestForAnalysis.batchInfo.date}
                onChange={(e) => handleBatchInfoChange("date", e.target.value)}
              />
            </td>
            <td className="border p-2">Time</td>
            <td colSpan="2">
              <input
                type="time"
                value={requestForAnalysis.batchInfo.time}
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
                  value={requestForAnalysis.qa.sampleType || ""}
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
                  value={requestForAnalysis.qa.releaseRequiredFor || ""}
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
                  value={requestForAnalysis.qa.signature || ""}
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
              <td className="border p-2">
                <strong>Sample collected on:</strong>
              </td>
              <td colSpan="2" className="border p-2">
                At:
                <input
                  type="date"
                  value={requestForAnalysis.qa.dateCollected || ""}
                  onChange={(e) =>
                    handleQAChange("dateCollected", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                  readOnly={!permission.canEditQA}
                  disabled={!permission.canEditQA}
        
                />
              </td>
              <td colSpan="2">
                By:
                <input
                  type="text"
                  value={requestForAnalysis.qa.collectedBy || ""}
                  onChange={(e) =>
                    handleQAChange("collectedBy", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                  readOnly={!permission.canEditQA}
                  disabled={!permission.canEditQA}
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
                  value={requestForAnalysis.qa.quantityOfSample || ""}
                  onChange={(e) =>
                    handleQAChange("quantityOfSample", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                  readOnly={!permission.canEditQA}
                  disabled={!permission.canEditQA}
                />
              </td>
              <td className="border p-2">
                <strong> Container Number(s):</strong>
              </td>
              <td colSpan="2" className="border p-2">
                <input
                  type="text"
                  value={requestForAnalysis.qa.containerNumbers || ""}
                  onChange={(e) =>
                    handleQAChange("containerNumbers", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                  readOnly={!permission.canEditQA}
                  disabled={!permission.canEditQA}
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
            {requestForAnalysis.qaObservations.map((observation, index) => (
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
                    className="w-full p-1"
                    InputProps={{
                      readOnly: !permission.canEditQA,
                      disabled: !permission.canEditQA
                    }}
                  />
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <input
                    style={{ width: "100px" }}
                    type="radio"
                    name={`statusCoating-${index}`}
                    value="OK"
                    checked={observation.statusCoating === "OK"}
                    onChange={() =>
                      handleObservationChange(index, "statusCoating", "OK")
                    }
                    disabled={!permission.canEditQA}
                  />
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <input
                    style={{ width: "100px" }}
                    type="radio"
                    name={`statusCoating-${index}`}
                    value="Not OK"
                    checked={observation.statusCoating === "Not OK"}
                    onChange={() =>
                      handleObservationChange(index, "statusCoating", "Not OK")
                    }
                    disabled={!permission.canEditQA}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <TextField
                  multiline
                    value={observation.remarks}
                    onChange={(e) =>
                      handleObservationChange(index, "remarks", e.target.value)
                    }
                    className="w-full p-1"
                    InputProps={{
                      readOnly: !permission.canEditQA,
                      disabled: !permission.canEditQA
                    }}
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
            ))}
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
              value={requestForAnalysis.qaOfficer || ""}
              onChange={(e) =>
                dispatch(
                  setCoatingRecord({
                    requestForAnalysis: {
                      ...requestForAnalysis,
                      qaOfficer: e.target.value,
                    },
                  })
                )
              }
              className="ml-2 border border-gray-300 p-1"
              readOnly={!permission.canEditQA}
              disabled={!permission.canEditQA}
            />
          </p>
        </div>
        <div>
          <p>
            <strong>QA Manager:</strong>
            <input
              value={requestForAnalysis.qaManager || ""}
              onChange={(e) =>
                dispatch(
                  setCoatingRecord({
                    requestForAnalysis: {
                      ...requestForAnalysis,
                      qaManager: e.target.value,
                    },
                  })
                )
              }
              className="ml-2 border border-gray-300 p-1"
              readOnly={!permission.canEditQA}
              disabled={!permission.canEditQA}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default BatchManufacturingFormPage23;
