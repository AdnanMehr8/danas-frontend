// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setCompressionRecord } from "../../../../store/compressionSlice";
// import {
//   Card,
//   CardContent,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   IconButton,
// } from "@mui/material";
// import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import "./page15.css";

// export default function BatchManufacturingFormPage15() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const compressionState = useSelector((state) => state.compression);

//   const handleInputChange = (index, field, value) => {
//     const updatedLabels = [...compressionState.checkSheet.labels];

//     if (field.startsWith("weight")) {
//       const weightIndex = parseInt(field.replace("weight", ""), 10) - 1;
//       const updatedWeights = [...updatedLabels[index].weights];
//       updatedWeights[weightIndex] = value;
//       updatedLabels[index] = {
//         ...updatedLabels[index],
//         weights: updatedWeights,
//       };
//     } else {
//       updatedLabels[index] = { ...updatedLabels[index], [field]: value };
//     }

//     dispatch(
//       setCompressionRecord({
//         ...compressionState,
//         checkSheet: {
//           ...compressionState.checkSheet,
//           labels: updatedLabels,
//         },
//       })
//     );
//   };

//   const handleGeneralInputChange = (field, value) => {
//     dispatch(
//       setCompressionRecord({
//         ...compressionState,
//         checkSheet: {
//           ...compressionState.checkSheet,
//           [field]: value,
//         },
//       })
//     );
//   };

//   const handleAddRow = () => {
//     const newRow = {
//       dateAndTime: "",
//       weights: Array(10).fill(""),
//       avgWeightOf10Tabs: "",
//       temp: "",
//       rH: "",
//       PoOrQoa: "",
//     };
//     dispatch(
//       setCompressionRecord({
//         ...compressionState,
//         checkSheet: {
//           ...compressionState.checkSheet,
//           labels: [...compressionState.checkSheet.labels, newRow],
//         },
//       })
//     );
//   };

//   const handleRemoveRow = (index) => {
//     const updatedLabels = compressionState.checkSheet.labels.filter(
//       (_, i) => i !== index
//     );
//     dispatch(
//       setCompressionRecord({
//         ...compressionState,
//         checkSheet: {
//           ...compressionState.checkSheet,
//           labels: updatedLabels,
//         },
//       })
//     );
//   };

//   return (
//     <Card className="max-w-7xl mx-auto">
//       <CardContent>
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           In Process Check Sheet (Weight)
//         </h2>

//         <div className="mb-4">
//           <table cellPadding="5" style={{ width: "100%", textAlign: "center" }}>
//             <tbody>
//               <tr>
//                 <td>
//                   <strong>Upper limit (+): </strong>
//                 </td>
//                 <td colSpan="1">
//                   <TextField
//                     label="Upper Limit"
//                     value={compressionState.checkSheet.upperLimit}
//                     onChange={(e) =>
//                       handleGeneralInputChange("upperLimit", e.target.value)
//                     }
//                     className="w-1/4"
//                     multiline
//                   />
//                 </td>
//                 <td>
//                   <strong>Target weight: </strong>
//                 </td>
//                 <td colSpan="2">
//                   <TextField
//                     label="Target weight"
//                     value={compressionState.checkSheet.targetWeight}
//                     onChange={(e) =>
//                       handleGeneralInputChange("targetWeight", e.target.value)
//                     }
//                     className="w-1/4"
//                     multiline
//                   />
//                 </td>
//                 <td>
//                   <strong>Lower Limit (-): </strong>
//                 </td>
//                 <td colSpan="2">
//                   <TextField
//                     label="Lower Limit"
//                     value={compressionState.checkSheet.lowerLimit}
//                     onChange={(e) =>
//                       handleGeneralInputChange("lowerLimit", e.target.value)
//                     }
//                     className="w-1/4"
//                     multiline
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <strong>Date started: </strong>
//                 </td>
//                 <td colSpan="1">
//                   <TextField
//                     label="Date started"
//                     type="date"
//                     value={compressionState.checkSheet.dateStarted}
//                     onChange={(e) =>
//                       handleGeneralInputChange("dateStarted", e.target.value)
//                     }
//                     className="w-1/4 mt-4"
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </td>
//                 <td>
//                   <strong>Date completed: </strong>
//                 </td>

//                 <td colSpan="1">
//                   <TextField
//                     label="Date completed"
//                     type="date"
//                     value={compressionState.checkSheet.dateCompleted}
//                     onChange={(e) =>
//                       handleGeneralInputChange("dateCompleted", e.target.value)
//                     }
//                     className="w-1/4 mt-4"
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <TableContainer component={Paper}>
//           <Table size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
//                 >
//                   Date & Time
//                 </TableCell>
//                 {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
//                   <TableCell
//                     key={num}
//                     style={{
//                       fontWeight: "bold",
//                       borderRight: "1px solid #ddd",
//                     }}
//                   >
//                     {num}
//                   </TableCell>
//                 ))}
//                 <TableCell
//                   style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
//                 >
//                   Avg. Wt of 10 Tabs
//                 </TableCell>
//                 <TableCell
//                   style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
//                 >
//                   Temp
//                 </TableCell>
//                 <TableCell
//                   style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
//                 >
//                   RH %
//                 </TableCell>
//                 <TableCell
//                   style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
//                 >
//                   P.O/Q.A.O
//                 </TableCell>
//                 <TableCell
//                   style={{ fontWeight: "bold" }}
//                   className="actions-column"
//                 >
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {compressionState.checkSheet.labels.map((row, index) => (
//                 <TableRow key={index}>
//                   <TableCell style={{ borderRight: "1px solid #ddd" }}>
//                     <div style={{ display: "flex", flexDirection: "column" }}>
//                       {/* Date Field */}
//                       <TextField
//                         type="date"
//                         value={row.dateAndTime.split("T")[0]} // Extracts the date part
//                         onChange={(e) =>
//                           handleInputChange(
//                             index,
//                             "dateAndTime",
//                             `${e.target.value}T${row.dateAndTime.split("T")[1]}`
//                           )
//                         }
//                         InputLabelProps={{ shrink: true }}
//                         className="weight"
//                       />
//                       {/* Time Field */}
//                       <TextField
//                         type="time"
//                         value={row.dateAndTime.split("T")[1]} // Extracts the time part
//                         onChange={(e) =>
//                           handleInputChange(
//                             index,
//                             "dateAndTime",
//                             `${row.dateAndTime.split("T")[0]}T${e.target.value}`
//                           )
//                         }
//                         InputLabelProps={{ shrink: true }}
//                         className="weight"
//                       />
//                     </div>
//                   </TableCell>

//                   {row.weights.map((weight, weightIndex) => (
//                     <TableCell
//                       key={weightIndex}
//                       style={{ borderRight: "1px solid #ddd" }}
//                     >
//                       <TextField
//                         fullWidth
//                         multiline
//                         value={weight}
//                         inputProps={{ style: { minWidth: "20px" } }}
//                         onChange={(e) =>
//                           handleInputChange(
//                             index,
//                             `weight${weightIndex + 1}`,
//                             e.target.value
//                           )
//                         }
//                       />
//                     </TableCell>
//                   ))}
//                   <TableCell style={{ borderRight: "1px solid #ddd" }}>
//                     <TextField
//                       fullWidth
//                       multiline
//                       value={row.avgWeightOf10Tabs}
//                       inputProps={{ style: { minWidth: "20px" } }}
//                       onChange={(e) =>
//                         handleInputChange(
//                           index,
//                           "avgWeightOf10Tabs",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </TableCell>
//                   <TableCell style={{ borderRight: "1px solid #ddd" }}>
//                     <TextField
//                       fullWidth
//                       multiline
//                       value={row.temp}
//                       inputProps={{ style: { minWidth: "25px" } }}
//                       onChange={(e) =>
//                         handleInputChange(index, "temp", e.target.value)
//                       }
//                     />
//                   </TableCell>
//                   <TableCell style={{ borderRight: "1px solid #ddd" }}>
//                     <TextField
//                       fullWidth
//                       multiline
//                       value={row.rH}
//                       inputProps={{ style: { minWidth: "25px" } }}
//                       onChange={(e) =>
//                         handleInputChange(index, "rH", e.target.value)
//                       }
//                     />
//                   </TableCell>
//                   <TableCell style={{ borderRight: "1px solid #ddd" }}>
//                     <TextField
//                       fullWidth
//                       multiline
//                       value={row.PoOrQoa}
//                       onChange={(e) =>
//                         handleInputChange(index, "PoOrQoa", e.target.value)
//                       }
//                     />
//                   </TableCell>
//                   <TableCell className="actions-column">
//                     <IconButton onClick={() => handleRemoveRow(index)}>
//                       <RemoveIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <div className="mt-4 flex justify-between items-center">
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<AddIcon />}
//             onClick={handleAddRow}
//           >
//             Add Row
//           </Button>
//         </div>

//         <div className="mt-4">
//           {/* REMARKS: label in bold */}
//           <div>
//             <strong>REMARKS:</strong>
//           </div>
//           {/* TextField for the actual remarks */}
//           <TextField
//             label="" // Remove label since "REMARKS:" is already displayed
//             multiline
//             rows={4}
//             fullWidth
//             value={compressionState.checkSheet.remarks}
//             onChange={(e) =>
//               handleGeneralInputChange("remarks", e.target.value)
//             }
//           />
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompressionRecord } from "../../../../store/compressionSlice";
import {
  Card,
  CardContent,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { usePermissions } from "../../../../hooks/usePermissions";
import "./page15.css";

export default function BatchManufacturingFormPage15({ isReport }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const compressionState = useSelector((state) => state.compression);
  const { hasPermission } = usePermissions();

  const permission = {
    canReadProduction: isReport ? true : hasPermission('production', 'read'),
    canReadQA: isReport ? true : hasPermission('qa', 'read'),
    canEditProduction: isReport ? true : hasPermission('production', 'update'),
    canEditQA: isReport ? true : hasPermission('qa', 'update')
  };
  const handleInputChange = (index, field, value) => {
    // Allow changes if either Production or QA has edit permission
    if (!permission.canEditProduction && !permission.canEditQA) return;

    const updatedLabels = [...compressionState.checkSheet.labels];

    if (field.startsWith("weight")) {
      const weightIndex = parseInt(field.replace("weight", ""), 10) - 1;
      const updatedWeights = [...updatedLabels[index].weights];
      updatedWeights[weightIndex] = value;
      updatedLabels[index] = {
        ...updatedLabels[index],
        weights: updatedWeights,
      };
    } else {
      updatedLabels[index] = { ...updatedLabels[index], [field]: value };
    }

    dispatch(
      setCompressionRecord({
        ...compressionState,
        checkSheet: {
          ...compressionState.checkSheet,
          labels: updatedLabels,
        },
      })
    );
  };

  const handleGeneralInputChange = (field, value) => {
    // General inputs except remarks can be edited by Production
    // Remarks can only be edited by QA
    if (field === 'remarks' && !permission.canEditQA) return;
    if (field !== 'remarks' && !permission.canEditProduction) return;

    dispatch(
      setCompressionRecord({
        ...compressionState,
        checkSheet: {
          ...compressionState.checkSheet,
          [field]: value,
        },
      })
    );
  };

  const handleAddRow = () => {
    // Only allow adding row if Production has edit permission
    if (!permission.canEditProduction) return;

    const newRow = {
      dateAndTime: "",
      weights: Array(10).fill(""),
      avgWeightOf10Tabs: "",
      temp: "",
      rH: "",
      PoOrQoa: "",
    };
    dispatch(
      setCompressionRecord({
        ...compressionState,
        checkSheet: {
          ...compressionState.checkSheet,
          labels: [...compressionState.checkSheet.labels, newRow],
        },
      })
    );
  };

  const handleRemoveRow = (index) => {
    // Only allow removing row if Production has edit permission
    if (!permission.canEditProduction) return;

    const updatedLabels = compressionState.checkSheet.labels.filter(
      (_, i) => i !== index
    );
    dispatch(
      setCompressionRecord({
        ...compressionState,
        checkSheet: {
          ...compressionState.checkSheet,
          labels: updatedLabels,
        },
      })
    );
  };

  // If user cannot read QA, show access denied
  if (!permission.canReadQA) {
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
    <Card className="max-w-7xl mx-auto">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-center">
          In Process Check Sheet (Weight)
        </h2>

        <div className="mb-4">
          <table cellPadding="5" style={{ width: "100%", textAlign: "center" }}>
            <tbody>
              <tr>
                <td>
                  <strong>Upper limit (+): </strong>
                </td>
                <td colSpan="1">
                  <TextField
                    label="Upper Limit"
                    value={compressionState.checkSheet.upperLimit}
                    onChange={(e) =>
                      handleGeneralInputChange("upperLimit", e.target.value)
                    }
                    className="w-1/4"
                    multiline
                    InputProps={{
                      readOnly: !permission.canEditProduction,
                      disabled: !permission.canEditProduction
                    }}
                  />
                </td>
                <td>
                  <strong>Target weight: </strong>
                </td>
                <td colSpan="2">
                  <TextField
                    label="Target weight"
                    value={compressionState.checkSheet.targetWeight}
                    onChange={(e) =>
                      handleGeneralInputChange("targetWeight", e.target.value)
                    }
                    className="w-1/4"
                    multiline
                    InputProps={{
                      readOnly: !permission.canEditProduction,
                      disabled: !permission.canEditProduction
                    }}
                  />
                </td>
                <td>
                  <strong>Lower Limit (-): </strong>
                </td>
                <td colSpan="2">
                  <TextField
                    label="Lower Limit"
                    value={compressionState.checkSheet.lowerLimit}
                    onChange={(e) =>
                      handleGeneralInputChange("lowerLimit", e.target.value)
                    }
                    className="w-1/4"
                    multiline
                    InputProps={{
                      readOnly: !permission.canEditProduction,
                      disabled: !permission.canEditProduction
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Date started: </strong>
                </td>
                <td colSpan="1">
                  <TextField
                    label="Date started"
                    type="date"
                    value={compressionState.checkSheet.dateStarted}
                    onChange={(e) =>
                      handleGeneralInputChange("dateStarted", e.target.value)
                    }
                    className="w-1/4 mt-4"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      readOnly: !permission.canEditProduction,
                      disabled: !permission.canEditProduction
                    }}
                  />
                </td>
                <td>
                  <strong>Date completed: </strong>
                </td>

                <td colSpan="1">
                  <TextField
                    label="Date completed"
                    type="date"
                    value={compressionState.checkSheet.dateCompleted}
                    onChange={(e) =>
                      handleGeneralInputChange("dateCompleted", e.target.value)
                    }
                    className="w-1/4 mt-4"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      readOnly: !permission.canEditProduction,
                      disabled: !permission.canEditProduction
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Date & Time
                </TableCell>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <TableCell
                    key={num}
                    style={{
                      fontWeight: "bold",
                      borderRight: "1px solid #ddd",
                    }}
                  >
                    {num}
                  </TableCell>
                ))}
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Avg. Wt of 10 Tabs
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Temp
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  RH %
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  P.O/Q.A.O
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  className="actions-column"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {compressionState.checkSheet.labels.map((row, index) => (
                <TableRow key={index}>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {/* Date Field */}
                      <TextField
                        type="date"
                        value={row.dateAndTime.split("T")[0]} // Extracts the date part
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "dateAndTime",
                            `${e.target.value}T${row.dateAndTime.split("T")[1]}`
                          )
                        }
                        InputLabelProps={{ shrink: true }}
                        className="weight"
                        InputProps={{
                          readOnly: !permission.canEditProduction && !permission.canEditQA,
                          disabled: !permission.canEditProduction && !permission.canEditQA
                        }}
                      />
                      {/* Time Field */}
                      <TextField
                        type="time"
                        value={row.dateAndTime.split("T")[1]} // Extracts the time part
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "dateAndTime",
                            `${row.dateAndTime.split("T")[0]}T${e.target.value}`
                          )
                        }
                        InputLabelProps={{ shrink: true }}
                        className="weight"
                        InputProps={{
                          readOnly: !permission.canEditProduction && !permission.canEditQA,
                          disabled: !permission.canEditProduction && !permission.canEditQA
                        }}
                      />
                    </div>
                  </TableCell>

                  {row.weights.map((weight, weightIndex) => (
                    <TableCell
                      key={weightIndex}
                      style={{ borderRight: "1px solid #ddd" }}
                    >
                      <TextField
                        fullWidth
                        multiline
                        value={weight}
                        inputProps={{ style: { minWidth: "20px" } }}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            `weight${weightIndex + 1}`,
                            e.target.value
                          )
                        }
                        InputProps={{
                          readOnly: !permission.canEditProduction && !permission.canEditQA,
                          disabled: !permission.canEditProduction && !permission.canEditQA
                        }}
                      />
                    </TableCell>
                  ))}
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.avgWeightOf10Tabs}
                      inputProps={{ style: { minWidth: "20px" } }}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "avgWeightOf10Tabs",
                          e.target.value
                        )
                      }
                      InputProps={{
                        readOnly: !permission.canEditProduction && !permission.canEditQA,
                        disabled: !permission.canEditProduction && !permission.canEditQA
                      }}
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.temp}
                      inputProps={{ style: { minWidth: "25px" } }}
                      onChange={(e) =>
                        handleInputChange(index, "temp", e.target.value)
                      }
                      InputProps={{
                        readOnly: !permission.canEditProduction && !permission.canEditQA,
                        disabled: !permission.canEditProduction && !permission.canEditQA
                      }}
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.rH}
                      inputProps={{ style: { minWidth: "25px" } }}
                      onChange={(e) =>
                        handleInputChange(index, "rH", e.target.value)
                      }
                      InputProps={{
                        readOnly: !permission.canEditProduction && !permission.canEditQA,
                        disabled: !permission.canEditProduction && !permission.canEditQA
                      }}
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.PoOrQoa}
                      onChange={(e) =>
                        handleInputChange(index, "PoOrQoa", e.target.value)
                      }
                      InputProps={{
                        readOnly: !permission.canEditProduction && !permission.canEditQA,
                        disabled: !permission.canEditProduction && !permission.canEditQA
                      }}
                    />
                  </TableCell>
                  <TableCell className="actions-column">
                    <IconButton 
                      onClick={() => handleRemoveRow(index)}
                      disabled={!permission.canEditProduction}
                    >
                      <RemoveIcon color={permission.canEditProduction ? "error" : "disabled"} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="mt-4 flex justify-between items-center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddRow}
            disabled={!permission.canEditProduction}
          >
            Add Row
          </Button>
        </div>

        <div className="mt-4">
           {/* REMARKS: label in bold */}
           <div>
             <strong>REMARKS:</strong>
           </div>
           {/* TextField for the actual remarks */}
          <TextField
            label="" // Remove label since "REMARKS:" is already displayed
            multiline
            rows={4}
            fullWidth
            value={compressionState.checkSheet.remarks}
            onChange={(e) =>
              handleGeneralInputChange("remarks", e.target.value)
            }
            InputProps={{
              readOnly: !permission.canEditQA, // Make readonly if no QC edit permission
              disabled: !permission.canEditQA   // Disable input if no QC edit permission
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}