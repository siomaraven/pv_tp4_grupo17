import React, { useState, useEffect } from 'react';

function ProductForm({ addProduct, editProduct, editingProduct, setEditingProduct }) {
  const [formData, setFormData] = useState({
    id: '',
    descripcion: '',
    precioUnitario: '',
    descuento: '',
    stock: ''
  });

  // Si hay un producto para editar, cargo sus datos en el formulario
  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData({
        id: '',
        descripcion: '',
        precioUnitario: '',
        descuento: '',
        stock: ''
      });
    }
  }, [editingProduct]);

  // Calcular precio con descuento
  const precioConDescuento = () => {
    const precio = parseFloat(formData.precioUnitario) || 0;
    const desc = parseFloat(formData.descuento) || 0;
    return (precio * (1 - desc / 100)).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que id sea único si es nuevo producto
    if (!editingProduct && formData.id === '') {
      alert('El ID es obligatorio');
      return;
    }

    // Validar datos mínimos
    if (
      !formData.descripcion ||
      !formData.precioUnitario ||
      isNaN(formData.precioUnitario) ||
      !formData.descuento ||
      isNaN(formData.descuento) ||
      !formData.stock ||
      isNaN(formData.stock)
    ) {
      alert('Completa todos los campos correctamente');
      return;
    }

    const newProduct = {
      id: editingProduct ? formData.id : formData.id.trim(),
      descripcion: formData.descripcion,
      precioUnitario: Number(formData.precioUnitario),
      descuento: Number(formData.descuento),
      precioConDescuento: Number(precioConDescuento()),
      stock: Number(formData.stock),
    };

    if (editingProduct) {
      editProduct(newProduct);
    } else {
      addProduct(newProduct);
    }

    // Limpiar formulario
    setFormData({
      id: '',
      descripcion: '',
      precioUnitario: '',
      descuento: '',
      stock: ''
    });
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setFormData({
      id: '',
      descripcion: '',
      precioUnitario: '',
      descuento: '',
      stock: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h3>
      <input
        type="text"
        name="id"
        placeholder="ID"
        value={formData.id}
        onChange={handleChange}
        disabled={editingProduct} // No cambiar el ID al editar
        style={{ width: '100%', marginBottom: '8px' }}
      />
      <input
        type="text"
        name="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
        style={{ width: '100%', marginBottom: '8px' }}
      />
      <input
        type="number"
        name="precioUnitario"
        placeholder="Precio Unitario"
        value={formData.precioUnitario}
        onChange={handleChange}
        style={{ width: '100%', marginBottom: '8px' }}
      />
      <input
        type="number"
        name="descuento"
        placeholder="Descuento (%)"
        value={formData.descuento}
        onChange={handleChange}
        style={{ width: '100%', marginBottom: '8px' }}
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        style={{ width: '100%', marginBottom: '8px' }}
      />
      <p>Precio con Descuento: <b>{precioConDescuento()}</b></p>
      <button type="submit">{editingProduct ? 'Guardar Cambios' : 'Agregar'}</button>
      {editingProduct && (
        <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default ProductForm;
