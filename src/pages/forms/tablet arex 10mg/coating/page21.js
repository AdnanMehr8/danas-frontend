// import React from "react";
// import {
//   Card,
//   CardContent,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   TextField,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { setCoatingRecord } from "../../../../store/coatingSlice"; // Adjusted import path

// const BatchManufacturingFormPage21 = () => {
//   const dispatch = useDispatch();
//   const coating = useSelector((state) => state.coating); // Using the entire coating state

//   const handleCoatingSolutionPreparationChange = (index, field, value) => {
//     const updatedCoatingSolutionPreparation = [
//       ...coating.coatingSolutionPreparation,
//     ];
//     updatedCoatingSolutionPreparation[index] = {
//       ...updatedCoatingSolutionPreparation[index],
//       [field]: value,
//     };
//     dispatch(
//       setCoatingRecord({
//         ...coating,
//         coatingSolutionPreparation: updatedCoatingSolutionPreparation,
//       })
//     );
//   };

//   const handleCoatingProcedureChange = (index, field, value) => {
//     const updatedInstructions = [...coating.coatingProcedure];
//     updatedInstructions[index] = {
//       ...updatedInstructions[index],
//       [field]: value,
//     };
//     dispatch(
//       setCoatingRecord({
//         ...coating,
//         coatingProcedure: updatedInstructions,
//       })
//     );
//   };

//   return (
//     <Card className="max-w-4xl mx-auto">
//       <CardContent>
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           COATING SOLUTION PREPARATION:
//         </h2>
//         <div>INSTRUCTIONS:</div>
//         <p>
//           1. Operator must wear mask and disposable gloves while handling the
//           materials.
//         </p>
//         <p>2. Seal the container of solution to avoid evaporation.</p>
//         <p>3. Avoid direct contact with the skin.</p>

//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     borderRight: "1px solid rgba(224, 224, 224, 1)",
//                   }}
//                   className="text-center"
//                 >
//                   Step(s)
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     borderRight: "1px solid rgba(224, 224, 224, 1)",
//                   }}
//                   className="text-center"
//                 >
//                   Instruction(s)
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     borderRight: "1px solid rgba(224, 224, 224, 1)",
//                   }}
//                   className="text-center"
//                 >
//                   Activity Compliance
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     borderRight: "1px solid rgba(224, 224, 224, 1)",
//                   }}
//                   className="text-center"
//                 >
//                   Performed by Operator (sign & date)
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     borderRight: "1px solid rgba(224, 224, 224, 1)",
//                   }}
//                   className="text-center"
//                 >
//                   Verified by P.O (sign & date)
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>
//                   Verified by QAI (sign & date)
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {coating.coatingSolutionPreparation.map((procedure, index) => (
//                 <TableRow key={index}>
//                   <TableCell
//                     sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
//                   >
//                     {index + 1}
//                   </TableCell>
//                   <TableCell
//                     sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
//                     style={{ width: "500px" }}
//                   >
//                     <TextField
//                       style={{ width: "500px" }}
//                       fullWidth
//                       multiline
//                       value={procedure.instructions || ""}
//                       onChange={(e) =>
//                         handleCoatingSolutionPreparationChange(
//                           index,
//                           "instructions",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </TableCell>
//                   <TableCell
//                     sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
//                   >
//                     <TextField
//                       fullWidth
//                       multiline
//                       value={procedure.activityCompliance || ""}
//                       onChange={(e) =>
//                         handleCoatingSolutionPreparationChange(
//                           index,
//                           "activityCompliance",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </TableCell>
//                   <TableCell
//                     sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
//                   >
//                     <TextField
//                       fullWidth
//                       multiline
//                       value={procedure.performedByOperator || ""}
//                       onChange={(e) =>
//                         handleCoatingSolutionPreparationChange(
//                           index,
//                           "performedByOperator",
//                           e.target.value
//                         )
//                       }
//                     />
//                     <TextField
//                       fullWidth
//                       type="date"
//                       value={procedure.pboDate || ""}
//                       onChange={(e) =>
//                         handleCoatingSolutionPreparationChange(
//                           index,
//                           "pboDate",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </TableCell>
//                   <TableCell
//                     sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
//                   >
//                     <TextField
//                       fullWidth
//                       multiline
//                       value={procedure.checkedByPO || ""}
//                       onChange={(e) =>
//                         handleCoatingSolutionPreparationChange(
//                           index,
//                           "checkedByPO",
//                           e.target.value
//                         )
//                       }
//                     />
//                     <TextField
//                       fullWidth
//                       type="date"
//                       value={procedure.checkedByPODate || ""}
//                       onChange={(e) =>
//                         handleCoatingSolutionPreparationChange(
//                           index,
//                           "checkedByPODate",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <TextField
//                       fullWidth
//                       multiline
//                       value={procedure.checkedByQAI || ""}
//                       onChange={(e) =>
//                         handleCoatingSolutionPreparationChange(
//                           index,
//                           "checkedByQAI",
//                           e.target.value
//                         )
//                       }
//                     />
//                     <TextField
//                       fullWidth
//                       type="date"
//                       value={procedure.checkedByQAIDate || ""}
//                       onChange={(e) =>
//                         handleCoatingSolutionPreparationChange(
//                           index,
//                           "checkedByQAIDate",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <h2 className="text-2xl font-bold mb-4 text-center mt-4">
//           TABLETS COATING PROCEDURE:
//         </h2>

//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     borderRight: "1px solid rgba(224, 224, 224, 1)",
//                   }}
//                   className="text-center"
//                 >
//                   Step(s)
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     borderRight: "1px solid rgba(224, 224, 224, 1)",
//                   }}
//                   className="text-center"
//                 >
//                   Instruction(s)
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     borderRight: "1px solid rgba(224, 224, 224, 1)",
//                   }}
//                   className="text-center"
//                 >
//                   Activity Compliance
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     borderRight: "1px solid rgba(224, 224, 224, 1)",
//                   }}
//                   className="text-center"
//                 >
//                   Performed by Operator (sign & date)
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     borderRight: "1px solid rgba(224, 224, 224, 1)",
//                   }}
//                   className="text-center"
//                 >
//                   Verified by P.O (sign & date)
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>
//                   Verified by QAI (sign & date)
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {coating.coatingProcedure.map((procedure, index) => (
//                 <TableRow key={index}>
//                   <TableCell
//                     sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
//                   >
//                     {index + 1}
//                   </TableCell>
//                   <TableCell
//                     sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
//                   >
//                     <TextField
//                       style={{ width: "500px" }}
//                       fullWidth
//                       multiline
//                       value={procedure.instructions || ""}
//                       onChange={(e) =>
//                         handleCoatingProcedureChange(
//                           index,
//                           "instructions",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </TableCell>
//                   <TableCell
//                     sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
//                   >
//                     <TextField
//                       fullWidth
//                       multiline
//                       value={procedure.activityCompliance || ""}
//                       onChange={(e) =>
//                         handleCoatingProcedureChange(
//                           index,
//                           "activityCompliance",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </TableCell>
//                   <TableCell
//                     sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
//                   >
//                     <TextField
//                       fullWidth
//                       multiline
//                       value={procedure.performedByOperator || ""}
//                       onChange={(e) =>
//                         handleCoatingProcedureChange(
//                           index,
//                           "performedByOperator",
//                           e.target.value
//                         )
//                       }
//                     />
//                     <TextField
//                       fullWidth
//                       type="date"
//                       value={procedure.pboDate || ""}
//                       onChange={(e) =>
//                         handleCoatingProcedureChange(
//                           index,
//                           "pboDate",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </TableCell>
//                   <TableCell
//                     sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
//                   >
//                     <TextField
//                       fullWidth
//                       multiline
//                       value={procedure.checkedByPO || ""}
//                       onChange={(e) =>
//                         handleCoatingProcedureChange(
//                           index,
//                           "checkedByPO",
//                           e.target.value
//                         )
//                       }
//                     />
//                     <TextField
//                       fullWidth
//                       type="date"
//                       value={procedure.checkedByPODate || ""}
//                       onChange={(e) =>
//                         handleCoatingProcedureChange(
//                           index,
//                           "checkedByPODate",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <TextField
//                       fullWidth
//                       multiline
//                       value={procedure.checkedByQAI || ""}
//                       onChange={(e) =>
//                         handleCoatingProcedureChange(
//                           index,
//                           "checkedByQAI",
//                           e.target.value
//                         )
//                       }
//                     />
//                     <TextField
//                       fullWidth
//                       type="date"
//                       value={procedure.checkedByQAIDate || ""}
//                       onChange={(e) =>
//                         handleCoatingProcedureChange(
//                           index,
//                           "checkedByQAIDate",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default BatchManufacturingFormPage21;
import React from "react";
import {
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Button,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { setCoatingRecord } from "../../../../store/coatingSlice";
import { usePermissions } from "../../../../hooks/usePermissions";

const BatchManufacturingFormPage21 = ({ isReport }) => {
  const dispatch = useDispatch();
  const coating = useSelector((state) => state.coating);
  const { hasPermission } = usePermissions();

  const permission = {
    canReadProduction: isReport ? true : hasPermission('production', 'read'),
    canReadQA: isReport ? true : hasPermission('qa', 'read'),
    canEditProduction: isReport ? true : hasPermission('production', 'update'),
    canEditQA: isReport ? true : hasPermission('qa', 'update')
  };
  const handleCoatingSolutionPreparationChange = (index, field, value) => {
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

    const updatedCoatingSolutionPreparation = [
      ...coating.coatingSolutionPreparation,
    ];
    updatedCoatingSolutionPreparation[index] = {
      ...updatedCoatingSolutionPreparation[index],
      [field]: value,
    };
    dispatch(
      setCoatingRecord({
        ...coating,
        coatingSolutionPreparation: updatedCoatingSolutionPreparation,
      })
    );
  };

  const handleCoatingProcedureChange = (index, field, value) => {
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

    const updatedCoatingProcedure = [...coating.coatingProcedure];
    updatedCoatingProcedure[index] = {
      ...updatedCoatingProcedure[index],
      [field]: value,
    };
    dispatch(
      setCoatingRecord({
        ...coating,
        coatingProcedure: updatedCoatingProcedure,
      })
    );
  };

  const addCoatingSolutionPreparationRow = () => {
    if (!permission.canEditProduction) return;

    const newRow = {
      instructions: "",
      activityCompliance: "",
      performedByOperator: "",
      pboDate: "",
      checkedByPO: "",
      checkedByPODate: "",
      checkedByQAI: "",
      checkedByQAIDate: "",
    };

    dispatch(
      setCoatingRecord({
        ...coating,
        coatingSolutionPreparation: [
          ...coating.coatingSolutionPreparation, 
          newRow
        ],
      })
    );
  };

  const addCoatingProcedureRow = () => {
    if (!permission.canEditProduction) return;

    const newRow = {
      instructions: "",
      activityCompliance: "",
      performedByOperator: "",
      pboDate: "",
      checkedByPO: "",
      checkedByPODate: "",
      checkedByQAI: "",
      checkedByQAIDate: "",
    };

    dispatch(
      setCoatingRecord({
        ...coating,
        coatingProcedure: [
          ...coating.coatingProcedure, 
          newRow
        ],
      })
    );
  };

  const deleteCoatingSolutionPreparationRow = (index) => {
    if (!permission.canEditProduction) return;

    const newCoatingSolutionPreparation = coating.coatingSolutionPreparation.filter(
      (_, idx) => idx !== index
    );

    dispatch(
      setCoatingRecord({
        ...coating,
        coatingSolutionPreparation: newCoatingSolutionPreparation,
      })
    );
  };

  const deleteCoatingProcedureRow = (index) => {
    if (!permission.canEditProduction) return;

    const newCoatingProcedure = coating.coatingProcedure.filter(
      (_, idx) => idx !== index
    );

    dispatch(
      setCoatingRecord({
        ...coating,
        coatingProcedure: newCoatingProcedure,
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
    <Card className="max-w-4xl mx-auto">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-center">
          COATING SOLUTION PREPARATION:
        </h2>
        <div>INSTRUCTIONS:</div>
        <p>
          1. Operator must wear mask and disposable gloves while handling the
          materials.
        </p>
        <p>2. Seal the container of solution to avoid evaporation.</p>
        <p>3. Avoid direct contact with the skin.</p>

        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
            <tr >
            <th className="border border-gray-300 p-2">Step</th>
            <th className="border border-gray-300 p-2">Instruction(s)</th>
            <th className="border border-gray-300 p-2" style={{minWidth: "120px"}}>Activity Compliance</th>
            <th className="border border-gray-300 p-2">
              Performed by Operator (Sign & date)
            </th>
            {/* <th className="border border-gray-300 p-2" rowSpan={2}>Checked By</th> */}
            <th className="border border-gray-300 p-2" colSpan={2} style={{ borderRight: "1px solid #dee2e6", textAlign: "center" }}>Verified by<br/> (sign. & date)</th>
            {/* <th className="border border-gray-300 p-2">Checked By P.O</th>
            <th className="border border-gray-300 p-2">Checked By Q.A.I</th> */}
            {/* <th className="border border-gray-300 p-2 actions-column">Actions</th> */}
          </tr>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"> P.O </th>
            <th className="border border-gray-300 p-2"> QAI</th>
            {/* <th></th> */}
          </tr>
            </TableHead>
            <TableBody>
              {coating.coatingSolutionPreparation.map((procedure, index) => (
                <TableRow key={index}>
                  <TableCell className="border text-center">{index + 1}</TableCell>
                  <TableCell className="border" style={{ width: "500px" }}>
                    <TextField
                      style={{ width: "500px" }}
                      fullWidth
                      multiline
                      value={procedure.instructions || ""}
                      onChange={(e) =>
                        handleCoatingSolutionPreparationChange(
                          index,
                          "instructions",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditProduction,
                        disabled: !permission.canEditProduction
                      }}
                    />
                  </TableCell>
                  <TableCell className="border">
                    <TextField
                      fullWidth
                      multiline
                      value={procedure.activityCompliance || ""}
                      onChange={(e) =>
                        handleCoatingSolutionPreparationChange(
                          index,
                          "activityCompliance",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditProduction,
                        disabled: !permission.canEditProduction
                      }}
                    />
                  </TableCell>
                  <TableCell className="border">
                    <TextField
                      fullWidth
                      multiline
                      value={procedure.performedByOperator || ""}
                      onChange={(e) =>
                        handleCoatingSolutionPreparationChange(
                          index,
                          "performedByOperator",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditProduction,
                        disabled: !permission.canEditProduction
                      }}
                    />
                    <TextField
                      fullWidth
                      type="date"
                      value={procedure.pboDate || ""}
                      onChange={(e) =>
                        handleCoatingSolutionPreparationChange(
                          index,
                          "pboDate",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditProduction,
                        disabled: !permission.canEditProduction
                      }}
                    />
                  </TableCell>
                  <TableCell className="border">
                    <TextField
                      fullWidth
                      multiline
                      value={procedure.checkedByPO || ""}
                      onChange={(e) =>
                        handleCoatingSolutionPreparationChange(
                          index,
                          "checkedByPO",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditProduction,
                        disabled: !permission.canEditProduction
                      }}
                    />
                    <TextField
                      fullWidth
                      type="date"
                      value={procedure.checkedByPODate || ""}
                      onChange={(e) =>
                        handleCoatingSolutionPreparationChange(
                          index,
                          "checkedByPODate",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditProduction,
                        disabled: !permission.canEditProduction
                      }}
                    />
                  </TableCell>
                  <TableCell className="border">
                    <TextField
                      fullWidth
                      multiline
                      value={procedure.checkedByQAI || ""}
                      onChange={(e) =>
                        handleCoatingSolutionPreparationChange(
                          index,
                          "checkedByQAI",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditQA,
                        disabled: !permission.canEditQA
                      }}
                    />
                    <TextField
                      fullWidth
                      type="date"
                      value={procedure.checkedByQAIDate || ""}
                      onChange={(e) =>
                        handleCoatingSolutionPreparationChange(
                          index,
                          "checkedByQAIDate",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditQA,
                        disabled: !permission.canEditQA
                      }}
                    />
                  </TableCell>
                  <TableCell className="border text-center actions-column">
                    <IconButton onClick={() => deleteCoatingSolutionPreparationRow(index)} disabled={!permission.canEditProduction}>
                      <DeleteIcon color={permission.canEditProduction ? "error" : "disabled"} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button 
          onClick={addCoatingSolutionPreparationRow} 
          variant="contained"
          color="primary" 
          className="mt-4"
        disabled={!permission.canEditProduction}

        >
          Add Row
        </Button>

        <h2 className="text-2xl font-bold mb-4 text-center mt-6">
          TABLETS COATING PROCEDURE:
        </h2>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
            <tr >
            <th className="border border-gray-300 p-2">Step</th>
            <th className="border border-gray-300 p-2">Instruction(s)</th>
            <th className="border border-gray-300 p-2" style={{minWidth: "120px"}}>Activity Compliance</th>
            <th className="border border-gray-300 p-2">
              Performed by Operator (Sign & date)
            </th>
            {/* <th className="border border-gray-300 p-2" rowSpan={2}>Checked By</th> */}
            <th className="border border-gray-300 p-2" colSpan={2} style={{ borderRight: "1px solid #dee2e6", textAlign: "center" }}>Verified by<br/> (sign. & date)</th>
            {/* <th className="border border-gray-300 p-2">Checked By P.O</th>
            <th className="border border-gray-300 p-2">Checked By Q.A.I</th> */}
            {/* <th className="border border-gray-300 p-2 actions-column">Actions</th> */}
          </tr>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"> P.O </th>
            <th className="border border-gray-300 p-2"> QAI</th>
            {/* <th></th> */}
          </tr>
            </TableHead>
            <TableBody>
              {coating.coatingProcedure.map((procedure, index) => (
                <TableRow key={index}>
                  <TableCell className="border text-center">{index + 1}</TableCell>
                  <TableCell className="border" style={{ width: "500px" }}>
                    <TextField
                      style={{ width: "500px" }}
                      fullWidth
                      multiline
                      value={procedure.instructions || ""}
                      onChange={(e) =>
                        handleCoatingProcedureChange(
                          index,
                          "instructions",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditProduction,
                        disabled: !permission.canEditProduction
                      }}
                    />
                  </TableCell>
                  <TableCell className="border">
                    <TextField
                      fullWidth
                      multiline
                      value={procedure.activityCompliance || ""}
                      onChange={(e) =>
                        handleCoatingProcedureChange(
                          index,
                          "activityCompliance",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditProduction,
                        disabled: !permission.canEditProduction
                      }}
                    />
                  </TableCell>
                  <TableCell className="border">
                    <TextField
                      fullWidth
                      multiline
                      value={procedure.performedByOperator || ""}
                      onChange={(e) =>
                        handleCoatingProcedureChange(
                          index,
                          "performedByOperator",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditProduction,
                        disabled: !permission.canEditProduction
                      }}
                    />
                    <TextField
                      fullWidth
                      type="date"
                      value={procedure.pboDate || ""}
                      onChange={(e) =>
                        handleCoatingProcedureChange(
                          index,
                          "pboDate",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditProduction,
                        disabled: !permission.canEditProduction
                      }}
                    />
                  </TableCell>
                  <TableCell className="border">
                    <TextField
                      fullWidth
                      multiline
                      value={procedure.checkedByPO || ""}
                      onChange={(e) =>
                        handleCoatingProcedureChange(
                          index,
                          "checkedByPO",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditProduction,
                        disabled: !permission.canEditProduction
                      }}
                    />
                    <TextField
                      fullWidth
                      type="date"
                      value={procedure.checkedByPODate || ""}
                      onChange={(e) =>
                        handleCoatingProcedureChange(
                          index,
                          "checkedByPODate",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditProduction,
                        disabled: !permission.canEditProduction
                      }}
                    />
                  </TableCell>
                  <TableCell className="border">
                    <TextField
                      fullWidth
                      multiline
                      value={procedure.checkedByQAI || ""}
                      onChange={(e) =>
                        handleCoatingProcedureChange(
                          index,
                          "checkedByQAI",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditQA,
                        disabled: !permission.canEditQA
                      }}
                    />
                    <TextField
                      fullWidth
                      type="date"
                      value={procedure.checkedByQAIDate || ""}
                      onChange={(e) =>
                        handleCoatingProcedureChange(
                          index,
                          "checkedByQAIDate",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditQA,
                        disabled: !permission.canEditQA
                      }}
                    />
                  </TableCell>
                  <TableCell className="border text-center actions-column">
                    <IconButton onClick={() => deleteCoatingProcedureRow(index)} disabled={!permission.canEditProduction}>
                      <DeleteIcon color={permission.canEditProduction ? "error" : "disabled"} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button 
          onClick={addCoatingProcedureRow} 
          variant="contained"
          color="primary" 
          className="mt-4"
        disabled={!permission.canEditProduction}
        >
          Add Row
        </Button>
      </CardContent>
    </Card>
  );
};

export default BatchManufacturingFormPage21;