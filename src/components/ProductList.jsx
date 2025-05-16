import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ products, setEditingProduct, deleteProduct }) {
  if (products.length === 0) return <p>No hay productos para mostrar.</p>;

  return (
    <div>
      <h3>Lista de Productos</h3>
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          setEditingProduct={setEditingProduct}
          deleteProduct={deleteProduct}
        />
      ))}
    </div>
  );
}

export default ProductList;
