import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMixingRecord } from "../../../../store/mixingSlice";
import { TextField } from "@mui/material";

const BatchManufacturingFormPage6 = () => {
  const dispatch = useDispatch();
  const mixing = useSelector((state) => state.mixing);

  const handleManufacturingRecordChange = (index, field, value) => {
    const newManufacturingRecord = mixing.manufacturingRecord.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    dispatch(
      setMixingRecord({
        ...mixing,
        manufacturingRecord: newManufacturingRecord,
      })
    );
  };

  return (
    <div className=" p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">Manufacturing Process:</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Step</th>
            <th className="border border-gray-300 p-2">Target</th>
            <th className="border border-gray-300 p-2">Actual</th>
            <th className="border border-gray-300 p-2">
              Performed by Operator (Sign & date)
            </th>
            {/* <th className="border border-gray-300 p-2" rowSpan={2}>Checked By</th> */}
            <th className="border border-gray-300 p-2">Checked By P.O</th>
            <th className="border border-gray-300 p-2">Checked By Q.A.I</th>
          </tr>
        </thead>
        <tbody>
          {/* Step 1 */}
          <tr>
            <td className="border border-gray-300 p-2">1.</td>
            <td
              className="border border-gray-300 p-2 "
              style={{ width: "400px" }}
            >
              <TextField
                multiline
                style={{ width: "400px" }}
                className="w-full p-1"
                value={
                  mixing.manufacturingRecord[0]?.target ||
                  "Pass Cetirizine HCl, Avicel 102 & Sodium Starch glycolate (Primojel) through Stainless Steel Mesh # 30 geometrically and load it into the mixer."
                }
                onChange={(e) =>
                  handleManufacturingRecordChange(0, "target", e.target.value)
                }
              />
            </td>
            <td className="border border-gray-300 p-2">
              Sieving Started at:
              <input
                type="time"
                className="border border-gray-300 p-1 mt-1"
                value={mixing.manufacturingRecord[0]?.sievingStartedAt || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    0,
                    "sievingStartedAt",
                    e.target.value
                  )
                }
              />
              <br />
              Completed on:
              <input
                type="time"
                className="border border-gray-300 p-1 mt-1"
                value={mixing.manufacturingRecord[0]?.sievingCompletedOn || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    0,
                    "sievingCompletedOn",
                    e.target.value
                  )
                }
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                multiline
                className="w-full p-1"
                placeholder="Sign & Date"
                value={mixing.manufacturingRecord[0]?.performedByOperator || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    0,
                    "performedByOperator",
                    e.target.value
                  )
                }
              />
              <TextField
                type="date"
                // className="w-full p-1"
                value={mixing.manufacturingRecord[0]?.pboDate || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(0, "pboDate", e.target.value)
                }
              />
            </td>

            <td className="border border-gray-300 p-2">
              <TextField
                multiline
                className="w-full p-1"
                placeholder="P.O Sign & Date"
                value={mixing.manufacturingRecord[0]?.checkedByPO || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    0,
                    "checkedByPO",
                    e.target.value
                  )
                }
              />
              <TextField
                type="date"
                // className="w-full p-1"
                value={mixing.manufacturingRecord[0]?.checkedByPODate || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    0,
                    "checkedByPODate",
                    e.target.value
                  )
                }
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                multiline
                className="w-full p-1"
                placeholder="Q.A.I Sign & Date"
                value={mixing.manufacturingRecord[0]?.checkedByQAI || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    0,
                    "checkedByQAI",
                    e.target.value
                  )
                }
              />
              <TextField
                type="date"
                // className="w-full p-1"
                value={mixing.manufacturingRecord[0]?.checkedByQAIDate || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    0,
                    "checkedByQAIDate",
                    e.target.value
                  )
                }
              />
            </td>
          </tr>

          {/* Step 2 */}
          <tr>
            <td className="border border-gray-300 p-2">2.</td>
            <td className="border border-gray-300 p-2">
              <TextField
                multiline
                style={{ width: "400px" }}
                className="w-full p-1"
                value={
                  mixing.manufacturingRecord[1]?.target ||
                  "Pass the Magnesium stearate, Aerosil-200, and Talcum Powder through Mesh #30 and add it to Step 1 (Double Cone mixer) and mix it for 1 hour."
                }
                onChange={(e) =>
                  handleManufacturingRecordChange(1, "target", e.target.value)
                }
              />
            </td>
            <td className="border border-gray-300 p-2">
              Mixing Started at:
              <input
                type="time"
                className="border border-gray-300 p-1 mt-1"
                value={mixing.manufacturingRecord[1]?.mixingStartedAt || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    1,
                    "mixingStartedAt",
                    e.target.value
                  )
                }
              />
              <br />
              Completed on:
              <input
                type="time"
                className="border border-gray-300 p-1 mt-1"
                value={mixing.manufacturingRecord[1]?.mixingCompletedOn || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    1,
                    "mixingCompletedOn",
                    e.target.value
                  )
                }
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                multiline
                className="w-full p-1"
                placeholder="Sign & Date"
                value={mixing.manufacturingRecord[1]?.performedByOperator || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    1,
                    "performedByOperator",
                    e.target.value
                  )
                }
              />
              <TextField
                type="date"
                // className="w-full p-1"
                value={mixing.manufacturingRecord[1]?.pboDate || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(1, "pboDate", e.target.value)
                }
              />
            </td>

            <td className="border border-gray-300 p-2">
              <TextField
                multiline
                className="w-full p-1"
                placeholder="P.O Sign & Date"
                value={mixing.manufacturingRecord[1]?.checkedByPO || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    1,
                    "checkedByPO",
                    e.target.value
                  )
                }
              />
              <TextField
                type="date"
                // className="w-full p-1"
                value={mixing.manufacturingRecord[1]?.checkedByPODate || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    1,
                    "checkedByPODate",
                    e.target.value
                  )
                }
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                multiline
                className="w-full p-1"
                placeholder="Q.A.I Sign & Date"
                value={mixing.manufacturingRecord[1]?.checkedByQAI || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    1,
                    "checkedByQAI",
                    e.target.value
                  )
                }
              />
              <TextField
                type="date"
                // className="w-full p-1"
                value={mixing.manufacturingRecord[1]?.checkedByQAIDate || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    1,
                    "checkedByQAIDate",
                    e.target.value
                  )
                }
              />
            </td>
          </tr>

          {/* Step 3 */}
          <tr>
            <td className="border border-gray-300 p-2">3.</td>
            <td className="border border-gray-300 p-2">
              <TextField
                multiline
                style={{ width: "400px" }}
                className="w-full p-1"
                value={
                  mixing.manufacturingRecord[2]?.target ||
                  "Send test request to QC for physical & chemical analysis. Raise the intimation to QA for sampling and get the sample tested by QC physically and chemically."
                }
                onChange={(e) =>
                  handleManufacturingRecordChange(2, "target", e.target.value)
                }
              />
            </td>
            <td className="border border-gray-300 p-2">
              Sample taken Qty:
              <input
                type="text"
                className="border border-gray-300 p-1 mt-1"
                placeholder="_______ gm"
                value={mixing.manufacturingRecord[2]?.sampleTakenQty || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    2,
                    "sampleTakenQty",
                    e.target.value
                  )
                }
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                multiline
                className="w-full p-1"
                placeholder="Sign & Date"
                value={mixing.manufacturingRecord[2]?.performedByOperator || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    2,
                    "performedByOperator",
                    e.target.value
                  )
                }
              />
              <TextField
                type="date"
                // className="w-full p-1"
                value={mixing.manufacturingRecord[2]?.pboDate || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(2, "pboDate", e.target.value)
                }
              />
            </td>

            <td className="border border-gray-300 p-2">
              <TextField
                multiline
                className="w-full p-1"
                placeholder="P.O Sign & Date"
                value={mixing.manufacturingRecord[2]?.checkedByPO || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    2,
                    "checkedByPO",
                    e.target.value
                  )
                }
              />
              <TextField
                type="date"
                // className="w-full p-1"
                value={mixing.manufacturingRecord[2]?.checkedByPODate || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    2,
                    "checkedByPODate",
                    e.target.value
                  )
                }
              />
            </td>
            <td className="border border-gray-300 p-2">
              <TextField
                multiline
                className="w-full p-1"
                placeholder="Q.A.I Sign & Date"
                value={mixing.manufacturingRecord[2]?.checkedByQAI || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    2,
                    "checkedByQAI",
                    e.target.value
                  )
                }
              />
              <TextField
                type="date"
                // className="w-full p-1"
                value={mixing.manufacturingRecord[2]?.checkedByQAIDate || ""}
                onChange={(e) =>
                  handleManufacturingRecordChange(
                    2,
                    "checkedByQAIDate",
                    e.target.value
                  )
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BatchManufacturingFormPage6;
