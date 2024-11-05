import React from "react";
import {
  Card,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPrinting } from "../../../../store/printingSlice";

const BatchPackingFormPage4 = () => {
  const dispatch = useDispatch();
  const printingRecord = useSelector((state) => state.printing);

  const handleInputChange = (name, value) => {
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
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchPackingFormPage4;
