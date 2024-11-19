// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Checkbox,
//   FormControlLabel,
// } from '@mui/material';

// const url = process.env.REACT_APP_INTERNAL_API_PATH;

// // Permissions Component
// const PermissionsTable = () => {
//   const [permissions, setPermissions] = useState([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     module: '',
//     actions: [],
//   });
//   // const { hasPermission } = usePermissions();

//   useEffect(() => {
//     fetchPermissions();
//   }, []);


//   const fetchPermissions = async () => {
//     try {
//       const response = await axios.get(`${url}/api/permissions`);
//       setPermissions(response.data);
//     } catch (error) {
//       console.error('Error fetching permissions:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${url}/api/permissions`, formData);
//       fetchPermissions();
//       setIsDialogOpen(false);
//       setFormData({ name: '', description: '', module: '', actions: [] });
//     } catch (error) {
//       console.error('Error creating permission:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${url}/api/permissions/${id}`);
//       fetchPermissions();
//     } catch (error) {
//       console.error('Error deleting permission:', error);
//     }
//   };

//   // if (!hasPermission('permissions', 'read')) {
//   //   return <div>Access denied</div>;
//   // }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2>Permissions</h2>
//         {/* {hasPermission('permissions', 'create') && ( */}
//           <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
//             Add Permission
//           </Button>
//         {/* )} */}
//       </div>
//       <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
//         <DialogTitle>Create New Permission</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               label="Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               fullWidth
//               margin="dense"
//             />
//             <TextField
//               label="Description"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               fullWidth
//               margin="dense"
//             />
//             <TextField
//               label="Module"
//               value={formData.module}
//               onChange={(e) => setFormData({ ...formData, module: e.target.value })}
//               fullWidth
//               margin="dense"
//             />
//             <div>
//               {['create', 'read', 'update', 'delete'].map((action) => (
//                 <FormControlLabel
//                   key={action}
//                   control={
//                     <Checkbox
//                       checked={formData.actions.includes(action)}
//                       onChange={(e) => {
//                         const checked = e.target.checked;
//                         setFormData({
//                           ...formData,
//                           actions: checked
//                             ? [...formData.actions, action]
//                             : formData.actions.filter((a) => a !== action),
//                         });
//                       }}
//                     />
//                   }
//                   label={action}
//                 />
//               ))}
//             </div>
//             <DialogActions>
//               <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
//               <Button type="submit" variant="contained">
//                 Create
//               </Button>
//             </DialogActions>
//           </form>
//         </DialogContent>
//       </Dialog>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Module</TableCell>
//               <TableCell>Actions</TableCell>
//               <TableCell>Operations</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {permissions.map((permission) => (
//               <TableRow key={permission._id}>
//                 <TableCell>{permission.name}</TableCell>
//                 <TableCell>{permission.description}</TableCell>
//                 <TableCell>{permission.module}</TableCell>
//                 <TableCell>{permission.actions.join(', ')}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => handleDelete(permission._id)}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };


// // Roles Component
// const RolesTable = () => {
//   const [roles, setRoles] = useState([]);
//   const [permissions, setPermissions] = useState([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     permissions: []
//   });

//   useEffect(() => {
//     fetchRoles();
//     fetchPermissions();
//   }, []);

//   const fetchRoles = async () => {
//     try {
//       const response = await axios.get(`${url}/api/roles`);
//       setRoles(response.data);
//     } catch (error) {
//       console.error('Error fetching roles:', error);
//     }
//   };

//   const fetchPermissions = async () => {
//     try {
//       const response = await axios.get(`${url}/api/permissions`);
//       setPermissions(response.data);
//     } catch (error) {
//       console.error('Error fetching permissions:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${url}/api/roles`, {
//         name: formData.name,
//         description: formData.description,
//         permissions: formData.permissions // Now sending array of permission IDs
//       });
//       fetchRoles();
//       setIsDialogOpen(false);
//       setFormData({ name: '', description: '', permissions: [] });
//     } catch (error) {
//       console.error('Error creating role:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${url}/api/roles/${id}`);
//       fetchRoles();
//     } catch (error) {
//       console.error('Error deleting role:', error);
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2>Roles</h2>
//         <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
//           Add Role
//         </Button>
//       </div>
//       <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
//         <DialogTitle>Create New Role</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               label="Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               fullWidth
//               margin="dense"
//             />
//             <TextField
//               label="Description"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               fullWidth
//               margin="dense"
//             />
//             <div className="mt-4">
//               <h3 className="mb-2">Permissions</h3>
//               {permissions.map((permission) => (
//                 <FormControlLabel
//                   key={permission._id}
//                   control={
//                     <Checkbox
//                       checked={formData.permissions.includes(permission._id)}
//                       onChange={(e) => {
//                         const checked = e.target.checked;
//                         setFormData({
//                           ...formData,
//                           permissions: checked
//                             ? [...formData.permissions, permission._id]
//                             : formData.permissions.filter((id) => id !== permission._id)
//                         });
//                       }}
//                     />
//                   }
//                   label={`${permission.name} (${permission.module})`}
//                 />
//               ))}
//             </div>
//             <DialogActions>
//               <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
//               <Button type="submit" variant="contained">
//                 Create
//               </Button>
//             </DialogActions>
//           </form>
//         </DialogContent>
//       </Dialog>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Permissions</TableCell>
//               <TableCell>Operations</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {roles.map((role) => (
//               <TableRow key={role._id}>
//                 <TableCell>{role.name}</TableCell>
//                 <TableCell>{role.description}</TableCell>
//                 <TableCell>
//                   {role.permissions.map(p => p.name).join(', ')}
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => handleDelete(role._id)}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };
// // const RolesTable = () => {
// //   const [roles, setRoles] = useState([]);
// //   const [permissions, setPermissions] = useState([]);
// //   const [isDialogOpen, setIsDialogOpen] = useState(false);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     description: '',
// //     permissions: [],
// //   });

// //   useEffect(() => {
// //     fetchRoles();
// //     fetchPermissions();
// //   }, []);

// //   const fetchRoles = async () => {
// //     try {
// //       const response = await axios.get(`${url}/api/roles`);
// //       setRoles(response.data);
// //     } catch (error) {
// //       console.error('Error fetching roles:', error);
// //     }
// //   };

// //   const fetchPermissions = async () => {
// //     try {
// //       const response = await axios.get(`${url}/api/permissions`);
// //       setPermissions(response.data);
// //     } catch (error) {
// //       console.error('Error fetching permissions:', error);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post(`${url}/api/roles`, formData);
// //       fetchRoles();
// //       setIsDialogOpen(false);
// //       setFormData({ name: '', description: '', permissions: [] });
// //     } catch (error) {
// //       console.error('Error creating role:', error);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       await axios.delete(`${url}/api/roles/${id}`);
// //       fetchRoles();
// //     } catch (error) {
// //       console.error('Error deleting role:', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <div className="flex justify-between items-center mb-4">
// //         <h2>Roles</h2>
// //         <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
// //           Add Role
// //         </Button>
// //       </div>
// //       <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
// //         <DialogTitle>Create New Role</DialogTitle>
// //         <DialogContent>
// //           <form onSubmit={handleSubmit}>
// //             <TextField
// //               label="Name"
// //               value={formData.name}
// //               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //               fullWidth
// //               margin="dense"
// //             />
// //             <TextField
// //               label="Description"
// //               value={formData.description}
// //               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //               fullWidth
// //               margin="dense"
// //             />
// //             <div>
// //               {permissions.map((permission) => (
// //                 <FormControlLabel
// //                   key={permission._id}
// //                   control={
// //                     <Checkbox
// //                       checked={formData.permissions.includes(permission._id)}
// //                       onChange={(e) => {
// //                         const checked = e.target.checked;
// //                         setFormData({
// //                           ...formData,
// //                           permissions: checked
// //                             ? [...formData.permissions, permission._id]
// //                             : formData.permissions.filter((id) => id !== permission._id),
// //                         });
// //                       }}
// //                     />
// //                   }
// //                   label={permission.name}
// //                 />
// //               ))}
// //             </div>
// //             <DialogActions>
// //               <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
// //               <Button type="submit" variant="contained">
// //                 Create
// //               </Button>
// //             </DialogActions>
// //           </form>
// //         </DialogContent>
// //       </Dialog>

// //       <TableContainer component={Paper}>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Name</TableCell>
// //               <TableCell>Description</TableCell>
// //               <TableCell>Permissions</TableCell>
// //               <TableCell>Operations</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {roles.map((role) => (
// //               <TableRow key={role._id}>
// //                 <TableCell>{role.name}</TableCell>
// //                 <TableCell>{role.description}</TableCell>
// //                 <TableCell>
// //                   {role.permissions.map((p) => p.name).join(', ')}
// //                 </TableCell>
// //                 <TableCell>
// //                   <Button
// //                     variant="outlined"
// //                     color="error"
// //                     onClick={() => handleDelete(role._id)}
// //                   >
// //                     Delete
// //                   </Button>
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     </div>
// //   );
// // };

// export { PermissionsTable, RolesTable };

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
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { usePermissions } from '../hooks/usePermissions';

const url = process.env.REACT_APP_INTERNAL_API_PATH;

// Permissions Component
const PermissionsTable = () => {
  const [permissions, setPermissions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    module: '',
    actions: [],
  });
  const { hasPermission } = usePermissions();
  const permission = {
    canRead: hasPermission('permissions', 'read'),
    canCreate: hasPermission('permissions', 'create'),
    canUpdate: hasPermission('permissions', 'update'),
    canDelete: hasPermission('permissions', 'delete'),
  };
  

  useEffect(() => {
    if (permission.canRead) {
      fetchPermissions();
    }
  }, [permission.canRead]);

  const fetchPermissions = async () => {
    try {
      const response = await axios.get(`${url}/api/permissions`);
      setPermissions(response.data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const handleEdit = (permission) => {
    setSelectedPermission(permission);
    setFormData({
      name: permission.name,
      description: permission.description,
      module: permission.module,
      actions: permission.actions,
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`${url}/api/permissions/${selectedPermission._id}`, formData);
      } else {
        await axios.post(`${url}/api/permissions`, formData);
      }
      fetchPermissions();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving permission:', error);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', module: '', actions: [] });
    setIsEditMode(false);
    setSelectedPermission(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/api/permissions/${id}`);
      fetchPermissions();
    } catch (error) {
      console.error('Error deleting permission:', error);
    }
  };

  if (!permission.canRead) {
    console.log('Permission denied for departments read');
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '2rem', // Adjust size as needed
        fontWeight: 'bold',
        textAlign: 'center',
      }}>
        Access denied!!
      </div>
  
    )
  }

  return (
    // <div>
    <div style={{ padding: '24px' }}>
      {/* <div className="flex justify-between items-center mb-4"> */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Permissions</h1>
        {permission.canCreate && (
          <Button variant="contained" onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}>
            Add Permission
          </Button>
        )}
      </div>
      <Dialog open={isDialogOpen} onClose={() => {
        setIsDialogOpen(false);
        resetForm();
      }}>
        <DialogTitle>{isEditMode ? 'Edit Permission' : 'Create New Permission'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Module"
              value={formData.module}
              onChange={(e) => setFormData({ ...formData, module: e.target.value })}
              fullWidth
              margin="dense"
            />
            <div>
              {['create', 'read', 'update', 'delete'].map((action) => (
                <FormControlLabel
                  key={action}
                  control={
                    <Checkbox
                      checked={formData.actions.includes(action)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFormData({
                          ...formData,
                          actions: checked
                            ? [...formData.actions, action]
                            : formData.actions.filter((a) => a !== action),
                        });
                      }}
                    />
                  }
                  label={action}
                />
              ))}
            </div>
            <DialogActions>
              <Button onClick={() => {
                setIsDialogOpen(false);
                resetForm();
              }}>Cancel</Button>
              <Button type="submit" variant="contained">
                {isEditMode ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Module</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((permision) => (
              <TableRow key={permision._id}>
                <TableCell>{permision.name}</TableCell>
                <TableCell>{permision.description}</TableCell>
                <TableCell>{permision.module}</TableCell>
                <TableCell>{permision.actions.join(', ')}</TableCell>
                <TableCell>
                  {permission.canUpdate && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(permission)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                  )}
                  {permission.canDelete && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(permission._id)}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// Roles Component
const RolesTable = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: []
  });
  const { hasPermission } = usePermissions();
  const permission = {
    canRead: hasPermission('permissions', 'read'),
    canCreate: hasPermission('permissions', 'create'),
    canUpdate: hasPermission('permissions', 'update'),
    canDelete: hasPermission('permissions', 'delete'),
  };

  useEffect(() => {
    if (permission.canRead) {
      fetchRoles();
      fetchPermissions();
    }
  }, [permission.canRead]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${url}/api/roles`);
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await axios.get(`${url}/api/permissions`);
      setPermissions(response.data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions.map(p => p._id)
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`${url}/api/roles/${selectedRole._id}`, formData);
      } else {
        await axios.post(`${url}/api/roles`, formData);
      }
      fetchRoles();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', permissions: [] });
    setIsEditMode(false);
    setSelectedRole(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/api/roles/${id}`);
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  if (!permission.canRead) {
    console.log('Permission denied for roles read');
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
    // <div>
    <div style={{ padding: '24px' }}>

      {/* <div className="flex justify-between items-center mb-4"> */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Roles</h1>
        {permission.canCreate && (
          <Button variant="contained" onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}>
            Add Role
          </Button>
        )}
      </div>
      <Dialog open={isDialogOpen} onClose={() => {
        setIsDialogOpen(false);
        resetForm();
      }}>
        <DialogTitle>{isEditMode ? 'Edit Role' : 'Create New Role'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              margin="dense"
            />
            <div className="mt-4">
              <h3 className="mb-2">Permissions</h3>
              {permissions.map((permission) => (
                <FormControlLabel
                  key={permission._id}
                  control={
                    <Checkbox
                      checked={formData.permissions.includes(permission._id)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFormData({
                          ...formData,
                          permissions: checked
                            ? [...formData.permissions, permission._id]
                            : formData.permissions.filter((id) => id !== permission._id)
                        });
                      }}
                    />
                  }
                  label={`${permission.name} (${permission.module})`}
                />
              ))}
            </div>
            <DialogActions>
              <Button onClick={() => {
                setIsDialogOpen(false);
                resetForm();
              }}>Cancel</Button>
              <Button type="submit" variant="contained">
                {isEditMode ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role._id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  {role.permissions.map(p => p.name).join(', ')}
                </TableCell>
                <TableCell>
                  {permission.canUpdate && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(role)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                  )}
                  {permission.canDelete && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(role._id)}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export { PermissionsTable, RolesTable };