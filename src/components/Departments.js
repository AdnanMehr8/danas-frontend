import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { api } from '../api/api';

const url = process.env.REACT_APP_INTERNAL_API_PATH;

// Helper hook for checking permissions
const usePermissions = () => {
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

const DepartmentManager = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({ name: '', totalUsers: '' });
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { hasPermission, loading  } = usePermissions();
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetchDepartments();
  // }, []);

  useEffect(() => {
    if (hasPermission('departments', 'read')) {
      fetchDepartments();
    }
  }, [hasPermission('departments', 'read')]);

  const fetchDepartments = async () => {
    try {
      const response = await api.get(`/api/departments`);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      setDepartments([]);
    }
  };

  const handleCreate = async () => {
    try {
      await api.post(`/api/departments`, newDepartment);
      setNewDepartment({ name: '', totalUsers: '' });
      setIsDialogOpen(false);
      fetchDepartments();
    } catch (error) {
      console.error('Error creating department:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!editingDepartment?._id || !editingDepartment?.departmentList?.[0]) {
        console.error('Invalid department data');
        return;
      }

      await api.put(`/api/departments/${editingDepartment._id}`, {
        name: editingDepartment.departmentList[0].name,
        totalUsers: editingDepartment.departmentList[0].totalUsers
      });
      setEditingDepartment(null);
      setIsDialogOpen(false);
      fetchDepartments();
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error('Invalid department ID');
      return;
    }

    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await api.delete(`/api/departments/${id}`);
        fetchDepartments();
      } catch (error) {
        console.error('Error deleting department:', error);
      }
    }
  };

  // Helper function to safely get department data
  const getDepartmentData = (department) => {
    return {
      name: department?.departmentList?.[0]?.name || 'N/A',
      totalUsers: department?.departmentList?.[0]?.totalUsers || 'N/A',
      id: department?._id
    };
  };

  

  if (!hasPermission('departments', 'read')) {
    console.log('Permission denied for departments read');
    return (
      <div style={{  display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '2rem', // Adjust size as needed
        fontWeight: 'bold',
        textAlign: 'center',}}>
        Access denied!!
      </div>
    );
  }
  

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Department Management</h1>
        {hasPermission('departments', 'create') && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsDialogOpen(true)}
          >
            Add Department
          </Button>
        )}
      </div>

      <Dialog 
        open={isDialogOpen} 
        onClose={() => {
          setIsDialogOpen(false);
          setEditingDepartment(null);
          setNewDepartment({ name: '', totalUsers: '' });
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingDepartment ? 'Edit Department' : 'Add New Department'}
        </DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '16px' }}>
            <TextField
              fullWidth
              label="Department Name"
              variant="outlined"
              value={editingDepartment ? 
                (editingDepartment.departmentList?.[0]?.name || '') : 
                newDepartment.name
              }
              onChange={(e) => {
                if (editingDepartment) {
                  setEditingDepartment({
                    ...editingDepartment,
                    departmentList: [{
                      ...(editingDepartment.departmentList?.[0] || {}),
                      name: e.target.value
                    }]
                  });
                } else {
                  setNewDepartment({ ...newDepartment, name: e.target.value });
                }
              }}
            />
            <TextField
              fullWidth
              label="Total Users"
              variant="outlined"
              value={editingDepartment ? 
                (editingDepartment.departmentList?.[0]?.totalUsers || '') : 
                newDepartment.totalUsers
              }
              onChange={(e) => {
                if (editingDepartment) {
                  setEditingDepartment({
                    ...editingDepartment,
                    departmentList: [{
                      ...(editingDepartment.departmentList?.[0] || {}),
                      totalUsers: e.target.value
                    }]
                  });
                } else {
                  setNewDepartment({ ...newDepartment, totalUsers: e.target.value });
                }
              }}
            />
              <Button
                variant="contained"
                color="primary"
                onClick={editingDepartment ? handleUpdate : handleCreate}
                style={{ marginTop: '16px' }}
              >
                {editingDepartment ? 'Update' : 'Create'}
              </Button>
          </div>
        </DialogContent>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Department Name</TableCell>
              <TableCell>Total Users</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((department) => {
              const { name, totalUsers, id } = getDepartmentData(department);
              return (
                <TableRow key={id || Math.random()}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{totalUsers}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {hasPermission('departments', 'update') && (
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setEditingDepartment(department);
                            setIsDialogOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                      )}
                      {hasPermission('departments', 'delete') && (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(id)}
                          disabled={!id}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DepartmentManager;