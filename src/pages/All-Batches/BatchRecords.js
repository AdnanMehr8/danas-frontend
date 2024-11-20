// import React, { useState, useEffect } from 'react';
// import { Download, Pencil, Trash2, Search, ChevronUp, ChevronDown } from "lucide-react";
// import  Coated  from '../forms/tablet arex 10mg/coated/Coated';

// const BatchRecordsTable = () => {
//   // Existing state management
//   const [records, setRecords] = useState([
//     {
//       id: 1,
//       batchNo: "B001",
//       productName: "Coated A",
//       mfgDate: "2024-03-15",
//       expDate: "2025-03-14",
//       batchSize: "1000 units",
//       status: "Completed"
//     },
//     {
//       id: 2,
//       batchNo: "B002",
//       productName: "Product B",
//       mfgDate: "2024-03-16",
//       expDate: "2025-03-15",
//       batchSize: "500 units",
//       status: "In Progress"
//     },
//     {
//       id: 3,
//       batchNo: "B003",
//       productName: "Product C",
//       mfgDate: "2024-03-17",
//       expDate: "2025-03-16",
//       batchSize: "750 units",
//       status: "Pending Review"
//     }
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [recordToDelete, setRecordToDelete] = useState(null);
  
//   // State for handling Coated component view
//   const [showCoated, setShowCoated] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);

//   // Existing search functionality
//   const filteredRecords = records.filter(record =>
//     record.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     record.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     record.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Existing sorting functionality
//   const sortRecords = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortedRecords = () => {
//     if (!sortConfig.key) return filteredRecords;

//     return [...filteredRecords].sort((a, b) => {
//       if (a[sortConfig.key] < b[sortConfig.key]) {
//         return sortConfig.direction === 'asc' ? -1 : 1;
//       }
//       if (a[sortConfig.key] > b[sortConfig.key]) {
//         return sortConfig.direction === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });
//   };

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentRecords = getSortedRecords().slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(getSortedRecords().length / itemsPerPage);

//   // Download functionality
//   const handleDownload = (record) => {
//     console.log(`Downloading PDF for batch ${record.batchNo}`);
//     const dummyPDF = `Batch Record ${record.batchNo}\nProduct: ${record.productName}\nDate: ${record.mfgDate}`;
//     const blob = new Blob([dummyPDF], { type: 'application/pdf' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `batch-record-${record.batchNo}.pdf`;
//     document.body.appendChild(a);
//     a.click();
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(a);
//   };

//   // Updated edit functionality
//   const handleEdit = (record) => {
//     if (record.productName.toLowerCase().includes('coated')) {
//       setSelectedRecord(record);
//       setShowCoated(true);
//     } else {
//       console.log(`Editing batch ${record.batchNo}`, record);
//       // Handle regular edit logic here
//     }
//   };

//   // Delete functionality
//   const handleDeleteClick = (record) => {
//     setRecordToDelete(record);
//     setShowDeleteConfirm(true);
//   };

//   const confirmDelete = () => {
//     if (recordToDelete) {
//       setRecords(records.filter(record => record.id !== recordToDelete.id));
//       setShowDeleteConfirm(false);
//       setRecordToDelete(null);
//     }
//   };

//   // Handler for returning from Coated component
//   const handleReturn = () => {
//     setShowCoated(false);
//     setSelectedRecord(null);
//   };

//   // Conditional rendering based on showCoated state
//   if (showCoated) {
//     return <Coated record={selectedRecord} onReturn={handleReturn} />;
//   }

//   return (
//     <div className="w-full p-4">
//       {/* Search bar */}
//       <div className="flex items-center mb-4">
//         <div className="relative w-64">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr className="bg-gray-50">
//               {['ID', 'Batch No', 'Product Name', 'Mfg Date', 'Exp Date', 'Batch Size', 'Status', 'Actions'].map((header, index) => (
//                 <th
//                   key={index}
//                   onClick={() => sortRecords(header.toLowerCase().replace(' ', ''))}
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                 >
//                   {header}
//                   {sortConfig.key === header.toLowerCase().replace(' ', '') && (
//                     sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4 ml-1" /> : <ChevronDown className="inline w-4 h-4 ml-1" />
//                   )}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {currentRecords.map((record) => (
//               <tr key={record.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.batchNo}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.productName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.mfgDate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.expDate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.batchSize}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 py-1 rounded-full text-sm ${
//                     record.status === 'Completed' ? 'bg-green-100 text-green-800' :
//                     record.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
//                     'bg-yellow-100 text-yellow-800'
//                   }`}>
//                     {record.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleDownload(record)}
//                       className="text-blue-600 hover:text-blue-900"
//                     >
//                       <Download className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleEdit(record)}
//                       className="text-green-600 hover:text-green-900"
//                     >
//                       <Pencil className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteClick(record)}
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4">
//         <span className="text-sm text-gray-700">
//           Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredRecords.length)} of {filteredRecords.length} records
//         </span>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 border rounded-md disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 border rounded-md disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg max-w-sm w-full">
//             <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
//             <p className="mb-4">Are you sure you want to delete batch record {recordToDelete?.batchNo}?</p>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="px-4 py-2 border rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BatchRecordsTable;

// import React, { useState, useEffect } from 'react';
// import { Download, Pencil, Trash2, Search, ChevronUp, ChevronDown } from "lucide-react";
// import Coated from '../forms/tablet arex 10mg/coated/Coated';

// const BatchRecordsTable = () => {
//   const [records, setRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [recordToDelete, setRecordToDelete] = useState(null);
  
//   const [showCoated, setShowCoated] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

//   useEffect(() => {
//     // Fetch records from API on component mount
//     fetch(`${API_BASE_URL}/api/batches-plan`)
//       .then((response) => response.json())
//       .then((data) => setRecords(data))
//       .catch((error) => console.error('Error fetching records:', error));
//   }, []);

//   // Add a new batch record
//   const handleAddBatchRecord = (newRecord) => {
//     fetch(`${API_BASE_URL}/api/batch-plan`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newRecord),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setRecords((prevRecords) => [...prevRecords, data]);
//       })
//       .catch((error) => console.error('Error adding batch record:', error));
//   };

//   const filteredRecords = records.filter(record => 
//     (record.batchNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     record.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     record.status?.toLowerCase().includes(searchTerm.toLowerCase()))
//   );
  

//   // Sorting functionality
//   const sortRecords = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortedRecords = () => {
//     if (!sortConfig.key) return filteredRecords;

//     return [...filteredRecords].sort((a, b) => {
//       if (a[sortConfig.key] < b[sortConfig.key]) {
//         return sortConfig.direction === 'asc' ? -1 : 1;
//       }
//       if (a[sortConfig.key] > b[sortConfig.key]) {
//         return sortConfig.direction === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });
//   };

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentRecords = getSortedRecords().slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(getSortedRecords().length / itemsPerPage);

//   // Download functionality
//   const handleDownload = (record) => {
//     console.log(`Downloading PDF for batch ${record.batchNo}`);
//     const dummyPDF = `Batch Record ${record.batchNo}\nProduct: ${record.productName}\nDate: ${record.mfgDate}`;
//     const blob = new Blob([dummyPDF], { type: 'application/pdf' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `batch-record-${record.batchNo}.pdf`;
//     document.body.appendChild(a);
//     a.click();
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(a);
//   };

//   const handleEdit = (record) => {
//     if (record.productName.toLowerCase().includes('coated')) {
//       setSelectedRecord(record);
//       setShowCoated(true);
//     } else {
//       console.log(`Editing batch ${record.batchNo}`, record);
//     }
//   };

//   const handleDeleteClick = (record) => {
//     setRecordToDelete(record);
//     setShowDeleteConfirm(true);
//   };

//   const confirmDelete = () => {
//     if (recordToDelete) {
//       setRecords(records.filter(record => record.id !== recordToDelete.id));
//       setShowDeleteConfirm(false);
//       setRecordToDelete(null);
//     }
//   };

//   const handleReturn = () => {
//     setShowCoated(false);
//     setSelectedRecord(null);
//   };

//   if (showCoated) {
//     return <Coated record={selectedRecord} onReturn={handleReturn} />;
//   }

//   return (
//     <div className="w-full p-4">
//       <div className="flex items-center mb-4">
//         <div className="relative w-64">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
//         </div>
//       </div>

//       {/* Add Batch Record Button */}
//       <button
//         onClick={() => handleAddBatchRecord({ batchNo: 'B004', productName: 'Product D', mfgDate: '2024-04-01', expDate: '2025-04-01', batchSize: '600 units', status: 'In Progress' })}
//         className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//       >
//         Add Batch Record
//       </button>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr className="bg-gray-50">
//               {['ID', 'Batch No', 'Product Name', 'Mfg Date', 'Exp Date', 'Batch Size', 'Status', 'Actions'].map((header, index) => (
//                 <th
//                   key={index}
//                   onClick={() => sortRecords(header.toLowerCase().replace(' ', ''))}
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                 >
//                   {header}
//                   {sortConfig.key === header.toLowerCase().replace(' ', '') && (
//                     sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4 ml-1" /> : <ChevronDown className="inline w-4 h-4 ml-1" />
//                   )}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {currentRecords.map((record) => (
//               <tr key={record.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.batchNo}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.productName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.mfgDate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.expDate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.batchSize}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 py-1 rounded-full text-sm ${record.status === 'Completed' ? 'bg-green-100 text-green-800' : record.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                     {record.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex space-x-2">
//                     <button onClick={() => handleDownload(record)} className="text-blue-600 hover:text-blue-900"><Download className="w-5 h-5" /></button>
//                     <button onClick={() => handleEdit(record)} className="text-green-600 hover:text-green-900"><Pencil className="w-5 h-5" /></button>
//                     <button onClick={() => handleDeleteClick(record)} className="text-red-600 hover:text-red-900"><Trash2 className="w-5 h-5" /></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4">
//         <span className="text-sm text-gray-700">
//           Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredRecords.length)} of {filteredRecords.length} records
//         </span>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 border rounded-md disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 border rounded-md disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg max-w-sm w-full">
//             <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
//             <p className="mb-4">Are you sure you want to delete batch record {recordToDelete?.batchNo}?</p>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="px-4 py-2 border rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BatchRecordsTable;
// import React, { useState, useEffect } from 'react';
// import { Download, Pencil, Trash2, Search, ChevronUp, ChevronDown } from "lucide-react";
// import Coated from '../forms/tablet arex 10mg/coated/Coated';

// const BatchRecordsTable = () => {
//   const [records, setRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [recordToDelete, setRecordToDelete] = useState(null);
  
//   const [showCoated, setShowCoated] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newBatchRecord, setNewBatchRecord] = useState({
//     batchNo: '',
//     productName: '',
//     mfgDate: '',
//     expDate: '',
//     batchSize: '',
//     status: '',
//   });
  
//   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

//   useEffect(() => {
//     fetch(`${API_BASE_URL}/api/batches-plan`)
//       .then((response) => response.json())
//       .then((data) => setRecords(data))
//       .catch((error) => console.error('Error fetching records:', error));
//   }, []);

//   const handleAddBatchRecord = (newRecord) => {
//     fetch(`${API_BASE_URL}/api/batch-plan`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newRecord),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setRecords((prevRecords) => [...prevRecords, data]);
//         setShowAddModal(false); // Close the modal after adding
//         setNewBatchRecord({ // Reset form fields
//           batchNo: '',
//           productName: '',
//           mfgDate: '',
//           expDate: '',
//           batchSize: '',
//           status: '',
//         });
//       })
//       .catch((error) => console.error('Error adding batch record:', error));
//   };

//   const filteredRecords = records.filter(record => 
//     (record.batchNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     record.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     record.status?.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const sortRecords = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortedRecords = () => {
//     if (!sortConfig.key) return filteredRecords;

//     return [...filteredRecords].sort((a, b) => {
//       if (a[sortConfig.key] < b[sortConfig.key]) {
//         return sortConfig.direction === 'asc' ? -1 : 1;
//       }
//       if (a[sortConfig.key] > b[sortConfig.key]) {
//         return sortConfig.direction === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentRecords = getSortedRecords().slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(getSortedRecords().length / itemsPerPage);

//   const handleDownload = (record) => {
//     const dummyPDF = `Batch Record ${record.batchNo}\nProduct: ${record.productName}\nDate: ${record.mfgDate}`;
//     const blob = new Blob([dummyPDF], { type: 'application/pdf' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `batch-record-${record.batchNo}.pdf`;
//     document.body.appendChild(a);
//     a.click();
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(a);
//   };

//   const handleEdit = (record) => {
//     if (record.productName.toLowerCase().includes('coated')) {
//       setSelectedRecord(record);
//       setShowCoated(true);
//     } else {
//       console.log(`Editing batch ${record.batchNo}`, record);
//     }
//   };

//   const handleDeleteClick = (record) => {
//     setRecordToDelete(record);
//     setShowDeleteConfirm(true);
//   };

//   const confirmDelete = () => {
//     if (recordToDelete) {
//       setRecords(records.filter(record => record.id !== recordToDelete.id));
//       setShowDeleteConfirm(false);
//       setRecordToDelete(null);
//     }
//   };

//   const handleReturn = () => {
//     setShowCoated(false);
//     setSelectedRecord(null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewBatchRecord((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const openAddModal = () => {
//     setShowAddModal(true);
//   };

//   const closeAddModal = () => {
//     setShowAddModal(false);
//   };

//   if (showCoated) {
//     return <Coated record={selectedRecord} onReturn={handleReturn} />;
//   }

//   return (
//     <div className="w-full p-4">
//       <div className="flex items-center mb-4">
//         <div className="relative w-64">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
//         </div>
//       </div>

//       {/* Add Batch Record Button */}
//       <button
//         onClick={openAddModal}
//         className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//       >
//         Add Batch Record
//       </button>

//       {/* Add Batch Record Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg max-w-sm w-full">
//             <h3 className="text-lg font-medium mb-4">Add New Batch Record</h3>
//             <form>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Batch No</label>
//                 <input
//                   type="text"
//                   name="batchNo"
//                   value={newBatchRecord.batchNo}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Product Name</label>
//                 <input
//                   type="text"
//                   name="productName"
//                   value={newBatchRecord.productName}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Manufacturing Date</label>
//                 <input
//                   type="date"
//                   name="mfgDate"
//                   value={newBatchRecord.mfgDate}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
//                 <input
//                   type="date"
//                   name="expDate"
//                   value={newBatchRecord.expDate}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Batch Size</label>
//                 <input
//                   type="text"
//                   name="batchSize"
//                   value={newBatchRecord.batchSize}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Status</label>
//                 <select
//                   name="status"
//                   value={newBatchRecord.status}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 >
//                   <option value="">Select Status</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Completed">Completed</option>
//                   <option value="Pending">Pending</option>
//                 </select>
//               </div>
//               <div className="flex justify-end space-x-2">
//                 <button
//                   onClick={closeAddModal}
//                   type="button"
//                   className="px-4 py-2 border rounded-md"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleAddBatchRecord(newBatchRecord)}
//                   type="button"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                   Add Record
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr className="bg-gray-50">
//               {['ID', 'Batch No', 'Product Name', 'Mfg Date', 'Exp Date', 'Batch Size', 'Status', 'Actions'].map((header, index) => (
//                 <th
//                   key={index}
//                   onClick={() => sortRecords(header.toLowerCase().replace(' ', ''))}
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                 >
//                   {header}
//                   {sortConfig.key === header.toLowerCase().replace(' ', '') && (
//                     sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4 ml-1" /> : <ChevronDown className="inline w-4 h-4 ml-1" />
//                   )}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {currentRecords.map((record) => (
//               <tr key={record.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.batchNo}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.productName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.mfgDate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.expDate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.batchSize}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 py-1 rounded-full text-sm ${record.status === 'Completed' ? 'bg-green-100 text-green-800' : record.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                     {record.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex space-x-2">
//                     <button onClick={() => handleDownload(record)} className="text-blue-600 hover:text-blue-900"><Download className="w-5 h-5" /></button>
//                     <button onClick={() => handleEdit(record)} className="text-green-600 hover:text-green-900"><Pencil className="w-5 h-5" /></button>
//                     <button onClick={() => handleDeleteClick(record)} className="text-red-600 hover:text-red-900"><Trash2 className="w-5 h-5" /></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4">
//         <span className="text-sm text-gray-700">
//           Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredRecords.length)} of {filteredRecords.length} records
//         </span>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 border rounded-md disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 border rounded-md disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg max-w-sm w-full">
//             <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
//             <p className="mb-4">Are you sure you want to delete batch record {recordToDelete?.batchNo}?</p>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="px-4 py-2 border rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BatchRecordsTable;
import React, { useState, useEffect, useRef } from 'react';
import { Download, Pencil, Trash2, Search, ChevronUp, ChevronDown, X, FileText } from "lucide-react";
import Coated from '../forms/tablet arex 10mg/coated/Coated';
import Uncoated from '../forms/tablet sulpeol 25mg/uncoated/Uncoated';
import { useDispatch } from 'react-redux';
import { setBatchInfo } from '../../store/batchInfoSlice';
import { setBatchPInfo } from '../../store/batchInfoPackingSlice ';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Paper, Select,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';

const BatchRecordsTable = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  
  const [showCoated, setShowCoated] = useState(false);
  
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBatchRecord, setNewBatchRecord] = useState({
    batchNo: '',
    productName: '',
    mfgDate: '',
    expDate: '',
    batchSize: '',
    status: '',
  });
    // Fetch product list from CategoryProductList component
    const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
    const dispatch = useDispatch();
  const API_BASE_URL = process.env.REACT_APP_INTERNAL_API_PATH;
  const { hasPermission } = usePermissions();
  const permission = {
    canRead: hasPermission('permissions', 'read'),
    canCreate: hasPermission('permissions', 'create'),
    canUpdate: hasPermission('permissions', 'update'),
    canDelete: hasPermission('permissions', 'delete'),
  };
  // Fetch the batch records from the backend API
  useEffect(() => {
    // if (permission.canRead) {
      const storedRecords = localStorage.getItem('batchRecords');
      if (storedRecords) {
        setRecords(JSON.parse(storedRecords));
      }
    
      // Also fetch from API and update both state and localStorage
      fetch(`${API_BASE_URL}/api/batches-plan`)
        .then((response) => response.json())
        .then((data) => {
          setRecords(data);
          localStorage.setItem('batchRecords', JSON.stringify(data));
        })
        .catch((error) => console.error('Error fetching records:', error));
    
      // Fetch product list from CategoryProductList
      fetch(`${API_BASE_URL}/api/products`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => console.error('Error fetching products:', error));
    // }
  }, []);
    
  
     // Update localStorage whenever records change
  useEffect(() => {
    localStorage.setItem('batchRecords', JSON.stringify(records));
  }, [records]);

  const handleAddBatchRecord = async (newRecord) => {
    // Find the selected product's details
    const selectedProduct = products.flatMap((productDoc) => productDoc.productList)
      .find((product) => product.description === newRecord.productName);
  
    // Determine subcategory and product name for dispatch
    const subCategory = selectedProduct?.subCategory || 
      (newRecord.productName.toLowerCase().includes('cream') ? 'Cream' : '');
    const productNameToDisplay = newRecord.productName.split(' ')[0];
  
    const batchInfo = {
      batch: {
        productName: productNameToDisplay,
        batchNo: newRecord.batchNo,
        mfgLicense: newRecord.mfgLicense,
        productRegNo: newRecord.productRegNo,
        validFrom: newRecord.validFrom,
        batchSize: newRecord.batchSize,
        noOfPacks: newRecord.noOfPacks,
        noOfTablets: newRecord.noOfTablets,
        packsSize: newRecord.packsSize || '',
        expiryDate: newRecord.expiryDate,
        subCategory: subCategory
      }
    };
  
    try {
      // First API call (from FormHeader)
      const batchInfoResponse = await fetch(`${API_BASE_URL}/api/batch-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...batchInfo }),
      });
  
      if (!batchInfoResponse.ok) {
        throw new Error(`HTTP error! Status: ${batchInfoResponse.status}`);
      }
  
      const batchInfoData = await batchInfoResponse.json();
      
      if (batchInfoData && batchInfoData._id) {
        localStorage.setItem('batchInfoId', batchInfoData._id);
      }
  
      // Second API call (original batch-plan)
      const batchPlanResponse = await fetch(`${API_BASE_URL}/api/batch-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ batch: { ...newRecord, subCategory } }),
      });
  
      if (!batchPlanResponse.ok) {
        throw new Error(`HTTP error! Status: ${batchPlanResponse.status}`);
      }
  
      const batchPlanData = await batchPlanResponse.json();
  
      // Store the new batch as active batch
      localStorage.setItem('activeBatchNo', newRecord.batchNo);
      // Store the batch specific information
      localStorage.setItem(`batchInfo_${newRecord.batchNo}`, JSON.stringify(batchInfo));
  
      // Dispatch to Redux store
      dispatch(setBatchInfo({
        batch: {
          productName: productNameToDisplay,
          subCategory: subCategory
        }
      }));
      
      dispatch(setBatchPInfo({
        batch: {
          productName: productNameToDisplay,
          subCategory: subCategory
        }
      }));
  
      // Update the records state and localStorage
      const updatedRecords = [...records, batchPlanData];
      setRecords(updatedRecords);
      localStorage.setItem('batchRecords', JSON.stringify(updatedRecords));
  
      // Reset form and close modal
      setShowAddModal(false);
      setNewBatchRecord({
        batchNo: '',
        productName: '',
        mfgLicense: '',
        productRegNo: '',
        validFrom: '',
        expiryDate: '',
        batchSize: '',
        noOfPacks: '',
        noOfTablets: '',
        packsSize: '',
        status: ''
      });
  
    } catch (error) {
      console.error('Error adding batch record:', error);
      alert('Failed to add batch record. Please try again.');
    }
  };
  // const handleAddBatchRecord = async (newRecord) => {
  //   const batchInfo = {
  //     batch: {
  //       productName: newRecord.productName,
  //       batchNo: newRecord.batchNo,
  //       mfgLicense: newRecord.mfgLicense,
  //       productRegNo: newRecord.productRegNo,
  //       validFrom: newRecord.validFrom,
  //       batchSize: newRecord.batchSize,
  //       noOfPacks: newRecord.noOfPacks,
  //       noOfTablets: newRecord.noOfTablets,
  //       packsSize: newRecord.packsSize || '',
  //       expiryDate: newRecord.expiryDate
  //     }
  //   };

  //   try {
  //     // First API call (from FormHeader)
  //     const batchInfoResponse = await fetch(`${API_BASE_URL}/api/batch-info`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ ...batchInfo }),
  //     });

  //     if (!batchInfoResponse.ok) {
  //       throw new Error(`HTTP error! Status: ${batchInfoResponse.status}`);
  //     }

  //     const batchInfoData = await batchInfoResponse.json();
      
  //     if (batchInfoData && batchInfoData._id) {
  //       localStorage.setItem('batchInfoId', batchInfoData._id);
  //     }

  //     // Second API call (original batch-plan)
  //     const batchPlanResponse = await fetch(`${API_BASE_URL}/api/batch-plan`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ batch: newRecord }),
  //     });

  //     if (!batchPlanResponse.ok) {
  //       throw new Error(`HTTP error! Status: ${batchPlanResponse.status}`);
  //     }

  //     const batchPlanData = await batchPlanResponse.json();

  //     // Store the new batch as active batch
  //     localStorage.setItem('activeBatchNo', newRecord.batchNo);
  //     // Store the batch specific information
  //     localStorage.setItem(`batchInfo_${newRecord.batchNo}`, JSON.stringify(batchInfo));

  //     // Dispatch to Redux store
  //     dispatch(setBatchInfo(batchInfo));

  //     // Update the records state and localStorage
  //     const updatedRecords = [...records, batchPlanData];
  //     setRecords(updatedRecords);
  //     localStorage.setItem('batchRecords', JSON.stringify(updatedRecords));

  //     // Reset form and close modal
  //     setShowAddModal(false);
  //     setNewBatchRecord({
  //       batchNo: '',
  //       productName: '',
  //       mfgLicense: '',
  //       productRegNo: '',
  //       validFrom: '',
  //       expiryDate: '',
  //       batchSize: '',
  //       noOfPacks: '',
  //       noOfTablets: '',
  //       packsSize: '',
  //       status: ''
  //     });

  //   } catch (error) {
  //     console.error('Error adding batch record:', error);
  //     alert('Failed to add batch record. Please try again.');
  //   }
  // };

  const filteredRecords = records.filter(record => 
    (record.batch && 
      (record.batch.batchNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       record.batch.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       record.batch.status?.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );
  

  const sortRecords = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedRecords = () => {
    if (!sortConfig.key) return filteredRecords;

    return [...filteredRecords].sort((a, b) => {
      if (a.batch[sortConfig.key] < b.batch[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a.batch[sortConfig.key] > b.batch[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = getSortedRecords().slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(getSortedRecords().length / itemsPerPage);
  // const { handlePrint } = useOutletContext();
 
  const handleDownload = async () => {
    window.open('/report', '_blank');
  };
  
  const handleEdit = (record) => {
    const productName = record.batch.productName;
    const productNameToDisplay = productName.split(' ')[0];
    
    // Find the product details from products list
    const selectedProduct = products.flatMap((productDoc) => productDoc.productList)
      .find((product) => product.description === productName);
  
    // Determine subcategory 
    const subCategory = selectedProduct?.subCategory || 
      (productName.toLowerCase().includes('cream') ? 'Cream' : '');
  
    // Store the batch info with a unique key based on batch number
    const batchInfo = {
      batch: {
        productName: productNameToDisplay,
        batchNo: record.batch.batchNo,
        mfgLicense: record.batch.mfgLicense,
        productRegNo: record.batch.productRegNo,
        validFrom: record.batch.validFrom,
        batchSize: record.batch.batchSize,
        noOfPacks: record.batch.noOfPacks,
        noOfTablets: record.batch.noOfTablets,
        packsSize: record.batch.packsSize,
        expiryDate: record.batch.expiryDate,
        subCategory: subCategory
      }
    };
  
    // Store the current batch number as active batch
    localStorage.setItem('activeBatchNo', record.batch.batchNo);
    // Store the batch specific information
    localStorage.setItem(`batchInfo_${record.batch.batchNo}`, JSON.stringify(batchInfo));
    
    // Dispatch to Redux store
    dispatch(setBatchInfo({
      batch: {
        productName: productNameToDisplay,
        subCategory: subCategory
      }
    }));
    
    dispatch(setBatchPInfo({
      batch: {
        productName: productNameToDisplay,
        subCategory: subCategory
      }
    }));
  
    // Navigate based on subcategory and product type
    if (subCategory === 'Coated') {
      navigate('/form-header');
    } else if (subCategory === 'Non-Coated') {
      navigate('/form-header-sulpeol');
    } else if (productName.toLowerCase().includes('cream')) {
      navigate('/form-header-cream');
    }
  };

  // const handleEdit = (record) => {
    
  //   // Store the selected batch info with a unique key based on batch number
  //   const batchInfo = {
  //     batch: {
  //       productName: record.batch.productName,
  //       batchNo: record.batch.batchNo,
  //       mfgLicense: record.batch.mfgLicense,
  //       productRegNo: record.batch.productRegNo,
  //       validFrom: record.batch.validFrom,
  //       batchSize: record.batch.batchSize,
  //       noOfPacks: record.batch.noOfPacks,
  //       noOfTablets: record.batch.noOfTablets,
  //       packsSize: record.batch.packsSize,
  //       expiryDate: record.batch.expiryDate
  //     }
  //   };
  
  //   // Store the current batch number as active batch
  //   localStorage.setItem('activeBatchNo', record.batch.batchNo);
  //   // Store the batch specific information
  //   localStorage.setItem(`batchInfo_${record.batch.batchNo}`, JSON.stringify(batchInfo));
    
  //   // Dispatch to Redux store
  //   dispatch(setBatchInfo(batchInfo));
  //   navigate('/batch-record');
  // };

  const handleDeleteClick = (record) => {
    setRecordToDelete(record);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (recordToDelete && recordToDelete._id) {
      fetch(`${API_BASE_URL}/api/batch-plan/${recordToDelete._id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          const updatedRecords = records.filter(record => record._id !== recordToDelete._id);
          setRecords(updatedRecords);
          // Update localStorage
          localStorage.setItem('batchRecords', JSON.stringify(updatedRecords));
          // Remove individual record from localStorage
          localStorage.removeItem(`batch_${recordToDelete.batch.batchNo}`);
        } else {
          console.error('Failed to delete record on the server');
        }
      })
      .catch(error => console.error('Error deleting record:', error))
      .finally(() => {
        setShowDeleteConfirm(false);
        setRecordToDelete(null);
      });
    }
  };
  

  const handleReturn = () => {
    setShowCoated(false);
    setSelectedRecord(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBatchRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProductSelect = (selectedDescription) => {
    // Find the product based on the description selected
    const selectedProduct = products.flatMap((productDoc) => productDoc.productList)
      .find((product) => product.description === selectedDescription);
  
    // Update the selected product and batch record state
    setSelectedProduct(selectedProduct);
    setNewBatchRecord((prevState) => ({
      ...prevState,
      productName: selectedProduct ? selectedProduct.description : '', 
    }));
    
  };
  

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  if (showCoated) {
    return <Coated record={selectedRecord} onReturn={handleReturn} />;
  } 

  // Function to handle status change
  const handleStatusChange = async (recordId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/batch-plan/${recordId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'batch.status': newStatus
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update local state
      const updatedRecords = records.map(record => {
        if (record._id === recordId) {
          return {
            ...record,
            batch: {
              ...record.batch,
              status: newStatus
            }
          };
        }
        return record;
      });

      setRecords(updatedRecords);
      localStorage.setItem('batchRecords', JSON.stringify(updatedRecords));
      setEditingStatus(null); 
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const renderStatusCell = (record) => {
    const isEditing = editingStatus === record._id;
    const statusColors = {
      'Completed': 'bg-green-100 text-green-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Pending': 'bg-yellow-100 text-yellow-800'
    };

    if (isEditing) {
      return (
        <select
          value={record.batch.status}
          onChange={(e) => handleStatusChange(record._id, e.target.value)}
          onBlur={() => setEditingStatus(null)}
          className="px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      );
    }

    return (
      <span
        onClick={() => setEditingStatus(record._id)}
        className={`px-2 py-1 rounded-full text-sm cursor-pointer ${statusColors[record.batch.status]}`}
      >
        {record.batch.status}
      </span>
    );
  };

  // if (!permission.canRead) {
  //   console.log('Permission denied for departments read');
  //   return (
  //     <div style={{
  //       display: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       height: '100vh',
  //       fontSize: '2rem', // Adjust size as needed
  //       fontWeight: 'bold',
  //       textAlign: 'center',
  //     }}>
  //       Access denied!!
  //     </div>
  
  //   )
  // }


  return (
    <div style={{ padding: '24px' }}>

<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
<h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Batches</h1>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      <Button variant="contained"
        onClick={openAddModal}
      >
        Add Batch Record
      </Button>
      </div>


      {/* Add New Batch Modal */}
      <Dialog
      open={showAddModal}
      onClose={closeAddModal}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Add New Batch Record</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* ID */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="ID"
              name="id"
              value={newBatchRecord.id}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          {/* Batch No */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Batch No"
              name="batchNo"
              value={newBatchRecord.batchNo}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          {/* Product Name */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Product Name</InputLabel>
              <Select
                name="productName"
                value={newBatchRecord.productName}
                onChange={(e) => handleProductSelect(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select a product</em>
                </MenuItem>
                {products.flatMap((productDoc) => productDoc.productList).map((product) => (
                  <MenuItem key={product.itemId} value={product.description}>
                    {product.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Manufacturing License */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Manufacturing License"
              name="mfgLicense"
              value={newBatchRecord.mfgLicense}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          {/* Expiry Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Expiry Date"
              name="expiryDate"
              type="date"
              value={newBatchRecord.expiryDate}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          {/* Batch Size */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Batch Size"
              name="batchSize"
              value={newBatchRecord.batchSize}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          {/* No. of Packs */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="No. of Packs"
              name="noOfPacks"
              value={newBatchRecord.noOfPacks}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          {/* No. of Tablets */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="No. of Tablets"
              name="noOfTablets"
              value={newBatchRecord.noOfTablets}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          {/* Product Reg. No */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Reg. No"
              name="productRegNo"
              value={newBatchRecord.productRegNo}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          {/* Valid From */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Valid From"
              name="validFrom"
              type="date"
              value={newBatchRecord.validFrom}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          {/* Pack Size */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Pack Size"
              name="packsSize"
              value={newBatchRecord.packsSize}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          {/* MFG Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="MFG Date"
              name="mfgDate"
              type="date"
              value={newBatchRecord.mfgDate}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={newBatchRecord.status}
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>Select Status</em>
                </MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAddModal} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => handleAddBatchRecord(newBatchRecord)}
          variant="contained"
          color="primary"
        >
          Add Record
        </Button>
      </DialogActions>
    </Dialog>
    
      {/* <div className="overflow-x-auto"> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['ID', 'Batch No', 'Product Name', 'Mfg Date', 'Exp Date', 'Batch Size', 'Status', 'Actions'].map((header, index) => (
                <TableCell
                  key={index}
                  onClick={() => sortRecords(header.toLowerCase().replace(' ', ''))}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                >
                  {header}
                  {sortConfig.key === header.toLowerCase().replace(' ', '') && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4 ml-1" /> : <ChevronDown className="inline w-4 h-4 ml-1" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRecords.map((record) => (
              <TableRow key={record._id}>
                <TableCell className="px-6 py-4 whitespace-nowrap">{record.batch.id}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">{record.batch.batchNo}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">{record.batch.productName}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">{record.batch.mfgDate}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">{record.batch.expiryDate}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">{record.batch.batchSize}</TableCell>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-sm ${record.batch.status === 'Completed' ? 'bg-green-100 text-green-800' : record.batch.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {record.batch.status}
                  </span>
                </td> */}
                     <TableCell className="px-6 py-4 whitespace-nowrap">
              {renderStatusCell(record)}
            </TableCell>
                <TableCell>
                 
                    <Button variant="outlined" color='info' onClick={() => handleDownload()} >Report </Button>

                    <Button variant="outlined" color='primary' onClick={() => handleEdit(record)} >Edit</Button>
                    <Button variant= "contained" color='error' onClick={() => handleDeleteClick(record)} >Delete</Button>
             
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredRecords.length)} of {filteredRecords.length} records
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog
      open={showDeleteConfirm}
      onClose={() => setShowDeleteConfirm(false)}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete batch record{' '}
          <strong>{recordToDelete?.batchNo}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setShowDeleteConfirm(false)}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={confirmDelete}
          variant="contained"
          color="primary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
};

export default BatchRecordsTable;
