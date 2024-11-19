import React, { useState, useEffect } from 'react';
import axios from 'axios';
const url = process.env.REACT_APP_INTERNAL_API_PATH;

// Helper hook for checking permissions
export const usePermissions = () => {
    const [userRole, setUserRole] = useState(null);
    const [rolePermissions, setRolePermissions] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPermissions = async () => {
        try {
          const userData = JSON.parse(localStorage.getItem('user'));
          console.log('User data from localStorage:', userData.role);
          
          if (userData?.role) {
            setUserRole(userData.role);
            // Admin role bypass logic
            if (userData.role.toLowerCase() === 'admin') {
              console.log('Admin role detected, granting all permissions');
              setRolePermissions([{ module: '*', actions: ['*'] }]); // Wildcard for all permissions
              return;
            }
            const response = await axios.get(`${url}/api/roles/${userData.role}/permissions`);
            console.log('Fetched permissions:', response.data);
            setRolePermissions(response.data.permissions);
          }
        } catch (error) {
          console.error('Error fetching permissions:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPermissions();
    }, []);
  
    const hasPermission = (module, action) => {
      // Grant all permissions if 'admin' wildcard is present
      const isAdmin = rolePermissions.some(
        (permission) => permission.module === '*' && permission.actions.includes('*')
      );
      if (isAdmin) {
        console.log('Admin permission granted for:', { module, action });
        return true;
      }
      
      console.log('Checking frontend permission:', {
        module,
        action,
        rolePermissions,
        result: rolePermissions.some(permission => 
          permission.module === module && 
          permission.actions.includes(action)
        )
      });
  
      return rolePermissions.some(permission => 
        permission.module === module && 
        permission.actions.includes(action)
      );
    };
  
    return { userRole, hasPermission, loading };
  };