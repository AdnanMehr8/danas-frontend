import React from "react";
import {
  Card,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setBlistering } from "../../../../store/blisteringSlice";
import { usePermissions } from "../../../../hooks/usePermissions";

const BatchPackingFormPage8 = ({ isReport }) => {
  const dispatch = useDispatch();
  const blisteringRecord = useSelector((state) => state.blistering);
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
              - Set the Batch No. and Expiry date on the machine block for embossing and get it checked by Packaging Officer and Q.A Officer as first coded and attached with BPR.
            </div>
            <div>
              - Leak test has to be performed at the starts of machine, after each break and after every 3 hrs.
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
                      disabled={!permission.canEditProduction}
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
                      disabled={!permission.canEditProduction}
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
                      disabled={!permission.canEditProduction}
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
