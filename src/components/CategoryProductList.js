

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
//   const handleProductClick = (productName, packsSize, subCategory) => {
//     // Use only the product description without the subcategory
//     const productNameToDisplay = productName.split(' ')[0];  // Assumes the description is space-separated
//     dispatch(setBatchInfo({ batch: { productName: productNameToDisplay, packsSize, subCategory  } }));
//     dispatch(setBatchPInfo({ batch: { productName: productNameToDisplay, packsSize, subCategory  } }));
  
//     // Use subcategory for navigation
//     if (subCategory === "Coated") {
//       navigate("/form-header");
//     } else if (subCategory === "Non-Coated") {
//       navigate("/form-header-sulpeol");
//     } else if (productName.toLowerCase().includes("cream")) {
//       navigate("/form-header-cream");
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
//         onClick={() => handleProductClick(product.description, product.packSize, product.subCategory)}
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
  Typography
} from "@mui/material";
import { setBatchInfo } from "../store/batchInfoSlice";
import { setBatchPInfo } from "../store/batchInfoPackingSlice ";

const categories = [
  { id: 1, name: "Injections" },
  { id: 2, name: "Tablets", subCategories: ["Coated", "Non-Coated"] },
  { id: 3, name: "Capsules" },
  { id: 4, name: "Creams" },
  { id: 5, name: "Gels" },
];

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
  
  const product = process.env.REACT_APP_INTERNAL_API_PATH;

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
  
      response.data.forEach((item) => {
        const categoryId = parseInt(item.categoryId);
  
        if (categoryId === 2) {
          item.productList.forEach((product) => {
            const productWithParentId = {
              ...product,
              parentId: item._id
            };
            
            if (product.subCategory === "Coated") {
              categorized[2].Coated.push(productWithParentId);
            } else if (product.subCategory === "Non-Coated") {
              categorized[2]["Non-Coated"].push(productWithParentId);
            }
          });
        } else if (categorized[categoryId]) {
          const productsWithParentId = item.productList.map(product => ({
            ...product,
            parentId: item._id
          }));
          categorized[categoryId] = [...categorized[categoryId], ...productsWithParentId];
        }
      });
  
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

  const handleProductClick = (productName, packsSize, subCategory) => {
    const productNameToDisplay = productName.split(' ')[0];
    dispatch(setBatchInfo({ batch: { productName: productNameToDisplay, packsSize, subCategory  } }));
    dispatch(setBatchPInfo({ batch: { productName: productNameToDisplay, packsSize, subCategory  } }));
  
    if (subCategory === "Coated") {
      navigate("/form-header");
    } else if (subCategory === "Non-Coated") {
      navigate("/form-header-sulpeol");
    } else if (productName.toLowerCase().includes("cream")) {
      navigate("/form-header-cream");
    }
  };

  const ProductListItem = ({ product }) => (
    <li
      onClick={() => handleProductClick(product.description, product.packSize, product.subCategory)}
      style={{
        cursor: "pointer",
        padding: "8px",
        margin: "4px 0",
        borderRadius: "4px",
        backgroundColor: "#f5f5f5"
      }}
    >
      {product.description}
    </li>
  );

  if (loading && !Object.keys(products).length) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size="3rem" />
      </Box>
    );
  }

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <div style={{ flex: "1", marginRight: "20px", borderRight: "1px solid #ccc" }}>
        <Typography variant="h5" gutterBottom>Categories</Typography>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              style={{
                cursor: "pointer",
                padding: "10px",
                backgroundColor: selectedCategoryId === category.id ? "#f0f0f0" : "",
                margin: "5px 0",
                borderRadius: "4px",
                transition: "background-color 0.2s"
              }}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flex: "2" }}>
        <Typography variant="h5" gutterBottom>Products</Typography>
        {!selectedCategoryId && (
          <Typography variant="body1" color="textSecondary">
            Please select a category to see the products.
          </Typography>
        )}
        
        {selectedCategoryId && (
          <div>
            {selectedCategoryId === 2 ? (
              <>
                <Typography variant="h6">Coated Tablets</Typography>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {products[2].Coated.map((product) => (
                    <ProductListItem
                      key={product._id}
                      product={product}
                    />
                  ))}
                </ul>

                <Typography variant="h6" sx={{ mt: 2 }}>Non-Coated Tablets</Typography>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {products[2]["Non-Coated"].map((product) => (
                    <ProductListItem
                      key={product._id}
                      product={product}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {products[selectedCategoryId].map((product) => (
                  <ProductListItem
                    key={product._id}
                    product={product}
                  />
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProductList;