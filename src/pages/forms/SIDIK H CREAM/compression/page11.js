import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setscCompressionRecord } from "../../../../store/sidikcream/compressionSlice";
import { Input, Table, TextField } from "@mui/material";

const BatchManufacturingFormPage11 = () => {
  const compressionRecord = useSelector(
    (state) => state.sccompression.compressionRecord
  );
  const dispatch = useDispatch();

  const handleInputChange = (field, value) => {
    dispatch(
      setscCompressionRecord({
        compressionRecord: {
          ...compressionRecord,
          [field]: value,
        },
      })
    );
  };

  const handleVerificationChange = (index, field, value) => {
    const newVerification = [...compressionRecord.verification];
    newVerification[index] = {
      ...newVerification[index],
      [field]: value,
    };
    dispatch(
      setscCompressionRecord({
        compressionRecord: {
          ...compressionRecord,
          verification: newVerification,
        },
      })
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">FILLING PROCESS:</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-center">Step</th>
            <th className="border border-gray-300 p-2 text-center">Target</th>
            <th className="border border-gray-300 p-2 text-center">Actual</th>
            <th className="border border-gray-300 p-2 text-center">
              Performed by Operator (sign & date)
            </th>
            <th className="border border-gray-300 p-2 text-center">
              Checked By P.O (sign & date)
            </th>
            <th className="border border-gray-300 p-2 text-center">
              Checked By Q.A.I (sign & date)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">1</td>
            <td
              className="border border-gray-300 p-2"
              style={{ width: "500px" }}
            >
              <TextField
                style={{ width: "500px" }}
                type="text"
                value={
                  compressionRecord.verification[0]?.target ||
                  " Shift the cream in the filling Tank and maintain its temperature between 35-40 0C. Set Batch number and Expiry Stamp."
                }
                onChange={(e) =>
                  handleVerificationChange(0, "target", e.target.value)
                }
                fullWidth
                multiline
                className="w-full p-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <div className="flex flex-col space-y-2">
                <TextField
                  type="text"
                  placeholder="Batch Number:"
                  value={compressionRecord.batchNumber}
                  onChange={(e) => handleInputChange("batchNumber", e.target.value)}
                  fullWidth
                  multiline
                  className="p-1 mt-1"
                />
                <TextField
                  type="date"
                  placeholder="Expiry Date"
                  value={compressionRecord.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  fullWidth
                  className="p-1 mt-1"
                />
              </div>
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                className="w-full p-1"
                placeholder="Sign & Date"
                value={compressionRecord.verification[0]?.performedByOperator}
                onChange={(e) =>
                  handleVerificationChange(
                    0,
                    "performedByOperator",
                    e.target.value
                  )
                }
                fullWidth
                multiline
              />
              <TextField
                type="date"
                className="w-full p-1"
                placeholder="Sign & Date"
                value={compressionRecord.verification[0]?.pboDate}
                onChange={(e) =>
                  handleVerificationChange(0, "pboDate", e.target.value)
                }
                fullWidth
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                className="w-full p-1"
                placeholder="P.O Sign & Date"
                value={compressionRecord.verification[0]?.checkedByPO}
                onChange={(e) =>
                  handleVerificationChange(0, "checkedByPO", e.target.value)
                }
                fullWidth
                multiline
              />
              <TextField
                type="date"
                className="w-full p-1"
                placeholder="P.O Sign & Date"
                value={compressionRecord.verification[0]?.checkedByPODate}
                onChange={(e) =>
                  handleVerificationChange(0, "checkedByPODate", e.target.value)
                }
                fullWidth
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                className="w-full p-1"
                placeholder="Q.A.I Sign & Date"
                value={compressionRecord.verification[0]?.checkedByQAI}
                onChange={(e) =>
                  handleVerificationChange(0, "checkedByQAI", e.target.value)
                }
                fullWidth
                multiline
              />
              <TextField
                type="date"
                className="w-full p-1"
                placeholder="Q.A.I Sign & Date"
                value={compressionRecord.verification[0]?.checkedByQAIDate}
                onChange={(e) =>
                  handleVerificationChange(
                    0,
                    "checkedByQAIDate",
                    e.target.value
                  )
                }
                fullWidth
              />
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">2.</td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                value={
                  compressionRecord.verification[1]?.target ||
                  "Start Filling and record weight of tubes randomly with 30 mints Interval in In process Sheet (Weight)"
                }
                onChange={(e) =>
                  handleVerificationChange(1, "target", e.target.value)
                }
                fullWidth
                multiline
                className="w-full p-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="date"
                placeholder="Filling Started at:"
                value={compressionRecord.fillingStartedAt}
                onChange={(e) =>
                  handleInputChange("fillingStartedAt", e.target.value)
                }
                fullWidth
                className="p-1 mt-1"
              />
              <TextField
                type="date"
                placeholder="Filling Completed on:"
                value={compressionRecord.fillingCompletedOn}
                onChange={(e) =>
                  handleInputChange("fillingCompletedOn", e.target.value)
                }
                fullWidth
                className="p-1 mt-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                placeholder="Sign & Date"
                value={compressionRecord.verification[1]?.performedByOperator}
                onChange={(e) =>
                  handleVerificationChange(
                    1,
                    "performedByOperator",
                    e.target.value
                  )
                }
                fullWidth
                multiline
                className="w-full p-1"
              />
              <TextField
                type="date"
                placeholder="Sign & Date"
                value={compressionRecord.verification[1]?.pboDate}
                onChange={(e) =>
                  handleVerificationChange(1, "pboDate", e.target.value)
                }
                fullWidth
                className="w-full p-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                placeholder="P.O Sign & Date"
                value={compressionRecord.verification[1]?.checkedByPO}
                onChange={(e) =>
                  handleVerificationChange(1, "checkedByPO", e.target.value)
                }
                fullWidth
                multiline
                className="p-1 mt-1"
              />
              <TextField
                type="date"
                placeholder="P.O Sign & Date"
                value={compressionRecord.verification[1]?.checkedByPODate}
                onChange={(e) =>
                  handleVerificationChange(1, "checkedByPODate", e.target.value)
                }
                fullWidth
                className="p-1 mt-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                placeholder="Q.A.I Sign & Date"
                value={compressionRecord.verification[1]?.checkedByQAI}
                onChange={(e) =>
                  handleVerificationChange(1, "checkedByQAI", e.target.value)
                }
                fullWidth
                multiline
                className="p-1 mt-1"
              />
              <TextField
                type="date"
                placeholder="Q.A.I Sign & Date"
                value={compressionRecord.verification[1]?.checkedByQAIDate}
                onChange={(e) =>
                  handleVerificationChange(
                    1,
                    "checkedByQAIDate",
                    e.target.value
                  )
                }
                fullWidth
                className="p-1 mt-1"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">3.</td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                value={
                  compressionRecord.verification[2]?.target ||
                 "After Completion of Filling Process , generate Request for Analysis to Q/A for release for packing."
                }
                onChange={(e) =>
                  handleVerificationChange(2, "target", e.target.value)
                }
                fullWidth
                multiline
                className="w-full p-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <div className="flex flex-col space-y-2">
                <TextField
                  type="text"
                  placeholder="Sample taken Qty:"
                  value={compressionRecord.sampleTakenQty}
                  onChange={(e) =>
                    handleInputChange("sampleTakenQty", e.target.value)
                  }
                  fullWidth
                  multiline
                  className="p-1 mt-1"
                />
              </div>
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                placeholder="Sign & Date"
                value={compressionRecord.verification[2]?.performedByOperator}
                onChange={(e) =>
                  handleVerificationChange(
                    2,
                    "performedByOperator",
                    e.target.value
                  )
                }
                fullWidth
                multiline
                className="p-1 mt-1"
              />
              <TextField
                type="date"
                placeholder="Sign & Date"
                value={compressionRecord.verification[2]?.pboDate}
                onChange={(e) =>
                  handleVerificationChange(2, "pboDate", e.target.value)
                }
                fullWidth
                className="p-1 mt-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                placeholder="P.O Sign & Date"
                value={compressionRecord.verification[2]?.checkedByPO}
                onChange={(e) =>
                  handleVerificationChange(2, "checkedByPO", e.target.value)
                }
                fullWidth
                multiline
                className="p-1 mt-1"
              />
              <TextField
                type="date"
                placeholder="P.O Sign & Date"
                value={compressionRecord.verification[2]?.checkedByPODate}
                onChange={(e) =>
                  handleVerificationChange(2, "checkedByPODate", e.target.value)
                }
                fullWidth
                className="p-1 mt-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                placeholder="Q.A.I Sign & Date"
                value={compressionRecord.verification[2]?.checkedByQAI}
                onChange={(e) =>
                  handleVerificationChange(2, "checkedByQAI", e.target.value)
                }
                fullWidth
                multiline
                className="p-1 mt-1"
              />
              <TextField
                type="date"
                placeholder="Q.A.I Sign & Date"
                value={compressionRecord.verification[2]?.checkedByQAIDate}
                onChange={(e) =>
                  handleVerificationChange(
                    2,
                    "checkedByQAIDate",
                    e.target.value
                  )
                }
                fullWidth
                className="p-1 mt-1"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BatchManufacturingFormPage11;
