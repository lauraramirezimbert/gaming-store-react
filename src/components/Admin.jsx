
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { db } from '../firebase';
import PageMeta from './PageMeta';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: ''
  });

  const getProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'productos'));
      const productsList = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data()
      }));

      setProducts(productsList);
      setError('');
    } catch {
      setError('No se pudieron cargar los productos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'productos'));

        if (!active) return;

        const productsList = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data()
        }));

        setProducts(productsList);
        setError('');
      } catch {
        if (active) {
          setError('No se pudieron cargar los productos.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setForm({
      nombre: '',
      precio: '',
      descripcion: '',
      imagen: ''
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.nombre.trim()) {
      setError('El nombre del producto es obligatorio.');
      return;
    }

    if (!form.precio || Number(form.precio) <= 0) {
      setError('El precio debe ser mayor a cero.');
      return;
    }

    if (!form.descripcion.trim()) {
      setError('La descripción es obligatoria.');
      return;
    }

    if (!form.imagen.trim()) {
      setError('La imagen es obligatoria.');
      return;
    }

    const productData = {
      nombre: form.nombre.trim(),
      precio: Number(form.precio),
      descripcion: form.descripcion.trim(),
      imagen: form.imagen.trim()
    };

    setSaving(true);

    try {
      if (editingId) {
        await updateDoc(doc(db, 'productos', editingId), productData);
        setSuccess('Producto actualizado correctamente.');
      } else {
        await addDoc(collection(db, 'productos'), productData);
        setSuccess('Producto agregado correctamente.');
      }

      resetForm();
      await getProducts();
    } catch {
      setError('Ocurrió un error al guardar el producto.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setForm({
      nombre: product.nombre || '',
      precio: product.precio || '',
      descripcion: product.descripcion || '',
      imagen: product.imagen || ''
    });

    setEditingId(product.id);
    setError('');
    setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async () => {
    if (!deletingProduct) return;

    setError('');
    setSuccess('');

    try {
      await deleteDoc(doc(db, 'productos', deletingProduct.id));
      setSuccess('Producto eliminado correctamente.');
      setDeletingProduct(null);
      await getProducts();
    } catch {
      setError('No se pudo eliminar el producto.');
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '20px' }}>
      <PageMeta
        title="Panel de administración"
        description="Administrá el catálogo de productos de Gaming Store."
      />

      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Panel de Administración
      </h2>

      <div style={{
        background: '#1e1e1e',
        color: '#fff',
        padding: '25px',
        borderRadius: '10px',
        marginBottom: '35px'
      }}>
        <h3 style={{ color: '#00ffcc', marginBottom: '20px' }}>
          {editingId ? 'Editar producto' : 'Agregar producto'}
        </h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Teclado mecánico RGB"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              placeholder="Ej: 15000"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Descripción del producto"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imagen (URL o ruta)</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              value={form.imagen}
              onChange={handleChange}
              placeholder="/img/producto.png"
              required
            />
          </Form.Group>

          {error && (
            <p style={{ color: '#ff6b6b' }}>{error}</p>
          )}

          {success && (
            <p style={{ color: '#00ffcc' }}>{success}</p>
          )}

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Button type="submit" variant="success" disabled={saving}>
              {saving ? (
                <Spinner size="sm" animation="border" />
              ) : editingId ? (
                'Guardar cambios'
              ) : (
                'Agregar producto'
              )}
            </Button>

            {editingId && (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancelar edición
              </Button>
            )}
          </div>
        </Form>
      </div>

      <h3 style={{ marginBottom: '20px' }}>Productos registrados</h3>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '30px' }}>
          <Spinner animation="border" />
          <p>Cargando productos...</p>
        </div>
      ) : products.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                background: '#1e1e1e',
                color: '#fff',
                borderRadius: '10px',
                padding: '15px'
              }}
            >
              <img
                src={product.imagen}
                alt={product.nombre}
                style={{
                  width: '100%',
                  height: '140px',
                  objectFit: 'contain',
                  background: '#fff',
                  borderRadius: '6px'
                }}
              />

              <h5 style={{ marginTop: '15px' }}>{product.nombre}</h5>

              <p style={{ color: '#00ffcc', fontWeight: 'bold' }}>
                ${product.precio}
              </p>

              <p>{product.descripcion}</p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(product)}
                >
                  Editar
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setDeletingProduct(product)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        show={Boolean(deletingProduct)}
        onHide={() => setDeletingProduct(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          ¿Estás segura de que querés eliminar el producto
          {' '}{deletingProduct?.nombre}?
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setDeletingProduct(null)}
          >
            Cancelar
          </Button>

          <Button variant="danger" onClick={handleDelete}>
            Eliminar producto
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
