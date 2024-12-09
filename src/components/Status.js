// import { Button } from '@mui/material';
// import React from 'react';


// const API_BASE_URL = process.env.REACT_APP_INTERNAL_API_PATH;

// const StatusButtons = ({ batchNo, onStatusChange, currentStatus }) => {
//   const statuses = [
//     { label: 'Pending', color: 'bg-yellow-500 hover:bg-yellow-600' },
//     { label: 'In Progress', color: 'bg-blue-500 hover:bg-blue-600' },
//     { label: 'Completed', color: 'bg-green-500 hover:bg-green-600' }
//   ];

//   // Function to get record ID from batchNo
//   const getRecordId = () => {
//     const storedRecords = JSON.parse(localStorage.getItem('batchRecords') || '[]');
//     const record = storedRecords.find(r => r.batch.batchNo === batchNo);
//     return record?._id;
//   };

//   // Get status from localStorage or use passed currentStatus
//   const getStoredStatus = () => {
//     const storedRecords = JSON.parse(localStorage.getItem('batchRecords') || '[]');
//     const record = storedRecords.find(r => r.batch.batchNo === batchNo);
//     return record?.batch.status || currentStatus;
//   };

//   const handleStatusClick = async (newStatus) => {
//     try {
//       const recordId = getRecordId();
//       if (!recordId) {
//         throw new Error('Record ID not found');
//       }

//       // Update backend first
//       const response = await fetch(`${API_BASE_URL}/api/batch-plan/${recordId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           'batch.status': newStatus
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update status in backend');
//       }

//       // If backend update successful, update localStorage
//       const storedRecords = JSON.parse(localStorage.getItem('batchRecords') || '[]');
//       const updatedRecords = storedRecords.map(record => {
//         if (record.batch.batchNo === batchNo) {
//           return {
//             ...record,
//             batch: {
//               ...record.batch,
//               status: newStatus
//             }
//           };
//         }
//         return record;
//       });
      
//       localStorage.setItem('batchRecords', JSON.stringify(updatedRecords));

//       // Trigger window storage event for other components to update
//       window.dispatchEvent(new StorageEvent('storage', {
//         key: 'batchRecords',
//         newValue: JSON.stringify(updatedRecords)
//       }));

//       // Call the parent's onStatusChange handler if provided
//       if (onStatusChange) {
//         await onStatusChange(batchNo, newStatus);
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//       alert('Failed to update status. Please try again.');
      
//       // Optionally revert local changes if backend update failed
//       const originalStatus = getStoredStatus();
//       if (originalStatus) {
//         const storedRecords = JSON.parse(localStorage.getItem('batchRecords') || '[]');
//         const revertedRecords = storedRecords.map(record => {
//           if (record.batch.batchNo === batchNo) {
//             return {
//               ...record,
//               batch: {
//                 ...record.batch,
//                 status: originalStatus
//               }
//             };
//           }
//           return record;
//         });
//         localStorage.setItem('batchRecords', JSON.stringify(revertedRecords));
//       }
//     }
//   };

//   const activeStatus = getStoredStatus();

//   return (
//     <div className="flex gap-2">
//       {statuses.map(({ label, color }) => (
//         <Button
//           key={label}
//           onClick={() => handleStatusClick(label)}
//           className={`${color} text-white ${activeStatus === label ? 'ring-2 ring-offset-2' : ''}`}
//           disabled={activeStatus === label}
//         >
//           {label}
//         </Button>
//       ))}
//     </div>
//   );
// };

// export default StatusButtons;

import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_INTERNAL_API_PATH;

const StatusButtons = ({ batchNo, onStatusChange, currentStatus }) => {
  const navigate = useNavigate();
  const statuses = [
    // { label: 'Pending', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { label: 'In Progress', color: 'bg-blue-500 hover:bg-blue-600' },
    { label: 'Completed', color: 'bg-green-500 hover:bg-green-600' }
  ];

  // Function to get record ID from batchNo with safety checks
  const getRecordId = () => {
    if (!batchNo) return null;
    try {
      const storedRecords = JSON.parse(localStorage.getItem('batchRecords') || '[]');
      const record = storedRecords.find(r => r.batch?.batchNo === batchNo);
      return record?._id;
    } catch (error) {
      console.error('Error getting record ID:', error);
      return null;
    }
  };

  // Get status from localStorage or use passed currentStatus with safety checks
  const getStoredStatus = () => {
    if (!batchNo) return currentStatus;
    try {
      const storedRecords = JSON.parse(localStorage.getItem('batchRecords') || '[]');
      const record = storedRecords.find(r => r.batch?.batchNo === batchNo);
      return record?.batch?.status || currentStatus || 'Pending';
    } catch (error) {
      console.error('Error getting stored status:', error);
      return currentStatus || 'Pending';
    }
  };

  const handleStatusClick = async (newStatus) => {
    if (!batchNo) {
      console.error('Batch number is required');
      return;
    }

    try {
      const recordId = getRecordId();
      if (!recordId) {
        // Initialize a new record if one doesn't exist
        const newRecord = {
          _id: `temp_${Date.now()}`,
          batch: {
            batchNo: batchNo,
            status: newStatus
          }
        };

        const storedRecords = JSON.parse(localStorage.getItem('batchRecords') || '[]');
        storedRecords.push(newRecord);
        localStorage.setItem('batchRecords', JSON.stringify(storedRecords));

        // Call the parent's onStatusChange handler if provided
        if (onStatusChange) {
          await onStatusChange(batchNo, newStatus);
        }
        return;
      }

      // Update backend
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
        throw new Error('Failed to update status in backend');
      }

      // Update localStorage
      const storedRecords = JSON.parse(localStorage.getItem('batchRecords') || '[]');
      const updatedRecords = storedRecords.map(record => {
        if (record.batch?.batchNo === batchNo) {
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
      
      localStorage.setItem('batchRecords', JSON.stringify(updatedRecords));

      // Trigger storage event
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'batchRecords',
        newValue: JSON.stringify(updatedRecords)
      }));

      // Call onStatusChange
      if (onStatusChange) {
        await onStatusChange(batchNo, newStatus);
      }

       // Navigate to '/batch-plan' if the new status is 'Completed'
    if (newStatus === 'Completed') {
      navigate('/batch-plan', { replace: true }); // { replace: true } to avoid pushing a new history entry
    }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const activeStatus = getStoredStatus();

  return (
    <div className="flex gap-2">
      {statuses.map(({ label, color }) => (
        <Button
          key={label}
          onClick={() => handleStatusClick(label)}
          className={`${activeStatus === label ? 'bg-gray-400' : 'bg-primary'} text-white`}
          style={{ backgroundColor: activeStatus === label ? '#ccc' : '#007bff', color: '#fff' }}
          // className={`${color} text-white ${activeStatus === label ? 'ring-2 ring-offset-2' : ''}`}
          disabled={activeStatus === label}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default StatusButtons;