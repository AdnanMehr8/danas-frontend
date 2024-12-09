import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPacking } from "../../../../store/packingSlice";
import { Button, IconButton, TextField } from "@mui/material";
import { usePermissions } from "../../../../hooks/usePermissions";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";


const BatchPackingFormPage15 = ({ isReport }) => {
  const dispatch = useDispatch();
  const {  reconcilliationSheet } = useSelector(
    (state) => state.packing
  );
  const { hasPermission } = usePermissions();
  
  const permission = {
    canReadProduction: isReport ? true : hasPermission('production', 'read'),
    canEditProduction: isReport ? true : hasPermission('production', 'update'),
  };


  const handleGranulationChange = (index, field, value) => {
    if (!permission.canEditProduction) return;

    const updatedLabels = [...reconcilliationSheet.labels];
    updatedLabels[index] = { ...updatedLabels[index], [field]: value };
    dispatch(
      setPacking({
        reconcilliationSheet: { ...reconcilliationSheet, labels: updatedLabels },
      })
    );
  };


  const handlegGranulationPerformedBy = (value) => {
    if (!permission.canEditProduction) return;

    dispatch(
      setPacking({
        reconcilliationSheet: {
          ...reconcilliationSheet,
          productionManager: value,
        },
      })
    );
  };
  
  const handlegGranulationRemarks = (value) => {
    if (!permission.canEditProduction) return;

    dispatch(
      setPacking({
        reconcilliationSheet: {
          ...reconcilliationSheet,
          remarks: value,
        },
      })
    );
  };

// Corrected handleAddRow
const handleAddRow = () => {
  if (!permission.canEditProduction) return;

  const newRow = {
    description: "",
    reconcillation: ""
  };
  dispatch(
    setPacking({
      reconcilliationSheet: {
        ...reconcilliationSheet,
        labels: [...reconcilliationSheet.labels, newRow],
      },
    })
  );
};

// Corrected handleRemoveRow
const handleRemoveRow = (index) => {
  if (!permission.canEditProduction) return;

  const updatedLabels = reconcilliationSheet.labels.filter(
    (_, i) => i !== index
  );
  dispatch(
    setPacking({
      reconcilliationSheet: {
        ...reconcilliationSheet,
        labels: updatedLabels,
      },
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
    <div className="p-4 mb-4">
      <h2 className="text-lg font-bold mb-2 mt-6 text-center">Reconcillation Sheet:</h2>

      <h4 className="text-lg font-bold mb-2 mt-6">Reconcillation Report:</h4>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-center">S. No.</th>
            <th className="border border-gray-300 p-2 text-center">
              Description
            </th>
            <th className="border border-gray-300 p-2 text-center">
            Reconcillation
            </th>
            <th className="border border-gray-300 p-2 text-center actions-column">
            Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {reconcilliationSheet.labels.map((label, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-center">
                {index + 1}
              </td>
              <td
                className="border border-gray-300 p-2"
                // style={{ width: "600px" }}
              >
                <TextField
                  multiline
                  type="text"
                  value={label.description}
                  onChange={(e) =>
                    handleGranulationChange(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  InputProps={{
                    readOnly: !permission.canEditProduction,
                    disabled: !permission.canEditProduction
                  }}
                  className="w-full"
                  // aria-rowspan={5}
                  // style={{ width: "600px" }}
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <TextField
                  type="text"
                  value={label.reconcillation}
                  onChange={(e) =>
                    handleGranulationChange(index, "reconcillation", e.target.value)
                  }
                  InputProps={{
                    readOnly: !permission.canEditProduction,
                    disabled: !permission.canEditProduction
                  }}
                  // style={{ width: "600px" }}
                  className="w-full text-center"
                />
              </td>
              <td className="actions-column">
                    <IconButton onClick={() => handleRemoveRow(index)} disabled={!permission.canEditProduction}>
                      <RemoveIcon />
                    </IconButton>
                  </td>
            </tr>
          ))}
        </tbody>
      </table>

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
  <strong>REMARKS:</strong>
  <TextField
    label=""
    multiline
    rows={4}
    fullWidth
    value={reconcilliationSheet.remarks || ""}
    onChange={(e) => handlegGranulationRemarks(e.target.value)}
    InputProps={{
      readOnly: !permission.canEditProduction,
      disabled: !permission.canEditProduction
    }}
  />
</div>
        <div className="mt-4">
  <strong> Production Manager:</strong>
  <input
    type="text"
    value={reconcilliationSheet.productionManager || ""}
    onChange={(e) => handlegGranulationPerformedBy(e.target.value)}
    disabled={!permission.canEditProduction}
  />
</div>
    </div>
  );
};

export default BatchPackingFormPage15;
