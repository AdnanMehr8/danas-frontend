import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPacking } from "../../../../store/packingSlice";
import { TextField } from "@mui/material";

const BatchPackingFormPage15 = () => {
  const dispatch = useDispatch();
  const {  reconcilliationSheet } = useSelector(
    (state) => state.packing
  );


  const handleGranulationChange = (index, field, value) => {
    const updatedLabels = [...reconcilliationSheet.labels];
    updatedLabels[index] = { ...updatedLabels[index], [field]: value };
    dispatch(
      setPacking({
        reconcilliationSheet: { ...reconcilliationSheet, labels: updatedLabels },
      })
    );
  };


  const handlegGranulationPerformedBy = (value) => {
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
    dispatch(
      setPacking({
        reconcilliationSheet: {
          ...reconcilliationSheet,
          remarks: value,
        },
      })
    );
  };
  

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
                style={{ width: "600px" }}
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
                  className="w-full"
                  // aria-rowspan={5}
                  style={{ width: "600px" }}
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <TextField
                  type="text"
                  value={label.reconcillation}
                  onChange={(e) =>
                    handleGranulationChange(index, "reconcillation", e.target.value)
                  }
                  style={{ width: "600px" }}
                  className="w-full text-center"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
  <strong>REMARKS:</strong>
  <TextField
    label=""
    multiline
    rows={4}
    fullWidth
    value={reconcilliationSheet.remarks || ""}
    onChange={(e) => handlegGranulationRemarks(e.target.value)}
  />
</div>
        <div className="mt-4">
  <strong> Production Manager:</strong>
  <input
    type="text"
    value={reconcilliationSheet.productionManager || ""}
    onChange={(e) => handlegGranulationPerformedBy(e.target.value)}
  />
</div>
    </div>
  );
};

export default BatchPackingFormPage15;
