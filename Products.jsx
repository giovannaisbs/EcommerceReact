import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard"; // Supondo que você tenha um componente ProductCard para exibir os produtos

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          params: {
            search: searchTerm,
            category: category,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
          },
        });
        setProducts(response.data);
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, category, priceRange]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceRange([e.target.value[0], e.target.value[1]]);
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="products-page">
      <h1>Products</h1>

      {/* Filtros de pesquisa */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search for products"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select onChange={handleCategoryChange} value={category}>
          <option value="">All Categories</option>
          <option value="shoes">Shoes</option>
          <option value="accessories">Accessories</option>
          {/* Adicione outras categorias conforme necessário */}
        </select>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange}
          onChange={handlePriceChange}
          step="10"
        />
      </div>

      {/* Lista de produtos */}
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
