import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setBatchInfo } from "../../store/sulpeol/batchInfoSlice";
import logo from "../../assets/g.jpg";

const FormHeaderSulpeol = () => {
  const dispatch = useDispatch();
  const batchInfo = useSelector((state) => state.batchInfo);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedRecord = JSON.parse(localStorage.getItem("batchInfo"));
    if (storedRecord) {
      dispatch(setBatchInfo(storedRecord));
    }
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in batchInfo.batch) {
      dispatch(
        setBatchInfo({
          ...batchInfo,
          batch: { ...batchInfo.batch, [name]: value },
        })
      );
    }
  };

  const handleNextPage = async (e) => {
    e.preventDefault();

    const { batch } = batchInfo;

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
      !batch.validFrom
    ) {
      alert("Please fill out all required fields before proceeding.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/batch-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...batchInfo }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("BatchInfo created:", data);

      if (data && data._id) {
        localStorage.setItem("s-batchInfoId", data._id);
        console.log("BatchInfo ID stored in localStorage:", data._id);
      }

      navigate("/dragProcesses");
    } catch (error) {
      console.error("Error creating batchInfo:", error);
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
              <div>Batch Manufacturing Record</div>
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
                  value={batchInfo.batch.productName || ""}
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
                  value={batchInfo.batch.mfgLicense || ""}
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
                  value={batchInfo.batch.productRegNo || ""}
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
                  value={batchInfo.batch.validFrom || ""}
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
                    value={batchInfo.batch.batchNo || ""}
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
                    value={batchInfo.batch.batchSize || ""}
                    onChange={handleInputChange}
                    style={{ flex: 1, border: "none", width: "100%" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label style={{ marginRight: "10px" }}>No. Of Packs:</label>
                  <input
                    type="text"
                    name="noOfPacks"
                    value={batchInfo.batch.noOfPacks || ""}
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
                    value={batchInfo.batch.noOfTablets || ""}
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
                    value={batchInfo.batch.packsSize || ""}
                    onChange={handleInputChange}
                    style={{ flex: 1, border: "none", width: "100%" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label style={{ marginRight: "10px" }}>Expiry Date:</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={batchInfo.batch.expiryDate || ""}
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
                  value={"DP/PR/BPS/87"}
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

      {location.pathname === "/form-header-sulpeol" && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button onClick={handleNextPage} style={{ padding: "5px 10px" }}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FormHeaderSulpeol;
