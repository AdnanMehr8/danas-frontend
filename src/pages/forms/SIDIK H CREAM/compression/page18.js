import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setscCompressionRecord } from "../../../../store/sidikcream/compressionSlice";
import { TextField } from "@mui/material";

const BatchManufacturingFormPage18 = () => {
  const dispatch = useDispatch();
  const { requestForAnalysisEnd } = useSelector((state) => state.sccompression);

  const handleBatchInfoChange = (field, value) => {
    dispatch(
      setscCompressionRecord({
        requestForAnalysisEnd: {
          ...requestForAnalysisEnd,
          batchInfo: { ...requestForAnalysisEnd.batchInfo, [field]: value },
        },
      })
    );
  };

  const handleQAChange = (field, value) => {
    dispatch(
      setscCompressionRecord({
        requestForAnalysisEnd: {
          ...requestForAnalysisEnd,
          qa: { ...requestForAnalysisEnd.qa, [field]: value },
        },
      })
    );
  };

  const handleObservationChange = (index, field, value) => {
    const updatedObservations = [...requestForAnalysisEnd.qaObservations];
    updatedObservations[index] = {
      ...updatedObservations[index],
      [field]: value,
    };
    dispatch(
      setscCompressionRecord({
        requestForAnalysisEnd: {
          ...requestForAnalysisEnd,
          qaObservations: updatedObservations,
        },
      })
    );
  };

  return (
    <div className=" p-4 mb-4">
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
                value={requestForAnalysisEnd.batchInfo.product}
                onChange={(e) =>
                  handleBatchInfoChange("product", e.target.value)
                }
              />
            </td>
            <td className="border p-2">QC#</td>
            <td>
              <input
                type="text"
                value={requestForAnalysisEnd.batchInfo.qcNumber}
                onChange={(e) =>
                  handleBatchInfoChange("qcNumber", e.target.value)
                }
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
                value={requestForAnalysisEnd.batchInfo.section}
                onChange={(e) =>
                  handleBatchInfoChange("section", e.target.value)
                }
              />
            </td>
            <td className="border p-2">Stage</td>
            <td>
              <input
                type="text"
                value={requestForAnalysisEnd.batchInfo.stage}
                onChange={(e) => handleBatchInfoChange("stage", e.target.value)}
              />
            </td>
          </tr>

          {/* Row 3 */}
          <tr className="border p-2">
            <td>Batch #</td>
            <td>
              <input
                type="text"
                value={requestForAnalysisEnd.batchInfo.batchNumber}
                onChange={(e) =>
                  handleBatchInfoChange("batchNumber", e.target.value)
                }
              />
            </td>
            <td className="border p-2">Mfg. Date</td>
            <td colSpan="2">
              <input
                type="date"
                value={requestForAnalysisEnd.batchInfo.mfgDate}
                onChange={(e) =>
                  handleBatchInfoChange("mfgDate", e.target.value)
                }
              />
            </td>
            <td className="border p-2">Batch Size</td>
            <td colSpan="2">
              <input
                type="text"
                value={requestForAnalysisEnd.batchInfo.bSize}
                onChange={(e) => handleBatchInfoChange("bSize", e.target.value)}
              />
            </td>
          </tr>

          {/* Row 4 */}
          <tr className="border p-2">
            <td>Pack Size</td>
            <td>
              <input
                type="text"
                value={requestForAnalysisEnd.batchInfo.packSize}
                onChange={(e) =>
                  handleBatchInfoChange("packSize", e.target.value)
                }
              />
            </td>
            <td className="border p-2">Exp. Date</td>
            <td colSpan="2">
              <input
                type="date"
                value={requestForAnalysisEnd.batchInfo.expDate}
                onChange={(e) =>
                  handleBatchInfoChange("expDate", e.target.value)
                }
              />
            </td>
            <td className="border p-2">Sample quantity</td>
            <td colSpan="2">
              <input
                type="text"
                value={requestForAnalysisEnd.batchInfo.sampleQuantity}
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
                value={requestForAnalysisEnd.batchInfo.weightPerUnit}
                onChange={(e) =>
                  handleBatchInfoChange("weightPerUnit", e.target.value)
                }
              />
            </td>
            <td className="border p-2">Date</td>
            <td>
              <input
                type="date"
                value={requestForAnalysisEnd.batchInfo.date}
                onChange={(e) => handleBatchInfoChange("date", e.target.value)}
              />
            </td>
            <td className="border p-2">Time</td>
            <td colSpan="2">
              <input
                type="time"
                value={requestForAnalysisEnd.batchInfo.time}
                onChange={(e) => handleBatchInfoChange("time", e.target.value)}
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
                  value={requestForAnalysisEnd.qa.sampleType || ""}
                  onChange={(e) => handleQAChange("sampleType", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>Release Required For: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={requestForAnalysisEnd.qa.releaseRequiredFor || ""}
                  onChange={(e) =>
                    handleQAChange("releaseRequiredFor", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
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
                  value={requestForAnalysisEnd.qa.signature || ""}
                  onChange={(e) => handleQAChange("signature", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
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
                  value={requestForAnalysisEnd.qa.dateCollected || ""}
                  onChange={(e) =>
                    handleQAChange("dateCollected", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
              <td colSpan="2">
                By:
                <input
                  type="text"
                  value={requestForAnalysisEnd.qa.collectedBy || ""}
                  onChange={(e) =>
                    handleQAChange("collectedBy", e.target.value)
                  }
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
                  value={requestForAnalysisEnd.qa.quantityOfSample || ""}
                  onChange={(e) =>
                    handleQAChange("quantityOfSample", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
              <td className="border p-2">
                <strong> Container Number(s):</strong>
              </td>
              <td colSpan="2" className="border p-2">
                <input
                  type="text"
                  value={requestForAnalysisEnd.qa.containerNumbers || ""}
                  onChange={(e) =>
                    handleQAChange("containerNumbers", e.target.value)
                  }
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
            </tr>
          </thead>
          <tbody>
            {requestForAnalysisEnd.qaObservations.map((observation, index) => (
              <tr key={index}>
                <td
                  className="border border-gray-300 p-2 "
                  style={{ width: "500px" }}
                >
                  <TextField
                    style={{ width: "500px" }}
                    multiline
                    value={observation.parameter}
                    onChange={(e) =>
                      handleObservationChange(
                        index,
                        "parameter",
                        e.target.value
                      )
                    }
                    className="w-full  p-1"
                  />
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <input
                    style={{ width: "100px" }}
                    type="radio"
                    name={`statusCompressionEnd-${index}`}
                    value="OK"
                    checked={observation.statusCompressionEnd === "OK"}
                    onChange={() =>
                      handleObservationChange(
                        index,
                        "statusCompressionEnd",
                        "OK"
                      )
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <input
                    style={{ width: "100px" }}
                    type="radio"
                    name={`statusCompressionEnd-${index}`}
                    value="Not OK"
                    checked={observation.statusCompressionEnd === "Not OK"}
                    onChange={() =>
                      handleObservationChange(
                        index,
                        "statusCompressionEnd",
                        "Not OK"
                      )
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <TextField
                    style={{ width: "500px" }}
                    multiline
                    value={observation.remarks}
                    onChange={(e) =>
                      handleObservationChange(index, "remarks", e.target.value)
                    }
                    className="w-full p-1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
              value={requestForAnalysisEnd.qaOfficer || ""}
              onChange={(e) =>
                dispatch(
                  setscCompressionRecord({
                    requestForAnalysisEnd: {
                      ...requestForAnalysisEnd,
                      qaOfficer: e.target.value,
                    },
                  })
                )
              }
              className="ml-2 border border-gray-300 p-1"
            />
          </p>
        </div>
        <div>
          <p>
            <strong>QA Manager:</strong>
            <input
              value={requestForAnalysisEnd.qaManager || ""}
              onChange={(e) =>
                dispatch(
                  setscCompressionRecord({
                    requestForAnalysisEnd: {
                      ...requestForAnalysisEnd,
                      qaManager: e.target.value,
                    },
                  })
                )
              }
              className="ml-2 border border-gray-300 p-1"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default BatchManufacturingFormPage18;
