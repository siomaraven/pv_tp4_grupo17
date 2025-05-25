import  { useState, useEffect } from 'react';
import '../css/style.css';
function ProductForm({ addProduct, editProduct, editingProduct, setEditingProduct, products }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // validamos que el id exista
    if (!editingProduct && formData.id.trim() === '') {
      alert('El ID es obligatorio de agregar.');
      return;
    }
    // validamos que no se repita
    if (!editingProduct && products.some (p => p.id === formData.id.trim())){
      alert("El ID ya existe, por favor use otro.");
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
      id: formData.id.trim(),
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


  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h3>
      <input type="text" name="id" placeholder="ID" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} disabled={editingProduct} />
      <input type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} />
      <input type="number" name="precioUnitario" placeholder="Precio Unitario" value={formData.precioUnitario} onChange={(e) => setFormData({ ...formData, precioUnitario: e.target.value })} />
      <input type="number" name="descuento" placeholder="Descuento (%)" value={formData.descuento} onChange={(e) => setFormData({ ...formData, descuento: e.target.value })} />
      <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
      <p>Precio con Descuento: <b>${formData.precioUnitario * (1 - formData.descuento / 100)}</b></p>
      <button type="submit">{editingProduct ? 'Guardar Cambios' : 'Agregar'}</button>
    </form>
  );
}

export default ProductForm;
