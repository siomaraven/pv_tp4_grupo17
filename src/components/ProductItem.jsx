import React from 'react';

function ProductItem({ product, setEditingProduct, deleteProduct }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [showConfirm, setShowConfirm] = React.useState(false);

  return (
    <div style={{ background: '#26334d', marginBottom: '10px', borderRadius: '10px' }}>
      <div
        style={{ cursor: 'pointer', padding: '10px', background: 'gray', borderRadius: '15px' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '▼ ' : '▶ '}<b>{product.descripcion}</b>
      </div>
      {isOpen && (
        <div style={{ padding: '10px' }}>
          <p><b>ID:</b> {product.id}</p>
          <p><b>Precio Unitario:</b> ${product.precioUnitario}</p>
          <p><b>Descuento:</b> {product.descuento}%</p>
          <p><b>Precio con Descuento:</b> ${product.precioConDescuento}</p>
          <button onClick={() => setEditingProduct(product)}>Editar</button>
          {!showConfirm ? (
            <button onClick={() => setShowConfirm(true)}>Eliminar</button>
          ) : (
            <span>
              <button style={{ background: 'green', color: 'white' }} onClick={() => deleteProduct(product.id)}>Confirmar</button>
              <button style={{ background: 'red', color: 'white' }} onClick={() => setShowConfirm(false)}>Cancelar</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductItem;

