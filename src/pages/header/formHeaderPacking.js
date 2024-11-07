import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/g.jpg";
import { setBatchPInfo } from "../../store/batchInfoPackingSlice ";

const FormHeaderPacking = () => {
  const dispatch = useDispatch();
  const batchInfoPacking = useSelector((state) => state.batchInfoPacking);
  const navigate = useNavigate();
  const location = useLocation();
  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;

  useEffect(() => {
    const storedRecord = JSON.parse(localStorage.getItem("batchInfoPackingPacking"));
    if (storedRecord) {
      dispatch(setBatchPInfo(storedRecord));
    }
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in batchInfoPacking.batch) {
      dispatch(
        setBatchPInfo({
          ...batchInfoPacking,
          batch: { ...batchInfoPacking.batch, [name]: value },
        })
      );
    }
  };

  const handleNextPage = async (e) => {
    e.preventDefault();

    const { batch } = batchInfoPacking;

    if (
      !batch.productName ||
      !batch.batchNo ||
      !batch.noOfTablets ||
      !batch.batchSize ||
      !batch.packsSize ||
      !batch.noOfPacks ||
      !batch.expiryDate ||
      !batch.mfgLicense ||
      !batch.productRegNo ||
      !batch.validFrom ||
      !batch.mrpRs
    ) {
      alert("Please fill out all required fields before proceeding.");
      return;
    }

    try {
      const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/batch-info-packing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...batchInfoPacking }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("BatchInfo created:", data);

      if (data && data._id) {
        localStorage.setItem("batchInfoPackingId", data._id);
        console.log("BatchInfo ID stored in localStorage:", data._id);
      }
      
      const processes = JSON.parse(localStorage.getItem("processes"));
      if (processes) {
        const currentProcessIndex = processes.indexOf("form-header-packing");
        if (
          currentProcessIndex !== -1 &&
          currentProcessIndex < processes.length - 1
        ) {
          const nextProcess = processes[currentProcessIndex + 1];
          navigate(`/${nextProcess}`);
        } else {
          console.log("No next process available.");
        }
      }
      
    } catch (error) {
      console.error("Error creating batchInfoPacking:", error);
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
              <div>Batch Packing Record</div>
              <div
                style={{
                  marginTop: "5px",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span>PRODUCT NAME:</span>
                <input
                  type="text"
                  style={{
                    flex: 1,
                    border: "none",
                    fontWeight: "bold",
                    marginLeft: "10px",
                  }}
                  value={batchInfoPacking.batch.productName || ""}
                  name="productName"
                  onChange={handleInputChange}
                />
              </div>
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
                <span>Mfg. License No.:</span>
                <input
                  type="text"
                  name="mfgLicense"
                  value={batchInfoPacking.batch.mfgLicense || ""}
                  onChange={handleInputChange}
                  // className="form-control"
                  style={{ flex: 1, border: "none", marginLeft: "10px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <span>Product Reg. No.:</span>
                <input
                  type="text"
                  name="productRegNo"
                  value={batchInfoPacking.batch.productRegNo || ""}
                  onChange={handleInputChange}
                  // className="form-control"
                  style={{ flex: 1, border: "none", marginLeft: "10px" }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>Valid from:</span>
                <input
                  type="date"
                  name="validFrom"
                  value={batchInfoPacking.batch.validFrom || ""}
                  onChange={handleInputChange}
                  // className="form-control"
                  style={{ flex: 1, border: "none", marginLeft: "10px" }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>M.R.P.Rs:</span>
                <input
                  type="text"
                  name="mrpRs"
                  value={batchInfoPacking.batch.mrpRs || ""}
                  onChange={handleInputChange}
                  // className="form-control"
                  style={{ flex: 1, border: "none", marginLeft: "10px" }}
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
                justifyContent: "space-between",
              }}
            >
              {/* Left side: Batch Info */}
              <div style={{ width: "48%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <label style={{ marginRight: "10px" }}>Batch No.:</label>
                  <input
                    type="text"
                    name="batchNo"
                    value={batchInfoPacking.batch.batchNo || ""}
                    onChange={handleInputChange}
                    style={{ flex: 1, border: "none", width: "100%" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <label style={{ marginRight: "10px" }}>Batch Size:</label>
                  <input
                    type="text"
                    name="batchSize"
                    value={batchInfoPacking.batch.batchSize || ""}
                    onChange={handleInputChange}
                    style={{ flex: 1, border: "none", width: "100%" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label style={{ marginRight: "10px" }}>No. Of Packs:</label>
                  <input
                    type="text"
                    name="noOfPacks"
                    value={batchInfoPacking.batch.noOfPacks || ""}
                    onChange={handleInputChange}
                    style={{ flex: 1, border: "none", width: "100%" }}
                  />
                </div>
              </div>

              {/* Right side: Tablets Info */}
              <div style={{ width: "48%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <label style={{ marginRight: "10px" }}>No. of Tablets:</label>
                  <input
                    type="text"
                    name="noOfTablets"
                    value={batchInfoPacking.batch.noOfTablets || ""}
                    onChange={handleInputChange}
                    style={{ flex: 1, border: "none", width: "100%" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <label style={{ marginRight: "10px" }}>Packs Size:</label>
                  <input
                    type="text"
                    name="packsSize"
                    value={batchInfoPacking.batch.packsSize || ""}
                    onChange={handleInputChange}
                    style={{ flex: 1, border: "none", width: "100%" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label style={{ marginRight: "10px" }}>Expiry Date:</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={batchInfoPacking.batch.expiryDate || ""}
                    onChange={handleInputChange}
                    style={{ flex: 1, border: "none", width: "100%" }}
                  />
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
                <span>Document No.:</span>
                <input
                  type="text"
                  value={"DP/PR/BPS/96"}
                  readOnly
                  style={{ flex: 1, border: "none", marginLeft: "10px" }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>Edition No.:</span>
                <input
                  type="text"
                  value={"00"}
                  readOnly
                  style={{ flex: 1, border: "none", marginLeft: "10px" }}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {location.pathname === "/form-header-packing" && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button onClick={handleNextPage} style={{ padding: "5px 10px" }}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FormHeaderPacking;
