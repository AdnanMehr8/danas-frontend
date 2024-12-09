// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Machines.css";
// const EquipmentTable = () => {
//   const [equipmentData, setEquipmentData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;

//   useEffect(() => {
//     const fetchEquipmentData = async () => {
//       try {
//         const response = await axios.get(`${REACT_APP_INTERNAL_API_PATH}/api/equipment`);
//         setEquipmentData(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEquipmentData();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2 className="text-center">Equipment List</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Category</th>
//             <th>S.No</th>
//             <th>Equipment Name</th>
//             <th>Make / Mfg By</th>
//             <th>Capacity</th>
//             <th>Equipment Code</th>
//           </tr>
//         </thead>
//         <tbody>
//           {equipmentData.map((equipment) =>
//             equipment.equipmentList.map((item) => (
//               <tr key={item.Equipment_Code}>
//                 <td>{item.S_No}</td>
//                 <td>{equipment.category}</td>
//                 <td>{item.Equipment_Name}</td>
//                 <td>{item.Make_Mfg_by}</td>
//                 <td>{item.Capacity}</td>
//                 <td>{item.Equipment_Code}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EquipmentTable;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Add, Edit, Delete } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";

const EquipmentTable = () => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    Equipment_Name: "",
    Make_Mfg_by: "",
    Capacity: "",
    Equipment_Code: "",
  });

  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;

  // READ: Fetch Equipment Data
  const fetchEquipmentData = async () => {
    try {
      const response = await axios.get(`${REACT_APP_INTERNAL_API_PATH}/api/equipment`);
      setEquipmentData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipmentData();
  }, []);

  // CREATE or UPDATE: Submit Equipment Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentEquipment) {
        await axios.put(
          `${REACT_APP_INTERNAL_API_PATH}/api/equipment/${currentEquipment.Equipment_Code}`,
          formData
        );
      } else {
        await axios.post(`${REACT_APP_INTERNAL_API_PATH}/api/equipment`, formData);
      }
      fetchEquipmentData();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE: Remove Equipment
  const handleDelete = async (equipmentCode) => {
    try {
      await axios.delete(`${REACT_APP_INTERNAL_API_PATH}/api/equipment/${equipmentCode}`);
      fetchEquipmentData();
    } catch (err) {
      setError(err.message);
    }
  };

  // Form Helpers
  const resetForm = () => {
    setFormData({
      category: "",
      Equipment_Name: "",
      Make_Mfg_by: "",
      Capacity: "",
      Equipment_Code: "",
    });
    setCurrentEquipment(null);
  };

  const openEditModal = (equipment) => {
    setCurrentEquipment(equipment);
    setFormData({
      category: equipment.category,
      Equipment_Name: equipment.Equipment_Name,
      Make_Mfg_by: equipment.Make_Mfg_by,
      Capacity: equipment.Capacity,
      Equipment_Code: equipment.Equipment_Code,
    });
    setIsModalOpen(true);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h5">Equipment List</Typography>}
        action={
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Equipment
          </Button>
        }
      />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>S.No</TableCell>
                <TableCell>Equipment Name</TableCell>
                <TableCell>Make / Mfg By</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Equipment Code</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipmentData.map((equipment) =>
                equipment.equipmentList.map((item) => (
                  <TableRow key={item.Equipment_Code}>
                    <TableCell>{equipment.category}</TableCell>
                    <TableCell>{item.S_No}</TableCell>
                    <TableCell>{item.Equipment_Name}</TableCell>
                    <TableCell>{item.Make_Mfg_by}</TableCell>
                    <TableCell>{item.Capacity}</TableCell>
                    <TableCell>{item.Equipment_Code}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => openEditModal(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(item.Equipment_Code)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>
          {currentEquipment ? "Edit Equipment" : "Add New Equipment"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                <MenuItem value="Machinery">Machinery</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Tools">Tools</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Equipment Name"
              fullWidth
              margin="normal"
              value={formData.Equipment_Name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, Equipment_Name: e.target.value }))
              }
            />
            <TextField
              label="Make/Manufacturer"
              fullWidth
              margin="normal"
              value={formData.Make_Mfg_by}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, Make_Mfg_by: e.target.value }))
              }
            />
            <TextField
              label="Capacity"
              fullWidth
              margin="normal"
              value={formData.Capacity}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, Capacity: e.target.value }))
              }
            />
            <TextField
              label="Equipment Code"
              fullWidth
              margin="normal"
              value={formData.Equipment_Code}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, Equipment_Code: e.target.value }))
              }
              disabled={!!currentEquipment}
            />
            <CardActions>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained">
                {currentEquipment ? "Update" : "Add"}
              </Button>
            </CardActions>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EquipmentTable;
