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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCompressionRecord } from "../../../../store/compressionSlice"; // Adjust import based on your slice
import axios from "axios";
import { usePermissions } from "../../../../hooks/usePermissions";

const BatchManufacturingFormPage9 = ({ isReport }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const compressionRecord = useSelector((state) => state.compression); // Access the compression state
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
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [equipmentCode, setEquipmentCode] = useState('');
  const [equipmentCapacity, setEquipmentCapacity] = useState('');
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
    const selectedItem = equipmentData.flatMap(equip => equip.equipmentList)
      .find(item => item.Equipment_Name === equipmentName);

    const updatedLineClearance = compressionRecord.lineClearance.map((item, i) => {
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

    dispatch(setCompressionRecord({ ...compressionRecord, lineClearance: updatedLineClearance }));
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
      ...compressionRecord.precautions,
      [name]: value,
    };

    // Check if line clearance update is necessary
    const updatedLineClearance = compressionRecord.lineClearance.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );

    dispatch(setCompressionRecord({ ...compressionRecord, precautions: updatedPrecautions, lineClearance: updatedLineClearance }));
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
    dispatch(setCompressionRecord({ ...compressionRecord, lineClearance: [...compressionRecord.lineClearance, newLineClearanceRecord] }));
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
            <h5 className="text-lg font-semibold mt-5">General instructions and precautions for Manufacturing:</h5>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <div>- Area is properly cleaned, no material from previous batch present in the area. (e.g. Product, Documents, etc.)</div>
            <div>- Staff properly attired. (Wear factory uniform and appropriate personnel protective equipment).</div>
            <div>- Relevant documents / materials are present in the area.</div>
            <div>- All relevant logbooks are filled.</div>
            <div>
              - Before compression, carefully check the following:
              <ul>
                <li>a) Machine and utensils to be used are clean. Punches and dies are in accordance with the product specification.</li>
                <li>b) Product collecting container/trays are clean and properly labeled.</li>
                <li>c) BMR, SOPs are in place.</li>
                <li>d) All containers of granules are duly labeled and released by QC.</li>
                <li>e) Dust collector/exhaust system is working.</li>
              </ul>
            </div>
            <div>- The room has the required temperature and humidity.</div>
            <div>- Appropriate balance is available and calibrated.</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              - Section 
              <TextField
                label="Section"
                name="section"
                value={compressionRecord.precautions.section || ''}
                style={{ marginLeft: "0.5rem" }}
                onChange={handleInputChange}
                multiline
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
              Area
              <TextField
                label="Area"
                name="specificArea"
                value={compressionRecord.precautions.specificArea || ''}
                style={{ marginLeft: "0.5rem" }}
                onChange={handleInputChange}
                multiline
                readOnly={!permission.canEditProduction}
                disabled={!permission.canEditProduction}
              />
            </div>
          </div>

          <div className=" mt-4"  style={{ display: "flex", justifyContent: "center" }}>
            <strong>
              <span style={{display: "flex", alignItems: 'center'}}>
                I HAVE READ AND UNDERSTOOD ALL THE PRECAUTIONS.
                <TextField
                  label="In-charge Production/ Production Pharmacist"
                  name="precautionsRead"
                  value={compressionRecord.precautions.precautionsRead}
                  style={{ marginLeft: "1rem" }}
                  onChange={handleInputChange}
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
                  multiline
                />
                  <TextField
                  type="date"
                  name="precautionsReadDate"
              value={compressionRecord.precautions.precautionsReadDate || ""}
              onChange={handleInputChange}
              readOnly={!permission.canEditProduction}
              disabled={!permission.canEditProduction}
            />
              </span>
            </strong>
          </div>
        </div>

        <div className="mt-6">
          <h5 className="text-lg font-semibold mt-5">LINE CLEARANCE OF EQUIPMENT:</h5>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold", borderRight: "1px solid #ccc" }} className="text-center">Equipment</TableCell>
                  <TableCell style={{ fontWeight: "bold", borderRight: "1px solid #ccc" }} className="text-center">Equipment ID</TableCell>
                  {/* <TableCell style={{ fontWeight: "bold", borderRight: "1px solid #ccc" }} className="text-center">Capacity</TableCell> */}
                  <TableCell style={{ fontWeight: "bold", borderRight: "1px solid #ccc" }} className="text-center">Previous Product</TableCell>
                  <TableCell style={{ fontWeight: "bold", borderRight: "1px solid #ccc" }} className="text-center">Batch No.</TableCell>
                  <TableCell style={{ fontWeight: "bold", borderRight: "1px solid #ccc" }} className="text-center">Cleaned By Operator (Sign & Date)</TableCell>
                  <TableCell style={{ fontWeight: "bold", borderRight: "1px solid #ccc" }} className="text-center">Checked By Production Pharmacist (Sign & Date)</TableCell>
                  <TableCell style={{ fontWeight: "bold", borderRight: "1px solid #ccc" }} className="text-center">Verified By QA (Sign & Date)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {compressionRecord.lineClearance.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>
                    <TextField
                      
                      fullWidth
                      multiline
                      name="equipment"
                      className="form-control"
                      value={item.equipment || ""}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder="equipment name..."
                      readOnly={!permission.canEditProduction}
                      disabled={!permission.canEditProduction}
                      style={{width: "150px"}}
                    />
                  
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>
                    <TextField
                        fullWidth
                        multiline
                        name="equipmentId"
                        value={item.equipmentId || " "}
                        onChange={(e) => handleInputChange(e, index)}
                        readOnly={!permission.canEditProduction}
                        disabled={!permission.canEditProduction}
                      />
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>
                      <TextField
                        name="previousProduct"
                        value={item.previousProduct || ''}
                        fullWidth
                        multiline
                        onChange={(e) => handleInputChange(e, index)}
                        readOnly={!permission.canEditProduction}
                        disabled={!permission.canEditProduction}
                        style={{width: "150px"}}
                      />
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>
                      <TextField
                        name="batchNo"
                        style={{width: '70px'}}

                        value={item.batchNo || ''}
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
                        style={{width: '150px'}}

                        value={item.cleanedBy || ''}
                        fullWidth
                        multiline
                        onChange={(e) => handleInputChange(e, index)}
                        readOnly={!permission.canEditProduction}
                        disabled={!permission.canEditProduction}
                      />
                      <TextField
                        type="date"
                        style={{width: '150px'}}

                        name="clDate"
                        value={item.clDate || ''}
                        fullWidth
                        
                        onChange={(e) => handleInputChange(e, index)}
                        readOnly={!permission.canEditProduction}
                        disabled={!permission.canEditProduction}
                      />
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>
                      <TextField
                        name="checkedBy"
                        style={{width: '150px'}}

                        value={item.checkedBy || ''}
                        fullWidth
                        multiline
                        onChange={(e) => handleInputChange(e, index)}
                        readOnly={!permission.canEditProduction}
                        disabled={!permission.canEditProduction}
                      />
                      <TextField
                        type="date"
                        name="chDate"
                        style={{width: '150px'}}

                        value={item.chDate || ''}
                        fullWidth
                        readOnly={!permission.canEditProduction}
                        disabled={!permission.canEditProduction}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>
                      <TextField
                        name="verifiedBy"
                        value={item.verifiedBy || ''}
                        fullWidth
                        multiline
                        style={{width: '150px'}}
                        readOnly={!permission.canEditQA}
                        disabled={!permission.canEditQA}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                      <TextField
                        type="date"
                        name="vDate"
                        style={{width: '150px'}}

                        value={item.vDate || ''}
                        fullWidth
                        readOnly={!permission.canEditQA}
                        disabled={!permission.canEditQA}
                        onChange={(e) => handleInputChange(e, index)}
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

export default BatchManufacturingFormPage9;
