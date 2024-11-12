// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Tooltip
// } from '@mui/material';
// import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

// // Default categories if none are provided
// const defaultCategories = [
//   { id: 1, name: "Injections" },
//   { id: 2, name: "Tablets", subCategories: ["Coated", "Non-Coated"] },
//   { id: 3, name: "Capsules" },
//   { id: 4, name: "Creams" },
//   { id: 5, name: "Gels" },
// ];

// const CategoriesManager = ({
//   categories = defaultCategories,
//   onCategoryUpdate = () => {},
//   selectedCategoryId = null
// }) => {
//   const [localCategories, setLocalCategories] = useState(categories);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [dialogType, setDialogType] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     subCategories: []
//   });
//   const [error, setError] = useState('');

//   const product = process.env.REACT_APP_INTERNAL_API_PATH || '';

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     setSelectedCategory(null);
//     setFormData({ name: '', subCategories: [] });
//     setError('');
//   };

//   const handleAdd = () => {
//     setDialogType('add');
//     setDialogOpen(true);
//   };

//   const handleEdit = (category) => {
//     setDialogType('edit');
//     setSelectedCategory(category);
//     setFormData({
//       name: category.name,
//       subCategories: category.subCategories || []
//     });
//     setDialogOpen(true);
//   };

//   const handleDelete = (category) => {
//     setDialogType('delete');
//     setSelectedCategory(category);
//     setDialogOpen(true);
//   };

//   const handleSubmit = async () => {
//     try {
//       let updatedCategories = [...localCategories];

//       if (dialogType === 'add') {
//         const newCategory = {
//           id: Math.max(...localCategories.map(c => c.id), 0) + 1,
//           name: formData.name,
//           subCategories: formData.subCategories
//         };
        
//         try {
//           const response = await axios.post(`${product}/api/categories`, newCategory);
//           updatedCategories.push(response.data);
//         } catch (error) {
//           console.warn('API call failed, falling back to local state:', error);
//           updatedCategories.push(newCategory);
//         }
//       }
//       else if (dialogType === 'edit' && selectedCategory) {
//         const updatedCategory = {
//           ...selectedCategory,
//           name: formData.name,
//           subCategories: formData.subCategories
//         };
        
//         try {
//           await axios.put(`${product}/api/categories/${selectedCategory.id}`, updatedCategory);
//         } catch (error) {
//           console.warn('API call failed, falling back to local state:', error);
//         }
        
//         const index = updatedCategories.findIndex(cat => cat.id === selectedCategory.id);
//         if (index !== -1) {
//           updatedCategories[index] = updatedCategory;
//         }
//       }
//       else if (dialogType === 'delete' && selectedCategory) {
//         try {
//           await axios.delete(`${product}/api/categories/${selectedCategory.id}`);
//         } catch (error) {
//           console.warn('API call failed, falling back to local state:', error);
//         }
//         updatedCategories = updatedCategories.filter(cat => cat.id !== selectedCategory.id);
//       }

//       setLocalCategories(updatedCategories);
//       onCategoryUpdate(updatedCategories);
//       handleDialogClose();
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred');
//     }
//   };
//   const renderDialogContent = () => {
//     if (dialogType === 'delete') {
//       return (
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete {selectedCategory?.name}? This will also delete all associated products.
//           </Typography>
//         </DialogContent>
//       );
//     }

//     return (
//       <DialogContent>
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//           <TextField
//             label="Category Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             fullWidth
//             required
//           />
//           {formData.name.toLowerCase() === 'tablets' && (
//             <Box>
//               <Typography variant="subtitle1" sx={{ mb: 1 }}>
//                 Sub Categories
//               </Typography>
//               <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
//                 <TextField
//                   label="Add Sub Category"
//                   value={formData.newSubCategory || ''}
//                   onChange={(e) => setFormData({ ...formData, newSubCategory: e.target.value })}
//                   fullWidth
//                 />
//                 <Button
//                   variant="contained"
//                   onClick={() => {
//                     if (formData.newSubCategory) {
//                       setFormData({
//                         ...formData,
//                         subCategories: [...formData.subCategories, formData.newSubCategory],
//                         newSubCategory: ''
//                       });
//                     }
//                   }}
//                 >
//                   Add
//                 </Button>
//               </Box>
//               <List>
//                 {formData.subCategories.map((subCat, index) => (
//                   <ListItem key={index}>
//                     <ListItemText primary={subCat} />
//                     <ListItemSecondaryAction>
//                       <IconButton
//                         edge="end"
//                         onClick={() => {
//                           const newSubCategories = formData.subCategories.filter((_, i) => i !== index);
//                           setFormData({ ...formData, subCategories: newSubCategories });
//                         }}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </ListItemSecondaryAction>
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>
//           )}
//         </Box>
//         {error && (
//           <Typography color="error" sx={{ mt: 2 }}>
//             {error}
//           </Typography>
//         )}
//       </DialogContent>
//     );
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Typography variant="h5">Categories</Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={handleAdd}
//           size="small"
//         >
//           Add Category
//         </Button>
//       </Box>

//       <List>
//         {localCategories.map((category) => (
//           <ListItem
//             key={category.id}
//             sx={{
//               bgcolor: selectedCategoryId === category.id ? 'action.selected' : 'transparent',
//               borderRadius: 1,
//               mb: 1
//             }}
//           >
//             <ListItemText
//               primary={category.name}
//               secondary={category.subCategories?.join(', ')}
//             />
//             <ListItemSecondaryAction>
//               <Tooltip title="Edit">
//                 <IconButton
//                   edge="end"
//                   onClick={() => handleEdit(category)}
//                   sx={{ color: 'warning.main', mr: 1 }}
//                 >
//                   <EditIcon />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip title="Delete">
//                 <IconButton
//                   edge="end"
//                   onClick={() => handleDelete(category)}
//                   sx={{ color: 'error.main' }}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </Tooltip>
//             </ListItemSecondaryAction>
//           </ListItem>
//         ))}
//       </List>

//       <Dialog
//         open={dialogOpen}
//         onClose={handleDialogClose}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>
//           {dialogType === 'delete'
//             ? 'Confirm Delete'
//             : dialogType === 'edit'
//             ? 'Edit Category'
//             : 'Add Category'}
//         </DialogTitle>
//         {renderDialogContent()}
//         <DialogActions>
//           <Button onClick={handleDialogClose}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             color={dialogType === 'delete' ? 'error' : 'primary'}
//             onClick={handleSubmit}
//           >
//             {dialogType === 'delete' ? 'Delete' : dialogType === 'edit' ? 'Save' : 'Add'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CategoriesManager;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Tooltip,
  CircularProgress,
  Alert
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const CategoriesManager = ({ 
  onCategoryUpdate = () => {}, // Provide default empty function
  selectedCategoryId = null 
}) => {
  const [categories, setCategories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subCategories: [],
    newSubCategory: '' // Add this to track new sub-category input
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const handleError = (error) => {
    console.error('API Error:', error);
    if (error.code === 'ERR_NETWORK') {
      setError('Unable to connect to the server. Please check if the API server is running.');
    } else if (error.response?.status === 404) {
      setError('The requested resource was not found.');
    } else {
      setError(error.response?.data?.message || 'An unexpected error occurred. Please try again.');
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/api/categories');
      const fetchedCategories = response.data;
      setCategories(fetchedCategories);
      // Safely call onCategoryUpdate
      if (typeof onCategoryUpdate === 'function') {
        onCategoryUpdate(fetchedCategories);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedCategory(null);
    setFormData({
      name: '',
      subCategories: [],
      newSubCategory: ''
    });
    setError('');
  };

  const handleAdd = () => {
    setDialogType('add');
    setFormData({
      name: '',
      subCategories: [],
      newSubCategory: ''
    });
    setDialogOpen(true);
  };

  const handleEdit = (category) => {
    setDialogType('edit');
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      subCategories: category.subCategories || [],
      newSubCategory: ''
    });
    setDialogOpen(true);
  };

  const handleDelete = (category) => {
    setDialogType('delete');
    setSelectedCategory(category);
    setDialogOpen(true);
  };

  const handleAddSubCategory = () => {
    if (formData.newSubCategory.trim()) {
      setFormData({
        ...formData,
        subCategories: [...formData.subCategories, formData.newSubCategory.trim()],
        newSubCategory: ''
      });
    }
  };

  const handleRemoveSubCategory = (index) => {
    const newSubCategories = formData.subCategories.filter((_, i) => i !== index);
    setFormData({ ...formData, subCategories: newSubCategories });
  };

  const handleSubmit = async () => {
    try {
      setError('');
      let response;
      const submitData = {
        name: formData.name,
        subCategories: formData.subCategories
      };

      if (dialogType === 'add') {
        response = await api.post('/api/categories', submitData);
        const updatedCategories = [...categories, response.data];
        setCategories(updatedCategories);
        if (typeof onCategoryUpdate === 'function') {
          onCategoryUpdate(updatedCategories);
        }
      } 
      else if (dialogType === 'edit' && selectedCategory) {
        response = await api.put(`/api/categories/${selectedCategory.id}`, submitData);
        const updatedCategories = categories.map(cat =>
          cat.id === selectedCategory.id ? response.data : cat
        );
        setCategories(updatedCategories);
        if (typeof onCategoryUpdate === 'function') {
          onCategoryUpdate(updatedCategories);
        }
      } 
      else if (dialogType === 'delete' && selectedCategory) {
        await api.delete(`/api/categories/${selectedCategory.id}`);
        const updatedCategories = categories.filter(cat => cat.id !== selectedCategory.id);
        setCategories(updatedCategories);
        if (typeof onCategoryUpdate === 'function') {
          onCategoryUpdate(updatedCategories);
        }
      }

      handleDialogClose();
    } catch (error) {
      handleError(error);
    }
  };

  const shouldShowSubCategories = true; // Changed from checking name === 'tablets'

  const renderDialogContent = () => {
    if (dialogType === 'delete') {
      return (
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedCategory?.name}? This will also delete all associated products.
          </Typography>
        </DialogContent>
      );
    }

    return (
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Category Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            required
          />
          
          {shouldShowSubCategories && (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Sub Categories
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  label="Add Sub Category"
                  value={formData.newSubCategory}
                  onChange={(e) => setFormData({ ...formData, newSubCategory: e.target.value })}
                  fullWidth
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSubCategory();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddSubCategory}
                >
                  Add
                </Button>
              </Box>
              <List>
                {formData.subCategories.map((subCat, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={subCat} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleRemoveSubCategory(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
    );
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Categories</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          size="small"
        >
          Add Category
        </Button>
      </Box>

      <List>
        {categories.map((category) => (
          <ListItem
            key={category.id}
            sx={{
              bgcolor: selectedCategoryId === category.id ? 'action.selected' : 'transparent',
              borderRadius: 1,
              mb: 1
            }}
          >
            <ListItemText
              primary={category.name}
              secondary={category.subCategories?.length > 0 ? 
                `Sub-categories: ${category.subCategories.join(', ')}` : 
                'No sub-categories'
              }
            />
            <ListItemSecondaryAction>
              <Tooltip title="Edit">
                <IconButton
                  edge="end"
                  onClick={() => handleEdit(category)}
                  sx={{ color: 'warning.main', mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  edge="end"
                  onClick={() => handleDelete(category)}
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog 
        open={dialogOpen} 
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogType === 'delete'
            ? 'Confirm Delete'
            : dialogType === 'edit'
            ? 'Edit Category'
            : 'Add Category'}
        </DialogTitle>
        {renderDialogContent()}
        <DialogActions>
          <Button onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color={dialogType === 'delete' ? 'error' : 'primary'}
            onClick={handleSubmit}
          >
            {dialogType === 'delete' ? 'Delete' : dialogType === 'edit' ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoriesManager;