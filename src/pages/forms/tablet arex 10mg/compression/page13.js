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
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export default function BatchManufacturingFormPage13() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const compressionState = useSelector((state) => state.compression);

//   const handleInputChange = (index, field, value) => {
//     const updatedParameters = [
//       ...compressionState.compressionSpecifications.parameters,
//     ];
//     updatedParameters[index] = { ...updatedParameters[index], [field]: value };

//     dispatch(
//       setCompressionRecord({
//         ...compressionState,
//         compressionSpecifications: {
//           ...compressionState.compressionSpecifications,
//           parameters: updatedParameters,
//         },
//       })
//     );
//   };

//   const handleQACheckChange = (value) => {
//     dispatch(
//       setCompressionRecord({
//         ...compressionState,
//         compressionSpecifications: {
//           ...compressionState.compressionSpecifications,
//           checkedByQA: value,
//         },
//       })
//     );
//   };
//   const handleQADateCheckChange = (value) => {
//     dispatch(
//       setCompressionRecord({
//         ...compressionState,
//         compressionSpecifications: {
//           ...compressionState.compressionSpecifications,
//           checkedByQADate: value,
//         },
//       })
//     );
//   };

//   return (
//     <div className="p-4 mb-4">
//       <h2 className="text-2xl font-bold mb-4 text-center">
//         Compression Specifications:
//       </h2>

//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="text-center border">Parameters</th>
//             <th className="text-center border">Specification</th>
//             <th className="text-center border">Results</th>
//           </tr>
//         </thead>

//         <tbody>
//           {["", "", "", " ", " ", " ", "", " ", ""].map((param, index) => (
//             <tr key={index}>
//               <td className="border border-gray-300 p-2 text-center">
//                 <TextField
//                   value={
//                     compressionState.compressionSpecifications.parameters[index]
//                       ?.parameters || param
//                   }
//                   onChange={(e) =>
//                     handleInputChange(index, "parameters", e.target.value)
//                   }
//                   fullWidth
//                   multiline
//                 />
//               </td>
//               <td className="border border-gray-300 p-2 text-center">
//                 <TextField
//                   fullWidth
//                   multiline
//                   value={
//                     compressionState.compressionSpecifications.parameters[index]
//                       ?.specification || ""
//                   }
//                   onChange={(e) =>
//                     handleInputChange(index, "specification", e.target.value)
//                   }
//                 />
//               </td>
//               <td className="border border-gray-300 p-2 text-center">
//                 <TextField
//                   fullWidth
//                   multiline
//                   value={
//                     compressionState.compressionSpecifications.parameters[index]
//                       ?.results || ""
//                   }
//                   onChange={(e) =>
//                     handleInputChange(index, "results", e.target.value)
//                   }
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {/* </TableContainer> */}

//       <div
//         style={{
//           width: "100%",
//           display: "flex",
//           justifyContent: "space-between",
//           gap: "1000px",
//         }}
//         className="mt-4"
//       >
//         <div className=" mr-4">
//           {" "}
//           {/* Add margin to the right */}
//           <p>Checked by QA</p>
//           <input
//             value={compressionState.compressionSpecifications.checkedByQA}
//             onChange={(e) => handleQACheckChange(e.target.value)}
//           />
//           <input
//             type="date"
//             value={compressionState.compressionSpecifications.checkedByQADate}
//             onChange={(e) => handleQADateCheckChange(e.target.value)}
//           />
//           <br />
//           (Sign & Date)
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompressionRecord } from "../../../../store/compressionSlice";
import {
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { usePermissions } from "../../../../hooks/usePermissions";

export default function BatchManufacturingFormPage13({ isReport }) {
  const dispatch = useDispatch();
  const compressionState = useSelector((state) => state.compression);
  const { hasPermission } = usePermissions();

  const permission = {
    canReadQA: isReport ? true : hasPermission('qa', 'read'),
    canEditQA: isReport ? true : hasPermission('qa', 'update')
  };

  const handleInputChange = (index, field, value) => {
    // Only allow changes if QA has edit permission
    if (!permission.canEditQA) return;

    const updatedParameters = [
      ...compressionState.compressionSpecifications.parameters,
    ];
    updatedParameters[index] = { ...updatedParameters[index], [field]: value };

    dispatch(
      setCompressionRecord({
        ...compressionState,
        compressionSpecifications: {
          ...compressionState.compressionSpecifications,
          parameters: updatedParameters,
        },
      })
    );
  };

  const handleQACheckChange = (value) => {
    if (!permission.canEditQA) return;

    dispatch(
      setCompressionRecord({
        ...compressionState,
        compressionSpecifications: {
          ...compressionState.compressionSpecifications,
          checkedByQA: value,
        },
      })
    );
  };

  const handleQADateCheckChange = (value) => {
    if (!permission.canEditQA) return;

    dispatch(
      setCompressionRecord({
        ...compressionState,
        compressionSpecifications: {
          ...compressionState.compressionSpecifications,
          checkedByQADate: value,
        },
      })
    );
  };

  // Add new row functionality
  const addRow = () => {
    if (!permission.canEditQA) return;

    const newRow = {
      parameters: "",
      specification: "",
      results: "",
    };

    const updatedParameters = [
      ...compressionState.compressionSpecifications.parameters, 
      newRow
    ];

    dispatch(
      setCompressionRecord({
        ...compressionState,
        compressionSpecifications: {
          ...compressionState.compressionSpecifications,
          parameters: updatedParameters,
        },
      })
    );
  };

  // Delete row functionality
  const deleteRow = (index) => {
    if (!permission.canEditQA) return;

    const updatedParameters = compressionState.compressionSpecifications.parameters.filter(
      (_, idx) => idx !== index
    );

    dispatch(
      setCompressionRecord({
        ...compressionState,
        compressionSpecifications: {
          ...compressionState.compressionSpecifications,
          parameters: updatedParameters,
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
    <div className="p-4 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Compression Specifications:
      </h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-center border">Parameters</th>
            <th className="text-center border">Specification</th>
            <th className="text-center border">Results</th>
            <th className="text-center border actions-column">Actions</th>
          </tr>
        </thead>

        <tbody>
          {compressionState.compressionSpecifications.parameters.map((param, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-center">
                <TextField
                  value={param.parameters || ""}
                  onChange={(e) =>
                    handleInputChange(index, "parameters", e.target.value)
                  }
                  fullWidth
                  multiline
                  InputProps={{
                    readOnly: !permission.canEditQA,
                    disabled: !permission.canEditQA
                  }}
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <TextField
                  fullWidth
                  multiline
                  value={param.specification || ""}
                  onChange={(e) =>
                    handleInputChange(index, "specification", e.target.value)
                  }
                  InputProps={{
                    readOnly: !permission.canEditQA,
                    disabled: !permission.canEditQA
                  }}
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <TextField
                  fullWidth
                  multiline
                  value={param.results || ""}
                  onChange={(e) =>
                    handleInputChange(index, "results", e.target.value)
                  }
                  InputProps={{
                    readOnly: !permission.canEditQA,
                    disabled: !permission.canEditQA
                  }}
                />
              </td>
              <td className="border border-gray-300 p-2 text-center actions-column">
                <IconButton 
                  onClick={() => deleteRow(index)}
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
          onClick={addRow} 
          className="mt-4"
          disabled={!permission.canEditQA}
        >
          Add Row
        </Button>

      <div className="flex justify-between mt-4">
        <div className="mr-4">
          <p>Checked by QA</p>
          <input
            value={compressionState.compressionSpecifications.checkedByQA || ""}
            onChange={(e) => handleQACheckChange(e.target.value)}
            InputProps={{
              readOnly: !permission.canEditQA,
              disabled: !permission.canEditQA
            }}
          />
          <input
            type="date"
            value={compressionState.compressionSpecifications.checkedByQADate || ""}
            onChange={(e) => handleQADateCheckChange(e.target.value)}
            InputProps={{
              readOnly: !permission.canEditQA,
              disabled: !permission.canEditQA
            }}
          />
          <p className="text-sm">(Sign & Date)</p>
        </div>
      </div>
    </div>
  );
}