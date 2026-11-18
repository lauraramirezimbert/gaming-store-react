

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { db } from '../firebase';
import PageMeta from './PageMeta';

const PRODUCTS_PER_PAGE = 8;

const CatalogContainer = styled(Container)`
  min-height: 90vh;
  padding-top: 65px;
  padding-bottom: 75px;
  color: #fff;
`;

const CatalogEyebrow = styled.p`
  color: #00ffcc;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const CatalogTitle = styled.h2`
  color: #ffffff;
  font-size: clamp(2rem, 4vw, 2.7rem);
  font-weight: 900;
  margin-bottom: 12px;
  text-align: center;
`;

const CatalogDescription = styled.p`
  color: #aaa;
  text-align: center;
  margin-bottom: 35px;
  line-height: 1.7;
`;

const SearchWrapper = styled.div`
  max-width: 520px;
  margin: 0 auto 45px;
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 17px;
    transform: translateY(-50%);
    color: #00ffcc;
    z-index: 2;
  }

  input {
    padding: 13px 18px 13px 47px;
    border-radius: 30px;
    border: 1px solid #34343e;
    background: #191920;
    color: #fff;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.25s ease;
  }

  input::placeholder {
    color: #888;
  }

  input:focus {
    background: #191920;
    color: #fff;
    border-color: #00ffcc;
    box-shadow: 0 0 0 3px rgba(0, 255, 204, 0.12);
  }
`;

const ProductCard = styled(Card)`
  height: 100%;
  overflow: hidden;
  background: linear-gradient(145deg, #1c1c25, #131319);
  color: white;
  border: 1px solid #303039;
  border-radius: 15px;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(0, 255, 204, 0.65);
    box-shadow: 0 12px 30px rgba(0, 255, 204, 0.09);
  }

  img {
    height: 205px;
    width: 100%;
    object-fit: contain;
    padding: 17px;
    background: #fff;
    transition: transform 0.35s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  .card-body {
    padding: 21px;
  }
`;

const ProductName = styled(Card.Title)`
  min-height: 48px;
  color: #f5f5f5;
  font-size: 1rem;
  font-weight: 750;
  line-height: 1.5;
`;

const Price = styled.p`
  color: #00ffcc;
  font-size: 1.35rem;
  font-weight: 850;
  margin: 8px 0 20px;
`;

const DetailButton = styled(Button)`
  background: #00ffcc;
  color: #101414;
  border: 1px solid #00ffcc;
  border-radius: 7px;
  font-weight: 800;
  padding: 10px 14px;
  transition: all 0.25s ease;

  &:hover,
  &:focus {
    background: #fff;
    color: #101414;
    border-color: #fff;
    transform: translateY(-2px);
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  margin: 45px 0 10px;
  color: white;

  span {
    font-weight: 700;
    color: #ccc;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 10px;
    border-color: #00ffcc;
    color: #00ffcc;
  }

  button:hover:not(:disabled) {
    background: #00ffcc;
    color: #101414;
  }

  button:disabled {
    opacity: 0.35;
  }
`;

const StatusMessage = styled.div`
  padding: 35px 20px;
  margin: 20px auto;
  max-width: 550px;
  text-align: center;
  color: #bbb;
  background: #191920;
  border: 1px solid #303039;
  border-radius: 14px;
  line-height: 1.7;
`;

const LoadingWrapper = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #00ffcc;
  gap: 15px;

  p {
    color: #bbb;
    margin: 0;
  }
`;

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const querySnapshot = await getDocs(collection(db, 'productos'));
        const productsList = querySnapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setProducts(productsList);
      } catch {
        setError('No se pudieron cargar los productos. Intentá nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    String(product.nombre || '').toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <CatalogContainer>
        <PageMeta
          title="Catálogo de videojuegos"
          description="Explorá nuestro catálogo de videojuegos y encontrá tus próximos juegos favoritos en Gaming Store."
        />
        <LoadingWrapper>
          <Spinner animation="border" />
          <p>Cargando productos...</p>
        </LoadingWrapper>
      </CatalogContainer>
    );
  }

  return (
    <CatalogContainer>
      <PageMeta
        title="Gaming Store | Catálogo"
        description="Explorá nuestro catálogo de videojuegos y encontrá tus próximos juegos favoritos en Gaming Store."
      />

      <CatalogEyebrow>Encontrá tu próximo upgrade</CatalogEyebrow>
      <CatalogTitle>Nuestro catálogo</CatalogTitle>
      <CatalogDescription>
        Explorá nuestros productos y prepará tu setup para la próxima partida.
      </CatalogDescription>

      <SearchWrapper>
        <FaSearch />
        <Form.Control
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(event) => handleSearch(event.target.value)}
          aria-label="Buscar productos"
        />
      </SearchWrapper>

      {error && (
        <StatusMessage role="alert">
          {error}
        </StatusMessage>
      )}

      {!error && filteredProducts.length === 0 && (
        <StatusMessage>
          No se encontraron productos.
          <br />
          Probá con otro nombre o palabra clave.
        </StatusMessage>
      )}

      {!error && currentProducts.length > 0 && (
        <Row className="g-4">
          {currentProducts.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard>
                <Card.Img
                  variant="top"
                  src={product.imagen}
                  alt={product.nombre}
                />
                <Card.Body className="d-flex flex-column">
                  <ProductName>{product.nombre}</ProductName>
                  <Price>${product.precio}</Price>
                  <DetailButton
                    as={Link}
                    to={`/producto/${product.id}`}
                    className="mt-auto"
                  >
                    Ver detalle
                  </DetailButton>
                </Card.Body>
              </ProductCard>
            </Col>
          ))}
        </Row>
      )}

      {totalPages > 1 && (
        <PaginationWrapper>
          <Button
            variant="outline-light"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            aria-label="Página anterior"
          >
            <FaChevronLeft />
          </Button>

          <span>
            Página {currentPage} de {totalPages}
          </span>

          <Button
            variant="outline-light"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            aria-label="Página siguiente"
          >
            <FaChevronRight />
          </Button>
        </PaginationWrapper>
      )}
    </CatalogContainer>
  );
};

export default ItemListContainer;
