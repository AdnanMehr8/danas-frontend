import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMixingRecord } from "../../../../store/mixingSlice";
import axios from "axios";
import { usePermissions } from "../../../../hooks/usePermissions";

const BatchManufacturingFormPage4 = ({ isReport }) => {
  const dispatch = useDispatch();
  const mixingRecord = useSelector((state) => state.mixing);
  const { hasPermission } = usePermissions();

  const permission = {
    canReadProduction: isReport ? true : hasPermission('production', 'read'),
    canReadQA: isReport ? true : hasPermission('qa', 'read'),
    canEditProduction: isReport ? true : hasPermission('production', 'update'),
    canEditQA: isReport ? true : hasPermission('qa', 'update')
  };

  const [equipmentData, setEquipmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [equipmentCode, setEquipmentCode] = useState("");
  const [equipmentCapacity, setEquipmentCapacity] = useState("");
  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;

  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        const response = await axios.get(`${REACT_APP_INTERNAL_API_PATH}/api/equipment `);
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
    if (!permission.canEditProduction) return;

    const equipmentName = e.target.value;
    const selectedItem = equipmentData
      .flatMap((equip) => equip.equipmentList)
      .find((item) => item.Equipment_Name === equipmentName);

    const updatedLineClearance = mixingRecord.lineClearance.map((item, i) => {
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
      setMixingRecord({ ...mixingRecord, lineClearance: updatedLineClearance })
    );
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

     // Determine if the field is QA-specific or production-specific
     const qaFields = ['verifiedBy', 'vDate'];
     const productionFields = [
       'previousProduct', 'batchNo', 'cleanedBy', 'clDate', 
       'checkedBy', 'chDate'
     ];
 
     // Check permissions based on the field
     if ((qaFields.includes(name) && !permission.canEditQA) ||
         (productionFields.includes(name) && !permission.canEditProduction)) {
       return;
    }
    
    // Update precautions state
    const updatedPrecautions = {
      ...mixingRecord.precautions,
      [name]: value,
    };

    // Check if line clearance update is necessary
    const updatedLineClearance = mixingRecord.lineClearance.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );

    dispatch(
      setMixingRecord({
        ...mixingRecord,
        precautions: updatedPrecautions,
        lineClearance: updatedLineClearance,
      })
    );
  };

  const addRow = () => {
    if (!permission.canEditProduction) return;

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
      setMixingRecord({
        ...mixingRecord,
        lineClearance: [...mixingRecord.lineClearance, newLineClearanceRecord],
      })
    );
  };

  // Check if user can read either production or QA sections
  if (!(permission.canReadProduction || permission.canReadQA)) {
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


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent>
        <div className="mt-6">
          <div className="mt-6">
            <h5 className="text-lg font-semibold mt-5">
              General instructions and precautions for Manufacturing:
            </h5>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <span style={{ display: "flex", alignItems: "center" }}>
              - Area must be clean as per SOP.
              <TextField
                label="SOP"
                name="sop1"
                value={mixingRecord.precautions.sop1 || "DP/PRD/SOP/092"}
                style={{ marginLeft: "0.5rem", margin: 0 }}
                onChange={handleInputChange}
                multiline
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
            </span>
            <div>- No material of previous batch is present in the room.</div>
            <div>
              - All equipment, accessories and containers must be cleaned, dried
              and placed orderly with proper labeling.
            </div>
            <div>
              - Cleaning record must be maintained in respective log books.
            </div>
            <div>
              - Before processing, all materials must be checked and identified
              according to Master Formula.
            </div>
            <div>- Relative Humidity and temperature must be controlled.</div>
            <div>
              - All relevant documents must be available at work station.
            </div>
            <div>- Line clearance must be obtained before start of work.</div>
            <div>- Weighing balances must be calibrated.</div>
            <span style={{ display: "flex", alignItems: "center" }}>
              - Staff working in manufacturing area must wear uniforms, gloves,
              mask as per SOP.
              <TextField
                label="SOP"
                name="sop2"
                value={mixingRecord.precautions.sop2 || "DP/PRD/SOP/002"}
                style={{ marginLeft: "0.5rem", margin: 0 }}
                onChange={handleInputChange}
                multiline
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
            </span>
            <div>
              - Any extra information or deviation must be recorded and approved
              by Production Manager and Manager Quality Assurance.
            </div>
            <div>
              - Give the line clearance after satisfying with the above
              mentioned instructions.
            </div>
            <span style={{ display: "flex", alignItems: "center" }}>
              - Section
              <TextField
                label="Section"
                name="section"
                value={mixingRecord.precautions.section || "General Tablet"}
                style={{ marginLeft: "0.5rem", margin: 0 }}
                onChange={handleInputChange}
                multiline
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
              Area
              <TextField
                label="Area"
                name="specificArea"
                // value= "Mixing/Granulation"
                value={mixingRecord.precautions.specificArea || "Mixing/Granulation"}
                style={{ marginLeft: "0.5rem", margin: 7 }}
                onChange={handleInputChange}
                multiline
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
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
                  label="Section In-charge"
                  name="precautionsRead"
                  value={mixingRecord.precautions.precautionsRead}
                  style={{ marginLeft: "1rem", margin: 0 }}
                  onChange={handleInputChange}
                  multiline
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
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
                  >
                    Equipment
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    Equipment ID
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    Capacity
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    Previous Product
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    Batch No.
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    Cleaned By Operator (Sign & Date)
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    Checked By Production Pharmacist (Sign & Date)
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    Verified By QA (Sign & Date)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mixingRecord.lineClearance.map((item, index) => (
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
                        className="form-control"
                        value={item.equipment}
                        onChange={(e) => handleEquipmentChange(e, index)}
                        placeholder="Search equipment name..."
                        readOnly={!permission.canEditProduction}
                        disabled={!permission.canEditProduction}
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
                        readOnly={!permission.canEditProduction}
                        disabled={!permission.canEditProduction}
                      />
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>
                      <TextField
                        name="batchNo"
                        style={{ width: "70px" }}
                        value={item.batchNo || ""}
                        fullWidth
                        multiline
                        onChange={(e) => handleInputChange(e, index)}
                        readOnly={!permission.canEditProduction}
                        disabled={!permission.canEditProduction}
                      />
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>
                      <TextField
                        name="cleanedBy"
                        style={{ width: "150px" }}
                        value={item.cleanedBy || ""}
                        fullWidth
                        multiline
                        onChange={(e) => handleInputChange(e, index)}
                        readOnly={!permission.canEditProduction}
                        disabled={!permission.canEditProduction}
                      />
                      <TextField
                        name="clDate"
                        style={{ width: "150px" }}
                        type="date"
                        value={item.clDate || ""}
                        fullWidth
                        onChange={(e) => handleInputChange(e, index)}
                        readOnly={!permission.canEditProduction}
                        disabled={!permission.canEditProduction}
                      />
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>
                      <TextField
                        name="checkedBy"
                        style={{ width: "150px" }}
                        value={item.checkedBy || ""}
                        fullWidth
                        multiline
                        onChange={(e) => handleInputChange(e, index)}
                        readOnly={!permission.canEditProduction}
                        disabled={!permission.canEditProduction}
                      />
                      <TextField
                        type="date"
                        style={{ width: "150px" }}
                        name="chDate"
                        value={item.chDate || ""}
                        fullWidth
                        onChange={(e) => handleInputChange(e, index)}
                        readOnly={!permission.canEditProduction}
                        disabled={!permission.canEditProduction}
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
                        readOnly={!permission.canEditQA}
                        disabled={!permission.canEditQA}
                      />
                      <TextField
                        type="date"
                        style={{ width: "150px" }}
                        name="vDate"
                        value={item.vDate || ""}
                        fullWidth
                        onChange={(e) => handleInputChange(e, index)}
                        readOnly={!permission.canEditQA}
                        disabled={!permission.canEditQA}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button variant="contained" color="primary" onClick={addRow}  disabled={!permission.canEditProduction}>
            Add Row
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchManufacturingFormPage4;
