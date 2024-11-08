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
  const [newProduct, setNewProduct] = useState({
    description: "",
    packSize: "",
    subCategory: "Coated",
  });

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
          // For Tablets (ID: 2), use subCategory to sort into Coated and Non-Coated
          item.productList.forEach((product) => {
            if (product.subCategory === "Coated") {
              categorized[2].Coated.push(product);
            } else if (product.subCategory === "Non-Coated") {
              categorized[2]["Non-Coated"].push(product);
            }
          });
        } else if (categorized[categoryId]) {
          // For other categories, add directly to the category
          categorized[categoryId] = [...categorized[categoryId], ...item.productList];
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
  
  const handleProductClick = (productName, packsSize) => {
    dispatch(setBatchInfo({ batch: { productName, packsSize } }));
    dispatch(setBatchPInfo({ batch: { productName, packsSize } }));

    if (productName.toLowerCase().includes("sulpeol")) {
      navigate("/form-header-sulpeol");
    } else if (productName.toLowerCase().includes("cream")) {
      navigate("/form-header-cream");
    } else if (productName.toLowerCase().includes("arex")){
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
                    <li
                      key={product._id}
                      onClick={() => handleProductClick(product.description, product.packSize)}
                      style={{ cursor: "pointer", padding: "8px", margin: "4px 0", borderRadius: "4px" }}
                    >
                      {product.description}
                    </li>
                  ))}
                </ul>

                <Typography variant="h6" sx={{ mt: 2 }}>Non-Coated Tablets</Typography>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {products[2]["Non-Coated"].map((product) => (
                    <li
                      key={product._id}
                      onClick={() => handleProductClick(product.description, product.packSize)}
                      style={{ cursor: "pointer", padding: "8px", margin: "4px 0", borderRadius: "4px" }}
                    >
                      {product.description}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {products[selectedCategoryId].map((product) => (
                  <li
                    key={product._id}
                    onClick={() => handleProductClick(product.description, product.packSize)}
                    style={{ cursor: "pointer", padding: "8px", margin: "4px 0", borderRadius: "4px" }}
                  >
                    {product.description}
                  </li>
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
