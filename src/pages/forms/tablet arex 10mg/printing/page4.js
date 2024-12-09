// import React from "react";
// import {
//   Card,
//   CardContent,
//   TextField,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { setPrinting } from "../../../../store/printingSlice";

// const BatchPackingFormPage4 = () => {
//   const dispatch = useDispatch();
//   const printingRecord = useSelector((state) => state.printing);

//   const handleInputChange = (name, value) => {
//     // Update instructions state
//     const updatedPrecautions = {
//       ...printingRecord.instructions,
//       [name]: value,
//     };

//     dispatch(
//       setPrinting({
//         ...printingRecord,
//         instructions: updatedPrecautions,
//       })
//     );
//   };

//   return (
//     <Card className="max-w-4xl mx-auto">
//       <CardContent>
//         <div className="mt-6">
//           <h5 className="text-lg font-semibold mt-5">
//             Instructions for Over Printing of Unit Cartons on Printing Machines:
//           </h5>
//           <div style={{ marginBottom: "1rem" }}>
//             <div>
//               - Check Batch No. / Mfg. Date / Expiry Date / Retail Price/Barcode/GTIN.
//             </div>
//             <div>
//               - Attach first coded carton with BPR duly signed by packaging officer & Q.A officer.
//             </div>
//           </div>
//           <div className="mb-4">
//             <table cellPadding="5" style={{ width: "100%", textAlign: "center" }}>
//               <tbody>
//                 <tr>
//                   <td>
//                     <strong>Coding Operator: </strong>
//                   </td>
//                   <td colSpan="2">
//                     <input
//                       type="text"
//                       value={printingRecord.instructions.codingOperator || ""}
//                       onChange={(e) => handleInputChange("codingOperator", e.target.value)}
//                       className="ml-2 border border-gray-300 p-1"
//                     />
//                   </td>
//                   <td>
//                     <strong>Coding Checker: </strong>
//                   </td>
//                   <td colSpan="2">
//                     <input
//                       type="text"
//                       value={printingRecord.instructions.codingChecker || ""}
//                       onChange={(e) =>
//                         handleInputChange("codingChecker", e.target.value)
//                       }
//                       className="ml-2 border border-gray-300 p-1"
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td colSpan="3"></td> {/* Empty cells to align Production Officer under Coding Checker */}
//                   <td>
//                     <strong>Production Officer: </strong>
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={printingRecord.instructions.productionOfficer || ""}
//                       onChange={(e) =>
//                         handleInputChange("productionOfficer", e.target.value)
//                       }
//                       className="ml-2 border border-gray-300 p-1"
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div style={{marginTop: "7rem"}}>
//           <TextField
//             label="Paste UC stamp Or label Stamp" // Remove label since "REMARKS:" is already displayed
//             multiline
//             fullWidth
//             rows={19}
//           />
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default BatchPackingFormPage4;


import React from "react";
import {
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPrinting } from "../../../../store/printingSlice";
import { usePermissions } from "../../../../hooks/usePermissions";

const BatchPackingFormPage4 = ({ isReport }) => {
  const dispatch = useDispatch();
  const printingRecord = useSelector((state) => state.printing);
  const { hasPermission } = usePermissions();
  
  const permission = {
    canReadProduction: isReport ? true : hasPermission('production', 'read'),
    canEditProduction: isReport ? true : hasPermission('production', 'update'),
  };

  const handleInputChange = (name, value) => {
    // Only allow changes if user has production control
    if (!permission.canEditProduction) return;

    // Update instructions state
    const updatedPrecautions = {
      ...printingRecord.instructions,
      [name]: value,
    };

    dispatch(
      setPrinting({
        ...printingRecord,
        instructions: updatedPrecautions,
      })
    );
  };

  // If user cannot read, return null or a no access message
  if (!permission.canReadProduction) {
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
        <div className="mt-6">
          <h5 className="text-lg font-semibold mt-5">
            Instructions for Over Printing of Unit Cartons on Printing Machines:
          </h5>
          <div style={{ marginBottom: "1rem" }}>
            <div>
              - Check Batch No. / Mfg. Date / Expiry Date / Retail Price/Barcode/GTIN.
            </div>
            <div>
              - Attach first coded carton with BPR duly signed by packaging officer & Q.A officer.
            </div>
          </div>
          <div className="mb-4">
            <table cellPadding="5" style={{ width: "100%", textAlign: "center" }}>
              <tbody>
                <tr>
                  <td>
                    <strong>Coding Operator: </strong>
                  </td>
                  <td colSpan="2">
                    <input
                      type="text"
                      value={printingRecord.instructions.codingOperator || ""}
                      onChange={(e) => handleInputChange("codingOperator", e.target.value)}
                      className="ml-2 border border-gray-300 p-1"
                      disabled={!permission.canEditProduction}
                    />
                  </td>
                  <td>
                    <strong>Coding Checker: </strong>
                  </td>
                  <td colSpan="2">
                    <input
                      type="text"
                      value={printingRecord.instructions.codingChecker || ""}
                      onChange={(e) =>
                        handleInputChange("codingChecker", e.target.value)
                      }
                      className="ml-2 border border-gray-300 p-1"
                      disabled={!permission.canEditProduction}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="3"></td> {/* Empty cells to align Production Officer under Coding Checker */}
                  <td>
                    <strong>Production Officer: </strong>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={printingRecord.instructions.productionOfficer || ""}
                      onChange={(e) =>
                        handleInputChange("productionOfficer", e.target.value)
                      }
                      className="ml-2 border border-gray-300 p-1"
                      disabled={!permission.canEditProduction}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{marginTop: "7rem"}}>
          <TextField
            label="Paste UC stamp Or label Stamp"
            multiline
            fullWidth
            rows={19}
            value={printingRecord.instructions.ucStamp || ""}
            onChange={(e) => handleInputChange("ucStamp", e.target.value)}
            disabled={!permission.canEditProduction}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchPackingFormPage4;