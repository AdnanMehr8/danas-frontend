

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
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions
// } from "@mui/material";
// import { Delete } from "@mui/icons-material";
// import { Edit } from "@mui/icons-material";
// import { setBatchInfo } from "../store/batchInfoSlice";
// import { setBatchPInfo } from "../store/batchInfoPackingSlice ";


// const categories = [
//   { id: 1, name: "Injections" },
//   { id: 2, name: "Tablets", subCategories: ["Coated", "Non-Coated"] },
//   { id: 3, name: "Capsules" },
//   { id: 4, name: "Creams" },
//   { id: 5, name: "Gels" },
// ];

// const CategoryProductList = () => {
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
//   const [newProduct, setNewProduct] = useState({
//     description: "",
//     packSize: "",
//     subCategory: "Coated",
//   });
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);
//   const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
//   const [productToUpdate, setProductToUpdate] = useState(null);
  
//   const product = process.env.REACT_APP_INTERNAL_API_PATH;

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
  
//       response.data.forEach((item) => {
//         const categoryId = parseInt(item.categoryId);
  
//         if (categoryId === 2) {
//           // Store products with their parent document _id
//           item.productList.forEach((product) => {
//             const productWithParentId = {
//               ...product,
//               parentId: item._id  // Store the parent document's _id
//             };
            
//             if (product.subCategory === "Coated") {
//               categorized[2].Coated.push(productWithParentId);
//             } else if (product.subCategory === "Non-Coated") {
//               categorized[2]["Non-Coated"].push(productWithParentId);
//             }
//           });
//         } else if (categorized[categoryId]) {
//           // Add parent _id to each product in other categories
//           const productsWithParentId = item.productList.map(product => ({
//             ...product,
//             parentId: item._id
//           }));
//           categorized[categoryId] = [...categorized[categoryId], ...productsWithParentId];
//         }
//       });
  
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

// const handleDeleteClick = (event, product) => {
//   event.stopPropagation();
//   setProductToDelete({
//     parentId: product.parentId,  // This is the main document's _id
//     description: product.description,
//     subCategory: product.subCategory
//   });
//   setDeleteDialogOpen(true);
// };

// const handleDeleteConfirm = async () => {
//   if (!productToDelete) return;

//   try {
//     setLoading(true);
//     // Use the parent document's _id for deletion
//     await axios.delete(`${product}/api/products/${productToDelete.parentId}`);

//     setProducts(prevProducts => {
//       const newProducts = { ...prevProducts };
      
//       if (selectedCategoryId === 2) {
//         const subCategory = productToDelete.subCategory;
//         newProducts[2][subCategory] = newProducts[2][subCategory].filter(
//           p => p.parentId !== productToDelete.parentId
//         );
//       } else {
//         newProducts[selectedCategoryId] = newProducts[selectedCategoryId].filter(
//           p => p.parentId !== productToDelete.parentId
//         );
//       }
      
//       return newProducts;
//     });

//     setDeleteDialogOpen(false);
//     setProductToDelete(null);
//   } catch (err) {
//     console.error("Error deleting product:", err);
//     setError("Error deleting product: " + (err.response?.data?.message || err.message));
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleAddProduct = useCallback(async () => {
//     if (!newProduct.description || !newProduct.packSize) {
//       setError("Please fill in all fields");
//       return;
//     }
  
//     // Prevent adding while already loading
//     if (loading) return;
  
//     try {
//       setLoading(true);
      
//       const fullDescription = selectedCategoryId === 2
//         ? `${newProduct.description} ${newProduct.subCategory}`
//         : newProduct.description;
  
//       const productData = {
//         categoryId: selectedCategoryId.toString(),
//         productList: [{
//           description: fullDescription,
//           packSize: newProduct.packSize
//         }]
//       };
  
//       const response = await axios.post(`${product}/api/products`, productData);
  
//       setProducts(prevProducts => {
//         const newProducts = { ...prevProducts };
//         const newProductData = {
//           ...response.data.productList[0],
//           _id: response.data.productList[0]._id
//         };
      
//         if (selectedCategoryId === 2) {
//           const subCategory = newProduct.subCategory;
//           newProducts[2][subCategory] = [
//             ...(newProducts[2][subCategory] || []), // Ensure it’s an array before spreading
//             newProductData
//           ].sort((a, b) => a.description.localeCompare(b.description));
//         } else {
//           newProducts[selectedCategoryId] = [
//             ...(newProducts[selectedCategoryId] || []), // Ensure it’s an array before spreading
//             newProductData
//           ].sort((a, b) => a.description.localeCompare(b.description));
//         }
      
//         return newProducts;
//       });
      
//       setNewProduct({
//         description: "",
//         packSize: "",
//         subCategory: "Coated"
//       });
//       setError("");
//     } catch (err) {
//       console.error("Error adding product:", err);
//       setError("Error adding product: " + (err.response?.data?.message || err.message));
//     } finally {
//       setLoading(false);
//     }
//   }, [newProduct, selectedCategoryId, product, loading]);
  
//   // const handleProductClick = (productName, packsSize) => {
//   //   dispatch(setBatchInfo({ batch: { productName, packsSize } }));
//   //   dispatch(setBatchPInfo({ batch: { productName, packsSize } }));

//   //   if (productName.toLowerCase().includes("sulpeol")) {
//   //     navigate("/form-header-sulpeol");
//   //   } else if (productName.toLowerCase().includes("cream")) {
//   //     navigate("/form-header-cream");
//   //   } else if (productName.toLowerCase().includes("arex")){
//   //     navigate("/form-header");
//   //   }
//   // };
//   const handleProductClick = (productName, packsSize) => {
//     // Use only the product description without the subcategory
//     const productNameToDisplay = productName.split(' ')[0];  // Assumes the description is space-separated
    
//     dispatch(setBatchInfo({ batch: { productName: productNameToDisplay, packsSize } }));
//     dispatch(setBatchPInfo({ batch: { productName: productNameToDisplay, packsSize } }));
  
//     if (productNameToDisplay.toLowerCase().includes("sulpeol")) {
//       navigate("/form-header-sulpeol");
//     } else if (productNameToDisplay.toLowerCase().includes("cream")) {
//       navigate("/form-header-cream");
//     } else if (productNameToDisplay.toLowerCase().includes("arex")) {
//       navigate("/form-header");
//     }
//   };

//   const handleUpdateConfirm = async () => {
//     if (!productToUpdate) return;
  
//     try {
//       setLoading(true);
//       const response = await axios.put(
//         `${product}/api/products/${productToUpdate.parentId}`,
//         { description: productToUpdate.description, packSize: productToUpdate.packSize }
//       );
  
//       setProducts((prevProducts) => {
//         const updatedProducts = { ...prevProducts };
//         if (selectedCategoryId === 2) {
//           const subCategory = productToUpdate.subCategory;
//           updatedProducts[2][subCategory] = updatedProducts[2][subCategory].map((p) =>
//             p.parentId === productToUpdate.parentId ? response.data : p
//           );
//         } else {
//           updatedProducts[selectedCategoryId] = updatedProducts[selectedCategoryId].map((p) =>
//             p.parentId === productToUpdate.parentId ? response.data : p
//           );
//         }
//         return updatedProducts;
//       });
  
//       setUpdateDialogOpen(false);
//       setProductToUpdate(null);
//     } catch (err) {
//       console.error("Error updating product:", err);
//       setError("Error updating product: " + (err.response?.data?.message || err.message));
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handleEditClick = (event, product) => {
//     event.stopPropagation();
//     setProductToUpdate(product);
//     setUpdateDialogOpen(true);
//   };
  
  
//   if (loading && !Object.keys(products).length) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress size="3rem" />
//       </Box>
//     );
//   }

//   const ProductListItem = ({ product, showSubCategory }) => (
//     <li
//       style={{
//         cursor: "pointer",
//         padding: "8px",
//         margin: "4px 0",
//         borderRadius: "4px",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         backgroundColor: "#f5f5f5"
//       }}
//     >
//       <div
//         onClick={() => handleProductClick(product.description, product.packSize)}
//         style={{ flex: 1, padding: "4px" }}
//       >
//         {product.description}
//       </div>
//       <IconButton
//         size="small"
//         onClick={(e) => handleEditClick(e, product)}
//         sx={{ color: "primary.main" }}
//       >
//         <Edit />
//       </IconButton>
//       <IconButton
//         size="small"
//         onClick={(e) => handleDeleteClick(e, product)}
//         sx={{ color: "error.main" }}
//       >
//         <Delete />
//       </IconButton>
//     </li>
//   );
  

//   return (
//     <div style={{ display: "flex", padding: "20px" }}>
//       <div style={{ flex: "1", marginRight: "20px", borderRight: "1px solid #ccc" }}>
//         <Typography variant="h5" gutterBottom>Categories</Typography>
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {categories.map((category) => (
//             <li
//               key={category.id}
//               onClick={() => setSelectedCategoryId(category.id)}
//               style={{
//                 cursor: "pointer",
//                 padding: "10px",
//                 backgroundColor: selectedCategoryId === category.id ? "#f0f0f0" : "",
//                 margin: "5px 0",
//                 borderRadius: "4px",
//                 transition: "background-color 0.2s"
//               }}
//             >
//               {category.name}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div style={{ flex: "2" }}>
//         <Typography variant="h5" gutterBottom>Products</Typography>
//          {/* Show message if no category is selected */}
//   {!selectedCategoryId && (
//     <Typography variant="body1" color="textSecondary">
//       Please select a category to see the products.
//     </Typography>
//   )}
//         {selectedCategoryId && (
//           <Box sx={{ marginBottom: 3 }}>
//             <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
//               <TextField
//                 label="Product Name"
//                 value={newProduct.description}
//                 onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//                 size="small"
//               />
//               <TextField
//                 label="Pack Size"
//                 value={newProduct.packSize}
//                 onChange={(e) => setNewProduct({ ...newProduct, packSize: e.target.value })}
//                 size="small"
//               />
//               {selectedCategoryId === 2 && (
//                 <Select
//                   value={newProduct.subCategory}
//                   onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })}
//                   size="small"
//                 >
//                   <MenuItem value="Coated">Coated</MenuItem>
//                   <MenuItem value="Non-Coated">Non-Coated</MenuItem>
//                 </Select>
//               )}
//               <Button
//                 variant="contained"
//                 onClick={handleAddProduct}
//                 disabled={loading}
//               >
//                 {loading ? 'Adding...' : 'Add Product'}
//               </Button>
//             </Box>
//             {error && (
//               <Typography color="error" variant="body2">{error}</Typography>
//             )}
//           </Box>
//         )}
// {selectedCategoryId && (
//           <div>
//             {selectedCategoryId === 2 ? (
//               <>
//                 <Typography variant="h6">Coated Tablets</Typography>
//                 <ul style={{ listStyle: "none", padding: 0 }}>
//                   {products[2].Coated.map((product) => (
//                     <ProductListItem
//                       key={product._id}
//                       product={product}
//                       showSubCategory={true}
//                     />
//                   ))}
//                 </ul>

//                 <Typography variant="h6" sx={{ mt: 2 }}>Non-Coated Tablets</Typography>
//                 <ul style={{ listStyle: "none", padding: 0 }}>
//                   {products[2]["Non-Coated"].map((product) => (
//                     <ProductListItem
//                       key={product._id}
//                       product={product}
//                       showSubCategory={true}
//                     />
//                   ))}
//                 </ul>
//               </>
//             ) : (
//               <ul style={{ listStyle: "none", padding: 0 }}>
//                 {products[selectedCategoryId].map((product) => (
//                   <ProductListItem
//                     key={product._id}
//                     product={product}
//                     showSubCategory={false}
//                   />
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}

//         {/* Delete Confirmation Dialog */}
//         <Dialog
//           open={deleteDialogOpen}
//           onClose={() => setDeleteDialogOpen(false)}
//         >
//           <DialogTitle>Confirm Delete</DialogTitle>
//           <DialogContent>
//             Are you sure you want to delete {productToDelete?.description}?
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//             <Button
//               onClick={handleDeleteConfirm}
//               color="error"
//               variant="contained"
//               disabled={loading}
//             >
//               {loading ? 'Deleting...' : 'Delete'}
//             </Button>
//           </DialogActions>
//         </Dialog>
//         <Dialog
//   open={updateDialogOpen}
//   onClose={() => setUpdateDialogOpen(false)}
// >
//   <DialogTitle>Edit Product</DialogTitle>
//   <DialogContent>
//     <TextField
//       label="Product Description"
//       value={productToUpdate?.description || ""}
//       onChange={(e) => setProductToUpdate({ ...productToUpdate, description: e.target.value })}
//       fullWidth
//       margin="dense"
//     />
//     <TextField
//       label="Pack Size"
//       value={productToUpdate?.packSize || ""}
//       onChange={(e) => setProductToUpdate({ ...productToUpdate, packSize: e.target.value })}
//       fullWidth
//       margin="dense"
//     />
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={() => setUpdateDialogOpen(false)}>Cancel</Button>
//     <Button
//       onClick={handleUpdateConfirm}
//       color="primary"
//       variant="contained"
//       disabled={loading}
//     >
//       {loading ? 'Updating...' : 'Update'}
//     </Button>
//   </DialogActions>
// </Dialog>

//       </div>
//     </div>
//   );
// };

// export default CategoryProductList;

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

const CategoryProductList = () => {
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
    <div className="flex p-5 category-product-list">
      {/* Categories Section */}
      <div className="w-1/4 pr-5 border-r category-container">
        <Typography variant="h5" className="mb-4">Categories</Typography>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`p-3 rounded cursor-pointer transition-colors 
                ${selectedCategoryId === category.id ? "selected-category" : ""}`}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Products Section */}
      <div className="w-3/4 pl-5 product-container">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5">Products</Typography>
          <Button
            variant="contained"
            startIcon={<PlusIcon />}
            onClick={handleAdd}
            className="bg-blue-600"
          >
            Add Product
          </Button>
        </div>

        {loading ? (
          <Box className="flex justify-center items-center h-64">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : !selectedCategoryId ? (
          <Typography>Please select a category</Typography>
        ) : selectedCategoryId === 2 ? (
          <>
            <Typography variant="h6" className="mb-2">Coated Tablets</Typography>
            {renderProductTable(products[2]?.Coated || [])}
            <Typography variant="h6" className="mt-6 mb-2">Non-Coated Tablets</Typography>
            {renderProductTable(products[2]?.["Non-Coated"] || [])}
          </>
        ) : (
          renderProductTable(products[selectedCategoryId] || [])
        )}
        {renderDialog()}
      </div>
    </div>
  );
};

export default CategoryProductList;

