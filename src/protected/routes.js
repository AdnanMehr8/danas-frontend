import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element, requiredFields }) => {
    const record = useSelector((state) => state.record);
    
    // Check if all required fields are filled
    const allFieldsFilled = requiredFields.every(field => record.batchInfo[field] && record.batchInfo[field].trim() !== '');

    return allFieldsFilled ? element : <Navigate to={-1} replace />; // Adjust "-1" as needed
};

export default PrivateRoute;
