// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// // Regular process components
// import Dispensing from "../pages/forms/tablet arex 10mg/dispensing/dispensing";
// import Mixing from "../pages/forms/tablet arex 10mg/mixing/mixing";
// import Compression from "../pages/forms/tablet arex 10mg/compression/compression";
// import Coating from "../pages/forms/tablet arex 10mg/coating/coating";
// import FormHeaderPacking from "../pages/header/formHeaderPacking";
// import Printing from "../pages/forms/tablet arex 10mg/printing/printing";
// import Blistering from "../pages/forms/tablet arex 10mg/blistering/blistering";
// import Packaging from "../pages/forms/tablet arex 10mg/packing/packing";
// import Report from "../reports/Report";

// // Sulpeol specific components
// import DispensingSulpeol from "../pages/forms/tablet sulpeol 25mg/dispensing/dispensing";
// import MixingSulpeol from "../pages/forms/tablet sulpeol 25mg/mixing/mixing";
// import CompressionSulpeol from "../pages/forms/tablet sulpeol 25mg/compression/compression";
// import ReportSulpeol from "../reports/sulpeolReport";

// const DraggableList = () => {
//   const navigate = useNavigate();
//   const batchInfo = useSelector((state) => state.batchInfo.batch);
//   const isSulpeol = batchInfo?.productName?.toLowerCase().includes('sulpeol');
//   const isCream = batchInfo?.productName?.toLowerCase().includes('cream');

//   // Define process lists based on product type
//   const regularProcesses = ["dispensing", "mixing", "compression", "coating", "form-header-packing", "printing", "blistering", "packing", "report"];
//   const sulpeolProcesses = ["dispensing-sulpeol", "mixing-sulpeol", "compression-sulpeol", "report-sulpeol"];
//   const creamProcesses = ["dispensing-cream", "mixing-cream", "compression-cream", "report-cream"];

//   const [processes, setProcesses] = useState(() => {
//     const savedProcesses = localStorage.getItem("processes");
//     if (savedProcesses) {
//       return JSON.parse(savedProcesses);
//     }
//     return isCream ? creamProcesses : isSulpeol ? sulpeolProcesses : regularProcesses;
//   });

//   const [newProcess, setNewProcess] = useState("");

//   // Update processes when product type changes
//   useEffect(() => {
//     const newProcesses = isCream ? creamProcesses : isSulpeol ? sulpeolProcesses : regularProcesses;
//     setProcesses(newProcesses);
//     localStorage.setItem("processes", JSON.stringify(newProcesses));
//   }, [isCream, isSulpeol]);

//   // Save processes to localStorage when they change
//   useEffect(() => {
//     localStorage.setItem("processes", JSON.stringify(processes));
//   }, [processes]);

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const reorderedProcesses = Array.from(processes);
//     const [movedProcess] = reorderedProcesses.splice(result.source.index, 1);
//     reorderedProcesses.splice(result.destination.index, 0, movedProcess);

//     setProcesses(reorderedProcesses);
//   };

//   const handleSaveAndNext = () => {
    
//     const firstProcess = processes[0];
//     navigate(`/${firstProcess}`);
//   };

//   const handleAddProcess = () => {
//     if (newProcess.trim() !== "") {
//       setProcesses([...processes, newProcess]);
//       setNewProcess("");
//     }
//   };

//   const handleUpdateProcess = (index) => {
//     const updatedProcesses = [...processes];
//     const updatedProcess = prompt("Enter new process name:", updatedProcesses[index]);
//     if (updatedProcess) {
//       updatedProcesses[index] = updatedProcess;
//       setProcesses(updatedProcesses);
//     }
//   };

//   const handleDeleteProcess = (index) => {
//     const updatedProcesses = [...processes];
//     updatedProcesses.splice(index, 1);
//     setProcesses(updatedProcesses);
//   };

//   // Function to display process name without suffixes
//   const getDisplayName = (process) => {
//     const baseName = process.replace('-sulpeol', '').replace('-cream', '');
//     return baseName.charAt(0).toUpperCase() + baseName.slice(1);
//   };

//   return (
//     <div>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="processes">
//         {(provided) => (
//   <ul
//     {...provided.droppableProps}
//     ref={provided.innerRef}
//     style={{
//       listStyleType: "none",
//       padding: "0",
//     }}
//   >
//     {processes.map((process, index) => (
//       <Draggable key={process} draggableId={process} index={index}>
//         {(provided) => (
//           <li
//             ref={provided.innerRef}
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//             style={{
//               ...provided.draggableProps.style,
//               padding: "8px",
//               margin: "4px 0",
//               backgroundColor: "#f0f0f0",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
//             }}
//           >
//             {getDisplayName(process)}
//             <button
//               onClick={() => handleUpdateProcess(index)}
//               style={{
//                 margin: "0 10px",
//                 padding: "5px",
//                 backgroundColor: "#007bff",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               Update
//             </button>
//             <button
//               onClick={() => handleDeleteProcess(index)}
//               style={{
//                 margin: "0 10px",
//                 padding: "5px",
//                 backgroundColor: "#dc3545",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               Delete
//             </button>
//           </li>
//         )}
//       </Draggable>
//     ))}
//     {provided.placeholder}
//   </ul>
// )}
// </Droppable>
// </DragDropContext>
// <input
// type="text"
// value={newProcess}
// onChange={(e) => setNewProcess(e.target.value)}
// placeholder="Add new process"
// style={{
//   padding: "10px",
//   margin: "10px 0",
//   border: "1px solid #ccc",
//   borderRadius: "5px",
// }}
// />
// <button
// onClick={handleAddProcess}
// style={{
//   padding: "10px",
//   backgroundColor: "#007bff",
//   color: "#fff",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
// }}
// >
// Add Process
// </button>
// <button
// onClick={handleSaveAndNext}
// style={{
//   marginTop: "20px",
//   padding: "10px",
//   backgroundColor: "#007bff",
//   color: "#fff",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
// }}
// >
// Save
// </button>
// </div>
// );
// };

// export default DraggableList;
// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// // Regular process components
// import Dispensing from "../pages/forms/tablet arex 10mg/dispensing/dispensing";
// import Mixing from "../pages/forms/tablet arex 10mg/mixing/mixing";
// import Compression from "../pages/forms/tablet arex 10mg/compression/compression";
// import Coating from "../pages/forms/tablet arex 10mg/coating/coating";
// import FormHeaderPacking from "../pages/header/formHeaderPacking";
// import Printing from "../pages/forms/tablet arex 10mg/printing/printing";
// import Blistering from "../pages/forms/tablet arex 10mg/blistering/blistering";
// import Packaging from "../pages/forms/tablet arex 10mg/packing/packing";
// import Report from "../reports/Report";

// // Sulpeol specific components
// import DispensingSulpeol from "../pages/forms/tablet sulpeol 25mg/dispensing/dispensing";
// import MixingSulpeol from "../pages/forms/tablet sulpeol 25mg/mixing/mixing";
// import CompressionSulpeol from "../pages/forms/tablet sulpeol 25mg/compression/compression";
// import ReportSulpeol from "../reports/sulpeolReport";

// const Processes = () => {
//   const navigate = useNavigate();
//   const batchInfo = useSelector((state) => state.batchInfo.batch);
// //   const isCoated = batchInfo?.productName?.toLowerCase().includes('coated');
// //   const isSulpeol = batchInfo?.productName?.toLowerCase().includes('sulpeol');
// //   const isCream = batchInfo?.productName?.toLowerCase().includes('cream');

//   // Get the selected batch record from localStorage
//   const [selectedBatch, setSelectedBatch] = useState(null);
  
//   useEffect(() => {
//     // Get the selected batch record from localStorage
//     const storedBatch = localStorage.getItem('selectedBatchRecord');
//     if (storedBatch) {
//       const parsedBatch = JSON.parse(storedBatch);
//       setSelectedBatch(parsedBatch);
//     }
//   }, []);
  
//   // Determine product type based on stored batch record
//   const isCoated = selectedBatch?.batch?.productName?.toLowerCase().includes('coated');
//   const isSulpeol = selectedBatch?.batch?.productName?.toLowerCase().includes('sulpeol');
//   const isCream = selectedBatch?.batch?.productName?.toLowerCase().includes('cream');
    
//   // Define process lists based on product type
//   const regularProcesses = ["dispensing", "mixing", "compression", "coating", "form-header-packing", "printing", "blistering", "packing", "report"];
//   const sulpeolProcesses = ["dispensing-sulpeol", "mixing-sulpeol", "compression-sulpeol", "report-sulpeol"];
//   const creamProcesses = ["dispensing-cream", "mixing-cream", "compression-cream", "report-cream"];

//   // Initialize processes state based on product type from localStorage
//   const [processes, setProcesses] = useState(() => {
//     // First check localStorage for saved processes
//     const savedProcesses = localStorage.getItem("processes");
//     if (savedProcesses) {
//       return JSON.parse(savedProcesses);
//     }
    
//     // If no saved processes, determine based on product type
//     if (selectedBatch) {
//       if (isCream) return creamProcesses;
//       if (isSulpeol) return sulpeolProcesses;
//       if (isCoated) return regularProcesses;
//     }
    
//     // Default to regular processes if no batch selected
//     return regularProcesses;
//   });

//   const [newProcess, setNewProcess] = useState("");

//   // Update processes when selected batch changes
//   useEffect(() => {
//     if (selectedBatch) {
//       let newProcesses;
//       if (isCream) {
//         newProcesses = creamProcesses;
//       } else if (isSulpeol) {
//         newProcesses = sulpeolProcesses;
//       } else if (isCoated) {
//         newProcesses = regularProcesses;
//       } else {
//         newProcesses = regularProcesses; // default fallback
//       }
      
//       setProcesses(newProcesses);
//       localStorage.setItem("processes", JSON.stringify(newProcesses));
//     }
//   }, [selectedBatch, isCream, isSulpeol, isCoated]);

//   // Save processes to localStorage when they change
//   useEffect(() => {
//     localStorage.setItem("processes", JSON.stringify(processes));
//   }, [processes]);

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const reorderedProcesses = Array.from(processes);
//     const [movedProcess] = reorderedProcesses.splice(result.source.index, 1);
//     reorderedProcesses.splice(result.destination.index, 0, movedProcess);

//     setProcesses(reorderedProcesses);
//     localStorage.setItem("processes", JSON.stringify(reorderedProcesses));
//   };

//   const handleSaveAndNext = () => {
//     // Save current process configuration to localStorage
//     localStorage.setItem("processes", JSON.stringify(processes));
//     // Store the current batch info for the next component
//     localStorage.setItem("currentBatchProcess", JSON.stringify({
//       batchNo: selectedBatch?.batch?.batchNo,
//       productName: selectedBatch?.batch?.productName,
//       currentProcess: processes[0]
//     }));
    
//     // const firstProcess = processes[0];
//     // navigate(`/${firstProcess}`);
//   };

//   const handleAddProcess = () => {
//     if (newProcess.trim() !== "") {
//       const updatedProcesses = [...processes, newProcess];
//       setProcesses(updatedProcesses);
//       localStorage.setItem("processes", JSON.stringify(updatedProcesses));
//       setNewProcess("");
//     }
//   };

//   const handleUpdateProcess = (index) => {
//     const updatedProcesses = [...processes];
//     const updatedProcess = prompt("Enter new process name:", updatedProcesses[index]);
//     if (updatedProcess) {
//       updatedProcesses[index] = updatedProcess;
//       setProcesses(updatedProcesses);
//       localStorage.setItem("processes", JSON.stringify(updatedProcesses));
//     }
//   };

//   const handleDeleteProcess = (index) => {
//     const updatedProcesses = [...processes];
//     updatedProcesses.splice(index, 1);
//     setProcesses(updatedProcesses);
//     localStorage.setItem("processes", JSON.stringify(updatedProcesses));
//   };

//   // Function to display process name without suffixes
//   const getDisplayName = (process) => {
//     const baseName = process.replace('-sulpeol', '').replace('-cream', '');
//     return baseName.charAt(0).toUpperCase() + baseName.slice(1);
//   };

//   // Show loading state if batch data hasn't been loaded yet
//   if (!selectedBatch) {
//     return <div>Loading batch information...</div>;
//   }

//   return (
//     <div>
//       <div className="mb-4 p-4 bg-gray-100 rounded">
//         <h2 className="text-xl font-bold">Current Batch Information</h2>
//         <p>Batch No: {selectedBatch?.batch?.batchNo}</p>
//         <p>Product: {selectedBatch?.batch?.productName}</p>
//         <p>Type: {isCoated ? 'Coated' : isSulpeol ? 'Sulpeol' : isCream ? 'Cream' : 'Regular'}</p>
//       </div>

//       <DragDropContext onDragEnd={onDragEnd}>

//         <Droppable droppableId="processes">
//         {(provided) => (
//   <ul
//     {...provided.droppableProps}
//     ref={provided.innerRef}
//     style={{
//       listStyleType: "none",
//       padding: "0",
//     }}
//   >
//     {processes.map((process, index) => (
//       <Draggable key={process} draggableId={process} index={index}>
//         {(provided) => (
//           <li
//             ref={provided.innerRef}
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//             style={{
//               ...provided.draggableProps.style,
//               padding: "8px",
//               margin: "4px 0",
//               backgroundColor: "#f0f0f0",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
//             }}
//           >
//             {getDisplayName(process)}
//             <button
//               onClick={() => handleUpdateProcess(index)}
//               style={{
//                 margin: "0 10px",
//                 padding: "5px",
//                 backgroundColor: "#007bff",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               Update
//             </button>
//             <button
//               onClick={() => handleDeleteProcess(index)}
//               style={{
//                 margin: "0 10px",
//                 padding: "5px",
//                 backgroundColor: "#dc3545",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               Delete
//             </button>
//           </li>
//         )}
//       </Draggable>
//     ))}
//     {provided.placeholder}
//   </ul>
// )}
// </Droppable>
// </DragDropContext>
// <input
// type="text"
// value={newProcess}
// onChange={(e) => setNewProcess(e.target.value)}
// placeholder="Add new process"
// style={{
//   padding: "10px",
//   margin: "10px 0",
//   border: "1px solid #ccc",
//   borderRadius: "5px",
// }}
// />
// <button
// onClick={handleAddProcess}
// style={{
//   padding: "10px",
//   backgroundColor: "#007bff",
//   color: "#fff",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
// }}
// >
// Add Process
// </button>
// <button
// onClick={handleSaveAndNext}
// style={{
//   marginTop: "20px",
//   padding: "10px",
//   backgroundColor: "#007bff",
//   color: "#fff",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
// }}
// >
// Save
// </button>
// </div>
// );
// };

// export default Processes;

// import React, { useState, useEffect } from 'react';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Pencil, Trash2, Plus, GripVertical } from 'lucide-react';
// import { Card, CardContent, Button, Input, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// const Processes = () => {
//   const navigate = useNavigate();
//   const batchInfo = useSelector((state) => state.batchInfo.batch);
//   const isSulpeol = batchInfo?.productName?.toLowerCase().includes('sulpeol');
//   const isCream = batchInfo?.productName?.toLowerCase().includes('cream');
//   const [openDialog, setOpenDialog] = useState(false);
//   const [processToDelete, setProcessToDelete] = useState(null);

//   // Define default process lists based on product type
//   const getDefaultProcesses = () => {
//     const regularProcesses = [
//       { name: "Dispensing", productType: "regular" },
//       { name: "Mixing", productType: "regular" },
//       { name: "Compression", productType: "regular" },
//       { name: "Coating", productType: "regular" },
//       { name: "Printing", productType: "regular" },
//       { name: "Blistering", productType: "regular" },
//       { name: "Packing", productType: "regular" },
//       { name: "Report", productType: "regular" }
//     ];

//     const sulpeolProcesses = [
//       { name: "Dispensing-Sulpeol", productType: "sulpeol" },
//       { name: "Mixing-Sulpeol", productType: "sulpeol" },
//       { name: "Compression-Sulpeol", productType: "sulpeol" },
//       { name: "Report-Sulpeol", productType: "sulpeol" }
//     ];

//     const creamProcesses = [
//       { name: "Dispensing-Cream", productType: "cream" },
//       { name: "Mixing-Cream", productType: "cream" },
//       { name: "Compression-Cream", productType: "cream" },
//       { name: "Report-Cream", productType: "cream" }
//     ];

//     return isCream ? creamProcesses : isSulpeol ? sulpeolProcesses : regularProcesses;
//   };

//   const [processes, setProcesses] = useState(() => {
//     // First try to get from localStorage
//     const savedProcesses = localStorage.getItem("processes");
//     if (savedProcesses) {
//       return JSON.parse(savedProcesses);
//     }
//     // If not in localStorage, get from database
//     return [];
//   });

//   const [isEditing, setIsEditing] = useState(null);
//   const [newProcess, setNewProcess] = useState({ name: '', productType: 'regular' });
//   const [showAddForm, setShowAddForm] = useState(false);
//   const url = process.env.REACT_APP_INTERNAL_API_PATH;

//   // Fetch processes from API and sync with localStorage
//   useEffect(() => {
//     const fetchAndSyncProcesses = async () => {
//       try {
//         const response = await fetch(`${url}/api/processes`);
//         const data = await response.json();
//         console.log("Pro: ", data)
//         // If no processes in localStorage or different product type, use API data
//         if (!localStorage.getItem("processes") ||
//             (isSulpeol !== processes.some(p => p.productType === 'sulpeol')) ||
//             (isCream !== processes.some(p => p.productType === 'cream'))) {
//           setProcesses(data.length ? data : getDefaultProcesses());
//         }
//       } catch (error) {
//         console.error('Error fetching processes:', error);
//         // If API fails, use default processes
//         if (!processes.length) {
//           setProcesses(getDefaultProcesses());
//         }
//       }
//     };

//     fetchAndSyncProcesses();
//   }, [isSulpeol, isCream]);

//   // Sync with localStorage whenever processes change
//   useEffect(() => {
//     localStorage.setItem("processes", JSON.stringify(processes));
//   }, [processes]);

//   // Update processes when product type changes
//   useEffect(() => {
//     const currentProductType = isCream ? 'cream' : isSulpeol ? 'sulpeol' : 'regular';
//     const currentProcessesType = processes[0]?.productType;

//     if (currentProcessesType && currentProcessesType !== currentProductType) {
//       const newDefaultProcesses = getDefaultProcesses();
//       setProcesses(newDefaultProcesses);
//       localStorage.setItem("processes", JSON.stringify(newDefaultProcesses));
//     }
//   }, [isCream, isSulpeol]);

//   // CRUD Operations with localStorage sync
//   const handleAdd = async () => {
//     try {
//       const response = await fetch(`${url}/api/processes`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newProcess),
//       });
//       const data = await response.json();
//       const updatedProcesses = [...processes, data];
//       setProcesses(updatedProcesses);
//       localStorage.setItem("processes", JSON.stringify(updatedProcesses));
//       setShowAddForm(false);
//       setNewProcess({ name: '', productType: 'regular' });
//     } catch (error) {
//       console.error('Error adding process:', error);
//     }
//   };

//   const handleUpdate = async (id, updatedProcess) => {
//     try {
//       const response = await fetch(`${url}/api/processes/${id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedProcess),
//       });
//       const data = await response.json();
//       const updatedProcesses = processes.map(p => p._id === id ? data : p);
//       setProcesses(updatedProcesses);
//       localStorage.setItem("processes", JSON.stringify(updatedProcesses));
//       setIsEditing(null);
//     } catch (error) {
//       console.error('Error updating process:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await fetch(`${url}/api/processes/${id}`, { method: 'DELETE' });
//       const updatedProcesses = processes.filter(p => p._id !== id);
//       setProcesses(updatedProcesses);
//       localStorage.setItem("processes", JSON.stringify(updatedProcesses));
//     } catch (error) {
//       console.error('Error deleting process:', error);
//     }
//   };

//   // Drag and Drop handling with localStorage sync
//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(processes);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setProcesses(items);
//     localStorage.setItem("processes", JSON.stringify(items));
//   };

//   const handleSaveAndNavigate = () => {
//     localStorage.setItem('processes', JSON.stringify(processes));
//     if (processes.length > 0) {
//       navigate(`/${processes[0].name.toLowerCase()}`);
//     }
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setProcessToDelete(null);
//   };

//   const handleConfirmDelete = async () => {
//     if (processToDelete) {
//       await handleDelete(processToDelete);
//     }
//     handleCloseDialog();
//   };

// // Open dialog when deleting a process
//   const confirmDelete = (id) => {
//     setProcessToDelete(id);
//     setOpenDialog(true);
//   };
//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//     <CardContent className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Process Manager</h2>
//         <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
//           <Plus size={16} /> Add Process
//         </Button>
//       </div>

//       {showAddForm && (
//         <div className="mb-6 p-4 border rounded-lg">
//           <div className="space-y-4">
//             <Input
//               placeholder="Process Name"
//               value={newProcess.name}
//               onChange={(e) => setNewProcess({ ...newProcess, name: e.target.value })}
//             />
//             <Select
//               value={newProcess.productType}
//               onChange={(e) => setNewProcess({ ...newProcess, productType: e.target.value })}
//               displayEmpty
//             >
//               <MenuItem value="regular">Regular</MenuItem>
//               <MenuItem value="sulpeol">Sulpeol</MenuItem>
//               <MenuItem value="cream">Cream</MenuItem>
//             </Select>
//             <div className="flex gap-2">
//               <Button onClick={handleAdd}>Save</Button>
//               <Button variant="outlined" onClick={() => setShowAddForm(false)}>Cancel</Button>
//             </div>
//           </div>
//         </div>
//       )}

//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="processes">
//           {(provided) => (
//             <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
//               {processes.map((process, index) => (
//                 <Draggable key={process._id || index} draggableId={process._id || `temp-${index}`} index={index}>
//                   {(provided) => (
//                     <div ref={provided.innerRef} {...provided.draggableProps} className="flex items-center gap-4 p-3 bg-white border rounded-lg shadow-sm">
//                       <div {...provided.dragHandleProps} className="cursor-grab">
//                         <GripVertical size={20} />
//                       </div>
                      
//                       {isEditing === (process._id || index) ? (
//                         <div className="flex-1 flex gap-2">
//                           <Input
//                             value={process.name}
//                             onChange={(e) => {
//                               const updatedProcesses = [...processes];
//                               updatedProcesses[index].name = e.target.value;
//                               setProcesses(updatedProcesses);
//                             }}
//                           />
//                           <Select
//                             value={process.productType}
//                             onChange={(e) => {
//                               const updatedProcesses = [...processes];
//                               updatedProcesses[index].productType = e.target.value;
//                               setProcesses(updatedProcesses);
//                             }}
//                           >
//                             <MenuItem value="regular">Regular</MenuItem>
//                             <MenuItem value="sulpeol">Sulpeol</MenuItem>
//                             <MenuItem value="cream">Cream</MenuItem>
//                           </Select>
//                           <Button onClick={() => handleUpdate(process._id, process)}>Save</Button>
//                           <Button variant="outlined" onClick={() => setIsEditing(null)}>Cancel</Button>
//                         </div>
//                       ) : (
//                         <div className="flex-1 flex items-center justify-between">
//                           <div>
//                             <p className="font-medium">{process.name}</p>
//                             <p className="text-sm text-gray-500">{process.productType}</p>
//                           </div>
//                           <div className="flex gap-2">
//                             <Button variant="text" onClick={() => setIsEditing(process._id || index)}>
//                               <Pencil size={16} />
//                             </Button>
//                             <Button variant="text" onClick={() => confirmDelete(process._id)}>
//               <Trash2 size={16} />
//             </Button>
//             <Dialog open={openDialog} onClose={handleCloseDialog}>
//           <DialogTitle>Delete Process</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               Are you sure you want to delete this process? This action cannot be undone.
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseDialog}>Cancel</Button>
//             <Button onClick={handleConfirmDelete} color="error">
//               Delete
//             </Button>
//           </DialogActions>
//         </Dialog>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>

//       <Button className="w-full mt-6" onClick={handleSaveAndNavigate}>
//         Save and Continue
//       </Button>
//     </CardContent>
//   </Card>
// );
// };

// export default Processes;


// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogClose
// } from '@/components/ui/dialog';
// import { Trash2, Edit, Plus, Save } from 'lucide-react';

// const API_URL = 'http://localhost:5000/api/processes';

// const ProcessesTable = () => {
//   const [processes, setProcesses] = useState([]);
//   const [editingProcess, setEditingProcess] = useState(null);
//   const [newProcess, setNewProcess] = useState('');
//   const batchInfo = useSelector((state) => state.batchInfo.batch);
//   const productName = batchInfo?.productName || '';

//   useEffect(() => {
//     fetchProcesses();
//   }, [productName]);

//   const fetchProcesses = async () => {
//     try {
//       const response = await axios.get(`${API_URL}?productName=${productName}`);
//       const fetchedProcesses = response.data.processes || [];
//       setProcesses(fetchedProcesses);
//       // Sync with localStorage
//       localStorage.setItem('processes', JSON.stringify(fetchedProcesses));
//     } catch (error) {
//       console.error('Error fetching processes:', error);
//     }
//   };

//   const handleAddProcess = async () => {
//     if (!newProcess.trim()) return;

//     const updatedProcesses = [...processes, newProcess];
//     try {
//       await axios.put(API_URL, {
//         productName,
//         processes: updatedProcesses
//       });
//       setProcesses(updatedProcesses);
//       setNewProcess('');
//       // Sync with localStorage
//       localStorage.setItem('processes', JSON.stringify(updatedProcesses));
//     } catch (error) {
//       console.error('Error adding process:', error);
//     }
//   };

//   const handleUpdateProcess = async (index, updatedValue) => {
//     const updatedProcesses = [...processes];
//     updatedProcesses[index] = updatedValue;

//     try {
//       await axios.put(API_URL, {
//         productName,
//         processes: updatedProcesses
//       });
//       setProcesses(updatedProcesses);
//       setEditingProcess(null);
//       // Sync with localStorage
//       localStorage.setItem('processes', JSON.stringify(updatedProcesses));
//     } catch (error) {
//       console.error('Error updating process:', error);
//     }
//   };

//   const handleDeleteProcess = async (index) => {
//     const updatedProcesses = processes.filter((_, i) => i !== index);

//     try {
//       await axios.put(API_URL, {
//         productName,
//         processes: updatedProcesses
//       });
//       setProcesses(updatedProcesses);
//       // Sync with localStorage
//       localStorage.setItem('processes', JSON.stringify(updatedProcesses));
//     } catch (error) {
//       console.error('Error deleting process:', error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Processes for {productName}</h2>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button className="flex items-center gap-2">
//               <Plus size={16} />
//               Add Process
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Add New Process</DialogTitle>
//             </DialogHeader>
//             <div className="flex gap-2">
//               <Input
//                 value={newProcess}
//                 onChange={(e) => setNewProcess(e.target.value)}
//                 placeholder="Enter process name"
//               />
//               <DialogClose asChild>
//                 <Button onClick={handleAddProcess}>
//                   <Save size={16} className="mr-2" />
//                   Save
//                 </Button>
//               </DialogClose>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Process Name</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {processes.map((process, index) => (
//             <TableRow key={index}>
//               <TableCell>
//                 {editingProcess === index ? (
//                   <Input
//                     value={process}
//                     onChange={(e) => {
//                       const updatedProcesses = [...processes];
//                       updatedProcesses[index] = e.target.value;
//                       setProcesses(updatedProcesses);
//                     }}
//                     onBlur={() => handleUpdateProcess(index, process)}
//                     autoFocus
//                   />
//                 ) : (
//                   process
//                 )}
//               </TableCell>
//               <TableCell>
//                 <div className="flex gap-2">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setEditingProcess(index)}
//                   >
//                     <Edit size={16} />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => handleDeleteProcess(index)}
//                   >
//                     <Trash2 size={16} />
//                   </Button>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default ProcessesTable;

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   IconButton,
// } from '@mui/material';
// import { Add, Save, Edit, Delete } from '@mui/icons-material';

// const API_URL = 'http://localhost:5000/api/processes';

// const Processes = () => {
//   const [processes, setProcesses] = useState([]);
//   const [editingProcess, setEditingProcess] = useState(null);
//   const [newProcess, setNewProcess] = useState('');
//   const [openDialog, setOpenDialog] = useState(false);
//   const batchInfo = useSelector((state) => state.batchInfo.batch);
//   const productName = batchInfo?.productName || '';

//   useEffect(() => {
//     fetchProcesses();
//   }, [productName]);

//   const fetchProcesses = async () => {
//     try {
//       const response = await axios.get(`${API_URL}?productName=${productName}`);
//       const fetchedProcesses = response.data.processes || [];
//       setProcesses(fetchedProcesses);
//       // Sync with localStorage
//       localStorage.setItem('processes', JSON.stringify(fetchedProcesses));
//     } catch (error) {
//       console.error('Error fetching processes:', error);
//     }
//   };

//   const handleAddProcess = async () => {
//     if (!newProcess.trim()) return;

//     const updatedProcesses = [...processes, newProcess];
//     try {
//       await axios.put(API_URL, {
//         productName,
//         processes: updatedProcesses,
//       });
//       setProcesses(updatedProcesses);
//       setNewProcess('');
//       setOpenDialog(false);
//       // Sync with localStorage
//       localStorage.setItem('processes', JSON.stringify(updatedProcesses));
//     } catch (error) {
//       console.error('Error adding process:', error);
//     }
//   };

//   const handleUpdateProcess = async (index, updatedValue) => {
//     const updatedProcesses = [...processes];
//     updatedProcesses[index] = updatedValue;

//     try {
//       await axios.put(API_URL, {
//         productName,
//         processes: updatedProcesses,
//       });
//       setProcesses(updatedProcesses);
//       setEditingProcess(null);
//       // Sync with localStorage
//       localStorage.setItem('processes', JSON.stringify(updatedProcesses));
//     } catch (error) {
//       console.error('Error updating process:', error);
//     }
//   };

//   const handleDeleteProcess = async (index) => {
//     const updatedProcesses = processes.filter((_, i) => i !== index);

//     try {
//       await axios.put(API_URL, {
//         productName,
//         processes: updatedProcesses,
//       });
//       setProcesses(updatedProcesses);
//       // Sync with localStorage
//       localStorage.setItem('processes', JSON.stringify(updatedProcesses));
//     } catch (error) {
//       console.error('Error deleting process:', error);
//     }
//   };

//   return (
//     <div style={{ padding: '16px' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
//         <h2>Processes for {productName}</h2>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => setOpenDialog(true)}
//         >
//           Add Process
//         </Button>
//       </div>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Process Name</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {processes.map((process, index) => (
//               <TableRow key={index}>
//                 <TableCell>
//                   {editingProcess === index ? (
//                     <TextField
//                       value={process}
//                       onChange={(e) => {
//                         const updatedProcesses = [...processes];
//                         updatedProcesses[index] = e.target.value;
//                         setProcesses(updatedProcesses);
//                       }}
//                       onBlur={() => handleUpdateProcess(index, process)}
//                       autoFocus
//                       fullWidth
//                     />
//                   ) : (
//                     process
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => setEditingProcess(index)}>
//                     <Edit />
//                   </IconButton>
//                   <IconButton onClick={() => handleDeleteProcess(index)}>
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Add New Process</DialogTitle>
//         <DialogContent>
//           <TextField
//             value={newProcess}
//             onChange={(e) => setNewProcess(e.target.value)}
//             placeholder="Enter process name"
//             fullWidth
//             margin="dense"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button
//             variant="contained"
//             startIcon={<Save />}
//             onClick={handleAddProcess}
//           >
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Processes;


// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TableContainer,
//   Paper,
// } from '@mui/material';
// import { Button, IconButton, TextField, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// // import { Trash as TrashIcon, Edit as EditIcon, Add as AddIcon, Save as SaveIcon } from '@mui/icons-material';
// import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, Save as SaveIcon } from '@mui/icons-material';

// const API_URL = 'http://localhost:5000/api/processes';

// const Processes = () => {
//   const [activeCategory, setActiveCategory] = useState('regular');
//   const [processes, setProcesses] = useState({
//     regular: [],
//     sulpeol: [],
//     cream: []
//   });
//   const [editingProcess, setEditingProcess] = useState(null);
//   const [newProcess, setNewProcess] = useState({
//     name: '',
//     category: 'regular'
//   });
//   const [openDialog, setOpenDialog] = useState(false);

//   useEffect(() => {
//     const savedProcesses = localStorage.getItem("processes");
//     if (savedProcesses) {
//       const parsedProcesses = JSON.parse(savedProcesses);
//       const categorizedProcesses = {
//         regular: parsedProcesses.filter(p => !p.includes('sulpeol') && !p.includes('cream')),
//         sulpeol: parsedProcesses.filter(p => p.includes('sulpeol')).map(p => p.replace('-sulpeol', '')),
//         cream: parsedProcesses.filter(p => p.includes('cream')).map(p => p.replace('-cream', ''))
//       };
//       setProcesses(categorizedProcesses);
//     }
//   }, []);

//   const updateLocalStorage = (updatedProcesses) => {
//     const processesArray = [
//       ...updatedProcesses.regular,
//       ...updatedProcesses.sulpeol.map(p => `${p}-sulpeol`),
//       ...updatedProcesses.cream.map(p => `${p}-cream`)
//     ];
//     localStorage.setItem("processes", JSON.stringify(processesArray));
//   };

//   const handleAddProcess = async () => {
//     if (!newProcess.name.trim()) return;

//     const updatedProcesses = {
//       ...processes,
//       [newProcess.category]: [...processes[newProcess.category], newProcess.name]
//     };

//     try {
//       await axios.put(API_URL, {
//         category: newProcess.category,
//         processes: updatedProcesses[newProcess.category]
//       });

//       setProcesses(updatedProcesses);
//       updateLocalStorage(updatedProcesses);
//       setNewProcess({ name: '', category: 'regular' });
//       setOpenDialog(false);
//     } catch (error) {
//       console.error('Error adding process:', error);
//     }
//   };

//   const handleUpdateProcess = async (index, updatedValue) => {
//     const updatedProcesses = {
//       ...processes,
//       [activeCategory]: processes[activeCategory].map((p, i) =>
//         i === index ? updatedValue : p
//       )
//     };

//     try {
//       await axios.put(API_URL, {
//         category: activeCategory,
//         processes: updatedProcesses[activeCategory]
//       });

//       setProcesses(updatedProcesses);
//       updateLocalStorage(updatedProcesses);
//       setEditingProcess(null);
//     } catch (error) {
//       console.error('Error updating process:', error);
//     }
//   };

//   const handleDeleteProcess = async (index) => {
//     const updatedProcesses = {
//       ...processes,
//       [activeCategory]: processes[activeCategory].filter((_, i) => i !== index)
//     };

//     try {
//       await axios.put(API_URL, {
//         category: activeCategory,
//         processes: updatedProcesses[activeCategory]
//       });

//       setProcesses(updatedProcesses);
//       updateLocalStorage(updatedProcesses);
//     } catch (error) {
//       console.error('Error deleting process:', error);
//     }
//   };

//   return (
//     <div style={{ padding: '16px' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
//         <h2>Process Management</h2>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//           <Select
//             value={activeCategory}
//             onChange={(e) => setActiveCategory(e.target.value)}
//           >
//             <MenuItem value="regular">Regular Processes</MenuItem>
//             <MenuItem value="sulpeol">Sulpeol Processes</MenuItem>
//             <MenuItem value="cream">Cream Processes</MenuItem>
//           </Select>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => setOpenDialog(true)}
//           >
//             Add Process
//           </Button>
//         </div>
//       </div>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Process Name</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {processes[activeCategory].map((process, index) => (
//               <TableRow key={index}>
//                 <TableCell>
//                   {editingProcess === index ? (
//                     <TextField
//                       value={process}
//                       onChange={(e) => {
//                         const updatedProcesses = {
//                           ...processes,
//                           [activeCategory]: processes[activeCategory].map((p, i) =>
//                             i === index ? e.target.value : p
//                           )
//                         };
//                         setProcesses(updatedProcesses);
//                       }}
//                       onBlur={() => handleUpdateProcess(index, process)}
//                       autoFocus
//                       size="small"
//                     />
//                   ) : (
//                     process
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => setEditingProcess(index)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDeleteProcess(index)}>
//                     <DeleteIcon  />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Add New Process</DialogTitle>
//         <DialogContent>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
//             <Select
//               value={newProcess.category}
//               onChange={(e) => setNewProcess({ ...newProcess, category: e.target.value })}
//             >
//               <MenuItem value="regular">Regular Process</MenuItem>
//               <MenuItem value="sulpeol">Sulpeol Process</MenuItem>
//               <MenuItem value="cream">Cream Process</MenuItem>
//             </Select>
//             <TextField
//               value={newProcess.name}
//               onChange={(e) => setNewProcess({ ...newProcess, name: e.target.value })}
//               placeholder="Enter process name"
//               fullWidth
//             />
//           </div>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button
//             variant="contained"
//             startIcon={<SaveIcon />}
//             onClick={handleAddProcess}
//           >
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Processes;


// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardActions,
//   Typography,
//   Button,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Select,
//   MenuItem,
//   Alert,
// } from '@mui/material';
// import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

// const Processes = () => {
//   const [processes, setProcesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [currentProcess, setCurrentProcess] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     displayName: '',
//     productType: 'regular', // default value
//   });

//   const API_URL = 'http://localhost:5000';

//   // Fetch processes
//   const fetchProcesses = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_URL}/api/processes`);
//       const data = await response.json();
//       setProcesses(data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load processes');
//       console.error('Error fetching processes:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProcesses();
//   }, []);

//   // Group processes by product type
//   const groupedProcesses = processes.reduce((acc, process) => {
//     const type = process.productType || 'regular';
//     if (!acc[type]) {
//       acc[type] = [];
//     }
//     acc[type].push(process);
//     return acc;
//   }, {});

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = currentProcess
//         ? `${API_URL}/api/processes/${currentProcess._id}`
//         : `${API_URL}/api/processes`;

//       const method = currentProcess ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) throw new Error('Failed to save process');

//       await fetchProcesses();
//       setIsDialogOpen(false);
//       resetForm();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleEdit = (process) => {
//     setCurrentProcess(process);
//     setFormData({
//       name: process.name,
//       displayName: process.displayName || '',
//       productType: process.productType || 'regular',
//     });
//     setIsDialogOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this process?')) {
//       try {
//         const response = await fetch(`${API_URL}/api/processes/${id}`, {
//           method: 'DELETE',
//         });

//         if (!response.ok) throw new Error('Failed to delete process');

//         await fetchProcesses();
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   };

//   const resetForm = () => {
//     setCurrentProcess(null);
//     setFormData({
//       name: '',
//       displayName: '',
//       productType: 'regular',
//     });
//   };

//   if (loading) return <div style={{ padding: '16px' }}>Loading processes...</div>;

//   return (
//     <Card style={{ margin: '16px auto', maxWidth: '960px' }}>
//       <CardHeader
//         title={
//           <Typography variant="h5" style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <span>Process Management</span>
//             <Button
//               startIcon={<AddIcon />}
//               variant="contained"
//               onClick={() => {
//                 resetForm();
//                 setIsDialogOpen(true);
//               }}
//             >
//               Add Process
//             </Button>
//           </Typography>
//         }
//       />
//       <CardContent>
//         {error && <Alert severity="error">{error}</Alert>}

//         {Object.entries(groupedProcesses).map(([productType, typeProcesses]) => (
//           <div key={productType} style={{ marginBottom: '24px' }}>
//             <Typography variant="h6" style={{ marginBottom: '16px' }}>
//               {productType} Processes
//             </Typography>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Display Name</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {typeProcesses.map((process) => (
//                   <TableRow key={process._id}>
//                     <TableCell>{process.name}</TableCell>
//                     <TableCell>{process.displayName || process.name}</TableCell>
//                     <TableCell>
//                       <Button
//                         startIcon={<EditIcon />}
//                         onClick={() => handleEdit(process)}
//                         variant="outlined"
//                         size="small"
//                         style={{ marginRight: '8px' }}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         startIcon={<DeleteIcon />}
//                         onClick={() => handleDelete(process._id)}
//                         variant="outlined"
//                         size="small"
//                         color="error"
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         ))}
//       </CardContent>
//       <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
//         <DialogTitle>{currentProcess ? 'Edit Process' : 'Add New Process'}</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//             <TextField
//               label="Process Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               required
//             />
//             <TextField
//               label="Display Name"
//               value={formData.displayName}
//               onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
//             />
//             <Select
//               value={formData.productType}
//               onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
//               required
//               displayEmpty
//             >
//               <MenuItem value="regular">Regular</MenuItem>
//               <MenuItem value="sulpeol">Sulpeol</MenuItem>
//               <MenuItem value="cream">Cream</MenuItem>
//             </Select>
//           </form>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsDialogOpen(false)} variant="outlined">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} variant="contained">
//             {currentProcess ? 'Update' : 'Create'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Card>
//   );
// };

// export default Processes;


// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardActions,
//   Typography,
//   Button,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
// } from '@mui/material';
// import { Add, Edit, Delete } from '@mui/icons-material';

// const Processes = () => {
//   const [processes, setProcesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [currentProcess, setCurrentProcess] = useState(null);
//   const [selectedProductType, setSelectedProductType] = useState('coated');
//   const [formData, setFormData] = useState({
//     name: '',
//     displayName: '',
//     productType: 'coated',
//   });

//   const API_URL = process.env.REACT_APP_INTERNAL_API_PATH;

//   const productTypes = [
//     { value: 'coated', label: 'Coated' },
//     { value: 'non-coated', label: 'Non-Coated' },
//     { value: 'cream', label: 'Cream' },
//   ];

//   // Fetch processes based on selected product type
//   const fetchProcesses = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_URL}/api/processes?productType=${selectedProductType}`);
//       const data = await response.json();
//       setProcesses(data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load processes');
//       console.error('Error fetching processes:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProcesses();
//   }, [selectedProductType]); // Refetch when product type changes

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = currentProcess
//         ? `${API_URL}/api/processes/${currentProcess._id}`
//         : `${API_URL}/api/processes`;
      
//       const method = currentProcess ? 'PUT' : 'POST';
      
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) throw new Error('Failed to save process');
      
//       await fetchProcesses();
//       setIsDialogOpen(false);
//       resetForm();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleEdit = (process) => {
//     setCurrentProcess(process);
//     setFormData({
//       name: process.name,
//       displayName: process.displayName || '',
//       productType: process.productType || 'coated',
//     });
//     setIsDialogOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this process?')) {
//       try {
//         const response = await fetch(`${API_URL}/api/processes/${id}`, {
//           method: 'DELETE',
//         });

//         if (!response.ok) throw new Error('Failed to delete process');
        
//         await fetchProcesses();
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   };

//   const resetForm = () => {
//     setCurrentProcess(null);
//     setFormData({
//       name: '',
//       displayName: '',
//       productType: selectedProductType, // Set to currently selected type
//     });
//   };

//   if (loading) return <div>Loading processes...</div>;

//   return (
//     <div>
//       <CardHeader
//         title={
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6">Process Management</Typography>
//             <FormControl variant="outlined" size="small">
//               <InputLabel>Product Type</InputLabel>
//               <Select
//                 value={selectedProductType}
//                 onChange={(e) => setSelectedProductType(e.target.value)}
//                 label="Product Type"
//               >
//                 {productTypes.map((type) => (
//                   <MenuItem key={type.value} value={type.value}>
//                     {type.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>
//         }
//       />
//       <CardContent>
//         {error && <Alert severity="error">{error}</Alert>}
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Display Name</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {processes.map((process) => (
//                 <TableRow key={process._id}>
//                   <TableCell>{process.name}</TableCell>
//                   <TableCell>{process.displayName || process.name}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleEdit(process)}>
//                       <Edit />
//                     </IconButton>
//                     <IconButton onClick={() => handleDelete(process._id)}>
//                       <Delete />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//       <CardActions>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => {
//             resetForm();
//             setIsDialogOpen(true);
//           }}
//         >
//           Add Process
//         </Button>
//       </CardActions>

//       <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
//         <DialogTitle>{currentProcess ? 'Edit Process' : 'Add New Process'}</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               label="Process Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               fullWidth
//               required
//               margin="normal"
//             />
//             <TextField
//               label="Display Name"
//               value={formData.displayName}
//               onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
//               fullWidth
//               margin="normal"
//             />
//             <FormControl fullWidth margin="normal">
//               <InputLabel>Product Type</InputLabel>
//               <Select
//                 value={formData.productType}
//                 onChange={(e) =>
//                   setFormData({ ...formData, productType: e.target.value })
//                 }
//                 label="Product Type"
//               >
//                 {productTypes.map((type) => (
//                   <MenuItem key={type.value} value={type.value}>
//                     {type.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </form>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit}>
//             {currentProcess ? 'Update' : 'Create'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Processes;

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { usePermissions } from '../hooks/usePermissions';

const Processes = () => {
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProcess, setCurrentProcess] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    displayName: '',
    productType: 'coated',
  });
  const { hasPermission } = usePermissions();
  const permission = {
    canRead: hasPermission('processes', 'read'),
    canCreate: hasPermission('processes', 'create'),
    canUpdate: hasPermission('processes', 'update'),
    canDelete: hasPermission('processes', 'delete'),
  };

  const API_URL = process.env.REACT_APP_INTERNAL_API_PATH;

  const productTypes = [
    { value: 'all', label: 'All' },
    { value: 'coated', label: 'Coated' },
    { value: 'non-coated', label: 'Non-Coated' },
    { value: 'cream', label: 'Cream' },
  ];

  const fetchProcesses = async () => {
    try {
      setLoading(true);
      const url =
        selectedProductType === 'all'
          ? `${API_URL}/api/processes`
          : `${API_URL}/api/processes?productType=${selectedProductType}`;

      const response = await fetch(url);
      const data = await response.json();
      setProcesses(data);
      setError(null);
    } catch (err) {
      setError('Failed to load processes');
      console.error('Error fetching processes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (permission.canRead) {
      fetchProcesses();
    }
  }, [selectedProductType, permission.canRead]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = currentProcess
        ? `${API_URL}/api/processes/${currentProcess._id}`
        : `${API_URL}/api/processes`;

      const method = currentProcess ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save process');

      await fetchProcesses();
      setIsDialogOpen(false);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (process) => {
    setCurrentProcess(process);
    setFormData({
      name: process.name,
      displayName: process.displayName || '',
      productType: process.productType || 'coated',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this process?')) {
      try {
        const response = await fetch(`${API_URL}/api/processes/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete process');

        await fetchProcesses();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const resetForm = () => {
    setCurrentProcess(null);
    setFormData({
      name: '',
      displayName: '',
      productType: selectedProductType,
    });
  };

  // if (loading) return <div>Loading processes...</div>;

  if (!permission.canRead) {
    console.log('Permission denied for roles read');
    return (
      <div style={{  display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '2rem', // Adjust size as needed
        fontWeight: 'bold',
        textAlign: 'center',}}>
        Access denied!!
      </div>
    );
  }
  
  return (
    <div>
      <Card>
        <CardHeader
          title={
            <Grid container alignItems="center" justifyContent="space-between">
              <div>Process Management</div>
              <FormControl size="small">
                <InputLabel>Product Type</InputLabel>
                <Select
                  value={selectedProductType}
                  onChange={(e) => setSelectedProductType(e.target.value)}
                  label="Product Type"
                >
                  {productTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          }
        />
        <CardContent>
          {error && <Alert severity="error">{error}</Alert>}

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Display Name</TableCell>
                  {/* <TableCell>Product Type</TableCell> */}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {processes.map((process) => (
                  <TableRow key={process._id}>
                    <TableCell>{process.name}</TableCell>
                    <TableCell>{process.displayName || process.name}</TableCell>
                    {/* <TableCell>{process.productType}</TableCell> */}
                    <TableCell>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {permission.canUpdate && (
                          <Button variant='outlined' onClick={() => handleEdit(process)}>
                            Edit
                          </Button>
                        )}
                        {permission.canDelete && (
                          <Button variant='contained' color='error' onClick={() => handleDelete(process._id)}>
                            Delete
                          </Button>
                        )}
                        </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          {permission.canCreate && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
            >
              <Add />
              Add Process
            </Button>
          )}
        </CardActions>
      </Card>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>
          {currentProcess ? 'Edit Process' : 'Add New Process'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Process Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Display Name"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Product Type</InputLabel>
              <Select
                value={formData.productType}
                onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
              >
                {productTypes
                  .filter((type) => type.value !== 'all')
                  .map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>
            {currentProcess ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Processes;
