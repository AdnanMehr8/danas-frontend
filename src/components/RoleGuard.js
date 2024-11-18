import React from 'react';
import { checkRole } from '../utils/authUtils';

export const RoleGuard = ({ roles, userRole, children }) => {
    if (!checkRole(roles, userRole)) {
        return null;
    }
    return children;
};