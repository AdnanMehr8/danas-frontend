import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrinting } from "../../../../store/printingSlice";
import { TextField } from "@mui/material";

const BatchPackingFormPage3 = () => {
  const dispatch = useDispatch();
  const { tailLineClearancePrinting, tailLineClearancePrinting2} = useSelector((state) => state.printing);


  const handleFirstChange = (field, value) => {
    dispatch(
      setPrinting({
        tailLineClearancePrinting: {
          ...tailLineClearancePrinting,
          qa: { ...tailLineClearancePrinting, [field]: value },
        },
      })
    );
  };

  const handleSecondChange = (field, value) => {
    dispatch(
      setPrinting({
        tailLineClearancePrinting2: {
          ...tailLineClearancePrinting2,
          qa: { ...tailLineClearancePrinting2, [field]: value },
        },
      })
    );
  };

  return (
    <div className=" p-4 mb-4">
         <div style={{ borderBottom: "2px dotted gray", paddingBottom: "20px", marginBottom: "20px" }}>
              
      <h3 className="text-center">TAIL LINE CLEARANCE OF PRINTING</h3>
        </div>

      <div style={{ borderBottom: "2px dotted gray", paddingBottom: "20px", marginBottom: "20px" }}>
        <table cellPadding="5" style={{ width: "100%", textAlign: "center" }}>
          <tbody>
            <tr>
              <td>
                <strong>Previous Product: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={tailLineClearancePrinting.previousProduct || ""}
                  onChange={(e) => handleFirstChange("previousProduct", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>Batch # </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={tailLineClearancePrinting.previousProductBatchNo || ""}
                  onChange={(e) =>
                    handleFirstChange("previousProductBatchNo", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Line Product: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={tailLineClearancePrinting.lineProduct || ""}
                  onChange={(e) => handleFirstChange("lineProduct", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>Batch # </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={tailLineClearancePrinting.lineProductBatchNo || ""}
                  onChange={(e) =>
                    handleFirstChange("lineProductBatchNo", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Mfg: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="date"
                  value={tailLineClearancePrinting.mfg || ""}
                  onChange={(e) => handleFirstChange("mfg", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>Exp: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="date"
                  value={tailLineClearancePrinting.exp || ""}
                  onChange={(e) =>
                    handleFirstChange("exp", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Price: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={tailLineClearancePrinting.price || ""}
                  onChange={(e) => handleFirstChange("price", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>Date & Time: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="datetime-local"
                  value={tailLineClearancePrinting.date || ""}
                  onChange={(e) =>
                    handleFirstChange("date", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Production: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={tailLineClearancePrinting.productionSignature || ""}
                  onChange={(e) => handleFirstChange("productionSignature", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                />
                  <input
                  type="date"
                  value={tailLineClearancePrinting.pDate || ""}
                  onChange={(e) => handleFirstChange("pDate", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>QA: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={tailLineClearancePrinting.qaSignature || ""}
                  onChange={(e) =>
                    handleFirstChange("qaSignature", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                />
                   <input
                  type="date"
                  value={tailLineClearancePrinting.qaDate || ""}
                  onChange={(e) => handleFirstChange("qaDate", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ borderBottom: "2px dotted gray", paddingBottom: "20px", marginBottom: "20px" }}>
        <table cellPadding="5" style={{ width: "100%", textAlign: "center" }}>
          <tbody>
            <tr>
              <td>
                <strong>Previous Product: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={tailLineClearancePrinting2.previousProduct || ""}
                  onChange={(e) => handleSecondChange("previousProduct", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>Batch # </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={tailLineClearancePrinting2.previousProductBatchNo || ""}
                  onChange={(e) =>
                    handleSecondChange("previousProductBatchNo", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Line Product: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={tailLineClearancePrinting2.lineProduct || ""}
                  onChange={(e) => handleSecondChange("lineProduct", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>Batch # </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={tailLineClearancePrinting2.lineProductBatchNo || ""}
                  onChange={(e) =>
                    handleSecondChange("lineProductBatchNo", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Mfg: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="date"
                  value={tailLineClearancePrinting2.mfg || ""}
                  onChange={(e) => handleSecondChange("mfg", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>Exp: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="date"
                  value={tailLineClearancePrinting2.exp || ""}
                  onChange={(e) =>
                    handleSecondChange("exp", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Price: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={tailLineClearancePrinting2.price || ""}
                  onChange={(e) => handleSecondChange("price", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>Date & Time: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="datetime-local"
                  value={tailLineClearancePrinting2.date || ""}
                  onChange={(e) =>
                    handleSecondChange("date", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Production: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={tailLineClearancePrinting2.productionSignature || ""}
                  onChange={(e) => handleSecondChange("productionSignature", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                />
                  <input
                  type="date"
                  value={tailLineClearancePrinting2.pDate || ""}
                  onChange={(e) => handleFirstChange("pDate", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
              <td>
                <strong>QA: </strong>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  value={tailLineClearancePrinting2.qaSignature || ""}
                  onChange={(e) =>
                    handleSecondChange("qaSignature", e.target.value)
                  }
                  className="ml-2 border border-gray-300 p-1"
                />
                    <input
                  type="date"
                  value={tailLineClearancePrinting2.qaDate || ""}
                  onChange={(e) => handleFirstChange("qaDate", e.target.value)}
                  className="ml-2 border border-gray-300 p-1"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BatchPackingFormPage3;
