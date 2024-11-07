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

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Regular process components
import Dispensing from "../pages/forms/tablet arex 10mg/dispensing/dispensing";
import Mixing from "../pages/forms/tablet arex 10mg/mixing/mixing";
import Compression from "../pages/forms/tablet arex 10mg/compression/compression";
import Coating from "../pages/forms/tablet arex 10mg/coating/coating";
import FormHeaderPacking from "../pages/header/formHeaderPacking";
import Printing from "../pages/forms/tablet arex 10mg/printing/printing";
import Blistering from "../pages/forms/tablet arex 10mg/blistering/blistering";
import Packaging from "../pages/forms/tablet arex 10mg/packing/packing";
import Report from "../reports/Report";

// Sulpeol specific components
import DispensingSulpeol from "../pages/forms/tablet sulpeol 25mg/dispensing/dispensing";
import MixingSulpeol from "../pages/forms/tablet sulpeol 25mg/mixing/mixing";
import CompressionSulpeol from "../pages/forms/tablet sulpeol 25mg/compression/compression";
import ReportSulpeol from "../reports/sulpeolReport";

const DraggableList = () => {
  const navigate = useNavigate();
  const batchInfo = useSelector((state) => state.batchInfo.batch);
  const isSulpeol = batchInfo?.productName?.toLowerCase().includes('sulpeol');
  const isCream = batchInfo?.productName?.toLowerCase().includes('cream');

  // Define process lists based on product type
  const regularProcesses = ["dispensing", "mixing", "compression", "coating", "form-header-packing", "printing", "blistering", "packing", "report"];
  const sulpeolProcesses = ["dispensing-sulpeol", "mixing-sulpeol", "compression-sulpeol", "report-sulpeol"];
  const creamProcesses = ["dispensing-cream", "mixing-cream", "compression-cream", "report-cream"];

  const [processes, setProcesses] = useState(() => {
    const savedProcesses = localStorage.getItem("processes");
    if (savedProcesses) {
      return JSON.parse(savedProcesses);
    }
    return isCream ? creamProcesses : isSulpeol ? sulpeolProcesses : regularProcesses;
  });

  // Update processes when product type changes
  useEffect(() => {
    const newProcesses = isCream ? creamProcesses : isSulpeol ? sulpeolProcesses : regularProcesses;
    setProcesses(newProcesses);
    localStorage.setItem("processes", JSON.stringify(newProcesses));
  }, [isCream, isSulpeol]);

  // Save processes to localStorage when they change
  useEffect(() => {
    localStorage.setItem("processes", JSON.stringify(processes));
  }, [processes]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedProcesses = Array.from(processes);
    const [movedProcess] = reorderedProcesses.splice(result.source.index, 1);
    reorderedProcesses.splice(result.destination.index, 0, movedProcess);

    setProcesses(reorderedProcesses);
  };

  const handleSaveAndNext = () => {
    const firstProcess = processes[0];
    navigate(`/${firstProcess}`);
  };

  // Function to display process name without suffixes
  const getDisplayName = (process) => {
    const baseName = process.replace('-sulpeol', '').replace('-cream', '');
    return baseName.charAt(0).toUpperCase() + baseName.slice(1);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="processes">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                listStyleType: "none",
                padding: "0",
              }}
            >
              {processes.map((process, index) => (
                <Draggable key={process} draggableId={process} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        padding: "8px",
                        margin: "4px 0",
                        backgroundColor: "#f0f0f0",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      }}
                    >
                      {getDisplayName(process)}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button
        onClick={handleSaveAndNext}
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Save and Next
      </button>
    </div>
  );
};

export default DraggableList;
