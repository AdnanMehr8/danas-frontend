// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPrinting } from "../../../../store/printingSlice";
// import { TextFields } from "@mui/icons-material";
// import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

// const BatchPackingFormPage0 = () => {
//   const dispatch = useDispatch();
//   const { docCheckList } = useSelector((state) => state.printing);

//   const handleObservationChange = (index, field, value) => {
//     const updatedObservations = [...docCheckList.status];
//     updatedObservations[index] = {
//       ...updatedObservations[index],
//       [field]: value,
//     };
//     dispatch(
//       setPrinting({
//         docCheckList: {
//           ...docCheckList,
//           status: updatedObservations,
//         },
//       })
//     );
//   };

//   return (
//     <div className="p-4 mb-4">
//       <div className="mb-4">
//       <TableContainer component={Paper}>
//       <Table className="table-auto w-full border-collapse border border-gray-300">
//         <colgroup>
//         <col style={{ width: "5%" }} />
//             <col style={{ width: "50%" }} />
//             <col style={{ width: "15%" }} />
//             <col style={{ width: "15%" }} />
//             <col style={{ width: "15%" }} />
//   </colgroup>
//           <TableHead>
//             <TableRow className="bg-gray-100">
//                 <th className="p-2 text-center">
//                     S.#
//                 </th>
//               <th rowSpan={2} className="border border-gray-300 p-2 text-center">
//                 DOCUMENT CHECK LIST
//               </th>
//               <th colSpan={3} style={{ borderRight: "1px solid #dee2e6", textAlign: "center" }}>STATUS</th>
            
//             </TableRow>
//             <TableRow className="bg-gray-100">
//               <th ></th>
//               <th className="border border-gray-300 p-2 text-center">YES</th>
//               <th className="border border-gray-300 p-2 text-center">NO</th>
//               <th className="border border-gray-300 p-2 text-center">N/A</th>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {docCheckList.status.map(
//               (observation, index) => (
//                 <tr key={index}>
//                         <td
//                             className="border border-gray-300 p-2"
                            
//                         >{index + 1}</td>
//                   <td
//                     className="border border-gray-300 p-2"
//                     style={{ width: "500px" }}
//                   >
//                     <TextField
//                       multiline
//                       fullWidth
//                       style={{ width: "500px" }}
//                       value={observation.parameter}
//                       onChange={(e) =>
//                         handleObservationChange(
//                           index,
//                           "parameter",
//                           e.target.value
//                         )
//                       }
//                       className="w-full  p-1"
//                     />
//                   </td>
//                   <td className="border border-gray-300 p-2 text-center">
//                     <input
//                       style={{ width: "100px" }}
//                       type="radio"
//                       name={`statusDocs-${index}`}
//                       value="OK"
//                       checked={observation.statusDocs === "YES"}
//                       onChange={() =>
//                         handleObservationChange(index, "statusDocs", "YES")
//                       }
//                     />
//                   </td>
//                   <td className="border border-gray-300 p-2 text-center">
//                     <input
//                       style={{ width: "100px" }}
//                       type="radio"
//                       name={`statusDocs-${index}`}
//                       value="Not OK"
//                       checked={observation.statusDocs === "NO"}
//                       onChange={() =>
//                         handleObservationChange(index, "statusDocs", "NO")
//                       }
//                     />
//                   </td>
//                   <td className="border border-gray-300 p-2 text-center">
//                     <input
//                       style={{ width: "100px" }}
//                       type="radio"
//                       name={`statusDocs-${index}`}
//                       value="Not OK"
//                       checked={observation.statusDocs === "N/A"}
//                       onChange={() =>
//                         handleObservationChange(index, "statusDocs", "N/A")
//                       }
//                     />
//                   </td>
//                 </tr>
//               )
//             )}
//           </TableBody>
//         </Table>
//         </TableContainer>
//       </div>

//       <div
//         style={{
//           width: "100%",
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//         className="mt-4"
//       >
//         <div>
//           <p>
//             <strong>Checked by:</strong>
//             <br/>
//             <span>
//             <input
//               value={docCheckList.checkedByDoc || ""}
//               onChange={(e) =>
//                 dispatch(
//                   setPrinting({
//                     docCheckList: {
//                       ...docCheckList,
//                       checkedByDoc: e.target.value,
//                     },
//                   })
//                 )
//               }
//               className="ml-2 border border-gray-300 p-1"
//             />
//           </span>
//           <br/>
//           <stong>Belt / Doc Incharge</stong>
//           </p>
//         </div>
//         <div>
//           <p>
//             <strong>Checked by:</strong>
//             <br/>
//             <span>
//             <input
//               value={docCheckList.checkedbyPPO || ""}
//               onChange={(e) =>
//                 dispatch(
//                   setPrinting({
//                     docCheckList: {
//                       ...docCheckList,
//                       checkedbyPPO: e.target.value,
//                     },
//                   })
//                 )
//               }
//               className="ml-2 border border-gray-300 p-1"
//             />
//           </span>
//           <br/>
//           <stong>Production Packing Officer</stong>
//           </p>
//         </div>
//         <div>
//           <p>
//             <strong>Checked by:</strong>
//             <br/>
//             <span>
//             <input
//               value={docCheckList.checkedByQA || ""}
//               onChange={(e) =>
//                 dispatch(
//                   setPrinting({
//                     docCheckList: {
//                       ...docCheckList,
//                       checkedByQA: e.target.value,
//                     },
//                   })
//                 )
//               }
//               className="ml-2 border border-gray-300 p-1"
//             />
//           </span>
//           <br/>
//           <stong>Q.A Officer</stong>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BatchPackingFormPage0;
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrinting } from "../../../../store/printingSlice";
import { usePermissions } from "../../../../hooks/usePermissions";
import { Button, IconButton } from "@mui/material";
import { TextFields, Delete } from "@mui/icons-material";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

const BatchPackingFormPage0 = ({ isReport }) => {
  const dispatch = useDispatch();
  const { docCheckList } = useSelector((state) => state.printing);
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

  const handleObservationChange = (index, field, value) => {
    // Determine edit permissions based on the field
    const qaFields = ['checkedByQA'];
    const productionFields = ['checkedByDoc', 'checkedbyPPO', 'parameter', 'statusDocs'];

    if (qaFields.includes(field) && !permission.canEditQA) return;
    if (productionFields.includes(field) && !permission.canEditProduction) return;

    const updatedObservations = [...docCheckList.status];
    updatedObservations[index] = {
      ...updatedObservations[index],
      [field]: value,
    };
    dispatch(
      setPrinting({
        docCheckList: {
          ...docCheckList,
          status: updatedObservations,
        },
      })
    );
  };

  // Add new observation row
  const addObservationRow = () => {
    // Only production can add rows
    if (!permission.canEditProduction) return;

    const newRow = {
      parameter: "",
      statusDocs: "",
    };
    dispatch(
      setPrinting({
        docCheckList: {
          ...docCheckList,
          status: [...docCheckList.status, newRow],
        },
      })
    );
  };

  // Delete observation row
  const deleteObservationRow = (index) => {
    // Only production can delete rows
    if (!permission.canEditProduction) return;

    const updatedObservations = docCheckList.status.filter(
      (_, idx) => idx !== index
    );
    dispatch(
      setPrinting({
        docCheckList: {
          ...docCheckList,
          status: updatedObservations,
        },
      })
    );
  };

  return (
    <div className="p-4 mb-4">
      <div className="mb-4">
     
      <Table >
        <colgroup>
          <col style={{ width: "5%" }} />
          <col style={{ width: "50%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
        </colgroup>
          <TableHead>
            <TableRow className="bg-gray-100">
                <th rowSpan={1} className="p-2 border border-gray-300 text-center">
                    S.#
                </th>
              <th rowSpan={2} className="border border-gray-300 p-2 text-center">
                DOCUMENT CHECK LIST
              </th>
                <th colSpan={3} className="border border-gray-300" style={{ textAlign: "center" }}>STATUS</th>
                <th  className="border border-gray-300 p-2 text-center actions-column">
              Actions
            </th>
            </TableRow>
            <TableRow >
              <th className="border border-gray-300 p-2 text-center"></th>
              <th className="border border-gray-300 p-2 text-center">YES</th>
              <th className="border border-gray-300 p-2 text-center">NO</th>
                <th className="border border-gray-300 p-2 text-center">N/A</th>
                
            </TableRow>
          </TableHead>
          <TableBody>
            {docCheckList.status.map(
              (observation, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td
                    className="border border-gray-300 p-2"
                    style={{ width: "500px" }}
                  >
                    <TextField
                      multiline
                      fullWidth
                      style={{ width: "500px" }}
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
                        readOnly: !permission.canEditProduction,
                        disabled: !permission.canEditProduction
                      }}
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <input
                
                      type="radio"
                      name={`statusDocs-${index}`}
                      value="OK"
                      checked={observation.statusDocs === "YES"}
                      onChange={() =>
                        handleObservationChange(index, "statusDocs", "YES")
                      }
                      disabled={!permission.canEditProduction}
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <input
                      
                      type="radio"
                      name={`statusDocs-${index}`}
                      value="Not OK"
                      checked={observation.statusDocs === "NO"}
                      onChange={() =>
                        handleObservationChange(index, "statusDocs", "NO")
                      }
                      disabled={!permission.canEditProduction}
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <input
                    
                      type="radio"
                      name={`statusDocs-${index}`}
                      value="N/A"
                      checked={observation.statusDocs === "N/A"}
                      onChange={() =>
                        handleObservationChange(index, "statusDocs", "N/A")
                      }
                      disabled={!permission.canEditProduction}
                    />
                  </td>
                  {permission.canEditProduction && (
                    <td className="border border-gray-300 p-2 actions-column">
                      <IconButton
                        onClick={() => deleteObservationRow(index)}
                        disabled={!permission.canEditProduction}
                      >
                        <Delete color={permission.canEditProduction ? "error" : "disabled"} />
                      </IconButton>
                    </td>
                  )}
                </tr>
              )
            )}
          </TableBody>
        </Table>
    
        {permission.canEditProduction && (
          <Button
            variant="contained" 
            color="primary" 
            onClick={addObservationRow} 
            className="mt-4"
            disabled={!permission.canEditProduction}
          >
            Add Observation Row
          </Button>
        )}
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
            <strong>Checked by:</strong>
            <br/>
            <span>
            <input
              value={docCheckList.checkedByDoc || ""}
              onChange={(e) =>
                dispatch(
                  setPrinting({
                    docCheckList: {
                      ...docCheckList,
                      checkedByDoc: e.target.value,
                    },
                  })
                )
              }
              className="ml-2 border border-gray-300 p-1"
              readOnly={!permission.canEditProduction}
              disabled={!permission.canEditProduction}
            />
          </span>
          <br/>
          <strong>Belt / Doc Incharge</strong>
          </p>
        </div>
        <div>
          <p>
            <strong>Checked by:</strong>
            <br/>
            <span>
            <input
              value={docCheckList.checkedbyPPO || ""}
              onChange={(e) =>
                dispatch(
                  setPrinting({
                    docCheckList: {
                      ...docCheckList,
                      checkedbyPPO: e.target.value,
                    },
                  })
                )
              }
              className="ml-2 border border-gray-300 p-1"
              readOnly={!permission.canEditProduction}
              disabled={!permission.canEditProduction}
            />
          </span>
          <br/>
          <strong>Production Packing Officer</strong>
          </p>
        </div>
        <div>
          <p>
            <strong>Checked by:</strong>
            <br/>
            <span>
            <input
              value={docCheckList.checkedByQA || ""}
              onChange={(e) =>
                dispatch(
                  setPrinting({
                    docCheckList: {
                      ...docCheckList,
                      checkedByQA: e.target.value,
                    },
                  })
                )
              }
              className="ml-2 border border-gray-300 p-1"
              readOnly={!permission.canEditQA}
              disabled={!permission.canEditQA}
            />
          </span>
          <br/>
          <strong>Q.A Officer</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BatchPackingFormPage0;