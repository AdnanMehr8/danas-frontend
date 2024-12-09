// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setCompressionRecord } from "../../../../store/compressionSlice";
// import { Input, Table, TextField } from "@mui/material";

// const BatchManufacturingFormPage11 = () => {
//   const compressionRecord = useSelector(
//     (state) => state.compression.compressionRecord
//   );
//   const dispatch = useDispatch();

//   const handleInputChange = (field, value) => {
//     dispatch(
//       setCompressionRecord({
//         compressionRecord: {
//           ...compressionRecord,
//           [field]: value,
//         },
//       })
//     );
//   };

//   const handleVerificationChange = (index, field, value) => {
//     const newVerification = [...compressionRecord.verification];
//     newVerification[index] = {
//       ...newVerification[index],
//       [field]: value,
//     };
//     dispatch(
//       setCompressionRecord({
//         compressionRecord: {
//           ...compressionRecord,
//           verification: newVerification,
//         },
//       })
//     );
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Compression Record</h2>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-300 p-2 text-center">Step</th>
//             <th className="border border-gray-300 p-2 text-center">Target</th>
//             <th className="border border-gray-300 p-2 text-center">Actual</th>
//             <th className="border border-gray-300 p-2 text-center">
//               Performed by Operator (sign & date)
//             </th>
//             <th className="border border-gray-300 p-2 text-center">
//               Checked By P.O (sign & date)
//             </th>
//             <th className="border border-gray-300 p-2 text-center">
//               Checked By Q.A.I (sign & date)
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="border border-gray-300 p-2">1</td>
//             <td
//               className="border border-gray-300 p-2"
//               style={{ width: "500px" }}
//             >
//               <TextField
//                 style={{ width: "500px" }}
//                 type="text"
//                 value={
//                   compressionRecord.verification[0]?.target ||
//                   " Room Temperature & Humidity:<br /> Check temperature and humidity of the area before starting compression.<br /> Limits: Temp: NMT 30°C, RH: NMT 50%"
//                 }
//                 onChange={(e) =>
//                   handleVerificationChange(0, "target", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//                 className="w-full p-1"
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <div className="flex flex-col space-y-2">
//                 <TextField
//                   type="number"
//                   placeholder="Temp (°C)"
//                   value={compressionRecord.temp}
//                   onChange={(e) => handleInputChange("temp", e.target.value)}
//                   fullWidth
//                   multiline
//                   className="p-1 mt-1"
//                 />
//                 <TextField
//                   type="number"
//                   placeholder="RH (%)"
//                   value={compressionRecord.rH}
//                   onChange={(e) => handleInputChange("rH", e.target.value)}
//                   fullWidth
//                   multiline
//                   className="p-1 mt-1"
//                 />
//               </div>
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 className="w-full p-1"
//                 placeholder="Sign & Date"
//                 value={compressionRecord.verification[0]?.performedByOperator}
//                 onChange={(e) =>
//                   handleVerificationChange(
//                     0,
//                     "performedByOperator",
//                     e.target.value
//                   )
//                 }
//                 fullWidth
//                 multiline
//               />
//               <TextField
//                 type="date"
//                 className="w-full p-1"
//                 placeholder="Sign & Date"
//                 value={compressionRecord.verification[0]?.pboDate}
//                 onChange={(e) =>
//                   handleVerificationChange(0, "pboDate", e.target.value)
//                 }
//                 fullWidth
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 className="w-full p-1"
//                 placeholder="P.O Sign & Date"
//                 value={compressionRecord.verification[0]?.checkedByPO}
//                 onChange={(e) =>
//                   handleVerificationChange(0, "checkedByPO", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//               />
//               <TextField
//                 type="date"
//                 className="w-full p-1"
//                 placeholder="P.O Sign & Date"
//                 value={compressionRecord.verification[0]?.checkedByPODate}
//                 onChange={(e) =>
//                   handleVerificationChange(0, "checkedByPODate", e.target.value)
//                 }
//                 fullWidth
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 className="w-full p-1"
//                 placeholder="Q.A.I Sign & Date"
//                 value={compressionRecord.verification[0]?.checkedByQAI}
//                 onChange={(e) =>
//                   handleVerificationChange(0, "checkedByQAI", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//               />
//               <TextField
//                 type="date"
//                 className="w-full p-1"
//                 placeholder="Q.A.I Sign & Date"
//                 value={compressionRecord.verification[0]?.checkedByQAIDate}
//                 onChange={(e) =>
//                   handleVerificationChange(
//                     0,
//                     "checkedByQAIDate",
//                     e.target.value
//                   )
//                 }
//                 fullWidth
//               />
//             </td>
//           </tr>
//           <tr>
//             <td className="border border-gray-300 p-2">2.</td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 value={
//                   compressionRecord.verification[1]?.target ||
//                   "Check the weight of granules."
//                 }
//                 onChange={(e) =>
//                   handleVerificationChange(1, "target", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//                 className="w-full p-1"
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="number"
//                 placeholder="Weight of granules (kg)"
//                 value={compressionRecord.weightOfGranules}
//                 onChange={(e) =>
//                   handleInputChange("weightOfGranules", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//                 className="p-1 mt-1"
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 placeholder="Sign & Date"
//                 value={compressionRecord.verification[1]?.performedByOperator}
//                 onChange={(e) =>
//                   handleVerificationChange(
//                     1,
//                     "performedByOperator",
//                     e.target.value
//                   )
//                 }
//                 fullWidth
//                 multiline
//                 className="w-full p-1"
//               />
//               <TextField
//                 type="date"
//                 placeholder="Sign & Date"
//                 value={compressionRecord.verification[1]?.pboDate}
//                 onChange={(e) =>
//                   handleVerificationChange(1, "pboDate", e.target.value)
//                 }
//                 fullWidth
//                 className="w-full p-1"
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 placeholder="P.O Sign & Date"
//                 value={compressionRecord.verification[1]?.checkedByPO}
//                 onChange={(e) =>
//                   handleVerificationChange(1, "checkedByPO", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//                 className="p-1 mt-1"
//               />
//               <TextField
//                 type="date"
//                 placeholder="P.O Sign & Date"
//                 value={compressionRecord.verification[1]?.checkedByPODate}
//                 onChange={(e) =>
//                   handleVerificationChange(1, "checkedByPODate", e.target.value)
//                 }
//                 fullWidth
//                 className="p-1 mt-1"
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 placeholder="Q.A.I Sign & Date"
//                 value={compressionRecord.verification[1]?.checkedByQAI}
//                 onChange={(e) =>
//                   handleVerificationChange(1, "checkedByQAI", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//                 className="p-1 mt-1"
//               />
//               <TextField
//                 type="date"
//                 placeholder="Q.A.I Sign & Date"
//                 value={compressionRecord.verification[1]?.checkedByQAIDate}
//                 onChange={(e) =>
//                   handleVerificationChange(
//                     1,
//                     "checkedByQAIDate",
//                     e.target.value
//                   )
//                 }
//                 fullWidth
//                 className="p-1 mt-1"
//               />
//             </td>
//           </tr>
//           <tr>
//             <td className="border border-gray-300 p-2">3.</td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 value={
//                   compressionRecord.verification[2]?.target ||
//                   "Check Embossing of punches:<br /> Upper Punch - DID Embossed<br /> Lower Punch - Plain"
//                 }
//                 onChange={(e) =>
//                   handleVerificationChange(2, "target", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//                 className="w-full p-1"
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <div className="flex flex-col space-y-2">
//                 <TextField
//                   type="text"
//                   placeholder="Upper Punch"
//                   value={compressionRecord.upperPunch}
//                   onChange={(e) =>
//                     handleInputChange("upperPunch", e.target.value)
//                   }
//                   fullWidth
//                   multiline
//                   className="p-1 mt-1"
//                 />
//                 <TextField
//                   type="text"
//                   placeholder="Lower Punch"
//                   value={compressionRecord.lowerPunch}
//                   onChange={(e) =>
//                     handleInputChange("lowerPunch", e.target.value)
//                   }
//                   fullWidth
//                   multiline
//                   className="p-1 mt-1"
//                 />
//               </div>
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 placeholder="Sign & Date"
//                 value={compressionRecord.verification[2]?.performedByOperator}
//                 onChange={(e) =>
//                   handleVerificationChange(
//                     2,
//                     "performedByOperator",
//                     e.target.value
//                   )
//                 }
//                 fullWidth
//                 multiline
//                 className="p-1 mt-1"
//               />
//               <TextField
//                 type="date"
//                 placeholder="Sign & Date"
//                 value={compressionRecord.verification[2]?.pboDate}
//                 onChange={(e) =>
//                   handleVerificationChange(2, "pboDate", e.target.value)
//                 }
//                 fullWidth
//                 className="p-1 mt-1"
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 placeholder="P.O Sign & Date"
//                 value={compressionRecord.verification[2]?.checkedByPO}
//                 onChange={(e) =>
//                   handleVerificationChange(2, "checkedByPO", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//                 className="p-1 mt-1"
//               />
//               <TextField
//                 type="date"
//                 placeholder="P.O Sign & Date"
//                 value={compressionRecord.verification[2]?.checkedByPODate}
//                 onChange={(e) =>
//                   handleVerificationChange(2, "checkedByPODate", e.target.value)
//                 }
//                 fullWidth
//                 className="p-1 mt-1"
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 placeholder="Q.A.I Sign & Date"
//                 value={compressionRecord.verification[2]?.checkedByQAI}
//                 onChange={(e) =>
//                   handleVerificationChange(2, "checkedByQAI", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//                 className="p-1 mt-1"
//               />
//               <TextField
//                 type="date"
//                 placeholder="Q.A.I Sign & Date"
//                 value={compressionRecord.verification[2]?.checkedByQAIDate}
//                 onChange={(e) =>
//                   handleVerificationChange(
//                     2,
//                     "checkedByQAIDate",
//                     e.target.value
//                   )
//                 }
//                 fullWidth
//                 className="p-1 mt-1"
//               />
//             </td>
//           </tr>
//           <tr>
//             <td className="border border-gray-300 p-2">4.</td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 value={
//                   compressionRecord.verification[3]?.target ||
//                   " Compress the granules into tablets on tablet compression machine. Set the machine and check tablets for following parameters: <br/> Compression Started at: <br/> Completed on:"
//                 }
//                 onChange={(e) =>
//                   handleVerificationChange(3, "target", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//                 className="w-full p-1"
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <div className="flex flex-col space-y-2">
//                 Compression Started at:
//                 <TextField
//                   type="time"
//                   value={compressionRecord.compressionStartedAt}
//                   onChange={(e) =>
//                     handleInputChange("compressionStartedAt", e.target.value)
//                   }
//                   InputLabelProps={{ shrink: true }}
//                   className="p-1 mt-1"
//                 />
//                 <br />
//                 Compression Completed On:
//                 <TextField
//                   type="time"
//                   value={compressionRecord.compressionCompletedOn}
//                   onChange={(e) =>
//                     handleInputChange("compressionCompletedOn", e.target.value)
//                   }
//                   InputLabelProps={{ shrink: true }}
//                   className="p-1 mt-1"
//                 />
//               </div>
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 placeholder="Sign & Date"
//                 value={compressionRecord.verification[3]?.performedByOperator}
//                 onChange={(e) =>
//                   handleVerificationChange(
//                     3,
//                     "performedByOperator",
//                     e.target.value
//                   )
//                 }
//                 fullWidth
//                 multiline
//                 className="p-1 mt-1"
//               />
//               <TextField
//                 type="date"
//                 placeholder="Sign & Date"
//                 value={compressionRecord.verification[3]?.pboDate}
//                 onChange={(e) =>
//                   handleVerificationChange(3, "pboDate", e.target.value)
//                 }
//                 fullWidth
//                 className="p-1 mt-1"
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 placeholder="P.O Sign & Date"
//                 value={compressionRecord.verification[3]?.checkedByPO}
//                 onChange={(e) =>
//                   handleVerificationChange(3, "checkedByPO", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//                 className="p-1 mt-1"
//               />
//               <TextField
//                 type="date"
//                 placeholder="P.O Sign & Date"
//                 value={compressionRecord.verification[3]?.checkedByPODate}
//                 onChange={(e) =>
//                   handleVerificationChange(3, "checkedByPODate", e.target.value)
//                 }
//                 fullWidth
//                 className="p-1 mt-1"
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 placeholder="Q.A.I Sign & Date"
//                 value={compressionRecord.verification[3]?.checkedByQAI}
//                 onChange={(e) =>
//                   handleVerificationChange(3, "checkedByQAI", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//                 className="p-1 mt-1"
//               />
//               <TextField
//                 type="date"
//                 placeholder="Q.A.I Sign & Date"
//                 value={compressionRecord.verification[3]?.checkedByQAIDate}
//                 onChange={(e) =>
//                   handleVerificationChange(
//                     3,
//                     "checkedByQAIDate",
//                     e.target.value
//                   )
//                 }
//                 fullWidth
//                 className="p-1 mt-1"
//               />
//             </td>
//           </tr>
//           <tr>
//             <td className="border border-gray-300 p-2">5.</td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 value={
//                   compressionRecord.verification[4]?.target ||
//                   " Send test requests to QA for physical & chemical analysis. Raise the intimation to QA for sampling and getting the sample tested by QC physically and chemically.<br /> Sample taken Qty:"
//                 }
//                 onChange={(e) =>
//                   handleVerificationChange(4, "target", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//                 className="w-full p-1"
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="number"
//                 placeholder="Sample taken (Tablets)"
//                 value={compressionRecord.sampleTakenQty}
//                 onChange={(e) =>
//                   handleInputChange("sampleTakenQty", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//                 className="p-1 mt-1"
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 placeholder="Sign & Date"
//                 value={compressionRecord.verification[4]?.performedByOperator}
//                 onChange={(e) =>
//                   handleVerificationChange(
//                     4,
//                     "performedByOperator",
//                     e.target.value
//                   )
//                 }
//                 fullWidth
//                 multiline
//                 className="p-1 mt-1"
//               />
//               <TextField
//                 type="date"
//                 placeholder="Sign & Date"
//                 value={compressionRecord.verification[4]?.pboDate}
//                 onChange={(e) =>
//                   handleVerificationChange(4, "pboDate", e.target.value)
//                 }
//                 fullWidth
//                 className="p-1 mt-1"
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 placeholder="P.O Sign & Date"
//                 value={compressionRecord.verification[4]?.checkedByPO}
//                 onChange={(e) =>
//                   handleVerificationChange(4, "checkedByPO", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//                 className="p-1 mt-1"
//               />
//               <TextField
//                 type="date"
//                 placeholder="P.O Sign & Date"
//                 value={compressionRecord.verification[4]?.checkedByPODate}
//                 onChange={(e) =>
//                   handleVerificationChange(4, "checkedByPODate", e.target.value)
//                 }
//                 fullWidth
//                 className="p-1 mt-1"
//               />
//             </td>
//             <td className="border border-gray-300 p-2">
//               <TextField
//                 type="text"
//                 placeholder="Q.A.I Sign & Date"
//                 value={compressionRecord.verification[4]?.checkedByQAI}
//                 onChange={(e) =>
//                   handleVerificationChange(4, "checkedByQAI", e.target.value)
//                 }
//                 fullWidth
//                 multiline
//                 className="p-1 mt-1"
//               />
//               <TextField
//                 type="date"
//                 placeholder="Q.A.I Sign & Date"
//                 value={compressionRecord.verification[4]?.checkedByQAIDate}
//                 onChange={(e) =>
//                   handleVerificationChange(
//                     4,
//                     "checkedByQAIDate",
//                     e.target.value
//                   )
//                 }
//                 fullWidth
//                 className="p-1 mt-1"
//               />
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BatchManufacturingFormPage11;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCompressionRecord } from "../../../../store/compressionSlice";
import { Button, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { usePermissions } from "../../../../hooks/usePermissions";

const BatchManufacturingFormPage11 = ({ isReport }) => {
  const compressionRecord = useSelector(
    (state) => state.compression.compressionRecord
  );
  const dispatch = useDispatch();
  const { hasPermission } = usePermissions();

  const permission = {
    canReadProduction: isReport ? true : hasPermission('production', 'read'),
    canReadQA: isReport ? true : hasPermission('qa', 'read'),
    canEditProduction: isReport ? true : hasPermission('production', 'update'),
    canEditQA: isReport ? true : hasPermission('qa', 'update')
  };


  const handleCompressionRecordChange = (index, field, value) => {
    // Production can edit most fields
    const productionFields = [
      'target', 'actual', 'performedByOperator', 'pboDate', 
      'checkedByPO', 'checkedByPODate'
    ];

    // QA can only edit these fields
    const qaFields = [
      'checkedByQAI', 'checkedByQAIDate'
    ];

    if ((productionFields.includes(field) && !permission.canEditProduction) ||
        (qaFields.includes(field) && !permission.canEditQA)) {
      return;
    }

    const newCompressionRecord = compressionRecord.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );

    dispatch(
      setCompressionRecord({
        compressionRecord: newCompressionRecord,
      })
    );
  };

  const addRow = () => {
    if (!permission.canEditProduction) return;

    const newRow = {
      target: "",
      actual: "",
      performedByOperator: "",
      pboDate: "",
      checkedByPO: "",
      checkedByPODate: "",
      checkedByQAI: "",
      checkedByQAIDate: "",
    };

    dispatch(
      setCompressionRecord({
        compressionRecord: [...compressionRecord, newRow],
      })
    );
  };

  const deleteRow = (index) => {
    if (!permission.canEditProduction) return;

    const newCompressionRecord = compressionRecord.filter(
      (_, idx) => idx !== index
    );

    dispatch(
      setCompressionRecord({
        compressionRecord: newCompressionRecord,
      })
    );
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

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Compression Record</h2>
      <table className="w-full border-collapse ">
        <thead>
        <tr >
            <th className="border border-gray-300 p-2">Step</th>
            <th className="border border-gray-300 p-2">Target</th>
            <th className="border border-gray-300 p-2" style={{minWidth: "120px"}}>Actual</th>
            <th className="border border-gray-300 p-2">
              Performed by Operator (Sign & date)
            </th>
            {/* <th className="border border-gray-300 p-2" rowSpan={2}>Checked By</th> */}
            <th colSpan={2} className="border border-gray-300 p-2" style={{ borderRight: "1px solid #dee2e6", textAlign: "center" }}>checked By<br/> (sign. & date)</th>
            {/* <th className="border border-gray-300 p-2">Checked By P.O</th>
            <th className="border border-gray-300 p-2">Checked By Q.A.I</th> */}
            <th className="border border-gray-300 p-2 actions-column">Actions</th>
          </tr>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2">Checked By P.O</th>
            <th className="border border-gray-300 p-2">Checked By Q.A.I</th>
            <th ></th>
          </tr>
        </thead>
        <tbody>
          {compressionRecord.map((record, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-center">{index + 1}.</td>
              <td className="border border-gray-300 p-2" style={{ width: "400px" }}>
                <TextField
                  type="text"
                  value={record.target || ""}
                  onChange={(e) => handleCompressionRecordChange(index, "target", e.target.value)}
                  style={{ width: "400px" }}
                  multiline
                  InputProps={{
                    readOnly: !permission.canEditProduction,
                    disabled: !permission.canEditProduction
                  }}
                />
              </td>
              <td className="border border-gray-300 p-2">
                <TextField
                  type="text"
                  value={record.actual || ""}
                  onChange={(e) => handleCompressionRecordChange(index, "actual", e.target.value)}
                  fullWidth
                  multiline
                  className="w-full p-1"
                  InputProps={{
                    readOnly: !permission.canEditProduction,
                    disabled: !permission.canEditProduction
                  }}
                />
              </td>
              <td className="border border-gray-300 p-2">
                <TextField
                  type="text"
                  placeholder="Sign & Date"
                  value={record.performedByOperator || ""}
                  onChange={(e) => handleCompressionRecordChange(index, "performedByOperator", e.target.value)}
                  fullWidth
                  multiline
                  className="w-full p-1"
                  InputProps={{
                    readOnly: !permission.canEditProduction,
                    disabled: !permission.canEditProduction
                  }}
                />
                <TextField
                  type="date"
                  value={record.pboDate || ""}
                  onChange={(e) => handleCompressionRecordChange(index, "pboDate", e.target.value)}
                  fullWidth
                  className="w-full p-1"
                  InputProps={{
                    readOnly: !permission.canEditProduction,
                    disabled: !permission.canEditProduction
                  }}
                />
              </td>
              <td className="border border-gray-300 p-2">
                <TextField
                  type="text"
                  placeholder="P.O Sign & Date"
                  value={record.checkedByPO || ""}
                  onChange={(e) => handleCompressionRecordChange(index, "checkedByPO", e.target.value)}
                  fullWidth
                  multiline
                  className="w-full p-1"
                  InputProps={{
                    readOnly: !permission.canEditProduction,
                    disabled: !permission.canEditProduction
                  }}
                />
                <TextField
                  type="date"
                  value={record.checkedByPODate || ""}
                  onChange={(e) => handleCompressionRecordChange(index, "checkedByPODate", e.target.value)}
                  fullWidth
                  className="w-full p-1"
                  InputProps={{
                    readOnly: !permission.canEditProduction,
                    disabled: !permission.canEditProduction
                  }}
                />
              </td>
              <td className="border border-gray-300 p-2">
                <TextField
                  type="text"
                  placeholder="Q.A.I Sign & Date"
                  value={record.checkedByQAI || ""}
                  onChange={(e) => handleCompressionRecordChange(index, "checkedByQAI", e.target.value)}
                  fullWidth
                  multiline
                  className="w-full p-1"
                  InputProps={{
                    readOnly: !permission.canEditQA,
                    disabled: !permission.canEditQA
                  }}
                />
                <TextField
                  type="date"
                  value={record.checkedByQAIDate || ""}
                  onChange={(e) => handleCompressionRecordChange(index, "checkedByQAIDate", e.target.value)}
                  fullWidth
                  className="w-full p-1"
                  InputProps={{
                    readOnly: !permission.canEditQA,
                    disabled: !permission.canEditQA
                  }}
                />
              </td>
              <td className="border border-gray-300 p-2 text-center actions-column">
                <IconButton 
                  onClick={() => deleteRow(index)} 
                  disabled={!permission.canEditProduction}
                >
                <DeleteIcon color={permission.canEditProduction ? "error" : "disabled"}/>
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button 
        onClick={addRow} 
        variant="contained"
        color="primary" 
        className="mt-4"
        disabled={!permission.canEditProduction}
      >
        Add Row
      </Button>
    </div>
  );
};

export default BatchManufacturingFormPage11;