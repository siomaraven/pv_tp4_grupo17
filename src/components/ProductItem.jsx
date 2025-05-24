import React from 'react';

function ProductItem({ product, setEditingProduct, deleteProduct }) {
  return (
    <div>
      <p><b>ID:</b> {product.id}</p>
      <p><b>Descripción:</b> {product.descripcion}</p>
      <p><b>Precio Unitario:</b> ${product.precioUnitario}</p>
      <p><b>Descuento:</b> {product.descuento}%</p>
      <p><b>Precio con Descuento:</b> ${product.precioConDescuento}</p>
      <button onClick={() => setEditingProduct(product)}>Editar</button>
      <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
    </div>
  );
}

export default ProductItem;

