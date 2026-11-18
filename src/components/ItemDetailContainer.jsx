

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { ShieldCheck, Truck, PackageCheck, ArrowLeft, ShoppingCart, CheckCircle2 } from 'lucide-react';
import ItemCount from './ItemCount';
import PageMeta from './PageMeta';
import { useCart } from '../context/useCart';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const STOCK = 10;

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const docRef = doc(db, 'productos', id);
    let active = true;

    setLoading(true);
    setError(false);
    setProduct(null);
    setAdded(false);

    getDoc(docRef)
      .then((snapshot) => {
        if (!active) return;

        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() });
        } else {
          setProduct(null);
        }
      })
      .catch((error) => {
        console.error('Error al obtener el producto:', error);
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const handleOnAdd = (quantity) => {
    if (!product) return;
    addToCart({ ...product, stock: STOCK }, quantity);
    setAdded(true);
  };

  if (loading) {
    return (
      <Container className="detail-loading">
        <PageMeta
          title="Detalle del producto"
          description="Conocé los detalles de nuestros productos en Gaming Store."
        />
        <Spinner animation="border" />
        <p>Cargando detalle del producto...</p>

        <style>{`
          .detail-loading {
            min-height: 75vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 15px;
            color: #00ffcc;
          }

          .detail-loading p {
            color: #bbb;
            margin: 0;
          }
        `}</style>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="detail-error">
        <PageMeta
          title="Producto no encontrado"
          description="El producto que buscás no está disponible en Gaming Store."
        />
        <PackageCheck size={55} />
        <h2>{error ? 'No pudimos cargar el producto' : 'Producto no encontrado'}</h2>
        <p>
          {error
            ? 'Ocurrió un problema al consultar el producto. Intentá nuevamente más tarde.'
            : 'El producto que buscás no está disponible.'}
        </p>
        <Link to="/productos" className="detail-back">
          <ArrowLeft size={18} />
          Volver al catálogo
        </Link>

        <style>{`
          .detail-error {
            min-height: 75vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: #00ffcc;
            gap: 15px;
          }

          .detail-error h2 {
            color: #fff;
            font-weight: 800;
          }

          .detail-error p {
            color: #aaa;
          }

          .detail-back {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 20px;
            border: 1px solid #00ffcc;
            border-radius: 8px;
            color: #00ffcc;
            text-decoration: none;
            font-weight: 700;
            transition: all .2s ease;
          }

          .detail-back:hover {
            background: #00ffcc;
            color: #101414;
          }
        `}</style>
      </Container>
    );
  }

  return (
    <div className="detail-page">
      <PageMeta
        title={product.nombre}
        description={product.descripcion || `Conocé ${product.nombre} en Gaming Store.`}
      />

      <style>{`
        .detail-page {
          min-height: 90vh;
          padding: 55px 0 80px;
          background:
            radial-gradient(circle at 15% 25%, rgba(0,255,204,.07), transparent 30%),
            #0d0d0d;
          color: #fff;
        }

        .detail-breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 25px;
          color: #00ffcc;
          text-decoration: none;
          font-size: .9rem;
          font-weight: 700;
          transition: color .2s ease;
        }

        .detail-breadcrumb:hover {
          color: #fff;
        }

        .detail-panel {
          overflow: hidden;
          border: 1px solid #303039;
          border-radius: 20px;
          background: linear-gradient(145deg, #1b1b24, #121217);
          box-shadow: 0 20px 55px rgba(0,0,0,.35);
        }

        .detail-image-area {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 440px;
          padding: 35px;
          background: radial-gradient(circle, #292932 0%, #17171e 70%);
          border-right: 1px solid #303039;
        }

        .detail-image {
          width: 100%;
          max-width: 390px;
          height: 370px;
          object-fit: contain;
          transition: transform .35s ease;
        }

        .detail-image:hover {
          transform: scale(1.05);
        }

        .detail-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          padding: 45px;
        }

        .detail-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          padding: 8px 13px;
          margin-bottom: 20px;
          border: 1px solid rgba(0,255,204,.3);
          border-radius: 25px;
          background: rgba(0,255,204,.07);
          color: #00ffcc;
          font-size: .78rem;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .detail-title {
          color: #fff;
          font-size: clamp(1.7rem, 3vw, 2.4rem);
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .detail-price {
          color: #00ffcc;
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 22px;
          text-shadow: 0 0 18px rgba(0,255,204,.15);
        }

        .detail-description {
          color: #b8b8c2;
          font-size: 1rem;
          line-height: 1.8;
          margin-bottom: 25px;
        }

        .detail-stock {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #00ffcc;
          font-size: .9rem;
          font-weight: 700;
          margin-bottom: 25px;
        }

        .detail-divider {
          height: 1px;
          background: #303039;
          margin-bottom: 25px;
        }

        .detail-features {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-top: 28px;
          padding-top: 22px;
          border-top: 1px solid #303039;
        }

        .detail-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #aaa;
          font-size: .82rem;
        }

        .detail-feature svg {
          color: #00ffcc;
          flex-shrink: 0;
        }

        .detail-added {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          padding: 13px 22px;
          border-radius: 8px;
          background: #00ffcc;
          color: #101414;
          text-decoration: none;
          font-weight: 850;
          transition: all .25s ease;
        }

        .detail-added:hover {
          background: #fff;
          color: #101414;
          transform: translateY(-3px);
        }

        @media (max-width: 767px) {
          .detail-page {
            padding: 35px 0 55px;
          }

          .detail-image-area {
            min-height: 300px;
            padding: 25px;
            border-right: none;
            border-bottom: 1px solid #303039;
          }

          .detail-image {
            height: 260px;
          }

          .detail-info {
            padding: 30px 24px;
          }

          .detail-price {
            font-size: 1.8rem;
          }

          .detail-features {
            gap: 14px;
          }
        }
      `}</style>

      <Container>
        <Link to="/productos" className="detail-breadcrumb">
          <ArrowLeft size={17} />
          Volver al catálogo
        </Link>

        <div className="detail-panel">
          <Row className="g-0">
            <Col md={6}>
              <div className="detail-image-area">
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="detail-image"
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="detail-info">
                <div className="detail-tag">
                  <CheckCircle2 size={15} />
                  Gaming Store
                </div>

                <h1 className="detail-title">{product.nombre}</h1>

                <p className="detail-price">${product.precio}</p>

                <p className="detail-description">
                  {product.descripcion || 'Consultá las características de este producto y prepará tu próximo setup gamer.'}
                </p>

                <div className="detail-stock">
                  <PackageCheck size={19} />
                  Stock disponible: {STOCK} unidades
                </div>

                <div className="detail-divider" />

                {!added ? (
                  <ItemCount
                    stock={STOCK}
                    initial={1}
                    onAdd={handleOnAdd}
                  />
                ) : (
                  <Link to="/carrito" className="detail-added">
                    <ShoppingCart size={19} />
                    Ir al carrito
                  </Link>
                )}

                <div className="detail-features">
                  <div className="detail-feature">
                    <ShieldCheck size={18} />
                    Compra segura
                  </div>

                  <div className="detail-feature">
                    <Truck size={18} />
                    Envíos
                  </div>

                  <div className="detail-feature">
                    <PackageCheck size={18} />
                    Calidad garantizada
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ItemDetailContainer;
