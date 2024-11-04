import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setscCompressionRecord } from "../../../../store/sidikcream/compressionSlice";

const BatchManufacturingFormPage17 = () => {
  const dispatch = useDispatch();
  const { weightOfCompressedTablets, compressionYield } = useSelector(
    (state) => state.sccompression
  );

  const handleWeightChange = (index, field, value) => {
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
      setscCompressionRecord({
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
    const updatedLabels = [...compressionYield.labels];
    updatedLabels[index] = { ...updatedLabels[index], [field]: value };
    dispatch(
      setscCompressionRecord({
        compressionYield: { ...compressionYield, labels: updatedLabels },
      })
    );
  };

  const handleWeighedByChange = (value) => {
    dispatch(
      setscCompressionRecord({
        weightOfCompressedTablets: {
          ...weightOfCompressedTablets,
          weighedBy: value,
        },
      })
    );
  };

  const handleReceivedByChange = (value) => {
    dispatch(
      setscCompressionRecord({
        weightOfCompressedTablets: {
          ...weightOfCompressedTablets,
          receivedBy: value,
        },
      })
    );
  };

  const handlegGranulationPerformedBy = (value) => {
    dispatch(
      setscCompressionRecord({
        compressionYield: { ...compressionYield, performedBy: value },
      })
    );
  };

  const handlegGranulationPerformedByDate = (value) => {
    dispatch(
      setscCompressionRecord({
        compressionYield: { ...compressionYield, performedByDate: value },
      })
    );
  };

  return (
    <div className="p-4 mb-4">
      <h2 className="text-lg font-bold mb-2 mt-6">YEILD OF FILLED TUBES:</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-center">S. No.</th>
            <th className="border border-gray-300 p-2 text-center">
              Description
            </th>
            <th className="border border-gray-300 p-2 text-center">Weight/Qty(Kg, #)</th>
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
                <input
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
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={label.yield}
                  onChange={(e) =>
                    handleGranulationChange(index, "yield", e.target.value)
                  }
                  className="w-full text-center"
                />
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
                    className="text-center w-full"
                  />
                  <input
                    type="date"
                    value={compressionYield.performedByDate}
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

export default BatchManufacturingFormPage17;
