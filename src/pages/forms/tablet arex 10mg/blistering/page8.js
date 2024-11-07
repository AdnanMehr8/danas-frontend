import React from "react";
import {
  Card,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setBlistering } from "../../../../store/blisteringSlice";

const BatchPackingFormPage8 = () => {
  const dispatch = useDispatch();
  const blisteringRecord = useSelector((state) => state.blistering);

  const handleInputChange = (name, value) => {
    // Update instructions state
    const updatedPrecautions = {
      ...blisteringRecord.instructions,
      [name]: value,
    };

    dispatch(
      setBlistering({
        ...blisteringRecord,
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
                    <strong>Blister Operator: </strong>
                  </td>
                  <td colSpan="2">
                    <input
                      type="text"
                      value={blisteringRecord.instructions.blisterOperator || ""}
                      onChange={(e) => handleInputChange("blisterOperator", e.target.value)}
                      className="ml-2 border border-gray-300 p-1"
                    />
                  </td>
            
                </tr>
                <tr>
                  <td>
                    <strong>Helper: </strong>
                  </td>
                  <td colSpan="2">
                    <input
                      type="text"
                      value={blisteringRecord.instructions.helper || ""}
                      onChange={(e) => handleInputChange("helper", e.target.value)}
                      className="ml-2 border border-gray-300 p-1"
                    />
                  </td>
            
                </tr>
                <tr>
                  <td>
                    <strong>Production Pharmacist: </strong>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={blisteringRecord.instructions.productionPharmacist || ""}
                      onChange={(e) =>
                        handleInputChange("productionPharmacist", e.target.value)
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

export default BatchPackingFormPage8;
