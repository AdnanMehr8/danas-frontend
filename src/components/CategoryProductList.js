import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBatchInfo } from "../store/batchInfoSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import { api } from "../api/api";
import { setBatchPInfo } from "../store/batchInfoPackingSlice ";

const categories = [
  { id: 1, name: "Injections" },
  { id: 2, name: "Tablets" },
  { id: 3, name: "Capsules" },
  { id: 4, name: "Creams" },
];

const CategoryProductList = () => {
  const dispatch = useDispatch();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const product = process.env.REACT_APP_INTERNAL_API_PATH;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${product}/api/products`);
        const categorizedProducts = categorizeProducts(response.data);
        setProducts(categorizedProducts);
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categorizeProducts = (data) => {
    const categorized = {
      1: [], // Injections
      2: [], // Tablets
      3: [], // Capsules
      4: [], // Creams
    };

    data.forEach((product) => {
      product.productList.forEach((item) => {
        const description = item.description.toLowerCase();
        if (
          description.includes("inj") ||
          description.includes("injection") ||
          description.includes("injections")
        ) {
          categorized[1].push(item);
        } else if (
          description.includes("tab") ||
          description.includes("tablet") ||
          description.includes("tablets")
        ) {
          categorized[2].push(item);
        } else if (
          description.includes("cap") ||
          description.includes("capsule") ||
          description.includes("capsules")
        ) {
          categorized[3].push(item);
        } else if (
          description.includes("lotion") ||
          description.includes("gel") ||
          description.includes("cream")
        ) {
          categorized[4].push(item);
        }
      });
    });

    // Sort products in each category alphabetically by description
    Object.keys(categorized).forEach((categoryId) => {
      categorized[categoryId].sort((a, b) =>
        a.description.localeCompare(b.description)
      );
    });

    return categorized;
  };

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
  };

  // const handleProductClick = (productName, packsSize) => {
  //   dispatch(
  //     setBatchInfo({
  //       batch: {
  //         productName,
  //         packsSize,
  //       },
  //     })
  //   );
  //   navigate("/form-header");
  // };
  const handleProductClick = (productName, packsSize) => {
    dispatch(
      setBatchInfo({
        batch: {
          productName,
          packsSize,
        },
      })
    );

    dispatch(
      setBatchPInfo({
        batch: {
          productName,
          packsSize,
        },
      })
    );
  
    // Check if the product name includes "Sulpeol" and navigate accordingly
    if (productName.toLowerCase().includes("sulpeol")) {
      navigate("/form-header-sulpeol");
    }
    else if (productName.toLowerCase().includes("cream")){
      navigate("/form-header-cream");
    }
    else {
      navigate("/form-header");
    }
  };
  

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height to center vertically
        }}
      >
        <CircularProgress size="3rem" />
      </Box>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <div
        style={{
          flex: "1",
          marginRight: "20px",
          borderRight: "1px solid #ccc",
        }}
      >
        <h2>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              style={{
                cursor: "pointer",
                padding: "5px",
                backgroundColor:
                  selectedCategoryId === category.id ? "#f0f0f0" : "",
              }}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: "2" }}>
        <h2>Products</h2>
        {selectedCategoryId ? (
          <ul>
            {products[selectedCategoryId].map((product) => (
              <li
                key={product._id}
                onClick={() =>
                  handleProductClick(product.description, product.packSize)
                }
                style={{ cursor: "pointer", padding: "5px" }}
              >
                {product.description}
                {/* {product.packSize} */}
              </li>
            ))}
          </ul>
        ) : (
          <p>Please select a category to see the products.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProductList;
