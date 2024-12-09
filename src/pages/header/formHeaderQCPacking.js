import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setPacking } from "../../store/packingSlice";
import logo from "../../assets/g.jpg";
import { setDispensing } from "../../store/dispensingSlice";
import { TextField } from "@mui/material";
import { usePermissions } from "../../hooks/usePermissions";

const FormHeaderQCPacking = () => {
  const dispatch = useDispatch();
  const batchInfo = useSelector((state) => state.packing.qcHeader);
  const navigate = useNavigate();
  const location = useLocation();
  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;
  const { hasPermission } = usePermissions();
  
  const permission = {
    canReadQC: hasPermission('qc', 'read'),
    canEditQC: hasPermission('qc', 'update'),
  };

  const handleInputChange = (e) => {
    if (!permission.canEditQC) return;

    const { name, value } = e.target;
    if (name in batchInfo) {
      dispatch(
        setPacking({
          ...batchInfo,
          qcHeader: { ...batchInfo, [name]: value },
        }),
      );
    }
  };

  return (
    <div
      className="batch-batchInfo"
      style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "10px",
          tableLayout: "fixed",
        }}
      >
        <tbody>
          <tr>
            {/* Logo TD with rowspan to span both rows */}
            <td
              style={{
                width: "10%",
                border: "1px solid black",
                textAlign: "center",
                padding: "10px",
                verticalAlign: "middle",
              }}
              rowSpan="2"
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "50px", height: "50px" }}
              />
            </td>
            {/* Product name and title */}
            <td
              style={{
                width: "60%",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "18px",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              <div>DANAS Pharmaceuticals (Pvt) <br/> Ltd <br/> Quality Control Laboratory</div>
              
            </td>
            {/* License and product details */}
            <td
              style={{
                width: "30%",
                fontSize: "12px",
                border: "1px solid black",
                padding: "5px",
                verticalAlign: "top",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <span>Document No.</span>
                <input
                  type="text"
                  name="docNo"
                  value={batchInfo.docNo || ""}
                  onChange={handleInputChange}
                  // className="form-control"
                  style={{ flex: 1, border: "none", marginLeft: "10px" }}
                  disabled={!permission.canEditQC}
                  readOnly={!permission.canEditQC}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <span>Effecitve Date</span>
                <input
                  type="text"
                  name="effectiveDate"
                  value={batchInfo.effectiveDate || ""}
                  onChange={handleInputChange}
                  // className="form-control"
                  style={{ flex: 1, border: "none", marginLeft: "10px" }}
                  disabled={!permission.canEditQC}
                  readOnly={!permission.canEditQC}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>Revision No.</span>
                <input
                  type="text"
                  name="revisionNo"
                  value={batchInfo.revisionNo || ""}
                  onChange={handleInputChange}
                  // className="form-control"
                  style={{ flex: 1, border: "none", marginLeft: "10px" }}
                  disabled={!permission.canEditQC}
                  readOnly={!permission.canEditQC}
                  
                />
              </div>
            </td>
          </tr>
          <tr style={{ border: "1px solid black" }}>
            {/* Batch and Tablets Info in the same cell using flexbox */}
            <td
              style={{
                fontSize: "12px",
                padding: "5px",
                verticalAlign: "top",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* Left side: Batch Info */}
              <div >
                <div
                  style={{
                    // display: "flex",
                    // alignItems: "center",
                    // marginBottom: "5px",
                    justifyItems: "center"

                  }}
                >
                  CERTIFICATE OF ANALYSIS
                  <br />
                  <strong>INPROCESS <br/> (TABLETS, CAPSULES, OCL & INJ) <br/> (BULK, CORE, COATED, FILLED)</strong>
                 
                </div>
                
              </div>
            </td>
            {/* Document info */}
            <td
              style={{
                fontSize: "12px",
                border: "1px solid black",
                padding: "5px",
                verticalAlign: "top",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <span>Replaces</span>
                <TextField
                  type="text"
                  value={batchInfo.replaces || ""}
                  onChange={handleInputChange}
                  name="replaces"
                  multiline
                  style={{ flex: 1, border: "none", marginLeft: "10px" }}
                  disabled={!permission.canEditQC}
                  readOnly={!permission.canEditQC}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FormHeaderQCPacking;
