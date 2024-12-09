// // import React, { useState, useEffect } from "react";
// // import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// // import { useNavigate } from "react-router-dom";
// // import BatchManufacturingFormPage1 from "../pages/forms/tablet arex 10mg/dispensing/page1";
// // import BatchManufacturingFormPage4 from "../pages/forms/tablet arex 10mg/mixing/page4";
// // import Dispensing from "../pages/forms/tablet arex 10mg/dispensing/dispensing";
// // import Mixing from "../pages/forms/tablet arex 10mg/mixing/mixing";
// // import Compression from "../pages/forms/tablet arex 10mg/compression/compression";
// // import Coating from "../pages/forms/tablet arex 10mg/coating/coating";
// // import EquipmentTable from "./Machines";

// // const componentMap = {
// //   dispensing: <Dispensing />,
// //   mixing: <Mixing />,
// //   compression: <Compression />,
// //   coating: <Coating />,
// //   // machines: <EquipmentTable />
// // };

// // const DraggableList = () => {
// //   const initialProcesses = ["dispensing", "mixing", "compression", "coating"];

// //   const [processes, setProcesses] = useState(() => {
// //     const savedProcesses = localStorage.getItem("processes");
// //     return savedProcesses ? JSON.parse(savedProcesses) : initialProcesses;
// //   });

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     localStorage.setItem("processes", JSON.stringify(processes));
// //   }, [processes]);

// //   const onDragEnd = (result) => {
// //     if (!result.destination) return;

// //     const reorderedProcesses = Array.from(processes);
// //     const [movedProcess] = reorderedProcesses.splice(result.source.index, 1);
// //     reorderedProcesses.splice(result.destination.index, 0, movedProcess);

// //     setProcesses(reorderedProcesses);
// //   };

// //   const handleSaveAndNext = () => {
// //     const firstProcess = processes[0];
// //     navigate(`/${firstProcess}`);
// //   };

// //   return (
// //     <div>
// //       <DragDropContext onDragEnd={onDragEnd}>
// //         <Droppable droppableId="processes">
// //           {(provided) => (
// //             <ul
// //               {...provided.droppableProps}
// //               ref={provided.innerRef}
// //               style={{
// //                 listStyleType: "none",
// //                 padding: "0",
// //               }}
// //             >
// //               {processes.map((process, index) => (
// //                 <Draggable key={process} draggableId={process} index={index}>
// //                   {(provided) => (
// //                     <li
// //                       ref={provided.innerRef}
// //                       {...provided.draggableProps}
// //                       {...provided.dragHandleProps}
// //                       style={{
// //                         ...provided.draggableProps.style,
// //                         padding: "8px",
// //                         margin: "4px 0",
// //                         backgroundColor: "#f0f0f0",
// //                         border: "1px solid #ccc",
// //                         borderRadius: "4px",
// //                         boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
// //                       }}
// //                     >
// //                       {process} {/* This is now the string identifier */}
// //                     </li>
// //                   )}
// //                 </Draggable>
// //               ))}
// //               {provided.placeholder}
// //             </ul>
// //           )}
// //         </Droppable>
// //       </DragDropContext>
// //       <button
// //         onClick={handleSaveAndNext}
// //         style={{
// //           marginTop: "20px",
// //           padding: "10px",
// //           backgroundColor: "#007bff",
// //           color: "#fff",
// //           border: "none",
// //           borderRadius: "5px",
// //         }}
// //       >
// //         Save and Next
// //       </button>
// //     </div>
// //   );
// // };

// // export default DraggableList;


// // import React, { useState, useEffect } from "react";
// // import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// // import { useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";

// // // Regular process components
// // import Dispensing from "../pages/forms/tablet arex 10mg/dispensing/dispensing";
// // import Mixing from "../pages/forms/tablet arex 10mg/mixing/mixing";
// // import Compression from "../pages/forms/tablet arex 10mg/compression/compression";
// // import Coating from "../pages/forms/tablet arex 10mg/coating/coating";

// // // Sulpeol specific components
// // import DispensingSulpeol from "../pages/forms/tablet sulpeol 25mg/dispensing/dispensing";
// // import MixingSulpeol from "../pages/forms/tablet sulpeol 25mg/mixing/mixing";
// // import CompressionSulpeol from "../pages/forms/tablet sulpeol 25mg/compression/compression";

// // const DraggableList = () => {
// //   const navigate = useNavigate();
// //   const batchInfo = useSelector((state) => state.batchInfo.batch);
// //   const isSulpeol = batchInfo?.productName?.toLowerCase().includes('sulpeol');

// //   // Define process lists based on product type
// //   const regularProcesses = ["dispensing", "mixing", "compression", "coating"];
// //   const sulpeolProcesses = ["dispensing", "mixing", "compression"];

// //   const [processes, setProcesses] = useState(() => {
// //     const savedProcesses = localStorage.getItem("processes");
// //     if (savedProcesses) {
// //       return JSON.parse(savedProcesses);
// //     }
// //     return isSulpeol ? sulpeolProcesses : regularProcesses;
// //   });

// //   // Update processes when product type changes
// //   useEffect(() => {
// //     const newProcesses = isSulpeol ? sulpeolProcesses : regularProcesses;
// //     setProcesses(newProcesses);
// //     localStorage.setItem("processes", JSON.stringify(newProcesses));
// //   }, [isSulpeol]);

// //   // Save processes to localStorage when they change
// //   useEffect(() => {
// //     localStorage.setItem("processes", JSON.stringify(processes));
// //   }, [processes]);

// //   const onDragEnd = (result) => {
// //     if (!result.destination) return;

// //     const reorderedProcesses = Array.from(processes);
// //     const [movedProcess] = reorderedProcesses.splice(result.source.index, 1);
// //     reorderedProcesses.splice(result.destination.index, 0, movedProcess);

// //     setProcesses(reorderedProcesses);
// //   };

// //   const handleSaveAndNext = () => {
// //     const firstProcess = processes[0];
// //     if (isSulpeol) {
// //       navigate(`/${firstProcess}-sulpeol`);
// //     } else {
// //       navigate(`/${firstProcess}`);
// //     }
// //   };

// //   return (
// //     <div>
// //       <DragDropContext onDragEnd={onDragEnd}>
// //         <Droppable droppableId="processes">
// //           {(provided) => (
// //             <ul
// //               {...provided.droppableProps}
// //               ref={provided.innerRef}
// //               style={{
// //                 listStyleType: "none",
// //                 padding: "0",
// //               }}
// //             >
// //               {processes.map((process, index) => (
// //                 <Draggable key={process} draggableId={process} index={index}>
// //                   {(provided) => (
// //                     <li
// //                       ref={provided.innerRef}
// //                       {...provided.draggableProps}
// //                       {...provided.dragHandleProps}
// //                       style={{
// //                         ...provided.draggableProps.style,
// //                         padding: "8px",
// //                         margin: "4px 0",
// //                         backgroundColor: "#f0f0f0",
// //                         border: "1px solid #ccc",
// //                         borderRadius: "4px",
// //                         boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
// //                       }}
// //                     >
// //                       {process.charAt(0).toUpperCase() + process.slice(1)}
// //                     </li>
// //                   )}
// //                 </Draggable>
// //               ))}
// //               {provided.placeholder}
// //             </ul>
// //           )}
// //         </Droppable>
// //       </DragDropContext>
// //       <button
// //         onClick={handleSaveAndNext}
// //         style={{
// //           marginTop: "20px",
// //           padding: "10px",
// //           backgroundColor: "#007bff",
// //           color: "#fff",
// //           border: "none",
// //           borderRadius: "5px",
// //           cursor: "pointer",
// //         }}
// //       >
// //         Save and Next
// //       </button>
// //     </div>
// //   );
// // };

// // export default DraggableList;

// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// // Regular process components
// import Dispensing from "../pages/forms/tablet arex 10mg/dispensing/dispensing";
// import Mixing from "../pages/forms/tablet arex 10mg/mixing/mixing";
// import Compression from "../pages/forms/tablet arex 10mg/compression/compression";
// import Coating from "../pages/forms/tablet arex 10mg/coating/coating";
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
//   const regularProcesses = ["dispensing", "mixing", "compression", "coating", "report"];
//   const sulpeolProcesses = ["dispensing-sulpeol", "mixing-sulpeol", "compression-sulpeol", "report-sulpeol"];
//   const creamProcesses = ["dispensing-cream", "mixing-cream", "compression-cream", "report-cream"];

//   const [processes, setProcesses] = useState(() => {
//     const savedProcesses = localStorage.getItem("processes");
//     if (savedProcesses) {
//       const parsedProcesses = JSON.parse(savedProcesses);
//       // Ensure processes are in the correct format based on product type
//       return isSulpeol ? sulpeolProcesses : regularProcesses;
//     }
//     return isSulpeol ? sulpeolProcesses : regularProcesses;
//   });

//   // Update processes when product type changes
//   useEffect(() => {
//     const newProcesses = isSulpeol ? sulpeolProcesses : regularProcesses;
//     setProcesses(newProcesses);
//     localStorage.setItem("processes", JSON.stringify(newProcesses));
//   }, [isSulpeol]);

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
//     navigate(`/${firstProcess}`); // No need to append -sulpeol as it's already in the process name
//   };

//   // Function to display process name without -sulpeol suffix
//   const getDisplayName = (process) => {
//     const baseName = process.replace('-sulpeol', '');
//     return baseName.charAt(0).toUpperCase() + baseName.slice(1);
//   };

//   return (
//     <div>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="processes">
//           {(provided) => (
//             <ul
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               style={{
//                 listStyleType: "none",
//                 padding: "0",
//               }}
//             >
//               {processes.map((process, index) => (
//                 <Draggable key={process} draggableId={process} index={index}>
//                   {(provided) => (
//                     <li
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={{
//                         ...provided.draggableProps.style,
//                         padding: "8px",
//                         margin: "4px 0",
//                         backgroundColor: "#f0f0f0",
//                         border: "1px solid #ccc",
//                         borderRadius: "4px",
//                         boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
//                       }}
//                     >
//                       {getDisplayName(process)}
//                     </li>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </ul>
//           )}
//         </Droppable>
//       </DragDropContext>
//       <button
//         onClick={handleSaveAndNext}
//         style={{
//           marginTop: "20px",
//           padding: "10px",
//           backgroundColor: "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         Save and Next
//       </button>
//     </div>
//   );
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

// const DraggableList = () => {
//   const navigate = useNavigate();
//   const batchInfo = useSelector((state) => state.batchInfo.batch);
//   // const isSulpeol = batchInfo?.productName?.toLowerCase().includes('sulpeol');
//   const isSulpeol = batchInfo?.subCategory?.toLowerCase() === 'non-coated';
//   console.log("Batch Info:", batchInfo);
//   console.log("SubCategory:", batchInfo?.subCategory);
//   console.log("Is Sulpeol:", isSulpeol);
  
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

//   // Function to display process name without suffixes
//   const getDisplayName = (process) => {
//     const baseName = process.replace('-sulpeol', '').replace('-cream', '');
//     return baseName.charAt(0).toUpperCase() + baseName.slice(1);
//   };

//   return (
//     <div>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="processes">
//           {(provided) => (
//             <ul
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               style={{
//                 listStyleType: "none",
//                 padding: "0",
//               }}
//             >
//               {processes.map((process, index) => (
//                 <Draggable key={process} draggableId={process} index={index}>
//                   {(provided) => (
//                     <li
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={{
//                         ...provided.draggableProps.style,
//                         padding: "8px",
//                         margin: "4px 0",
//                         backgroundColor: "#f0f0f0",
//                         border: "1px solid #ccc",
//                         borderRadius: "4px",
//                         boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
//                       }}
//                     >
//                       {getDisplayName(process)}
//                     </li>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </ul>
//           )}
//         </Droppable>
//       </DragDropContext>
//       <button
//         onClick={handleSaveAndNext}
//         style={{
//           marginTop: "20px",
//           padding: "10px",
//           backgroundColor: "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         Save
//       </button>
//     </div>
//   );
// };

// export default DraggableList;


// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from 'axios';

// const DraggableList = () => {
//   const navigate = useNavigate();
//   const batchInfo = useSelector((state) => state.batchInfo.batch);
//   const [processes, setProcesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const API_URL = 'http://localhost:5000';
  
//   // Fetch processes based on product type and subcategory
//   useEffect(() => {
//     const fetchProcesses = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${API_URL}/api/processes`, {
//           params: {
//             productType: batchInfo?.productName?.toLowerCase().includes('cream') ? 'cream' :
//                           // batchInfo?.subCategory?.toLowerCase().includes ('non-coated') ? 'non-coated' : 'coated',
//                         batchInfo?.subCategory?.toLowerCase().includes('non-coated') ? 'sulpeol' : 'regular',
//             // subCategory: batchInfo?.subCategory?.toLowerCase().includes('cream') ? 'cream' :
//             //               batchInfo?.subCategory?.toLowerCase().includes("non-coated") ? 'non-coated' : 'coated'
//           // subCategory : isCream ? 'cream' : isNonCoated ? 'non-coated' : 'coated'
//           }
//         });
//         setProcesses(response.data);
//         setError(null);
//       } catch (err) {
//         setError('Failed to load processes');
//         console.error('Error fetching processes:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (batchInfo) {
//       fetchProcesses();
//     }
//   }, [batchInfo]);

//   const onDragEnd = async (result) => {
//     if (!result.destination) return;

//     const reorderedProcesses = Array.from(processes);
//     const [movedProcess] = reorderedProcesses.splice(result.source.index, 1);
//     reorderedProcesses.splice(result.destination.index, 0, movedProcess);

//     setProcesses(reorderedProcesses);

//     try {
//       await axios.put(`${API_URL}/api/processes`, {
//         processes: reorderedProcesses
//       });
//     } catch (error) {
//       console.error('Error updating process order:', error);
//       // Optionally revert the UI if the update fails
//       setProcesses(processes);
//     }
//   };

//   const handleSaveAndNext = () => {
//     if (processes.length > 0) {
//       navigate(`/${processes[0].name}`);
//     }
//   };

//   if (loading) return <div>Loading processes...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="processes">
//           {(provided) => (
//             <ul
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="space-y-2"
//             >
//               {processes.map((process, index) => (
//                 <Draggable
//                   key={process._id}
//                   draggableId={process._id}
//                   index={index}
//                 >
//                   {(provided) => (
//                     <li
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className="p-4 bg-gray-100 rounded shadow hover:shadow-md transition-shadow"
//                     >
//                       {process.displayName || process.name}
//                     </li>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </ul>
//           )}
//         </Droppable>
//       </DragDropContext>

//       <button
//         onClick={handleSaveAndNext}
//         className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//         disabled={processes.length === 0}
//       >
//         Save and Continue
//       </button>
//     </div>
//   );
// };

// export default DraggableList;

// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from 'axios';

// const DraggableList = () => {
//   const navigate = useNavigate();
//   const batchInfo = useSelector((state) => state.batchInfo.batch);
//   const [processes, setProcesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const API_URL = 'http://localhost:5000';
  
//   // Determine batch type
//   const getBatchType = () => {
//     if (batchInfo?.productName?.toLowerCase().includes('cream')) {
//       return 'cream';
//     } else if (batchInfo?.subCategory?.toLowerCase().includes('non-coated')) {
//       return 'sulpeol';
//     }
//     return 'regular';
//   };

//   // Fetch processes based on product type and subcategory
//   useEffect(() => {
//     const fetchProcesses = async () => {
//       try {
//         setLoading(true);
//         const batchType = getBatchType();
//         const response = await axios.get(`${API_URL}/api/processes`, {
//           params: {
//             productType: batchType
//           }
//         });
//         setProcesses(response.data);
//         setError(null);
//       } catch (err) {
//         setError('Failed to load processes');
//         console.error('Error fetching processes:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (batchInfo) {
//       fetchProcesses();
//     }
//   }, [batchInfo]);

//   const onDragEnd = async (result) => {
//     if (!result.destination) return;

//     const reorderedProcesses = Array.from(processes);
//     const [movedProcess] = reorderedProcesses.splice(result.source.index, 1);
//     reorderedProcesses.splice(result.destination.index, 0, movedProcess);

//     setProcesses(reorderedProcesses);

//     try {
//       await axios.put(`${API_URL}/api/processes`, {
//         processes: reorderedProcesses
//       });
//     } catch (error) {
//       console.error('Error updating process order:', error);
//       setProcesses(processes);
//     }
//   };

//   const getProcessRoute = (processName, batchType) => {
//     // Convert process name to lowercase and remove any existing suffixes
//     const baseName = processName.toLowerCase().replace(/-cream|-sulpeol/g, '');
    
//     // Add appropriate suffix based on batch type
//     switch(batchType) {
//       case 'cream':
//         return `${baseName}-cream`;
//       case 'sulpeol':
//         return `${baseName}-sulpeol`;
//       default:
//         return baseName;
//     }
//   };

//   const handleSaveAndNext = () => {
//     if (processes.length > 0) {
//       const batchType = getBatchType();
//       const route = getProcessRoute(processes[0].name, batchType);
//       navigate(`/${route}`);
//     }
//   };

//   if (loading) return <div>Loading processes...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="mb-4 p-2 bg-blue-100 rounded">
//         <p>Current Batch Type: {getBatchType()}</p>
//       </div>
      
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="processes">
//           {(provided) => (
//             <ul
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="space-y-2"
//             >
//               {processes.map((process, index) => (
//                 <Draggable
//                   key={process._id}
//                   draggableId={process._id}
//                   index={index}
//                 >
//                   {(provided) => (
//                     <li
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className="p-4 bg-gray-100 rounded shadow hover:shadow-md transition-shadow"
//                     >
//                       {process.displayName || process.name}
//                     </li>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </ul>
//           )}
//         </Droppable>
//       </DragDropContext>

//       <button
//         onClick={handleSaveAndNext}
//         className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//         disabled={processes.length === 0}
//       >
//         Save and Continue
//       </button>
//     </div>
//   );
// };

// export default DraggableList;

// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_INTERNAL_API_PATH;
// const DraggableList = () => {
//   const navigate = useNavigate();
//   const batchInfo = useSelector((state) => state.batchInfo.batch);
//   const [processes, setProcesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const getBatchType = () => {
//     if (batchInfo?.productName?.toLowerCase().includes('cream')) {
//       return 'cream';
//     } else if (batchInfo?.subCategory?.toLowerCase().includes('non-coated')) {
//       // return 'sulpeol';
//       return 'non-coated';
//     }
//     // return 'regular';
//     return 'coated';
//   };

//   // Fetch processes and save to localStorage
//   useEffect(() => {
//     const fetchProcesses = async () => {
//       try {
//         setLoading(true);
//         const batchType = getBatchType();
//         const response = await axios.get(`${API_URL}/api/processes`, {
//           params: {
//             productType: batchType
//           }
//         });
//         const fetchedProcesses = response.data;
//         setProcesses(fetchedProcesses);
//         // Save processes to localStorage
//         localStorage.setItem('processes', JSON.stringify(fetchedProcesses));
//         setError(null);
//       } catch (err) {
//         setError('Failed to load processes');
//         console.error('Error fetching processes:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (batchInfo) {
//       fetchProcesses();
//     }
//   }, [batchInfo]);

//   const onDragEnd = async (result) => {
//     if (!result.destination) return;

//     const reorderedProcesses = Array.from(processes);
//     const [movedProcess] = reorderedProcesses.splice(result.source.index, 1);
//     reorderedProcesses.splice(result.destination.index, 0, movedProcess);

//     setProcesses(reorderedProcesses);
//     // Save reordered processes to localStorage
//     localStorage.setItem('processes', JSON.stringify(reorderedProcesses));

//     try {
//       await axios.put(`${API_URL}/api/processes`, {
//         processes: reorderedProcesses
//       });
//     } catch (error) {
//       console.error('Error updating process order:', error);
//       setProcesses(processes);
//     }
//   };

//   const getProcessRoute = (processName, batchType) => {
//     // Convert process name to lowercase and remove any existing suffixes
//     const baseName = processName.toLowerCase().replace(/-cream|-sulpeol/g, '');
    
//     // Add appropriate suffix based on batch type
//     switch(batchType) {
//       case 'cream':
//         return `${baseName}-cream`;
//       // case 'sulpeol':
//       //   return `${baseName}-sulpeol`;
//       case 'non-coated':
//         return `${baseName}-non-coated`;
//       default:
//         return baseName;
//     }
//   };

//   const handleSaveAndNext = () => {
//     if (processes.length > 0) {
//       const batchType = getBatchType();
//       const route = getProcessRoute(processes[0].name, batchType);
//       // Save current process index to localStorage
//       localStorage.setItem('currentProcessIndex', '0');
//       navigate(`/${route}`);
//     }
//   };

//   if (loading) return <div>Loading processes...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="mb-4 p-2 bg-blue-100 rounded">
//         <p>Current Batch Type: {getBatchType()}</p>
//       </div>
      
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="processes">
//           {(provided) => (
//             <ul
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="space-y-2"
//             >
//               {processes.map((process, index) => (
//                 <Draggable
//                   key={process._id}
//                   draggableId={process._id}
//                   index={index}
//                 >
//                   {(provided) => (
//                     <li
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className="p-4 bg-gray-100 rounded shadow hover:shadow-md transition-shadow"
//                     >
//                       {process.displayName || process.name}
//                     </li>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </ul>
//           )}
//         </Droppable>
//       </DragDropContext>

//       <button
//         onClick={handleSaveAndNext}
//         className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//         disabled={processes.length === 0}
//       >
//         Save and Continue
//       </button>
//     </div>
//   );
// };

// export default DraggableList;

// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_INTERNAL_API_PATH;

// const DraggableList = () => {
//   const navigate = useNavigate();
//   const batchInfo = useSelector((state) => state.batchInfo.batch);
//   const [processes, setProcesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentProcessIndex, setCurrentProcessIndex] = useState(() => {
//     const storedIndex = localStorage.getItem('currentProcessIndex');
//     return storedIndex ? parseInt(storedIndex) : 0;
//   });
  
//   const getBatchType = () => {
//     if (batchInfo?.productName?.toLowerCase().includes('cream')) {
//       return 'cream';
//     } else if (batchInfo?.subCategory?.toLowerCase().includes('non-coated')) {
//       return 'non-coated';
//     }
//     return 'coated';
//   };

//   useEffect(() => {
//     const fetchProcesses = async () => {
//       try {
//         setLoading(true);
//         const batchType = getBatchType();
//         const response = await axios.get(`${API_URL}/api/processes`, {
//           params: {
//             productType: batchType
//           }
//         });
//         const fetchedProcesses = response.data;
        
//         const storedProcesses = localStorage.getItem('processes');
//         if (storedProcesses) {
//           const parsedStoredProcesses = JSON.parse(storedProcesses);
//           const reorderedProcesses = parsedStoredProcesses.map(storedProcess => {
//             const matchingProcess = fetchedProcesses.find(p => p._id === storedProcess._id);
//             return matchingProcess || storedProcess;
//           });
//           setProcesses(reorderedProcesses);
//         } else {
//           setProcesses(fetchedProcesses);
//           localStorage.setItem('processes', JSON.stringify(fetchedProcesses));
//         }
//         setError(null);
//       } catch (err) {
//         setError('Failed to load processes');
//         console.error('Error fetching processes:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (batchInfo) {
//       fetchProcesses();
//     }
//   }, [batchInfo]);

//   const onDragEnd = async (result) => {
//     if (!result.destination) return;

//     const reorderedProcesses = Array.from(processes);
//     const [movedProcess] = reorderedProcesses.splice(result.source.index, 1);
//     reorderedProcesses.splice(result.destination.index, 0, movedProcess);

//     setProcesses(reorderedProcesses);
//     localStorage.setItem('processes', JSON.stringify(reorderedProcesses));

//     // Reset currentProcessIndex only if we're at the start
//     if (currentProcessIndex === 0) {
//       const batchType = getBatchType();
//       const firstProcess = reorderedProcesses[0];
//       const route = getProcessRoute(firstProcess.name, batchType);
//       navigate(`/${route}`);
//     }

//     try {
//       await axios.put(`${API_URL}/api/processes`, {
//         processes: reorderedProcesses
//       });
//     } catch (error) {
//       console.error('Error updating process order:', error);
//       setProcesses(processes);
//     }
//   };

//   const getProcessRoute = (processName, batchType) => {
//     const baseName = processName.toLowerCase().replace(/-cream|-sulpeol/g, '');
    
//     switch(batchType) {
//       case 'cream':
//         return `${baseName}-cream`;
//       case 'non-coated':
//         return `${baseName}-non-coated`;
//       default:
//         return baseName;
//     }
//   };

//   const handleCompleteBatch = async () => {
//     try {
//       const response = await axios.patch(`${API_URL}/api/batch-plan/${batchInfo._id}`, {
//         'batch.status': 'Completed'
//       });

//       if (response.status === 200) {
//         localStorage.removeItem('currentProcessIndex');
//         localStorage.removeItem('processes');
//         navigate('/batch-table');
//       }
//     } catch (error) {
//       console.error('Error completing batch:', error);
//       alert('Failed to complete batch. Please try again.');
//     }
//   };

//   const handleProcessNavigation = (index) => {
//     if (processes.length > 0 && index < processes.length) {
//       const batchType = getBatchType();
//       const nextProcess = processes[index];
//       const route = getProcessRoute(nextProcess.name, batchType);
      
//       setCurrentProcessIndex(index);
//       localStorage.setItem('currentProcessIndex', index.toString());
//       localStorage.setItem('processes', JSON.stringify(processes));
      
//       navigate(`/${route}`);
//     }
//   };

//   const handleSaveAndNext = () => {
//     const newIndex = currentProcessIndex + 1;
//     if (newIndex < processes.length) {
//       handleProcessNavigation(newIndex);
//     }
//   };

//   if (loading) return <div>Loading processes...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const isLastProcess = currentProcessIndex === processes.length - 1;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="mb-4 p-2 bg-blue-100 rounded">
//         <p>Current Batch Type: {getBatchType()}</p>
//         <p>Current Process: {processes[currentProcessIndex]?.displayName || processes[currentProcessIndex]?.name}</p>
//       </div>
      
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="processes">
//           {(provided) => (
//             <ul
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="space-y-2"
//             >
//               {processes.map((process, index) => (
//                 <Draggable
//                   key={process._id}
//                   draggableId={process._id}
//                   index={index}
//                 >
//                   {(provided) => (
//                     <li
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className={`p-4 rounded shadow hover:shadow-md transition-shadow ${
//                         index === currentProcessIndex
//                           ? 'bg-blue-200'
//                           : index < currentProcessIndex
//                             ? 'bg-green-100'
//                             : 'bg-gray-100'
//                       }`}
//                     >
//                       {process.displayName || process.name}
//                     </li>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </ul>
//           )}
//         </Droppable>
//       </DragDropContext>

//       <div className="mt-4 space-x-4">
//         {isLastProcess ? (
//           <button
//             onClick={handleCompleteBatch}
//             className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
//           >
//             Complete Batch
//           </button>
//         ) : (
//           <button
//             onClick={handleSaveAndNext}
//             className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//             disabled={processes.length === 0}
//           >
//             Save and Continue
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DraggableList;

// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_INTERNAL_API_PATH;

// const DraggableList = () => {
//   const navigate = useNavigate();
//   const batchInfo = useSelector((state) => state.batchInfo.batch);
//   const [processes, setProcesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentProcessIndex, setCurrentProcessIndex] = useState(0);
  
//   const getBatchType = () => {
//     if (batchInfo?.productName?.toLowerCase().includes('cream')) {
//       return 'cream';
//     } else if (batchInfo?.subCategory?.toLowerCase().includes('non-coated')) {
//       return 'non-coated';
//     }
//     return 'coated';
//   };

//   useEffect(() => {
//     const fetchProcesses = async () => {
//       try {
//         setLoading(true);
//         const batchType = getBatchType();
//         const response = await axios.get(`${API_URL}/api/processes`, {
//           params: {
//             productType: batchType
//           }
//         });
//         const fetchedProcesses = response.data;
        
//         const storedProcesses = localStorage.getItem('processes');
//         if (storedProcesses) {
//           const parsedStoredProcesses = JSON.parse(storedProcesses);
//           const reorderedProcesses = parsedStoredProcesses.map(storedProcess => {
//             const matchingProcess = fetchedProcesses.find(p => p._id === storedProcess._id);
//             return matchingProcess || storedProcess;
//           });
//           setProcesses(reorderedProcesses);
//         } else {
//           setProcesses(fetchedProcesses);
//           localStorage.setItem('processes', JSON.stringify(fetchedProcesses));
//         }
//         setError(null);
//       } catch (err) {
//         setError('Failed to load processes');
//         console.error('Error fetching processes:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (batchInfo) {
//       fetchProcesses();
//     }
//   }, [batchInfo]);

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const reorderedProcesses = Array.from(processes);
//     const [movedProcess] = reorderedProcesses.splice(result.source.index, 1);
//     reorderedProcesses.splice(result.destination.index, 0, movedProcess);

//     setProcesses(reorderedProcesses);
//     localStorage.setItem('processes', JSON.stringify(reorderedProcesses));
//     setCurrentProcessIndex(0);
//   };
  
//   // const onDragEnd = async (result) => {
//   //   if (!result.destination) return;

//   //   const reorderedProcesses = Array.from(processes);
//   //   const [movedProcess] = reorderedProcesses.splice(result.source.index, 1);
//   //   reorderedProcesses.splice(result.destination.index, 0, movedProcess);

//   //   setProcesses(reorderedProcesses);
//   //   localStorage.setItem('processes', JSON.stringify(reorderedProcesses));
//   //   setCurrentProcessIndex(0);

//   //   try {
//   //     await axios.put(`${API_URL}/api/processes`, {
//   //       processes: reorderedProcesses
//   //     });
//   //   } catch (error) {
//   //     console.error('Error updating process order:', error);
//   //     setProcesses(processes);
//   //   }
//   // };

//   const getProcessRoute = (processName, batchType) => {
//     const baseName = processName.toLowerCase().replace(/-cream|-sulpeol/g, '');
    
//     switch(batchType) {
//       case 'cream':
//         return `${baseName}-cream`;
//       case 'non-coated':
//         return `${baseName}-non-coated`;
//       default:
//         return baseName;
//     }
//   };

//   const handleStatusChange = async (newStatus) => {
//     try {
//       const response = await axios.patch(`${API_URL}/api/batch-plan/${batchInfo._id}`, {
//         'batch.status': newStatus
//       });

//       if (response.status === 200) {
//         // Only clear localStorage if status is set to Completed
//         if (newStatus === 'Completed') {
//           localStorage.removeItem('currentProcessIndex');
//           localStorage.removeItem('processes');
//         }
//         navigate('/batch-table');
//       }
//     } catch (error) {
//       console.error('Error updating batch status:', error);
//       alert('Failed to update batch status. Please try again.');
//     }
//   };

//   const handleSaveAndNext = () => {
//     if (processes.length > 0) {
//       const newIndex = currentProcessIndex + 1;
      
//       if (newIndex < processes.length) {
//         const batchType = getBatchType();
//         const nextProcess = processes[newIndex];
//         const route = getProcessRoute(nextProcess.name, batchType);
        
//         setCurrentProcessIndex(newIndex);
//         localStorage.setItem('currentProcessIndex', newIndex.toString());
//         localStorage.setItem('processes', JSON.stringify(processes));
        
//         navigate(`/${route}`);
//       }
//     }
//   };

//   const handleStartProcess = () => {
//     if (processes.length > 0) {
//       const batchType = getBatchType();
//       const firstProcess = processes[0];
//       const route = getProcessRoute(firstProcess.name, batchType);
      
//       setCurrentProcessIndex(0);
//       localStorage.setItem('currentProcessIndex', '0');
//       localStorage.setItem('processes', JSON.stringify(processes));
      
//       navigate(`/${route}`);
//     }
//   };

//   if (loading) return <div>Loading processes...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const isLastProcess = currentProcessIndex === processes.length - 1;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="mb-4 p-2 bg-blue-100 rounded">
//         <p>Current Batch Type: {getBatchType()}</p>
//         <p>Current Process: {processes[currentProcessIndex]?.displayName || processes[currentProcessIndex]?.name}</p>
//       </div>
      
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="processes">
//           {(provided) => (
//             <ul
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="space-y-2"
//             >
//               {processes.map((process, index) => (
//                 <Draggable
//                   key={process._id}
//                   draggableId={process._id}
//                   index={index}
//                 >
//                   {(provided) => (
//                     <li
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className={`p-4 rounded shadow hover:shadow-md transition-shadow ${
//                         index === currentProcessIndex
//                           ? 'bg-blue-200'
//                           : index < currentProcessIndex
//                             ? 'bg-green-100'
//                             : 'bg-gray-100'
//                       }`}
//                     >
//                       {process.displayName || process.name}
//                     </li>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </ul>
//           )}
//         </Droppable>
//       </DragDropContext>

//       <div className="mt-4 space-x-4">
//         {currentProcessIndex === 0 ? (
//           <button
//             onClick={handleStartProcess}
//             className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//             disabled={processes.length === 0}
//           >
//             Start Process
//           </button>
//         ) : isLastProcess ? (
//           <div className="space-x-4">
//             <select
//               onChange={(e) => handleStatusChange(e.target.value)}
//               className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               defaultValue=""
//             >
//               <option value="" disabled>Update Status</option>
//               <option value="Pending">Pending</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>
//         ) : (
//           <button
//             onClick={handleSaveAndNext}
//             className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//             disabled={processes.length === 0}
//           >
//             Save and Continue
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DraggableList;

// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from 'axios';
// import { Button, Select, MenuItem, Box, Typography } from "@mui/material";

// const API_URL = process.env.REACT_APP_INTERNAL_API_PATH;

// const DraggableList = () => {
//   const navigate = useNavigate();
//   const batchInfo = useSelector((state) => state.batchInfo.batch);
//   const [processes, setProcesses] = useState([]);
//   const [defaultProcesses, setDefaultProcesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentProcessIndex, setCurrentProcessIndex] = useState(0);
//   const [isCustomizeMode, setIsCustomizeMode] = useState(false);

//   const getBatchType = () => {
//     if (batchInfo?.productName?.toLowerCase().includes('cream')) {
//       return 'cream';
//     } else if (batchInfo?.subCategory?.toLowerCase().includes('non-coated')) {
//       return 'non-coated';
//     }
//     return 'coated';
//   };

//   useEffect(() => {
//     const fetchProcesses = async () => {
//       try {
//         setLoading(true);
//         const batchType = getBatchType();
//         const response = await axios.get(`${API_URL}/api/processes`, {
//           params: {
//             productType: batchType
//           }
//         });
//         const fetchedProcesses = response.data;

//         // Store the default order
//         setDefaultProcesses(fetchedProcesses);
        
//         const storedProcesses = localStorage.getItem('processes');
//         if (storedProcesses) {
//           const parsedStoredProcesses = JSON.parse(storedProcesses);
//           const reorderedProcesses = parsedStoredProcesses.map(storedProcess => {
//             const matchingProcess = fetchedProcesses.find(p => p._id === storedProcess._id);
//             return matchingProcess || storedProcess;
//           });
//           setProcesses(reorderedProcesses);
//         } else {
//           setProcesses(fetchedProcesses);
//           localStorage.setItem('processes', JSON.stringify(fetchedProcesses));
//         }
//         setError(null);
//       } catch (err) {
//         setError('Failed to load processes');
//         console.error('Error fetching processes:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (batchInfo) {
//       fetchProcesses();
//     }
//   }, [batchInfo]);

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const reorderedProcesses = Array.from(processes);
//     const [movedProcess] = reorderedProcesses.splice(result.source.index, 1);
//     reorderedProcesses.splice(result.destination.index, 0, movedProcess);

//     setProcesses(reorderedProcesses);
//     localStorage.setItem('processes', JSON.stringify(reorderedProcesses));
//     setCurrentProcessIndex(0);
//   };
  
//   // const onDragEnd = async (result) => {
//   //   if (!result.destination) return;

//   //   const reorderedProcesses = Array.from(processes);
//   //   const [movedProcess] = reorderedProcesses.splice(result.source.index, 1);
//   //   reorderedProcesses.splice(result.destination.index, 0, movedProcess);

//   //   setProcesses(reorderedProcesses);
//   //   localStorage.setItem('processes', JSON.stringify(reorderedProcesses));
//   //   setCurrentProcessIndex(0);

//   //   try {
//   //     await axios.put(`${API_URL}/api/processes`, {
//   //       processes: reorderedProcesses
//   //     });
//   //   } catch (error) {
//   //     console.error('Error updating process order:', error);
//   //     setProcesses(processes);
//   //   }
//   // };

//   const handleRestoreDefault = () => {
//     setProcesses(defaultProcesses);
//     localStorage.setItem('processes', JSON.stringify(defaultProcesses));
//     setCurrentProcessIndex(0);
//     setIsCustomizeMode(false);
//   };

//   const getProcessRoute = (processName, batchType) => {
//     const baseName = processName.toLowerCase().replace(/-cream|-sulpeol/g, '');
    
//     switch (batchType) {
//       case 'cream':
//         return `${baseName}-cream`;
//       case 'non-coated':
//         return `${baseName}-non-coated`;
//       default:
//         return baseName;
//     }
//   };

//   const handleStatusChange = async (newStatus) => {
//     try {
//       const response = await axios.patch(`${API_URL}/api/batch-plan/${batchInfo._id}`, {
//         'batch.status': newStatus
//       });

//       if (response.status === 200) {
//         // Only clear localStorage if status is set to Completed
//         if (newStatus === 'Completed') {
//           localStorage.removeItem('currentProcessIndex');
//           localStorage.removeItem('processes');
//         }
//         navigate('/batch-table');
//       }
//     } catch (error) {
//       console.error('Error updating batch status:', error);
//       alert('Failed to update batch status. Please try again.');
//     }
//   };

//   const handleSaveAndNext = () => {
//     if (processes.length > 0) {
//       const newIndex = currentProcessIndex + 1;
      
//       if (newIndex < processes.length) {
//         const batchType = getBatchType();
//         const nextProcess = processes[newIndex];
//         const route = getProcessRoute(nextProcess.name, batchType);
        
//         setCurrentProcessIndex(newIndex);
//         localStorage.setItem('currentProcessIndex', newIndex.toString());
//         localStorage.setItem('processes', JSON.stringify(processes));
        
//         navigate(`/${route}`);
//       }
//     }
//   };

//   const handleStartProcess = () => {
//     if (processes.length > 0) {
//       const batchType = getBatchType();
//       const firstProcess = processes[0];
//       const route = getProcessRoute(firstProcess.name, batchType);
      
//       setCurrentProcessIndex(0);
//       localStorage.setItem('currentProcessIndex', '0');
//       localStorage.setItem('processes', JSON.stringify(processes));
      
//       navigate(`/${route}`);
//     }
//   };

//   if (loading) return <div>Loading processes...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const isLastProcess = currentProcessIndex === processes.length - 1;

//   return (
//     <Box className="container mx-auto p-4">
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
//         <Box p={2} bgcolor="lightblue" borderRadius={2}>
//           <Typography>Current Batch Type: {getBatchType()}</Typography>
//           <Typography>
//             Current Process:{" "}
//             {processes[currentProcessIndex]?.displayName || processes[currentProcessIndex]?.name}
//           </Typography>
//         </Box>
//         <Box>
//           <Button
//             onClick={() => setIsCustomizeMode(!isCustomizeMode)}
//             sx={{
//               px: 2,
//               py: 1,
//               bgcolor: isCustomizeMode ? "green" : "blue",
//               color: "white",
//               "&:hover": {
//                 bgcolor: isCustomizeMode ? "darkgreen" : "darkblue",
//               },
//             }}
//           >
//             {isCustomizeMode ? "Done Customizing" : "Customize Order"}
//           </Button>
//           <Button
//             onClick={handleRestoreDefault}
//             sx={{
//               px: 2,
//               py: 1,
//               bgcolor: "gray",
//               color: "white",
//               ml: 2,
//               "&:hover": {
//                 bgcolor: "darkgray",
//               },
//             }}
//           >
//             Restore Default Order
//           </Button>
//         </Box>
//       </Box>
  
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="processes">
//           {(provided) => (
//             <Box {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
//               {processes.map((process, index) => (
//                 <Draggable
//                   key={process._id}
//                   draggableId={process._id}
//                   index={index}
//                   isDragDisabled={!isCustomizeMode}
//                 >
//                   {(provided, snapshot) => (
//                     <Box
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       p={2}
//                       sx={{
//                         bgcolor:
//                           index === currentProcessIndex
//                             ? "lightblue"
//                             : index < currentProcessIndex
//                               ? "lightgreen"
//                               : "lightgray",
//                         cursor: isCustomizeMode ? "grab" : "default",
//                         boxShadow: snapshot.isDragging
//                           ? "0px 4px 8px rgba(0, 0, 0, 0.2)"
//                           : "0px 2px 4px rgba(0, 0, 0, 0.1)",
//                         transition: "transform 0.2s, box-shadow 0.2s",
//                         borderRadius: 2,
//                         mb: 2,
//                       }}
//                     >
//                       <Box display="flex" justifyContent="space-between" alignItems="center">
//                         <Typography>{process.displayName || process.name}</Typography>
//                         {isCustomizeMode && (
//                           <Typography color="textSecondary" fontSize="0.8rem">
//                             ⋮⋮ Drag to reorder
//                           </Typography>
//                         )}
//                       </Box>
//                     </Box>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </Box>
//           )}
//         </Droppable>
//       </DragDropContext>
  
//       <Box mt={4} display="flex" gap={2}>
//         {currentProcessIndex === 0 ? (
//           <Button
//             onClick={handleStartProcess}
//             sx={{
//               px: 4,
//               py: 1,
//               bgcolor: "blue",
//               color: "white",
//               "&:hover": {
//                 bgcolor: "darkblue",
//               },
//             }}
//             disabled={processes.length === 0 || isCustomizeMode}
//           >
//             Start Process
//           </Button>
//         ) : isLastProcess ? (
//           <Select
//             onChange={(e) => handleStatusChange(e.target.value)}
//             defaultValue=""
//             disabled={isCustomizeMode}
//             sx={{ minWidth: 200 }}
//           >
//             <MenuItem value="" disabled>
//               Update Status
//             </MenuItem>
//             <MenuItem value="Pending">Pending</MenuItem>
//             <MenuItem value="In Progress">In Progress</MenuItem>
//             <MenuItem value="Completed">Completed</MenuItem>
//           </Select>
//         ) : (
//           <Button
//             onClick={handleSaveAndNext}
//             sx={{
//               px: 4,
//               py: 1,
//               bgcolor: "blue",
//               color: "white",
//               "&:hover": {
//                 bgcolor: "darkblue",
//               },
//             }}
//             disabled={processes.length === 0 || isCustomizeMode}
//           >
//             Save and Continue
//           </Button>
//         )}
//       </Box>
//     </Box>
//   )
// }

// export default DraggableList;


import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import { Button } from "@mui/material";

const API_URL = process.env.REACT_APP_INTERNAL_API_PATH;
const DraggableList = () => {
  const navigate = useNavigate();
  const batchInfo = useSelector((state) => state.batchInfo.batch);
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDraggable, setIsDraggable] = useState(false); // State to toggle drag-and-drop
  const [originalProcesses, setOriginalProcesses] = useState([]); // Store original process order
  
  const getBatchType = () => {
    if (batchInfo?.productName?.toLowerCase().includes('cream')) {
      return 'cream';
    } else if (batchInfo?.subCategory?.toLowerCase().includes('non-coated')) {
      // return 'sulpeol';
      return 'non-coated';
    }
    // return 'regular';
    return 'coated';
  };

  // Fetch processes and save to localStorage
  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        setLoading(true);
        const batchType = getBatchType();
        const response = await axios.get(`${API_URL}/api/processes`, {
          params: {
            productType: batchType
          }
        });
        const fetchedProcesses = response.data;
        setProcesses(fetchedProcesses);
        setOriginalProcesses(fetchedProcesses); // Store original process order
        // Save processes to localStorage
        localStorage.setItem('processes', JSON.stringify(fetchedProcesses));
        setError(null);
      } catch (err) {
        setError('Failed to load processes');
        console.error('Error fetching processes:', err);
      } finally {
        setLoading(false);
      }
    };
  
    if (batchInfo) {
      fetchProcesses();
    }
  }, [batchInfo]);
  
  const onDragEnd = async (result) => {
    if (!result.destination) return;
  
    if (isDraggable) { // Only reorder if drag-and-drop is enabled
      const reorderedProcesses = Array.from(processes);
      const [movedProcess] = reorderedProcesses.splice(result.source.index, 1);
      reorderedProcesses.splice(result.destination.index, 0, movedProcess);
  
      setProcesses(reorderedProcesses);
      // Save reordered processes to localStorage
      localStorage.setItem('processes', JSON.stringify(reorderedProcesses));
  
      // try {
      //   await axios.put(`${API_URL}/api/processes`, {
      //     processes: reorderedProcesses
      //   });
      // } catch (error) {
      //   console.error('Error updating process order:', error);
      //   setProcesses(processes);
      // }
    }
  };
  
  const handleToggleDraggable = () => {
    setIsDraggable(!isDraggable);
  };
  
  const handleResetOrder = () => {
    setProcesses(originalProcesses);
    localStorage.setItem('processes', JSON.stringify(originalProcesses));
    try {
      axios.put(`${API_URL}/api/processes`, {
        processes: originalProcesses
      });
    } catch (error) {
      console.error('Error resetting process order:', error);
    }
  };

  const getProcessRoute = (processName, batchType) => {
    // Convert process name to lowercase and remove any existing suffixes
    const baseName = processName.toLowerCase().replace(/-cream|-sulpeol/g, '');
    
    // Add appropriate suffix based on batch type
    switch(batchType) {
      case 'cream':
        return `${baseName}-cream`;
      // case 'sulpeol':
      //   return `${baseName}-sulpeol`;
      case 'non-coated':
        return `${baseName}-non-coated`;
      default:
        return baseName;
    }
  };

  const handleSaveAndNext = () => {
    if (processes.length > 0) {
      const batchType = getBatchType();
      const route = getProcessRoute(processes[0].name, batchType);
      // Save current process index to localStorage
      localStorage.setItem('currentProcessIndex', '0');
      navigate(`/${route}`);
    }
  };

  if (loading) return <div>Loading processes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 p-2 bg-blue-100 rounded">
        <p>Current Batch Type: {getBatchType()}</p>
      </div>
      
      <div className="flex justify-between mb-4">
        {/* <button
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          onClick={handleToggleDraggable}
        > */}
          <Button
            onClick={handleToggleDraggable}

            sx={{
              px: 2,
              py: 1,
              bgcolor: isDraggable ? "green" : "blue",
              color: "white",
              "&:hover": {
                bgcolor: isDraggable ? "darkgreen" : "darkblue",
              },
            }}
          >
          {isDraggable ? 'Disable Drag-and-Drop' : 'Enable Drag-and-Drop'}
        </Button>
          <Button
          onClick={handleResetOrder}
            sx={{
              px: 2,
              py: 1,
              bgcolor: "gray",
              color: "white",
              ml: 2,
              "&:hover": {
                bgcolor: "darkgray",
              },
            }}
          >
          Reset to Default Order
        </Button>
      </div>
  
      {isDraggable && (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="processes">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {processes.map((process, index) => (
                <Draggable
                  key={process._id}
                  draggableId={process._id}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 bg-gray-100 rounded shadow hover:shadow-md transition-shadow"
                    >
                      {process.displayName || process.name}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    )}

    {!isDraggable && (
      <ul className="space-y-2">
        {processes.map((process) => (
          <li key={process._id} className="p-4 bg-gray-100 rounded shadow hover:shadow-md transition-shadow">
            {process.displayName || process.name}
          </li>
        ))}
      </ul>
    )}

    {/* <button
      onClick={handleSaveAndNext}
      className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      disabled={processes.length === 0}
      > */}
        <Button
            onClick={handleSaveAndNext}
            sx={{
              px: 4,
              py: 1,
              bgcolor: "blue",
              color: "white",
              "&:hover": {
                bgcolor: "darkblue",
              },
            }}
            disabled={processes.length === 0 || isDraggable}
          >
      Save and Continue
    </Button>
  </div>
);
};

export default DraggableList;
