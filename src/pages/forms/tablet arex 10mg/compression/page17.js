import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompressionRecord } from "../../../../store/compressionSlice";
import { TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { usePermissions } from "../../../../hooks/usePermissions";

const BatchManufacturingFormPage17 = ({ isReport }) => {
  const dispatch = useDispatch();
  const { weightOfCompressedTablets, compressionYield } = useSelector(
    (state) => state.compression
  );
  const { hasPermission } = usePermissions();

  const permission = {
    canReadProduction: isReport ? true : hasPermission('production', 'read'),
    canEditProduction: isReport ? true : hasPermission('production', 'update'),
  };


  const handleWeightChange = (index, field, value) => {
    if (!permission.canEditProduction) return;

    const updatedContainers = [...weightOfCompressedTablets.containers];
    updatedContainers[index] = { ...updatedContainers[index], [field]: value };

    const totalGrossWeight = updatedContainers.reduce(
      (total, container) => total + parseFloat(container.grossWeight || 0),
      0
    );
    const totalTareWeight = updatedContainers.reduce(
      (total, container) => total + parseFloat(container.tareWeight || 0),
      0
    );
    const totalNetWeight = updatedContainers.reduce(
      (total, container) => total + parseFloat(container.netWeight || 0),
      0
    );

    dispatch(
      setCompressionRecord({
        weightOfCompressedTablets: {
          ...weightOfCompressedTablets,
          containers: updatedContainers,
          total: {
            grossWeight: totalGrossWeight,
            tareWeight: totalTareWeight,
            netWeight: totalNetWeight,
          },
        },
      })
    );
  };

  const handleGranulationChange = (index, field, value) => {
    if (!permission.canEditProduction) return;

    const updatedLabels = [...compressionYield.labels];
    updatedLabels[index] = { ...updatedLabels[index], [field]: value };
    dispatch(
      setCompressionRecord({
        compressionYield: { ...compressionYield, labels: updatedLabels },
      })
    );
  };

  const handleWeighedByChange = (value) => {
    if (!permission.canEditProduction) return;

    dispatch(
      setCompressionRecord({
        weightOfCompressedTablets: {
          ...weightOfCompressedTablets,
          weighedBy: value,
        },
      })
    );
  };

  const handleReceivedByChange = (value) => {
    if (!permission.canEditProduction) return;

    dispatch(
      setCompressionRecord({
        weightOfCompressedTablets: {
          ...weightOfCompressedTablets,
          receivedBy: value,
        },
      })
    );
  };

  const handlegGranulationPerformedBy = (value) => {
    if (!permission.canEditProduction) return;

    dispatch(
      setCompressionRecord({
        compressionYield: { ...compressionYield, performedBy: value },
      })
    );
  };

  const handlegGranulationPerformedByDate = (value) => {
    if (!permission.canEditProduction) return;

    dispatch(
      setCompressionRecord({
        compressionYield: { ...compressionYield, performedByDate: value },
      })
    );
  };

  // Add new container row
  const addContainerRow = () => {
    if (!permission.canEditProduction) return;

    const newContainer = {
      grossWeight: "",
      tareWeight: "",
      netWeight: "",
    };

    const updatedContainers = [
      ...weightOfCompressedTablets.containers, 
      newContainer
    ];

    dispatch(
      setCompressionRecord({
        weightOfCompressedTablets: {
          ...weightOfCompressedTablets,
          containers: updatedContainers,
        },
      })
    );
  };

  // Delete container row
  const deleteContainerRow = (index) => {
    if (!permission.canEditProduction) return;

    const updatedContainers = weightOfCompressedTablets.containers.filter(
      (_, idx) => idx !== index
    );

    const totalGrossWeight = updatedContainers.reduce(
      (total, container) => total + parseFloat(container.grossWeight || 0),
      0
    );
    const totalTareWeight = updatedContainers.reduce(
      (total, container) => total + parseFloat(container.tareWeight || 0),
      0
    );
    const totalNetWeight = updatedContainers.reduce(
      (total, container) => total + parseFloat(container.netWeight || 0),
      0
    );

    dispatch(
      setCompressionRecord({
        weightOfCompressedTablets: {
          ...weightOfCompressedTablets,
          containers: updatedContainers,
          total: {
            grossWeight: totalGrossWeight,
            tareWeight: totalTareWeight,
            netWeight: totalNetWeight,
          },
        },
      })
    );
  };

  // Add new granulation label row
  const addGranulationLabelRow = () => {
    if (!permission.canEditProduction) return;

    const newLabel = {
      description: "",
      weight: "",
    };

    const updatedLabels = [
      ...compressionYield.labels, 
      newLabel
    ];

    dispatch(
      setCompressionRecord({
        compressionYield: { 
          ...compressionYield, 
          labels: updatedLabels 
        },
      })
    );
  };

  // Delete granulation label row
  const deleteGranulationLabelRow = (index) => {
    if (!permission.canEditProduction) return;

    const updatedLabels = compressionYield.labels.filter(
      (_, idx) => idx !== index
    );

    dispatch(
      setCompressionRecord({
        compressionYield: { 
          ...compressionYield, 
          labels: updatedLabels 
        },
      })
    );
  };

  // If user cannot read production, show access denied
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
      <h2 className="text-lg font-bold mb-2"> WEIGHT OF COMPRESSED TABLETS:</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-center">
              Container No.
            </th>
            <th className="border border-gray-300 p-2 text-center">
              Gross Weight (Kg)
            </th>
            <th className="border border-gray-300 p-2 text-center">
              Tare Weight (Kg)
            </th>
            <th className="border border-gray-300 p-2 text-center">
              Net Weight (Kg)
            </th>
            <th className="border border-gray-300 p-2 text-center actions-column">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {weightOfCompressedTablets.containers.map((container, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <input
                  type="number"
                  value={container.grossWeight}
                  onChange={(e) =>
                    handleWeightChange(index, "grossWeight", e.target.value)
                  }
                  className="w-full text-center"
                  disabled={!permission.canEditProduction}
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <input
                  type="number"
                  value={container.tareWeight}
                  onChange={(e) =>
                    handleWeightChange(index, "tareWeight", e.target.value)
                  }
                  className="w-full text-center"
                  disabled={!permission.canEditProduction}
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <input
                  type="number"
                  value={container.netWeight}
                  onChange={(e) =>
                    handleWeightChange(index, "netWeight", e.target.value)
                  }
                  className="w-full text-center"
                  disabled={!permission.canEditProduction}
                />
              </td>
              <td className="border border-gray-300 p-2 text-center actions-column">
                <IconButton 
                  onClick={() => deleteContainerRow(index)}
                  disabled={!permission.canEditProduction}
                >
                  <DeleteIcon color={permission.canEditProduction ? "error" : "disabled"} />
                </IconButton>
              </td>
            </tr>
          ))}
          <tr>
            <td className="border border-gray-300 p-2 font-bold text-center">
              Total
            </td>
            <td className="border border-gray-300 p-2 text-center">
              {weightOfCompressedTablets.total.grossWeight.toFixed(2)}
            </td>
            <td className="border border-gray-300 p-2 text-center">
              {weightOfCompressedTablets.total.tareWeight.toFixed(2)}
            </td>
            <td className="border border-gray-300 p-2 text-center">
              {weightOfCompressedTablets.total.netWeight.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={addContainerRow} 
        className="mt-4"
        disabled={!permission.canEditProduction}
      >
        Add Container Row
      </Button>


      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: "600px",
        }}
        className="mt-4"
      >
        <div className=" mr-4">
          {" "}
          {/* Add margin to the right */}
          <p>Weighed by:</p>
          <input
            value={weightOfCompressedTablets.weighedBy}
            onChange={(e) => handleWeighedByChange(e.target.value)}
            disabled={!permission.canEditProduction}
            
          />
        </div>
        <div className=" ">
          {" "}
          {/* Add margin to the left */}
          <p>Received by:</p>
          <input
            value={weightOfCompressedTablets.receivedBy}
            onChange={(e) => handleReceivedByChange(e.target.value)}
            disabled={!permission.canEditProduction}

          />
        </div>
      </div>

      <h2 className="text-lg font-bold mb-2 mt-6">Compression Yield:</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-center">S. No.</th>
            <th className="border border-gray-300 p-2 text-center">
              Description
            </th>
            <th className="border border-gray-300 p-2 text-center">Yield</th>
            <th className="border border-gray-300 p-2 text-center actions-column">
              Actions
            </th>
            <th className="border border-gray-300 p-2 text-center" colSpan="2">
              Performed by Production Pharmacist (sign & date)
            </th>
          </tr>
        </thead>
        <tbody>
          {compressionYield.labels.map((label, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 p-2">
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
                  InputProps={{
                    readOnly: !permission.canEditProduction,
                    disabled: !permission.canEditProduction
                  }}
                />
              </td>
              <td
                style={{ width: "300px" }}
                className="border border-gray-300 p-2">
                <TextField
                  multiline
                  type="text"
                style={{ width: "300px" }}
                  value={label.yield}
                  onChange={(e) =>
                    handleGranulationChange(index, "yield", e.target.value)
                  }
                  className="w-full text-center"
                  InputProps={{
                    readOnly: !permission.canEditProduction,
                    disabled: !permission.canEditProduction
                  }}
                />
              </td>
              <td className="border border-gray-300 p-2 text-center actions-column">
                <IconButton 
                  onClick={() => deleteGranulationLabelRow(index)}
                  disabled={!permission.canEditProduction}
                >
                  <DeleteIcon color={permission.canEditProduction ? "error" : "disabled"} />
                </IconButton>
              </td>
              {/* Single centralized input fields for "Performed by Production Pharmacist" */}
              {index === 0 && (
                <td
                  className="border border-gray-300 p-2 text-center"
                  rowSpan={compressionYield.labels.length}
                >
                  <input
                    type="text"
                    placeholder="Performed by Production Pharmacist"
                    value={compressionYield.performedBy}
                    onChange={(e) =>
                      handlegGranulationPerformedBy(e.target.value)
                    }
                    disabled={!permission.canEditProduction}
                    className="text-center w-full"
                  />
                  <input
                    type="date"
                    value={compressionYield.performedByDate}
                    onChange={(e) =>
                      handlegGranulationPerformedByDate(e.target.value)
                    }
                    disabled={!permission.canEditProduction}
                    className="text-center w-full"
                  />
                </td>
              )}
             
            </tr>
          ))}
        </tbody>
      </table>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={addGranulationLabelRow} 
        className="mt-4"
        disabled={!permission.canEditProduction}
      >
        Add Granulation Label Row
      </Button>
    </div>
  );
};

export default BatchManufacturingFormPage17;
