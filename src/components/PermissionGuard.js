import React from 'react';
import { checkPermission } from '../utils/authUtils';

export const PermissionGuard = ({ permission, userPermissions, children }) => {
    if (!checkPermission(permission, userPermissions)) {
        return null;
    }
    return children;
};