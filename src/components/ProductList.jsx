import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ products, setEditingProduct, deleteProduct }) {
  return (
    <div>
      <h2>Lista de Productos</h2>
      {products.length === 0 ? <p>No hay productos para mostrar.</p> : products.map(product => (
        <ProductItem key={product.id} product={product} setEditingProduct={setEditingProduct} deleteProduct={deleteProduct} />
      ))}
    </div>
  );
}

export default ProductList;
