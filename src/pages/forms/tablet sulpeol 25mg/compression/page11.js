import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setsCompressionRecord } from "../../../../store/sulpeol/compressionSlice";
import { Input, Table, TextField } from "@mui/material";

const BatchManufacturingFormPage11 = () => {
  const compressionRecord = useSelector(
    (state) => state.scompression.compressionRecord
  );
  const dispatch = useDispatch();

  const handleInputChange = (field, value) => {
    dispatch(
      setsCompressionRecord({
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
      setsCompressionRecord({
        compressionRecord: {
          ...compressionRecord,
          verification: newVerification,
        },
      })
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Compression Record</h2>
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
                  " Room Temperature & Humidity:<br /> Check temperature and humidity of the area before starting scompression.<br /> Limits: Temp: NMT 30°C, RH: NMT 50%"
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
                  type="number"
                  placeholder="Temp (°C)"
                  value={compressionRecord.temp}
                  onChange={(e) => handleInputChange("temp", e.target.value)}
                  fullWidth
                  multiline
                  className="p-1 mt-1"
                />
                <TextField
                  type="number"
                  placeholder="RH (%)"
                  value={compressionRecord.rH}
                  onChange={(e) => handleInputChange("rH", e.target.value)}
                  fullWidth
                  multiline
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
                  "Check the weight of granules."
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
                type="number"
                placeholder="Weight of granules (kg)"
                value={compressionRecord.weightOfGranules}
                onChange={(e) =>
                  handleInputChange("weightOfGranules", e.target.value)
                }
                fullWidth
                multiline
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
                  "Check Embossing of punches:<br /> Upper Punch - DID Embossed<br /> Lower Punch - Plain"
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
                  placeholder="Upper Punch"
                  value={compressionRecord.upperPunch}
                  onChange={(e) =>
                    handleInputChange("upperPunch", e.target.value)
                  }
                  fullWidth
                  multiline
                  className="p-1 mt-1"
                />
                <TextField
                  type="text"
                  placeholder="Lower Punch"
                  value={compressionRecord.lowerPunch}
                  onChange={(e) =>
                    handleInputChange("lowerPunch", e.target.value)
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
          <tr>
            <td className="border border-gray-300 p-2">4.</td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                value={
                  compressionRecord.verification[3]?.target ||
                  " Compress the granules into tablets on tablet scompression machine. Set the machine and check tablets for following parameters: <br/> Compression Started at: <br/> Completed on:"
                }
                onChange={(e) =>
                  handleVerificationChange(3, "target", e.target.value)
                }
                fullWidth
                multiline
                className="w-full p-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <div className="flex flex-col space-y-2">
                Compression Started at:
                <TextField
                  type="time"
                  value={compressionRecord.compressionStartedAt}
                  onChange={(e) =>
                    handleInputChange("compressionStartedAt", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                  className="p-1 mt-1"
                />
                <br />
                Compression Completed On:
                <TextField
                  type="time"
                  value={compressionRecord.compressionCompletedOn}
                  onChange={(e) =>
                    handleInputChange("compressionCompletedOn", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                  className="p-1 mt-1"
                />
              </div>
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                placeholder="Sign & Date"
                value={compressionRecord.verification[3]?.performedByOperator}
                onChange={(e) =>
                  handleVerificationChange(
                    3,
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
                value={compressionRecord.verification[3]?.pboDate}
                onChange={(e) =>
                  handleVerificationChange(3, "pboDate", e.target.value)
                }
                fullWidth
                className="p-1 mt-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                placeholder="P.O Sign & Date"
                value={compressionRecord.verification[3]?.checkedByPO}
                onChange={(e) =>
                  handleVerificationChange(3, "checkedByPO", e.target.value)
                }
                fullWidth
                multiline
                className="p-1 mt-1"
              />
              <TextField
                type="date"
                placeholder="P.O Sign & Date"
                value={compressionRecord.verification[3]?.checkedByPODate}
                onChange={(e) =>
                  handleVerificationChange(3, "checkedByPODate", e.target.value)
                }
                fullWidth
                className="p-1 mt-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                placeholder="Q.A.I Sign & Date"
                value={compressionRecord.verification[3]?.checkedByQAI}
                onChange={(e) =>
                  handleVerificationChange(3, "checkedByQAI", e.target.value)
                }
                fullWidth
                multiline
                className="p-1 mt-1"
              />
              <TextField
                type="date"
                placeholder="Q.A.I Sign & Date"
                value={compressionRecord.verification[3]?.checkedByQAIDate}
                onChange={(e) =>
                  handleVerificationChange(
                    3,
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
            <td className="border border-gray-300 p-2">5.</td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                value={
                  compressionRecord.verification[4]?.target ||
                  " Send test request to QA for physical analysis. (IPQA)"
                }
                onChange={(e) =>
                  handleVerificationChange(4, "target", e.target.value)
                }
                fullWidth
                multiline
                className="w-full p-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="number"
                placeholder="Sample taken (Tablets)"
                value={compressionRecord.ipqa}
                onChange={(e) =>
                  handleInputChange("ipqa", e.target.value)
                }
                fullWidth
                multiline
                className="p-1 mt-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                placeholder="Sign & Date"
                value={compressionRecord.verification[4]?.performedByOperator}
                onChange={(e) =>
                  handleVerificationChange(
                    4,
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
                value={compressionRecord.verification[4]?.pboDate}
                onChange={(e) =>
                  handleVerificationChange(4, "pboDate", e.target.value)
                }
                fullWidth
                className="p-1 mt-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                placeholder="P.O Sign & Date"
                value={compressionRecord.verification[4]?.checkedByPO}
                onChange={(e) =>
                  handleVerificationChange(4, "checkedByPO", e.target.value)
                }
                fullWidth
                multiline
                className="p-1 mt-1"
              />
              <TextField
                type="date"
                placeholder="P.O Sign & Date"
                value={compressionRecord.verification[4]?.checkedByPODate}
                onChange={(e) =>
                  handleVerificationChange(4, "checkedByPODate", e.target.value)
                }
                fullWidth
                className="p-1 mt-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                placeholder="Q.A.I Sign & Date"
                value={compressionRecord.verification[4]?.checkedByQAI}
                onChange={(e) =>
                  handleVerificationChange(4, "checkedByQAI", e.target.value)
                }
                fullWidth
                multiline
                className="p-1 mt-1"
              />
              <TextField
                type="date"
                placeholder="Q.A.I Sign & Date"
                value={compressionRecord.verification[4]?.checkedByQAIDate}
                onChange={(e) =>
                  handleVerificationChange(
                    4,
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
            <td className="border border-gray-300 p-2">6.</td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                value={
                  compressionRecord.verification[5]?.target ||
                  " Send test requests to QA for physical & chemical analysis. Raise the intimation to QA for sampling and getting the sample tested by QC physically and chemically.<br /> Sample taken Qty:"
                }
                onChange={(e) =>
                  handleVerificationChange(5, "target", e.target.value)
                }
                fullWidth
                multiline
                className="w-full p-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="number"
                placeholder="Sample taken (Tablets)"
                value={compressionRecord.ipcqa}
                onChange={(e) =>
                  handleInputChange("ipcqa", e.target.value)
                }
                fullWidth
                multiline
                className="p-1 mt-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                placeholder="Sign & Date"
                value={compressionRecord.verification[5]?.performedByOperator}
                onChange={(e) =>
                  handleVerificationChange(
                    5,
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
                value={compressionRecord.verification[5]?.pboDate}
                onChange={(e) =>
                  handleVerificationChange(5, "pboDate", e.target.value)
                }
                fullWidth
                className="p-1 mt-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                placeholder="P.O Sign & Date"
                value={compressionRecord.verification[5]?.checkedByPO}
                onChange={(e) =>
                  handleVerificationChange(5, "checkedByPO", e.target.value)
                }
                fullWidth
                multiline
                className="p-1 mt-1"
              />
              <TextField
                type="date"
                placeholder="P.O Sign & Date"
                value={compressionRecord.verification[5]?.checkedByPODate}
                onChange={(e) =>
                  handleVerificationChange(5, "checkedByPODate", e.target.value)
                }
                fullWidth
                className="p-1 mt-1"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                type="text"
                placeholder="Q.A.I Sign & Date"
                value={compressionRecord.verification[5]?.checkedByQAI}
                onChange={(e) =>
                  handleVerificationChange(5, "checkedByQAI", e.target.value)
                }
                fullWidth
                multiline
                className="p-1 mt-1"
              />
              <TextField
                type="date"
                placeholder="Q.A.I Sign & Date"
                value={compressionRecord.verification[5]?.checkedByQAIDate}
                onChange={(e) =>
                  handleVerificationChange(
                    5,
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
