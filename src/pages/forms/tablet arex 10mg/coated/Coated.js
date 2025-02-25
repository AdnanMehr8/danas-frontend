// // import React from 'react'
// // import Dispensing from '../dispensing/dispensing'
// // import Mixing from '../mixing/mixing'
// // import Compression from '../compression/compression'
// // import Coating from '../coating/coating'

// // const Coated = () => {
// //   return (
// //       <div style={{ width: '100%', overflowX: 'auto', boxSizing: 'border-box' }}>
// //           <Dispensing />
// //           <Mixing />
// //           <Compression />
// //           <Coating />
// //     </div>
// //   )
// // }

// // export default Coated
// // import React from 'react';
// // import { useSelector } from 'react-redux';
// // import Dispensing from '../dispensing/dispensing';
// // import Mixing from '../mixing/mixing';
// // import Compression from '../compression/compression';
// // import Coating from '../coating/coating';
// // import Printing from '../printing/printing';
// // import Blistering from '../blistering/blistering';
// // import Packing from '../packing/packing';
// // import DraggableList from '../../../../components/practiceDrag';
// // const Coated = () => {
// //   // Get the process order from localStorage
// //   const processOrder = JSON.parse(localStorage.getItem('processes') || '[]');

// //   // Component mapping object
// //   const componentMap = {
// //     'dispensing': Dispensing,
// //     'mixing': Mixing,
// //     'compression': Compression,
// //     'coating': Coating,
// //     'printing': Printing,
// //     'blistering': Blistering,
// //     'packing': Packing,
// //   };

// //   // Function to render components in order
// //   const renderOrderedComponents = () => {
// //     return processOrder
// //       .filter(process => componentMap[process]) // Only include processes that have matching components
// //       .map((process, index) => {
// //         const Component = componentMap[process];
// //         return <Component key={`${process}-${index}`} />;
// //       });
// //   };

// //   return (
// //     <div style={{ width: '100%', overflowX: 'auto', boxSizing: 'border-box' }}>
// //       {renderOrderedComponents()}
// //     </div>
// //   );
// // };

// // export default Coated;

// import React from 'react';
// import { useSelector } from 'react-redux';
// import Dispensing from '../dispensing/dispensing';
// import Mixing from '../mixing/mixing';
// import Compression from '../compression/compression';
// import Coating from '../coating/coating';
// import Printing from '../printing/printing';
// import Blistering from '../blistering/blistering';
// import Packing from '../packing/packing';
// import { Card } from '@mui/material';

// const ProcessBox = ({ processes }) => {
//   return (
//     <Card className="p-4 mb-6 bg-white shadow-md">
//       <h2 className="text-lg font-semibold mb-3">Process Flow</h2>
//       <div className="flex flex-wrap gap-2">
//         {processes.map((process, index) => (
//           <div key={process} className="flex items-center">
//             <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md">
//               {process.charAt(0).toUpperCase() + process.slice(1)}
//             </span>
//             {index < processes.length - 1 && (
//               <span className="mx-2 text-gray-400">→</span>
//             )}
//           </div>
//         ))}
//       </div>
//     </Card>
//   );
// };

// // const Coated = () => {
// //   // Get the process order from localStorage
// //   const processOrder = JSON.parse(localStorage.getItem('processes') || '[]');

// //   // Component mapping object
// //   const componentMap = {
// //     'dispensing': Dispensing,
// //     'mixing': Mixing,
// //     'compression': Compression,
// //     'coating': Coating,
// //     'printing': Printing,
// //     'blistering': Blistering,
// //     'packing': Packing,
// //   };

// //   // Function to render components in order
// //   const renderOrderedComponents = () => {
// //     return processOrder
// //       .filter(process => componentMap[process])
// //       .map((process, index) => {
// //         const Component = componentMap[process];
// //         return <Component key={`${process}-${index}`} />;
// //       });
// //   };

// //   return (
// //     <div className="w-full overflow-x-auto box-border p-4">
//       // <ProcessBox processes={processOrder} />
// //       <div className="space-y-6">
// //         {renderOrderedComponents()}
// //       </div>
// //     </div>
// //   );
// // };

// export default ProcessBox;

// import React from 'react';
// import { Card } from '@mui/material';

// const ProcessBox = ({ processes }) => {
//   return (
    // <Card className="p-4 mb-6 bg-white shadow-md">
    //   <h2 className="text-lg font-semibold mb-3">Process Flow</h2>
//       <div className="flex items-center"> {/* Ensure items are centered in a single row */}
//         {processes.map((process, index) => (
//           <React.Fragment key={process}>
//             <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md">
//               {process.charAt(0).toUpperCase() + process.slice(1)}
//             </span>
//             {index < processes.length - 1 && (
//               <span className="mx-2 text-gray-400">→</span>
//             )}
//           </React.Fragment>
//         ))}
//       </div>
//     </Card>
//   );
// };

// export default ProcessBox;

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import axios from 'axios';
// import { ChevronRight } from "lucide-react";
// import { Card } from "react-bootstrap";
// import { ArrowBack, ArrowForward } from "@mui/icons-material";

// const ProcessBox = () => {
//   const batchInfo = useSelector((state) => state.batchInfo.batch);
//   const [processes, setProcesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const API_URL = process.env.REACT_APP_INTERNAL_API_PATH;
  
//   useEffect(() => {
//     const fetchProcesses = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${API_URL}/api/processes`, {
//           params: {
//             productType: batchInfo?.productName?.toLowerCase().includes('cream') ? 'cream' :
//                         batchInfo?.subCategory?.toLowerCase().includes('non-coated') ? 'non-coated' : 'coated',
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

//   if (loading) return <div>Loading processes...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <Card className="p-4 mb-6 bg-white shadow-md">
//       <h2 className="text-lg font-semibold mb-3">Process Flow</h2>
//       <div className="flex items-center flex-wrap gap-2">
//         {processes.map((process, index) => (
//           <React.Fragment key={process._id}>
//             <span className="px-4 py-2 bg-gray-100 rounded">
//               {process.displayName || process.name}
//             </span>
//             {index < processes.length - 1 && (
//               <ArrowForward className="text-gray-400" size={20} />
//               // <span className="mx-2 text-gray-400">→</span>
//             )}
//           </React.Fragment>
//         ))}
//       </div>
//     </Card>
//   );
// };

// export default ProcessBox;

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { Box, Card, CardContent, Typography, Chip, CircularProgress, Alert } from "@mui/material";
// import StatusButtons from "../../../../components/Status";

// const ProcessBox = () => {
//   const batchInfo = useSelector((state) => state.batchInfo.batch);
//   const [processes, setProcesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentProcessIndex, setCurrentProcessIndex] = useState(() =>
//     parseInt(localStorage.getItem("currentProcessIndex")) || 0
//   );
//   const API_URL = process.env.REACT_APP_INTERNAL_API_PATH;
//   const batchNumber = batchInfo.batchNo;
//   console.log('BatchNumer: ', batchNumber)
//   const [isLastProcess, setIsLastProcess] = useState(false);

//   useEffect(() => {
//     const fetchProcesses = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${API_URL}/api/processes`, {
//           params: {
//             productType: batchInfo?.productName?.toLowerCase().includes("cream")
//               ? "cream"
//               : batchInfo?.subCategory?.toLowerCase().includes("non-coated")
//               ? "non-coated"
//               : "coated",
//           },
//         });

//         const storedProcesses = localStorage.getItem("processes");
//         if (storedProcesses) {
//           const parsedStoredProcesses = JSON.parse(storedProcesses);
//           const reorderedProcesses = parsedStoredProcesses.map((storedProcess) => {
//             const matchingProcess = response.data.find(
//               (p) => p._id === storedProcess._id
//             );
//             return matchingProcess || storedProcess;
//           });
//           setProcesses(reorderedProcesses);
//           const currentIndex = reorderedProcesses.findIndex(
//             (process) => process._id === localStorage.getItem("currentProcessId")
//           );
//           setIsLastProcess(currentIndex === reorderedProcesses.length - 1);
//         } else {
//           setProcesses(response.data);
//           setIsLastProcess(response.data.length === 1);
//         }
//         setError(null);
//       } catch (err) {
//         setError("Failed to load processes");
//         console.error("Error fetching processes:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (batchInfo) {
//       fetchProcesses();
//     }
//   }, [batchInfo]);

//   if (loading)
//     return (
//       <Box p={4} display="flex" justifyContent="center" alignItems="center">
//         <CircularProgress />
//       </Box>
//     );
//   if (error)
//     return (
//       <Box p={4}>
//         <Alert severity="error">Error: {error}</Alert>
//       </Box>
//     );

//   return (
//     <Card sx={{ width: "100%", p: 2 }}>
//          <StatusButtons
//   batchNo= {batchNumber}
//   onStatusChange={(batchNo, newStatus) => {
//     console.log(`Status changed to ${newStatus} for batch ${batchNo}`);
//     // Optional callback handling
//   }}
//   currentStatus="current_status"
//   // isLastProcess={isLastProcess} // Pass the dynamic isLastProcess value
// />
//       <CardContent>
//         <Typography variant="h6" gutterBottom>
//           Process Flow
//         </Typography>
//         <Box display="flex" flexWrap="wrap" alignItems="center" gap={2}>
//           {processes.map((process, index) => (
//             <Box key={process._id} display="flex" alignItems="center">
//               <Chip
//                 label={process.displayName || process.name}
//                 sx={{
//                   backgroundColor:
//                     index === currentProcessIndex
//                       ? "primary.light"
//                       : index < currentProcessIndex
//                       ? "success.light"
//                       : "grey.200",
//                   color: index === currentProcessIndex ? "white" : "inherit",
//                   fontWeight: index === currentProcessIndex ? "bold" : "normal",
//                 }}
//               />
//               {index < processes.length - 1 && (
//                 <ChevronRightIcon sx={{ mx: 1, color: "grey.400" }} />
//               )}
//             </Box>
//           ))}
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProcessBox;


import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Card, CardContent, Typography, Chip, CircularProgress, Alert } from "@mui/material";
import StatusButtons from "../../../../components/Status";


const ProcessBox = () => {
  const batchInfo = useSelector((state) => state.batchInfo.batch);
  
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentProcessIndex, setCurrentProcessIndex] = useState(() => 
    parseInt(localStorage.getItem("currentProcessIndex")) || 0
  );
  const API_URL = process.env.REACT_APP_INTERNAL_API_PATH;
  const batchNumber = batchInfo.batchNo;
  const [isLastProcess, setIsLastProcess] = useState(false);

  // List of clickable processes
  const clickableProcesses = [
    'dispensing',
    'mixing',
    'compression',
    'coating',
    'form-header-packing',
    'printing',
    'blistering',
    'packing'
  ];

  const handleProcessClick = (process, index) => {
    if (clickableProcesses.includes(process.name.toLowerCase())) {
      // Update the current process index
      setCurrentProcessIndex(index);
      localStorage.setItem("currentProcessIndex", index);
      localStorage.setItem("currentProcessId", process._id);

      // Navigate to the respective process page
      // You can replace these routes with your actual routes
      const routes = {
        'dispensing': 'dispensing',
        'mixing': '/mixing',
        'compression': '/compression',
        'coating': '/coating',
        'form-header-packing': '/form-header-packing',
        'printing': '/printing',
        'blistering': '/blistering',
        'packing': '/packing'
      };

      // Navigate to the corresponding route
      window.location.href = routes[process.name.toLowerCase()];
    }
  };

  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/processes`, {
          params: {
            productType: batchInfo?.productName?.toLowerCase().includes("cream")
              ? "cream"
              : batchInfo?.subCategory?.toLowerCase().includes("non-coated")
              ? "non-coated"
              : "coated",
          },
        });

        const storedProcesses = localStorage.getItem("processes");
        if (storedProcesses) {
          const parsedStoredProcesses = JSON.parse(storedProcesses);
          const reorderedProcesses = parsedStoredProcesses.map((storedProcess) => {
            const matchingProcess = response.data.find(
              (p) => p._id === storedProcess._id
            );
            return matchingProcess || storedProcess;
          });
          setProcesses(reorderedProcesses);
          
          // Update current index based on stored process ID
          const currentStoredId = localStorage.getItem("currentProcessId");
          if (currentStoredId) {
            const newIndex = reorderedProcesses.findIndex(
              (process) => process._id === currentStoredId
            );
            setCurrentProcessIndex(newIndex >= 0 ? newIndex : 0);
          }
          
          setIsLastProcess(currentProcessIndex === reorderedProcesses.length - 1);
        } else {
          setProcesses(response.data);
          setIsLastProcess(response.data.length === 1);
        }
        setError(null);
      } catch (err) {
        setError("Failed to load processes");
        console.error("Error fetching processes:", err);
      } finally {
        setLoading(false);
      }
    };

    if (batchInfo) {
      fetchProcesses();
    }
  }, [batchInfo, currentProcessIndex]);

  if (loading)
    return (
      <Box p={4} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Box p={4}>
        <Alert severity="error">Error: {error}</Alert>
      </Box>
    );
    

  return (
    <Card sx={{ width: "100%", p: 2 }}>
      <StatusButtons 
        batchNo={batchNumber}
        onStatusChange={(batchNo, newStatus) => {
          console.log(`Status changed to ${newStatus} for batch ${batchNo}`);
        }}
        currentStatus="current_status"
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Process Flow
        </Typography>
        <Box display="flex" flexWrap="wrap" alignItems="center" gap={2}>
          {processes.map((process, index) => (
            <Box key={process._id} display="flex" alignItems="center">
              <Chip
                label={process.displayName || process.name}
                onClick={() => handleProcessClick(process, index)}
                sx={{
                  backgroundColor:
                    index === currentProcessIndex
                      ? "#1976d2"  // Using Material-UI primary blue
                      : index < currentProcessIndex
                      ? "#4caf50"  // Using Material-UI success green
                      : "grey.200",
                  color: (index === currentProcessIndex || index < currentProcessIndex) ? "white" : "inherit",
                  fontWeight: index === currentProcessIndex ? "bold" : "normal",
                  cursor: clickableProcesses.includes(process.name.toLowerCase()) ? "pointer" : "default",
                  '&:hover': clickableProcesses.includes(process.name.toLowerCase()) 
                    ? { backgroundColor: '#1565c0' }  // Darker blue on hover
                    : {},
                }}
              />
              {index < processes.length - 1 && (
                <ChevronRightIcon sx={{ mx: 1, color: "grey.400" }} />
              )}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProcessBox;