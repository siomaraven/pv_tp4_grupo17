import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import './css/style.css';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    console.log('Productos actualizados:', products);
  }, [products]);

  const addProduct = useCallback((product) => {
    setProducts(prev => [...prev, product]);
  }, []);

  const editProduct = useCallback((updatedProduct) => {
    setProducts(prev =>
      prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null);
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const filteredProducts = useMemo(() => {
  if (!searchTerm) return products;
  return products.filter(
    p =>
      p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toString() === searchTerm.trim()
  );
}, [products, searchTerm]);

  return (
    <>
      {/* Barra fija arriba */}
      <div className="header-search">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Contenido principal */}
      <div className="main-content" style={{ padding: '20px', maxWidth: '600px', margin: 'auto', paddingTop: '100px' }}>
        <h1>Gestor de Productos</h1>
        <ProductForm
          addProduct={addProduct}
          editProduct={editProduct}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
        />
        <ProductList
          products={filteredProducts}
          setEditingProduct={setEditingProduct}
          deleteProduct={deleteProduct}
        />
      </div>
    </>
  );
}

export default App;

