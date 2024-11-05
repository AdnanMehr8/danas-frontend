import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categorizedProducts, setCategorizedProducts] = useState({
    Tablets: [],
    Injections: [],
    Capsules: [],
    Creams: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products"); // Adjust the URL as necessary
        setProducts(response.data);
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length) {
      categorizeProducts(products);
    }
  }, [products]);

  const categorizeProducts = (products) => {
    const categories = {
      Tablets: [],
      Injections: [],
      Capsules: [],
      Creams: [],
    };

    products.forEach((product) => {
      product.productList.forEach((item) => {
        const description = item.description.toLowerCase();

        if (description.includes("tab") || description.includes("tablet")) {
          categories.Tablets.push(item);
        } else if (
          description.includes("inj") ||
          description.includes("injection")
        ) {
          categories.Injections.push(item);
        } else if (
          description.includes("cap") ||
          description.includes("capsule")
        ) {
          categories.Capsules.push(item);
        } else if (
          description.includes("lotion") ||
          description.includes("gel") ||
          description.includes("cream")
        ) {
          categories.Creams.push(item);
        }
      });
    });

    setCategorizedProducts(categories);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Product List</h1>
      {Object.entries(categorizedProducts).map(
        ([category, items]) =>
          items.length > 0 && (
            <div key={category}>
              <h2>{category}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Category Description</th>
                    <th>Description</th>
                    <th>UOM</th>
                    <th>Pack Size</th>
                    <th>Rate</th>
                    <th>Retail Price</th>
                    <th>Strength</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td>{item.categoryDesc}</td>
                      <td>{item.description}</td>
                      <td>{item.uom}</td>
                      <td>{item.packSize}</td>
                      <td>{item.rate}</td>
                      <td>{item.retailPrice}</td>
                      <td>{item.strength}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
      )}
    </div>
  );
};

export default ProductList;
