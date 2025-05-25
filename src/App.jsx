import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import './css/style.css';

function App() {

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('productos');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(products));
  }, [products]);

  const addProduct = useCallback((product) => {
    setProducts(prev => [...prev, product]);
  }, []);

  const editProduct = useCallback((updatedProduct) => {
    setProducts(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    setEditingProduct(null);
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const term = searchTerm.toLowerCase().trim();
    return products.filter(p => p.descripcion?.toLowerCase().includes(term) || p.id.toString() === term);
  }, [products, searchTerm]);

  return (
    <>
      <div className="container-main">
        <h1>Gestor de Productos</h1>
        <div className="div-search">
          <h2>Búsqueda de Productos</h2>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <ProductForm
          addProduct={addProduct}
          editProduct={editProduct}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          products={products}
        />
      </div>
      <div className="container-list">
        <ProductList
          products={filteredProducts}
          setEditingProduct={setEditingProduct}
          deleteProduct={deleteProduct}
        />
      </div>
    </>
  )
}

export default App;

