import React from 'react';

function ProductItem({ product, setEditingProduct, deleteProduct }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '10px',
      marginBottom: '8px',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <p><b>ID:</b> {product.id}</p>
        <p><b>Descripción:</b> {product.descripcion}</p>
        <p><b>Precio Unitario:</b> ${product.precioUnitario.toFixed(2)}</p>
        <p><b>Descuento:</b> {product.descuento}%</p>
        <p><b>Precio con Descuento:</b> ${product.precioConDescuento.toFixed(2)}</p>
        <p><b>Stock:</b> {product.stock}</p>
      </div>
      <div>
        <button onClick={() => setEditingProduct(product)}>Editar</button>
        <button onClick={() => deleteProduct(product.id)} style={{ marginLeft: '8px' }}>Eliminar</button>
      </div>
    </div>
  );
}

export default ProductItem;

