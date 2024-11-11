// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setBatchInfo } from "../store/batchInfoSlice";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Box, CircularProgress } from "@mui/material";
// import { api } from "../api/api";
// import { setBatchPInfo } from "../store/batchInfoPackingSlice ";

// const categories = [
//   { id: 1, name: "Injections" },
//   { id: 2, name: "Tablets" },
//   { id: 3, name: "Capsules" },
//   { id: 4, name: "Creams" },
// ];

// const CategoryProductList = () => {
//   const dispatch = useDispatch();
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [products, setProducts] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const product = process.env.REACT_APP_INTERNAL_API_PATH;
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`${product}/api/products`);
//         const categorizedProducts = categorizeProducts(response.data);
//         setProducts(categorizedProducts);
//       } catch (err) {
//         setError("Error fetching products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const categorizeProducts = (data) => {
//     const categorized = {
//       1: [], // Injections
//       2: [], // Tablets
//       3: [], // Capsules
//       4: [], // Creams
//     };

//     data.forEach((product) => {
//       product.productList.forEach((item) => {
//         const description = item.description.toLowerCase();
//         if (
//           description.includes("inj") ||
//           description.includes("injection") ||
//           description.includes("injections")
//         ) {
//           categorized[1].push(item);
//         } else if (
//           description.includes("tab") ||
//           description.includes("tablet") ||
//           description.includes("tablets")
//         ) {
//           categorized[2].push(item);
//         } else if (
//           description.includes("cap") ||
//           description.includes("capsule") ||
//           description.includes("capsules")
//         ) {
//           categorized[3].push(item);
//         } else if (
//           description.includes("lotion") ||
//           description.includes("gel") ||
//           description.includes("cream")
//         ) {
//           categorized[4].push(item);
//         }
//       });
//     });

//     // Sort products in each category alphabetically by description
//     Object.keys(categorized).forEach((categoryId) => {
//       categorized[categoryId].sort((a, b) =>
//         a.description.localeCompare(b.description)
//       );
//     });

//     return categorized;
//   };

//   const handleCategoryClick = (id) => {
//     setSelectedCategoryId(id);
//   };

//   // const handleProductClick = (productName, packsSize) => {
//   //   dispatch(
//   //     setBatchInfo({
//   //       batch: {
//   //         productName,
//   //         packsSize,
//   //       },
//   //     })
//   //   );
//   //   navigate("/form-header");
//   // };
//   const handleProductClick = (productName, packsSize) => {
//     dispatch(
//       setBatchInfo({
//         batch: {
//           productName,
//           packsSize,
//         },
//       })
//     );

//     dispatch(
//       setBatchPInfo({
//         batch: {
//           productName,
//           packsSize,
//         },
//       })
//     );
  
//     // Check if the product name includes "Sulpeol" and navigate accordingly
//     if (productName.toLowerCase().includes("sulpeol")) {
//       navigate("/form-header-sulpeol");
//     }
//     else if (productName.toLowerCase().includes("cream")){
//       navigate("/form-header-cream");
//     }
//     else {
//       navigate("/form-header");
//     }
//   };
  

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh", // Full viewport height to center vertically
//         }}
//       >
//         <CircularProgress size="3rem" />
//       </Box>
//     );
//   }

//   if (error) return <p>{error}</p>;

//   return (
//     <div style={{ display: "flex", padding: "20px" }}>
//       <div
//         style={{
//           flex: "1",
//           marginRight: "20px",
//           borderRight: "1px solid #ccc",
//         }}
//       >
//         <h2>Categories</h2>
//         <ul>
//           {categories.map((category) => (
//             <li
//               key={category.id}
//               onClick={() => handleCategoryClick(category.id)}
//               style={{
//                 cursor: "pointer",
//                 padding: "5px",
//                 backgroundColor:
//                   selectedCategoryId === category.id ? "#f0f0f0" : "",
//               }}
//             >
//               {category.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div style={{ flex: "2" }}>
//         <h2>Products</h2>
//         {selectedCategoryId ? (
//           <ul>
//             {products[selectedCategoryId].map((product) => (
//               <li
//                 key={product._id}
//                 onClick={() =>
//                   handleProductClick(product.description, product.packSize)
//                 }
//                 style={{ cursor: "pointer", padding: "5px" }}
//               >
//                 {product.description}
//                 {/* {product.packSize} */}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>Please select a category to see the products.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryProductList;


// import React, { useEffect, useState } from "react";
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
//   Typography
// } from "@mui/material";
// import { setBatchInfo } from "../store/batchInfoSlice";
// import { setBatchPInfo } from "../store/batchInfoPackingSlice ";

// const categories = [
//   { id: 1, name: "Injections" },
//   { id: 2, name: "Tablets", subCategories: ["Coated", "Non-Coated"] },
//   { id: 3, name: "Capsules" },
//   { id: 4, name: "Creams" },
// ];

// const CategoryProductList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [products, setProducts] = useState({
//     1: [],
//     2: { Coated: [], "Non-Coated": [] },
//     3: [],
//     4: []
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [newProduct, setNewProduct] = useState({
//     description: "",
//     packSize: "",
//     subCategory: "Coated",
//   });

//   const product = process.env.REACT_APP_INTERNAL_API_PATH;

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${product}/api/products`);
//       console.log("Fetched data:", response.data);
      
//       // Initialize categorized products structure
//       const categorized = {
//         1: [],
//         2: { Coated: [], "Non-Coated": [] },
//         3: [],
//         4: []
//       };

//       // Categorize products based on categoryId
//       response.data.forEach(item => {
//         if (item.productList && Array.isArray(item.productList)) {
//           item.productList.forEach(product => {
//             const categoryId = parseInt(item.categoryId);
            
//             if (categoryId === 2) {
//               // For tablets, check if it's coated or non-coated
//               if (product.description.toLowerCase().includes("coated")) {
//                 categorized[2].Coated.push(product);
//               } else {
//                 categorized[2]["Non-Coated"].push(product);
//               }
//             } else if (categorized[categoryId]) {
//               // For other categories
//               categorized[categoryId].push(product);
//             }
//           });
//         }
//       });

//       // Sort all categories
//       categorized[1].sort((a, b) => a.description.localeCompare(b.description));
//       categorized[2].Coated.sort((a, b) => a.description.localeCompare(b.description));
//       categorized[2]["Non-Coated"].sort((a, b) => a.description.localeCompare(b.description));
//       categorized[3].sort((a, b) => a.description.localeCompare(b.description));
//       categorized[4].sort((a, b) => a.description.localeCompare(b.description));

//       console.log("Categorized products:", categorized);
//       setProducts(categorized);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setError("Error fetching products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // const handleAddProduct = async () => {
//   //   if (!newProduct.description || !newProduct.packSize) {
//   //     setError("Please fill in all fields");
//   //     return;
//   //   }

//   //   try {
//   //     setLoading(true);
      
//   //     // Create the product description
//   //     const fullDescription = selectedCategoryId === 2
//   //       ? `${newProduct.description} ${newProduct.subCategory}`
//   //       : newProduct.description;

//   //     // Prepare the product data
//   //     const productData = {
//   //       categoryId: selectedCategoryId.toString(),
//   //       productList: [{
//   //         description: fullDescription,
//   //         packSize: newProduct.packSize
//   //       }]
//   //     };

//   //     console.log("Sending product data:", productData);

//   //     // Send POST request
//   //     const response = await axios.post(`${product}/api/products`, productData);
//   //     console.log("Server response:", response.data);

//   //     // Update local state
//   //     setProducts(prevProducts => {
//   //       const newProducts = { ...prevProducts };
//   //       const newProductData = {
//   //         ...response.data.productList[0],
//   //         _id: response.data.productList[0]._id
//   //       };

//   //       if (selectedCategoryId === 2) {
//   //         // For tablets
//   //         const subCategory = newProduct.subCategory;
//   //         newProducts[2][subCategory] = [
//   //           ...newProducts[2][subCategory],
//   //           newProductData
//   //         ].sort((a, b) => a.description.localeCompare(b.description));
//   //       } else {
//   //         // For other categories
//   //         newProducts[selectedCategoryId] = [
//   //           ...newProducts[selectedCategoryId],
//   //           newProductData
//   //         ].sort((a, b) => a.description.localeCompare(b.description));
//   //       }
        
//   //       return newProducts;
//   //     });

//   //     // Reset form
//   //     setNewProduct({
//   //       description: "",
//   //       packSize: "",
//   //       subCategory: "Coated"
//   //     });
//   //     setError("");
//   //   } catch (err) {
//   //     console.error("Error adding product:", err);
//   //     setError("Error adding product: " + (err.response?.data?.message || err.message));
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const handleAddProduct = async () => {
//     if (!newProduct.description || !newProduct.packSize) {
//       setError("Please fill in all fields");
//       return;
//     }
  
//     // Prevent adding while already loading
//     if (loading) return;
  
//     try {
//       setLoading(true);
  
//       // Create the product description
//       const fullDescription = selectedCategoryId === 2
//         ? `${newProduct.description} ${newProduct.subCategory}`
//         : newProduct.description;
  
//       // Prepare the product data
//       const productData = {
//         categoryId: selectedCategoryId.toString(),
//         productList: [{
//           description: fullDescription,
//           packSize: newProduct.packSize
//         }]
//       };
  
//       console.log("Sending product data:", productData);
  
//       // Send POST request
//       const response = await axios.post(`${product}/api/products`, productData);
//       console.log("Server response:", response.data);
  
//       // Update local state
//       setProducts(prevProducts => {
//         const newProducts = { ...prevProducts };
//         const newProductData = {
//           ...response.data.productList[0],
//           _id: response.data.productList[0]._id
//         };
  
//         if (selectedCategoryId === 2) {
//           // For tablets
//           const subCategory = newProduct.subCategory;
//           newProducts[2][subCategory] = [
//             ...newProducts[2][subCategory],
//             newProductData
//           ].sort((a, b) => a.description.localeCompare(b.description));
//         } else {
//           // For other categories
//           newProducts[selectedCategoryId] = [
//             ...newProducts[selectedCategoryId],
//             newProductData
//           ].sort((a, b) => a.description.localeCompare(b.description));
//         }
        
//         return newProducts;
//       });
  
//       // Reset form
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
//   };
  
//   const handleProductClick = (productName, packsSize) => {
//     dispatch(setBatchInfo({
//       batch: {
//         productName,
//         packsSize,
//       },
//     }));

//     dispatch(setBatchPInfo({
//       batch: {
//         productName,
//         packsSize,
//       },
//     }));

//     if (productName.toLowerCase().includes("sulpeol")) {
//       navigate("/form-header-sulpeol");
//     } else if (productName.toLowerCase().includes("cream")) {
//       navigate("/form-header-cream");
//     } else {
//       navigate("/form-header");
//     }
//   };

//   if (loading && !Object.keys(products).length) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress size="3rem" />
//       </Box>
//     );
//   }

//   return (
//     <div style={{ display: "flex", padding: "20px" }}>
//       {/* Categories Section */}
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

//       {/* Products Section */}
//       <div style={{ flex: "2" }}>
//         <Typography variant="h5" gutterBottom>Products</Typography>

//         {/* Add Product Form */}
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

//         {/* Products List */}
//         {selectedCategoryId && (
//           <div>
//             {selectedCategoryId === 2 ? (
//               // Tablets with sub-categories
//               <>
//                 <Typography variant="h6">Coated Tablets</Typography>
//                 <ul style={{ listStyle: "none", padding: 0 }}>
//                   {products[2].Coated.map((product) => (
//                     <li
//                       key={product._id}
//                       onClick={() => handleProductClick(product.description, product.packSize)}
//                       style={{
//                         cursor: "pointer",
//                         padding: "8px",
//                         margin: "4px 0",
//                         borderRadius: "4px",
//                         '&:hover': {
//                           backgroundColor: "#f5f5f5"
//                         }
//                       }}
//                     >
//                       {product.description}
//                     </li>
//                   ))}
//                 </ul>

//                 <Typography variant="h6" sx={{ mt: 2 }}>Non-Coated Tablets</Typography>
//                 <ul style={{ listStyle: "none", padding: 0 }}>
//                   {products[2]["Non-Coated"].map((product) => (
//                     <li
//                       key={product._id}
//                       onClick={() => handleProductClick(product.description, product.packSize)}
//                       style={{
//                         cursor: "pointer",
//                         padding: "8px",
//                         margin: "4px 0",
//                         borderRadius: "4px",
//                         '&:hover': {
//                           backgroundColor: "#f5f5f5"
//                         }
//                       }}
//                     >
//                       {product.description}
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             ) : (
//               // Other categories
//               <ul style={{ listStyle: "none", padding: 0 }}>
//                 {products[selectedCategoryId].map((product) => (
//                   <li
//                     key={product._id}
//                     onClick={() => handleProductClick(product.description, product.packSize)}
//                     style={{
//                       cursor: "pointer",
//                       padding: "8px",
//                       margin: "4px 0",
//                       borderRadius: "4px",
//                       '&:hover': {
//                         backgroundColor: "#f5f5f5"
//                       }
//                     }}
//                   >
//                     {product.description}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { Delete } from "@mui/icons-material";
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
  const [newProduct, setNewProduct] = useState({
    description: "",
    packSize: "",
    subCategory: "Coated",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

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
          // Store products with their parent document _id
          item.productList.forEach((product) => {
            const productWithParentId = {
              ...product,
              parentId: item._id  // Store the parent document's _id
            };
            
            if (product.subCategory === "Coated") {
              categorized[2].Coated.push(productWithParentId);
            } else if (product.subCategory === "Non-Coated") {
              categorized[2]["Non-Coated"].push(productWithParentId);
            }
          });
        } else if (categorized[categoryId]) {
          // Add parent _id to each product in other categories
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

const handleDeleteClick = (event, product) => {
  event.stopPropagation();
  setProductToDelete({
    parentId: product.parentId,  // This is the main document's _id
    description: product.description,
    subCategory: product.subCategory
  });
  setDeleteDialogOpen(true);
};

const handleDeleteConfirm = async () => {
  if (!productToDelete) return;

  try {
    setLoading(true);
    // Use the parent document's _id for deletion
    await axios.delete(`${product}/api/products/${productToDelete.parentId}`);

    setProducts(prevProducts => {
      const newProducts = { ...prevProducts };
      
      if (selectedCategoryId === 2) {
        const subCategory = productToDelete.subCategory;
        newProducts[2][subCategory] = newProducts[2][subCategory].filter(
          p => p.parentId !== productToDelete.parentId
        );
      } else {
        newProducts[selectedCategoryId] = newProducts[selectedCategoryId].filter(
          p => p.parentId !== productToDelete.parentId
        );
      }
      
      return newProducts;
    });

    setDeleteDialogOpen(false);
    setProductToDelete(null);
  } catch (err) {
    console.error("Error deleting product:", err);
    setError("Error deleting product: " + (err.response?.data?.message || err.message));
  } finally {
    setLoading(false);
  }
};

  const handleAddProduct = useCallback(async () => {
    if (!newProduct.description || !newProduct.packSize) {
      setError("Please fill in all fields");
      return;
    }
  
    // Prevent adding while already loading
    if (loading) return;
  
    try {
      setLoading(true);
      
      const fullDescription = selectedCategoryId === 2 
        ? `${newProduct.description} ${newProduct.subCategory}`
        : newProduct.description;
  
      const productData = {
        categoryId: selectedCategoryId.toString(),
        productList: [{
          description: fullDescription,
          packSize: newProduct.packSize
        }]
      };
  
      const response = await axios.post(`${product}/api/products`, productData);
  
      setProducts(prevProducts => {
        const newProducts = { ...prevProducts };
        const newProductData = {
          ...response.data.productList[0],
          _id: response.data.productList[0]._id
        };
      
        if (selectedCategoryId === 2) {
          const subCategory = newProduct.subCategory;
          newProducts[2][subCategory] = [
            ...(newProducts[2][subCategory] || []), // Ensure it’s an array before spreading
            newProductData
          ].sort((a, b) => a.description.localeCompare(b.description));
        } else {
          newProducts[selectedCategoryId] = [
            ...(newProducts[selectedCategoryId] || []), // Ensure it’s an array before spreading
            newProductData
          ].sort((a, b) => a.description.localeCompare(b.description));
        }
      
        return newProducts;
      });
      
      setNewProduct({
        description: "",
        packSize: "",
        subCategory: "Coated"
      });
      setError("");
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Error adding product: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }, [newProduct, selectedCategoryId, product, loading]);
  
  // const handleProductClick = (productName, packsSize) => {
  //   dispatch(setBatchInfo({ batch: { productName, packsSize } }));
  //   dispatch(setBatchPInfo({ batch: { productName, packsSize } }));

  //   if (productName.toLowerCase().includes("sulpeol")) {
  //     navigate("/form-header-sulpeol");
  //   } else if (productName.toLowerCase().includes("cream")) {
  //     navigate("/form-header-cream");
  //   } else if (productName.toLowerCase().includes("arex")){
  //     navigate("/form-header");
  //   }
  // };
  const handleProductClick = (productName, packsSize) => {
    // Use only the product description without the subcategory
    const productNameToDisplay = productName.split(' ')[0];  // Assumes the description is space-separated
    
    dispatch(setBatchInfo({ batch: { productName: productNameToDisplay, packsSize } }));
    dispatch(setBatchPInfo({ batch: { productName: productNameToDisplay, packsSize } }));
  
    if (productNameToDisplay.toLowerCase().includes("sulpeol")) {
      navigate("/form-header-sulpeol");
    } else if (productNameToDisplay.toLowerCase().includes("cream")) {
      navigate("/form-header-cream");
    } else if (productNameToDisplay.toLowerCase().includes("arex")) {
      navigate("/form-header");
    }
  };
  
  if (loading && !Object.keys(products).length) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size="3rem" />
      </Box>
    );
  }

  const ProductListItem = ({ product, showSubCategory }) => (
    <li
      style={{ 
        cursor: "pointer", 
        padding: "8px", 
        margin: "4px 0", 
        borderRadius: "4px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f5f5f5"
      }}
    >
      <div 
        onClick={() => handleProductClick(product.description, product.packSize)}
        style={{ flex: 1, padding: "4px" }}
      >
        {product.description}
      </div>
      <IconButton
        size="small"
        onClick={(e) => handleDeleteClick(e, product)}
        sx={{ color: "error.main" }}
      >
        <Delete />
      </IconButton>
    </li>
  );

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
         {/* Show message if no category is selected */}
  {!selectedCategoryId && (
    <Typography variant="body1" color="textSecondary">
      Please select a category to see the products.
    </Typography>
  )}
        {selectedCategoryId && (
          <Box sx={{ marginBottom: 3 }}>
            <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
              <TextField
                label="Product Name"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                size="small"
              />
              <TextField
                label="Pack Size"
                value={newProduct.packSize}
                onChange={(e) => setNewProduct({ ...newProduct, packSize: e.target.value })}
                size="small"
              />
              {selectedCategoryId === 2 && (
                <Select
                  value={newProduct.subCategory}
                  onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })}
                  size="small"
                >
                  <MenuItem value="Coated">Coated</MenuItem>
                  <MenuItem value="Non-Coated">Non-Coated</MenuItem>
                </Select>
              )}
              <Button 
                variant="contained" 
                onClick={handleAddProduct}
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Product'}
              </Button>
            </Box>
            {error && (
              <Typography color="error" variant="body2">{error}</Typography>
            )}
          </Box>
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
                      showSubCategory={true}
                    />
                  ))}
                </ul>

                <Typography variant="h6" sx={{ mt: 2 }}>Non-Coated Tablets</Typography>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {products[2]["Non-Coated"].map((product) => (
                    <ProductListItem 
                      key={product._id} 
                      product={product} 
                      showSubCategory={true}
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
                    showSubCategory={false}
                  />
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete {productToDelete?.description}?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleDeleteConfirm} 
              color="error" 
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default CategoryProductList;
