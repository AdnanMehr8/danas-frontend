import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormHeader from "../../../header/formHeader";
import { setCoatingRecord } from "../../../../store/coatingSlice";
import axios from "axios";

const BatchManufacturingFormPage19 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const coatingRecord = useSelector((state) => state.coating); // Access the compression state
  const [equipmentData, setEquipmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [equipmentCode, setEquipmentCode] = useState("");
  const [equipmentCapacity, setEquipmentCapacity] = useState("");

  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/equipment");
        setEquipmentData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipmentData();
  }, []);

  const handleEquipmentChange = (e, index) => {
    const equipmentName = e.target.value;
    const selectedItem = equipmentData
      .flatMap((equip) => equip.equipmentList)
      .find((item) => item.Equipment_Name === equipmentName);

    const updatedLineClearance = coatingRecord.lineClearance.map((item, i) => {
      if (i === index && selectedItem) {
        return {
          ...item,
          equipment: equipmentName,
          equipmentId: selectedItem.Equipment_Code,
          equipmentCapacity: selectedItem.Capacity,
        };
      }
      return item;
    });

    dispatch(
      setCoatingRecord({
        ...coatingRecord,
        lineClearance: updatedLineClearance,
      })
    );
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    // Update precautions state
    const updatedPrecautions = {
      ...coatingRecord.precautions,
      [name]: value,
    };

    // Check if line clearance update is necessary
    const updatedLineClearance = coatingRecord.lineClearance.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );

    dispatch(
      setCoatingRecord({
        ...coatingRecord,
        precautions: updatedPrecautions,
        lineClearance: updatedLineClearance,
      })
    );
  };

  const addRow = () => {
    const newLineClearanceRecord = {
      equipment: "",
      equipmentId: "",
      equipmentCapacity: "",
      previousProduct: "",
      batchNo: "",
      cleanedBy: "",
      checkedBy: "",
      verifiedBy: "",
    };
    dispatch(
      setCoatingRecord({
        ...coatingRecord,
        lineClearance: [...coatingRecord.lineClearance, newLineClearanceRecord],
      })
    );
  };
  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent>
        <div className="mt-6">
          <div className="mt-6">
            <h5 className="text-lg font-semibold mt-5">
              General instructions and precautions for coating:
            </h5>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            {/* <span style={{ display: "flex", alignItems: "center" }}>
              - Area is properly cleaned, no material from previous batch present in the area. (e.g. Product, Documents, etc.)
              <TextField
                label="SOP"
                name="sop"
                value="DP/PRD/SOP/092"
                style={{ marginLeft: "0.5rem", margin: 0 }}
              />
            </span> */}
            <div>
              - Area is properly cleaned, no material from previous batch
              present in the area. (e.g. Product, Documents, etc.)
            </div>
            <div>
              - Staff properly attired. (Wear factory uniform and appropriate
              personnel protective equipment).
            </div>
            <div>- Relevant documents / materials are present in the area.</div>
            <div>- All relevant logbooks are filled.</div>
            <div>
              - Before compression, carefully check the followings:
              <ul>
                <li>
                  a) Machine and utensils to be used are clean. Punches and dies
                  are in accordance with the product specification.
                </li>
                <li>
                  b) Product collecting container/trays are clean and properly
                  labeled.
                </li>
                <li>c) BMR, SOPs are in place.</li>
                <li>
                  d) All containers of granules are duly labeled and released by
                  QC.
                </li>
                <li>e) Dust collector/exhaust system is working.</li>
              </ul>
            </div>

            <div>- The room has the required temperature and humidity.</div>
            <div>- Appropriate balance is available and calibrated.</div>
            <span style={{ display: "flex", alignItems: "center" }}>
              - Section
              <TextField
                label="Section"
                name="section"
                value={coatingRecord.precautions.section || ""}
                style={{ marginLeft: "0.5rem", margin: 0 }}
                onChange={handleInputChange}
                multiline
              />
              Area
              <TextField
                label="Area"
                name="specificArea"
                value={coatingRecord.precautions.specificArea || ""}
                style={{ marginLeft: "0.5rem", margin: 7 }}
                onChange={handleInputChange}
                multiline
              />
            </span>
          </div>

          <div
            className=" mt-4"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <strong>
              <span style={{ display: "flex", alignItems: "center" }}>
                I HAVE READ AND UNDERSTOOD ALL THE PRECAUTIONS.
                <TextField
                  label="In-charge Production/ Production Pharmacist"
                  name="precautionsRead"
                  value={coatingRecord.precautions.precautionsRead}
                  style={{ marginLeft: "1rem", margin: 0 }}
                  onChange={handleInputChange}
                  multiline
                />
              </span>
            </strong>
          </div>
        </div>

        <div className="mt-6">
          <h5 className="text-lg font-semibold mt-5">
            LINE CLEARANCE OF EQUIPMENT:
          </h5>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      borderRight: "1px solid #ccc",
                    }}
                    className="text-center"
                  >
                    Equipment
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      borderRight: "1px solid #ccc",
                    }}
                    className="text-center"
                  >
                    Equipment ID
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      borderRight: "1px solid #ccc",
                    }}
                    className="text-center"
                  >
                    Capacity
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      borderRight: "1px solid #ccc",
                    }}
                    className="text-center"
                  >
                    Previous Product
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      borderRight: "1px solid #ccc",
                    }}
                    className="text-center"
                  >
                    Batch No.
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      borderRight: "1px solid #ccc",
                    }}
                    className="text-center"
                  >
                    Cleaned By Operator (Sign & Date)
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      borderRight: "1px solid #ccc",
                    }}
                    className="text-center"
                  >
                    Checked By Production Pharmacist (Sign & Date)
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      borderRight: "1px solid #ccc",
                    }}
                    className="text-center"
                  >
                    Verified By QA (Sign & Date)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coatingRecord.lineClearance.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>
                      <input
                        style={{
                          width: "350px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        list="equipment-names"
                        name="equipment"
                        // className="form-control"
                        value={item.equipment}
                        onChange={(e) => handleEquipmentChange(e, index)}
                        placeholder="Search equipment name..."
                      />
                      <datalist id="equipment-names">
                        {equipmentData
                          .flatMap((equip) => equip.equipmentList)
                          .map((equipItem, index) => (
                            <option
                              key={`${equipItem.Equipment_Code}-${index}`}
                              value={equipItem.Equipment_Name}
                            >
                              {`${equipItem.Equipment_Name} (Capacity: ${equipItem.Capacity})`}
                            </option>
                          ))}
                      </datalist>
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>
                      <TextField
                        value={item.equipmentId || "N/A"}
                        fullWidth
                        readOnly
                        multiline
                      />
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>
                      <TextField
                        value={item.equipmentCapacity || "N/A"}
                        fullWidth
                        readOnly
                        multiline
                      />
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>
                      <TextField
                        name="previousProduct"
                        value={item.previousProduct || ""}
                        fullWidth
                        multiline
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>
                      <TextField
                        name="batchNo"
                        value={item.batchNo || ""}
                        style={{ width: "70px" }}
                        fullWidth
                        multiline
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </TableCell>
                    <TableCell
                      style={{ borderRight: "1px solid #ccc", width: "150px" }}
                    >
                      <TextField
                        style={{ width: "150px" }}
                        name="cleanedBy"
                        value={item.cleanedBy || ""}
                        fullWidth
                        multiline
                        onChange={(e) => handleInputChange(e, index)}
                      />
                      <TextField
                        style={{ width: "150px" }}
                        type="date"
                        name="clDate"
                        value={item.clDate || ""}
                        fullWidth
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>
                      <TextField
                        style={{ width: "150px" }}
                        name="checkedBy"
                        value={item.checkedBy || ""}
                        fullWidth
                        multiline
                        onChange={(e) => handleInputChange(e, index)}
                      />
                      <TextField
                        style={{ width: "150px" }}
                        type="date"
                        name="chDate"
                        value={item.chDate || ""}
                        fullWidth
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>
                      <TextField
                        name="verifiedBy"
                        style={{ width: "150px" }}
                        value={item.verifiedBy || ""}
                        fullWidth
                        multiline
                        onChange={(e) => handleInputChange(e, index)}
                      />
                      <TextField
                        type="date"
                        style={{ width: "150px" }}
                        name="vDate"
                        value={item.vDate || ""}
                        fullWidth
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button variant="contained" color="primary" onClick={addRow}>
            Add Row
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchManufacturingFormPage19;
