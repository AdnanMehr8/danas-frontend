export const checkPermission = (requiredPermission, userPermissions) => {
    return userPermissions?.includes(requiredPermission) || false;
};

export const checkRole = (requiredRoles, userRole) => {
    return requiredRoles.includes(userRole);
};
