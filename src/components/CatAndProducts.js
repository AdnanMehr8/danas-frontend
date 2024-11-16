// import React, { useEffect, useState, useCallback } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   CircularProgress,
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Tooltip
// } from "@mui/material";
// import { Edit as EditIcon, Delete as DeleteIcon, Eye as EyeIcon, Plus as PlusIcon } from "lucide-react";

// import { setBatchInfo } from "../store/batchInfoSlice";
// import { setBatchPInfo } from "../store/batchInfoPackingSlice ";
// import './categoryProductList.css'

// const categories = [
//   { id: 1, name: "Injections" },
//   { id: 2, name: "Tablets", subCategories: ["Coated", "Non-Coated"] },
//   { id: 3, name: "Capsules" },
//   { id: 4, name: "Creams" },
//   { id: 5, name: "Gels" },
// ];

// const initialFormData = {
//   regNo: "",
//   itemId: "",
//   categoryDesc: "",
//   description: "",
//   uom: "",
//   packSize: "",
//   rate: "",
//   retailPrice: "",
//   strength: "",
//   subCategory: "Coated"
// };

// const CatAndProducts = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [products, setProducts] = useState({
//     1: [],
//     2: { Coated: [], "Non-Coated": [] },
//     3: [],
//     4: [],
//     5: []
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [dialogType, setDialogType] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [formData, setFormData] = useState(initialFormData);

//   const product = process.env.REACT_APP_INTERNAL_API_PATH || '';

//   const fetchProducts = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${product}/api/products`);
  
//       const categorized = {
//         1: [],
//         2: { Coated: [], "Non-Coated": [] },
//         3: [],
//         4: [],
//         5: []
//       };
  
//       if (response.data) {
//         response.data.forEach((item) => {
//           const categoryId = parseInt(item.categoryId);
          
//           if (categoryId === 2 && item.productList) {
//             item.productList.forEach((product) => {
//               const productWithParentId = {
//                 ...product,
//                 parentId: item._id
//               };
              
//               const subCategory = product.subCategory || "Coated";
//               if (categorized[2][subCategory]) {
//                 categorized[2][subCategory].push(productWithParentId);
//               }
//             });
//           } else if (categorized[categoryId] && item.productList) {
//             const productsWithParentId = item.productList.map(product => ({
//               ...product,
//               parentId: item._id
//             }));
//             categorized[categoryId] = [...categorized[categoryId], ...productsWithParentId];
//           }
//         });
//       }
  
//       setProducts(categorized);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setError("Error fetching products");
//     } finally {
//       setLoading(false);
//     }
//   }, [product]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     setSelectedProduct(null);
//     setFormData(initialFormData);
//   };

//   const handleEdit = (product) => {
//     if (!product) return;
//     console.log('Editing product:', product);  // Debugging line
//     setSelectedProduct(product);
//     setFormData({
//       ...initialFormData,
//       ...product
//     });
//     setDialogType("edit");
//     setDialogOpen(true);
//   };
  
//   const handleDelete = (product) => {
//     if (!product) return;
//     setSelectedProduct(product);
//     setDialogType("delete");
//     setDialogOpen(true);
//   };

//   const handleView = (productName, packSize) => {
//     if (!productName) return;
//     const productNameToDisplay = productName.split(' ')[0];
//     dispatch(setBatchInfo({ batch: { productName: productNameToDisplay, packSize } }));
//     dispatch(setBatchPInfo({ batch: { productName: productNameToDisplay, packSize } }));

//     if (productNameToDisplay.toLowerCase().includes("sulpeol")) {
//       navigate("/form-header-sulpeol");
//     } else if (productNameToDisplay.toLowerCase().includes("cream")) {
//       navigate("/form-header-cream");
//     } else if (productNameToDisplay.toLowerCase().includes("arex")) {
//       navigate("/form-header");
//     }
//   };

//   const handleAdd = () => {
//     setDialogType("add");
//     setFormData(initialFormData);
//     setDialogOpen(true);
//   };

//   const renderProductTable = (productList = []) => (
//     <TableContainer component={Paper} className="mt-4">
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Reg No</TableCell>
//             <TableCell>Item ID</TableCell>
//             <TableCell>Description</TableCell>
//             <TableCell>Category</TableCell>
//             <TableCell>UOM</TableCell>
//             <TableCell>Pack Size</TableCell>
//             <TableCell>Rate</TableCell>
//             <TableCell>Retail Price</TableCell>
//             <TableCell>Strength</TableCell>
//             {selectedCategoryId === 2 && <TableCell>Sub Category</TableCell>}
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {productList.map((product) => (
//             <TableRow key={product._id || Math.random()}>
//               <TableCell>{product.regNo || '-'}</TableCell>
//               <TableCell>{product.itemId || '-'}</TableCell>
//               <TableCell>{product.description || '-'}</TableCell>
//               <TableCell>{product.categoryDesc || '-'}</TableCell>
//               <TableCell>{product.uom || '-'}</TableCell>
//               <TableCell>{product.packSize || '-'}</TableCell>
//               <TableCell>{product.rate || '-'}</TableCell>
//               <TableCell>{product.retailPrice || '-'}</TableCell>
//               <TableCell>{product.strength || '-'}</TableCell>
//               {selectedCategoryId === 2 && <TableCell>{product.subCategory || 'Coated'}</TableCell>}
//               <TableCell>
//                 <Box className="flex space-x-2">
//                   <Tooltip title="View">
//                     <IconButton
//                       size="small"
//                       onClick={() => handleView(product.description, product.packSize)}
//                       className="text-blue-600"
//                     >
//                       <EyeIcon size={16} />
//                     </IconButton>
//                   </Tooltip>
//                   <Tooltip title="Edit">
//                     <IconButton
//                       size="small"
//                       onClick={() => handleEdit(product)}
//                       className="text-amber-600"
//                     >
//                       <EditIcon size={16} />
//                     </IconButton>
//                   </Tooltip>
//                   <Tooltip title="Delete">
//                     <IconButton
//                       size="small"
//                       onClick={() => handleDelete(product)}
//                       className="text-red-600"
//                     >
//                       <DeleteIcon size={16} />
//                     </IconButton>
//                   </Tooltip>
//                 </Box>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
//   const handleSubmitForm = async () => {
//     try {
//       if (dialogType === "add") {
//         // For adding a new product
//         const payload = {
//           categoryId: selectedCategoryId.toString(),
//           productList: [{
//             regNo: formData.regNo,
//             itemId: formData.itemId,
//             description: formData.description,
//             categoryDesc: formData.categoryDesc,
//             uom: formData.uom,
//             packSize: formData.packSize,
//             rate: formData.rate,
//             retailPrice: formData.retailPrice,
//             strength: formData.strength,
//             // subCategory: selectedCategoryId === 2 ? formData.subCategory : undefined
//             subCategory: formData.subCategory 

//           }]
//         };
  
//         await axios.post(`${product}/api/products`, payload);
//       } else if (dialogType === "edit" && selectedProduct) {
//         // For editing an existing product in the productList
//         const payload = {
//           regNo: formData.regNo,
//           itemId: formData.itemId,
//           description: formData.description,
//           categoryDesc: formData.categoryDesc,
//           uom: formData.uom,
//           packSize: formData.packSize,
//           rate: formData.rate,
//           retailPrice: formData.retailPrice,
//           strength: formData.strength,
//           subCategory: selectedCategoryId === 2 ? formData.subCategory : undefined
//         };
  
//         await axios.put(
//           `${product}/api/products/${selectedProduct.parentId}/products/${selectedProduct._id}`,
//           payload
//         );
//       } else if (dialogType === "delete" && selectedProduct) {
//         // For deleting a product
//         await axios.delete(`${product}/api/products/${selectedProduct.parentId}`);
//       }
  
//       // Refresh the products list after successful operation
//       await fetchProducts();
//       handleDialogClose();
//     } catch (error) {
//       console.error("Error performing operation:", error);
//       setError(error.response?.data?.message || "An error occurred");
//     }
//   };
  
//   // Update the existing dialog actions
//   const renderDialogActions = () => (
//     <DialogActions>
//       <Button onClick={handleDialogClose}>Cancel</Button>
//       <Button 
//         variant="contained" 
//         color={dialogType === "delete" ? "error" : "primary"}
//         onClick={handleSubmitForm}
//       >
//         {dialogType === "delete" ? "Delete" : dialogType === "edit" ? "Save" : "Add"}
//       </Button>
//     </DialogActions>
//   );

//   // Update the dialog content
//   const renderDialogContent = () => (
//     <DialogContent>
//       {dialogType === "delete" ? (
//         <Typography>
//           Are you sure you want to delete {selectedProduct?.description || 'this product'}?
//         </Typography>
//       ) : (
//         <Box className="grid grid-cols-2 gap-4 mt-4">
//           <TextField
//             label="Registration No"
//             value={formData.regNo}
//             onChange={(e) => setFormData({...formData, regNo: e.target.value})}
//             fullWidth
//             required
//           />
//             <TextField
//                   label="Item ID"
//                   value={formData.itemId}
//                   onChange={(e) => setFormData({...formData, itemId: e.target.value})}
//                   fullWidth
//                 />
//                 <TextField
//                   label="Description"
//                   value={formData.description}
//                   onChange={(e) => setFormData({...formData, description: e.target.value})}
//                   fullWidth
//                 />
//                    <TextField
//                   label="Category"
//                   value={formData.categoryDesc}
//                   onChange={(e) => setFormData({...formData, categoryDesc: e.target.value})}
//                   fullWidth
//                 />
//                    <TextField
//                   label="UOM"
//                   value={formData.uom}
//                   onChange={(e) => setFormData({...formData, uom: e.target.value})}
//                   fullWidth
//                 />
//                    <TextField
//                   label="Pack Size"
//                   value={formData.packSize}
//                   onChange={(e) => setFormData({...formData, packSize: e.target.value})}
//                   fullWidth
//                 />
//                    <TextField
//                   label="Rate"
//                   value={formData.rate}
//                   onChange={(e) => setFormData({...formData, rate: e.target.value})}
//                   fullWidth
//                 />
//                    <TextField
//                   label="Retail Price"
//                   value={formData.retailPrice}
//                   onChange={(e) => setFormData({...formData, retailPrice: e.target.value})}
//                   fullWidth
//                 />
//                    <TextField
//                   label="Strength"
//                   value={formData.strength}
//                   onChange={(e) => setFormData({...formData, strength: e.target.value})}
//                   fullWidth
//                 />
//           {selectedCategoryId === 2 && (
//             <Select
//               value={formData.subCategory}
//               onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
//               fullWidth
//               label="Sub Category"
//             >
//               <MenuItem value="Coated">Coated</MenuItem>
//               <MenuItem value="Non-Coated">Non-Coated</MenuItem>
//             </Select>
//           )}
//         </Box>
//       )}
//     </DialogContent>
//   );

//   // Update the Dialog component
//   const renderDialog = () => (
//     <Dialog 
//       open={dialogOpen} 
//       onClose={handleDialogClose} 
//       maxWidth="md" 
//       fullWidth
//     >
//       <DialogTitle>
//         {dialogType === "delete" 
//           ? "Confirm Delete" 
//           : dialogType === "edit" 
//             ? "Edit Product" 
//             : "Add Product"}
//       </DialogTitle>
//       {renderDialogContent()}
//       {renderDialogActions()}
//     </Dialog>
//   );

//   return (
//     <div className="flex p-5 category-product-list">
//       {/* Categories Section */}
//       <div className="w-1/4 pr-5 border-r category-container">
//         <Typography variant="h5" className="mb-4">Categories</Typography>
//         <ul className="space-y-2">
//           {categories.map((category) => (
//             <li
//               key={category.id}
//               onClick={() => setSelectedCategoryId(category.id)}
//               className={`p-3 rounded cursor-pointer transition-colors 
//                 ${selectedCategoryId === category.id ? "selected-category" : ""}`}
//             >
//               {category.name}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Products Section */}
//       <div className="w-3/4 pl-5 product-container">
//         <div className="flex justify-between items-center mb-4">
//           <Typography variant="h5">Products</Typography>
//           <Button
//             variant="contained"
//             startIcon={<PlusIcon />}
//             onClick={handleAdd}
//             className="bg-blue-600"
//           >
//             Add Product
//           </Button>
//         </div>

//         {loading ? (
//           <Box className="flex justify-center items-center h-64">
//             <CircularProgress />
//           </Box>
//         ) : error ? (
//           <Typography color="error">{error}</Typography>
//         ) : !selectedCategoryId ? (
//           <Typography>Please select a category</Typography>
//         ) : selectedCategoryId === 2 ? (
//           <>
//             <Typography variant="h6" className="mb-2">Coated Tablets</Typography>
//             {renderProductTable(products[2]?.Coated || [])}
//             <Typography variant="h6" className="mt-6 mb-2">Non-Coated Tablets</Typography>
//             {renderProductTable(products[2]?.["Non-Coated"] || [])}
//           </>
//         ) : (
//           renderProductTable(products[selectedCategoryId] || [])
//         )}
//         {renderDialog()}
//       </div>
//     </div>
//   );
// };

// export default CatAndProducts;

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Eye as EyeIcon, Plus as PlusIcon } from "lucide-react";

import { setBatchInfo } from "../store/batchInfoSlice";
import { setBatchPInfo } from "../store/batchInfoPackingSlice ";
import './categoryProductList.css'

const categories = [
  { id: 1, name: "Injections" },
  { id: 2, name: "Tablets", subCategories: ["Coated", "Non-Coated"] },
  { id: 3, name: "Capsules" },
  { id: 4, name: "Creams" },
  { id: 5, name: "Gels" },
];

const initialFormData = {
  regNo: "",
  itemId: "",
  categoryDesc: "",
  description: "",
  uom: "",
  packSize: "",
  rate: "",
  retailPrice: "",
  strength: "",
  subCategory: "Coated"
};

// CSS styles
const styles = {
    pageContainer: {
      display: 'flex',
      padding: '1.5rem',
      backgroundColor: '#f8fafc',
      minHeight: 'calc(100vh - 64px)', // Adjust based on your header height
      gap: '2rem'
    },
    categorySection: {
      width: '280px',
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      height: 'fit-content'
    },
    categoryTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#2C3E50',
      marginBottom: '1.5rem'
    },
    categoryList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    categoryItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      color: '#64748b',
      '&:hover': {
        backgroundColor: '#f1f5f9'
      }
    },
    selectedCategory: {
      backgroundColor: '#2C3E50',
      color: 'white',
      '&:hover': {
        backgroundColor: '#34495E'
      }
    },
    productsSection: {
      flex: 1,
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem'
    },
    addButton: {
      backgroundColor: '#3498DB',
      color: 'white',
      '&:hover': {
        backgroundColor: '#2980B9'
      }
    },
    tableContainer: {
      marginTop: '1rem',
      boxShadow: 'none',
      border: '1px solid #e2e8f0',
      borderRadius: '8px'
    },
    tableHeader: {
      backgroundColor: '#f8fafc'
    },
    tableHeaderCell: {
      color: '#64748b',
      fontWeight: '600',
      padding: '1rem'
    },
    tableCell: {
      padding: '1rem'
    },
    actionButton: {
      padding: '6px',
      '&:hover': {
        backgroundColor: '#f1f5f9'
      }
    }
  };
  
const CatAndProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState({
    1: [],
    2: { Coated: [], "Non-Coated": [] },
    3: [],
    4: [],
    5: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const product = process.env.REACT_APP_INTERNAL_API_PATH || '';

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${product}/api/products`);
  
      const categorized = {
        1: [],
        2: { Coated: [], "Non-Coated": [] },
        3: [],
        4: [],
        5: []
      };
  
      if (response.data) {
        response.data.forEach((item) => {
          const categoryId = parseInt(item.categoryId);
          
          if (categoryId === 2 && item.productList) {
            item.productList.forEach((product) => {
              const productWithParentId = {
                ...product,
                parentId: item._id
              };
              
              const subCategory = product.subCategory || "Coated";
              if (categorized[2][subCategory]) {
                categorized[2][subCategory].push(productWithParentId);
              }
            });
          } else if (categorized[categoryId] && item.productList) {
            const productsWithParentId = item.productList.map(product => ({
              ...product,
              parentId: item._id
            }));
            categorized[categoryId] = [...categorized[categoryId], ...productsWithParentId];
          }
        });
      }
  
      setProducts(categorized);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  }, [product]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
    setFormData(initialFormData);
  };

  const handleEdit = (product) => {
    if (!product) return;
    console.log('Editing product:', product);  // Debugging line
    setSelectedProduct(product);
    setFormData({
      ...initialFormData,
      ...product
    });
    setDialogType("edit");
    setDialogOpen(true);
  };
  
  const handleDelete = (product) => {
    if (!product) return;
    setSelectedProduct(product);
    setDialogType("delete");
    setDialogOpen(true);
  };

  const handleView = (productName, packSize) => {
    if (!productName) return;
    const productNameToDisplay = productName.split(' ')[0];
    dispatch(setBatchInfo({ batch: { productName: productNameToDisplay, packSize } }));
    dispatch(setBatchPInfo({ batch: { productName: productNameToDisplay, packSize } }));

    if (productNameToDisplay.toLowerCase().includes("sulpeol")) {
      navigate("/form-header-sulpeol");
    } else if (productNameToDisplay.toLowerCase().includes("cream")) {
      navigate("/form-header-cream");
    } else if (productNameToDisplay.toLowerCase().includes("arex")) {
      navigate("/form-header");
    }
  };

  const handleAdd = () => {
    setDialogType("add");
    setFormData(initialFormData);
    setDialogOpen(true);
  };

  const renderProductTable = (productList = []) => (
    <TableContainer component={Paper} className="mt-4">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Reg No</TableCell>
            <TableCell>Item ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>UOM</TableCell>
            <TableCell>Pack Size</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Retail Price</TableCell>
            <TableCell>Strength</TableCell>
            {selectedCategoryId === 2 && <TableCell>Sub Category</TableCell>}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList.map((product) => (
            <TableRow key={product._id || Math.random()}>
              <TableCell>{product.regNo || '-'}</TableCell>
              <TableCell>{product.itemId || '-'}</TableCell>
              <TableCell>{product.description || '-'}</TableCell>
              <TableCell>{product.categoryDesc || '-'}</TableCell>
              <TableCell>{product.uom || '-'}</TableCell>
              <TableCell>{product.packSize || '-'}</TableCell>
              <TableCell>{product.rate || '-'}</TableCell>
              <TableCell>{product.retailPrice || '-'}</TableCell>
              <TableCell>{product.strength || '-'}</TableCell>
              {selectedCategoryId === 2 && <TableCell>{product.subCategory || 'Coated'}</TableCell>}
              <TableCell>
                <Box className="flex space-x-2">
                  <Tooltip title="View">
                    <IconButton
                      size="small"
                      onClick={() => handleView(product.description, product.packSize)}
                      className="text-blue-600"
                    >
                      <EyeIcon size={16} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(product)}
                      className="text-amber-600"
                    >
                      <EditIcon size={16} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(product)}
                      className="text-red-600"
                    >
                      <DeleteIcon size={16} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  const handleSubmitForm = async () => {
    try {
      if (dialogType === "add") {
        // For adding a new product
        const payload = {
          categoryId: selectedCategoryId.toString(),
          productList: [{
            regNo: formData.regNo,
            itemId: formData.itemId,
            description: formData.description,
            categoryDesc: formData.categoryDesc,
            uom: formData.uom,
            packSize: formData.packSize,
            rate: formData.rate,
            retailPrice: formData.retailPrice,
            strength: formData.strength,
            // subCategory: selectedCategoryId === 2 ? formData.subCategory : undefined
            subCategory: formData.subCategory 

          }]
        };
  
        await axios.post(`${product}/api/products`, payload);
      } else if (dialogType === "edit" && selectedProduct) {
        // For editing an existing product in the productList
        const payload = {
          regNo: formData.regNo,
          itemId: formData.itemId,
          description: formData.description,
          categoryDesc: formData.categoryDesc,
          uom: formData.uom,
          packSize: formData.packSize,
          rate: formData.rate,
          retailPrice: formData.retailPrice,
          strength: formData.strength,
          subCategory: selectedCategoryId === 2 ? formData.subCategory : undefined
        };
  
        await axios.put(
          `${product}/api/products/${selectedProduct.parentId}/products/${selectedProduct._id}`,
          payload
        );
      } else if (dialogType === "delete" && selectedProduct) {
        // For deleting a product
        await axios.delete(`${product}/api/products/${selectedProduct.parentId}`);
      }
  
      // Refresh the products list after successful operation
      await fetchProducts();
      handleDialogClose();
    } catch (error) {
      console.error("Error performing operation:", error);
      setError(error.response?.data?.message || "An error occurred");
    }
  };
  
  // Update the existing dialog actions
  const renderDialogActions = () => (
    <DialogActions>
      <Button onClick={handleDialogClose}>Cancel</Button>
      <Button 
        variant="contained" 
        color={dialogType === "delete" ? "error" : "primary"}
        onClick={handleSubmitForm}
      >
        {dialogType === "delete" ? "Delete" : dialogType === "edit" ? "Save" : "Add"}
      </Button>
    </DialogActions>
  );

  // Update the dialog content
  const renderDialogContent = () => (
    <DialogContent>
      {dialogType === "delete" ? (
        <Typography>
          Are you sure you want to delete {selectedProduct?.description || 'this product'}?
        </Typography>
      ) : (
        <Box className="grid grid-cols-2 gap-4 mt-4">
          <TextField
            label="Registration No"
            value={formData.regNo}
            onChange={(e) => setFormData({...formData, regNo: e.target.value})}
            fullWidth
            required
          />
            <TextField
                  label="Item ID"
                  value={formData.itemId}
                  onChange={(e) => setFormData({...formData, itemId: e.target.value})}
                  fullWidth
                />
                <TextField
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  fullWidth
                />
                   <TextField
                  label="Category"
                  value={formData.categoryDesc}
                  onChange={(e) => setFormData({...formData, categoryDesc: e.target.value})}
                  fullWidth
                />
                   <TextField
                  label="UOM"
                  value={formData.uom}
                  onChange={(e) => setFormData({...formData, uom: e.target.value})}
                  fullWidth
                />
                   <TextField
                  label="Pack Size"
                  value={formData.packSize}
                  onChange={(e) => setFormData({...formData, packSize: e.target.value})}
                  fullWidth
                />
                   <TextField
                  label="Rate"
                  value={formData.rate}
                  onChange={(e) => setFormData({...formData, rate: e.target.value})}
                  fullWidth
                />
                   <TextField
                  label="Retail Price"
                  value={formData.retailPrice}
                  onChange={(e) => setFormData({...formData, retailPrice: e.target.value})}
                  fullWidth
                />
                   <TextField
                  label="Strength"
                  value={formData.strength}
                  onChange={(e) => setFormData({...formData, strength: e.target.value})}
                  fullWidth
                />
          {selectedCategoryId === 2 && (
            <Select
              value={formData.subCategory}
              onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
              fullWidth
              label="Sub Category"
            >
              <MenuItem value="Coated">Coated</MenuItem>
              <MenuItem value="Non-Coated">Non-Coated</MenuItem>
            </Select>
          )}
        </Box>
      )}
    </DialogContent>
  );

  // Update the Dialog component
  const renderDialog = () => (
    <Dialog 
      open={dialogOpen} 
      onClose={handleDialogClose} 
      maxWidth="md" 
      fullWidth
    >
      <DialogTitle>
        {dialogType === "delete" 
          ? "Confirm Delete" 
          : dialogType === "edit" 
            ? "Edit Product" 
            : "Add Product"}
      </DialogTitle>
      {renderDialogContent()}
      {renderDialogActions()}
    </Dialog>
  );

  return (
    <Box sx={styles.pageContainer}>
      {/* Categories Section */}
      <Box sx={styles.categorySection}>
        <Typography sx={styles.categoryTitle}>
          Categories
        </Typography>
        <Box sx={styles.categoryList}>
          {categories.map((category) => (
            <Box
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              sx={{
                ...styles.categoryItem,
                ...(selectedCategoryId === category.id && styles.selectedCategory)
              }}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Products Section */}
      <Box sx={styles.productsSection}>
        <Box sx={styles.header}>
          <Typography variant="h5" sx={{ color: '#2C3E50', fontWeight: '600' }}>
            {selectedCategoryId 
              ? categories.find(c => c.id === selectedCategoryId)?.name 
              : 'Products'}
          </Typography>
          <Button
            variant="contained"
            startIcon={<PlusIcon size={18} />}
            onClick={handleAdd}
            sx={styles.addButton}
          >
            Add Product
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <CircularProgress sx={{ color: '#3498DB' }} />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ padding: '1rem' }}>{error}</Typography>
        ) : !selectedCategoryId ? (
          <Box sx={{ 
            padding: '3rem', 
            textAlign: 'center',
            color: '#64748b',
            backgroundColor: '#f8fafc',
            borderRadius: '8px'
          }}>
            <Typography>Please select a category to view products</Typography>
          </Box>
        ) : selectedCategoryId === 2 ? (
          <>
            <Typography 
              variant="h6" 
              sx={{ 
                marginTop: '1rem',
                marginBottom: '1rem',
                color: '#2C3E50',
                fontWeight: '600'
              }}
            >
              Coated Tablets
            </Typography>
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table>
                <TableHead sx={styles.tableHeader}>
                  <TableRow>
                    <TableCell sx={styles.tableHeaderCell}>Reg No</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Item ID</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Description</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Category</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>UOM</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Pack Size</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Rate</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Retail Price</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Strength</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Sub Category</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(products[2]?.Coated || []).map((product) => (
                    <TableRow 
                      key={product._id || Math.random()}
                      sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}
                    >
                      <TableCell sx={styles.tableCell}>{product.regNo || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.itemId || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.description || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.categoryDesc || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.uom || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.packSize || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.rate || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.retailPrice || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.strength || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.subCategory || 'Coated'}</TableCell>
                      <TableCell sx={styles.tableCell}>
                        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                          <Tooltip title="View">
                            <IconButton
                              size="small"
                              onClick={() => handleView(product.description, product.packSize)}
                              sx={{ ...styles.actionButton, color: '#3498DB' }}
                            >
                              <EyeIcon size={16} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(product)}
                              sx={{ ...styles.actionButton, color: '#f59e0b' }}
                            >
                              <EditIcon size={16} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(product)}
                              sx={{ ...styles.actionButton, color: '#ef4444' }}
                            >
                              <DeleteIcon size={16} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Non-Coated Tablets Table - Similar structure as above */}
            {/* ... */}
            <Typography 
              variant="h6" 
              sx={{ 
                marginTop: '1rem',
                marginBottom: '1rem',
                color: '#2C3E50',
                fontWeight: '600'
              }}
            >
              Non-Coated Tablets
            </Typography>
            <TableContainer component={Paper} sx={styles.tableContainer}>
            {/* Similar table structure as above */}
            <Table>
                <TableHead sx={styles.tableHeader}>
                  <TableRow>
                    <TableCell sx={styles.tableHeaderCell}>Reg No</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Item ID</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Description</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Category</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>UOM</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Pack Size</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Rate</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Retail Price</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Strength</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Sub Category</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(products[2]?.["Non-Coated"] || []).map((product) => (
                    <TableRow 
                      key={product._id || Math.random()}
                      sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}
                    >
                      <TableCell sx={styles.tableCell}>{product.regNo || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.itemId || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.description || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.categoryDesc || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.uom || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.packSize || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.rate || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.retailPrice || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.strength || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.subCategory || 'Coated'}</TableCell>
                      <TableCell sx={styles.tableCell}>
                        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                          <Tooltip title="View">
                            <IconButton
                              size="small"
                              onClick={() => handleView(product.description, product.packSize)}
                              sx={{ ...styles.actionButton, color: '#3498DB' }}
                            >
                              <EyeIcon size={16} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(product)}
                              sx={{ ...styles.actionButton, color: '#f59e0b' }}
                            >
                              <EditIcon size={16} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(product)}
                              sx={{ ...styles.actionButton, color: '#ef4444' }}
                            >
                              <DeleteIcon size={16} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </TableContainer>
            
          </>
        ) : (
          <TableContainer component={Paper} sx={styles.tableContainer}>
            {/* Similar table structure as above */}
            <Table>
                <TableHead sx={styles.tableHeader}>
                  <TableRow>
                    <TableCell sx={styles.tableHeaderCell}>Reg No</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Item ID</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Description</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Category</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>UOM</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Pack Size</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Rate</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Retail Price</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Strength</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Sub Category</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(products[selectedCategoryId] || []).map((product) => (
                    <TableRow 
                      key={product._id || Math.random()}
                      sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}
                    >
                      <TableCell sx={styles.tableCell}>{product.regNo || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.itemId || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.description || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.categoryDesc || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.uom || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.packSize || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.rate || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.retailPrice || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.strength || '-'}</TableCell>
                      <TableCell sx={styles.tableCell}>{product.subCategory || 'Coated'}</TableCell>
                      <TableCell sx={styles.tableCell}>
                        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                          <Tooltip title="View">
                            <IconButton
                              size="small"
                              onClick={() => handleView(product.description, product.packSize)}
                              sx={{ ...styles.actionButton, color: '#3498DB' }}
                            >
                              <EyeIcon size={16} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(product)}
                              sx={{ ...styles.actionButton, color: '#f59e0b' }}
                            >
                              <EditIcon size={16} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(product)}
                              sx={{ ...styles.actionButton, color: '#ef4444' }}
                            >
                              <DeleteIcon size={16} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </TableContainer>
        )}

        {/* Dialog styling */}
        <Dialog 
          open={dialogOpen} 
          onClose={handleDialogClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '12px',
              padding: '1rem'
            }
          }}
        >
          <DialogTitle sx={{
            color: '#2C3E50',
            fontWeight: '600',
            padding: '1rem'
          }}>
            {dialogType === "delete" 
              ? "Confirm Delete" 
              : dialogType === "edit" 
                ? "Edit Product" 
                : "Add Product"}
          </DialogTitle>
          <DialogContent>
            {dialogType === "delete" ? (
              <Typography sx={{ color: '#64748b', padding: '1rem' }}>
                Are you sure you want to delete {selectedProduct?.description || 'this product'}?
              </Typography>
            ) : (
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '1rem',
                padding: '1rem' 
              }}>
                {/* Form fields with consistent styling */}
                <TextField
                  label="Registration No"
                  value={formData.regNo}
                  onChange={(e) => setFormData({...formData, regNo: e.target.value})}
                  fullWidth
                   required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px'
                    }
                  }}
              
                />
                <TextField
                  label="Item ID"
                  value={formData.itemId}
                  onChange={(e) => setFormData({...formData, itemId: e.target.value})}
                  fullWidth
                   required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px'
                    }
                  }}
                />
                <TextField
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  fullWidth
                   required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px'
                    }
                  }}
                />
                   <TextField
                  label="Category"
                  value={formData.categoryDesc}
                  onChange={(e) => setFormData({...formData, categoryDesc: e.target.value})}
                  fullWidth
                   required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px'
                    }
                  }}
                />
                   <TextField
                  label="UOM"
                  value={formData.uom}
                  onChange={(e) => setFormData({...formData, uom: e.target.value})}
                  fullWidth
                   required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px'
                    }
                  }}
                />
                   <TextField
                  label="Pack Size"
                  value={formData.packSize}
                  onChange={(e) => setFormData({...formData, packSize: e.target.value})}
                  fullWidth
                   required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px'
                    }
                  }}
                />
                   <TextField
                  label="Rate"
                  value={formData.rate}
                  onChange={(e) => setFormData({...formData, rate: e.target.value})}
                  fullWidth
                   required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px'
                    }
                  }}
                />
                   <TextField
                  label="Retail Price"
                  value={formData.retailPrice}
                  onChange={(e) => setFormData({...formData, retailPrice: e.target.value})}
                  fullWidth
                   required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px'
                    }
                  }}
                />
                   <TextField
                  label="Strength"
                  value={formData.strength}
                  onChange={(e) => setFormData({...formData, strength: e.target.value})}
                  fullWidth
                   required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px'
                    }
                  }}
                />
                 {selectedCategoryId === 2 && (
            <Select
              value={formData.subCategory}
              onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
              fullWidth
              label="Sub Category"
            >
              <MenuItem value="Coated">Coated</MenuItem>
              <MenuItem value="Non-Coated">Non-Coated</MenuItem>
            </Select>
          )}
                {/* ... Other form fields with similar styling */}
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ padding: '1rem' }}>
            <Button 
              onClick={handleDialogClose}
              sx={{ 
                color: '#64748b',
                '&:hover': {
                  backgroundColor: '#f1f5f9'
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained"
              onClick={handleSubmitForm}
              sx={{
                backgroundColor: dialogType === "delete" ? '#ef4444' : '#3498DB',
                '&:hover': {
                  backgroundColor: dialogType === "delete" ? '#dc2626' : '#2980B9'
                }
              }}
            >
              {dialogType === "delete" ? "Delete" : dialogType === "edit" ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};
  

export default CatAndProducts;

