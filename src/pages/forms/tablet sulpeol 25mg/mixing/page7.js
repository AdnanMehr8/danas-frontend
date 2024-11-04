import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setsMixingRecord } from "../../../../store/sulpeol/mixingSlice";
import { TextField } from "@mui/material";

const BatchManufacturingFormPage7 = () => {
  const dispatch = useDispatch();
  const { weightOfGranules, granulationYield } = useSelector(
    (state) => state.smixing
  );

  const handleWeightChange = (index, field, value) => {
    const updatedContainers = [...weightOfGranules.containers];
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
      setsMixingRecord({
        weightOfGranules: {
          ...weightOfGranules,
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
    const updatedLabels = [...granulationYield.labels];
    updatedLabels[index] = { ...updatedLabels[index], [field]: value };
    dispatch(
      setsMixingRecord({
        granulationYield: { ...granulationYield, labels: updatedLabels },
      })
    );
  };

  const handleWeighedByChange = (value) => {
    dispatch(
      setsMixingRecord({
        weightOfGranules: { ...weightOfGranules, weighedBy: value },
      })
    );
  };

  const handleReceivedByChange = (value) => {
    dispatch(
      setsMixingRecord({
        weightOfGranules: { ...weightOfGranules, receivedBy: value },
      })
    );
  };

  const handlegGranulationPerformedBy = (value) => {
    dispatch(
      setsMixingRecord({
        granulationYield: { ...granulationYield, performedBy: value },
      })
    );
  };
  const handlegGranulationPerformedByDate = (value) => {
    dispatch(
      setsMixingRecord({
        granulationYield: { ...granulationYield, pbDate: value },
      })
    );
  };

  return (
    <div className="p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">Weight of Granules/Bulk:</h2>
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
          </tr>
        </thead>
        <tbody>
          {weightOfGranules.containers.map((container, index) => (
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
                />
              </td>
            </tr>
          ))}
          <tr>
            <td className="border border-gray-300 p-2 font-bold text-center">
              Total
            </td>
            <td className="border border-gray-300 p-2 text-center">
              {weightOfGranules.total.grossWeight.toFixed(2)}
            </td>
            <td className="border border-gray-300 p-2 text-center">
              {weightOfGranules.total.tareWeight.toFixed(2)}
            </td>
            <td className="border border-gray-300 p-2 text-center">
              {weightOfGranules.total.netWeight.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: "900px",
        }}
        className="mt-4"
      >
        <div className=" mr-4">
          {" "}
          {/* Add margin to the right */}
          <p>Weighed by Granulation Operator:</p>
          <input
            value={weightOfGranules.weighedBy}
            onChange={(e) => handleWeighedByChange(e.target.value)}
          />
        </div>
        <div className=" ml-4">
          {" "}
          {/* Add margin to the left */}
          <p>Received by Compression Operator:</p>
          <input
            value={weightOfGranules.receivedBy}
            onChange={(e) => handleReceivedByChange(e.target.value)}
          />
        </div>
      </div>

      <h2 className="text-lg font-bold mb-2 mt-6">Granulation Yield:</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-center">S. No.</th>
            <th className="border border-gray-300 p-2 text-center">
              Description
            </th>
            <th className="border border-gray-300 p-2 text-center">
              Weight (Kg)
            </th>
            <th className="border border-gray-300 p-2 text-center" colSpan="2">
              Performed by Production Pharmacist (sign & date)
            </th>
          </tr>
        </thead>
        <tbody>
          {granulationYield.labels.map((label, index) => (
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
                <input
                  type="number"
                  value={label.weight}
                  onChange={(e) =>
                    handleGranulationChange(index, "weight", e.target.value)
                  }
                  className="w-full text-center"
                />
              </td>
              {/* Single centralized input fields for "Performed by Production Pharmacist" */}
              {index === 0 && (
                <td
                  className="border border-gray-300 p-2 text-center"
                  rowSpan={granulationYield.labels.length}
                >
                  <input
                    type="text"
                    placeholder="Performed by Production Pharmacist"
                    value={granulationYield.performedBy}
                    onChange={(e) =>
                      handlegGranulationPerformedBy(e.target.value)
                    }
                    className="text-center w-full"
                  />
                  <input
                    type="date"
                    value={granulationYield.pbDate}
                    onChange={(e) =>
                      handlegGranulationPerformedByDate(e.target.value)
                    }
                    className="text-center w-full"
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BatchManufacturingFormPage7;
