
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { db } from '../firebase';
import PageMeta from './PageMeta';

const PRODUCTS_PER_PAGE = 8;

const CatalogTitle = styled.h2`
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 25px;
  text-align: center;
`;

const SearchWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto 30px;
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 14px;
    transform: translateY(-50%);
    color: #777;
  }

  input {
    padding-left: 42px;
    border-radius: 25px;
  }
`;

const ProductCard = styled(Card)`
  height: 100%;
  background-color: #1c1c2b;
  color: white;
  border: 1px solid #34344a;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    height: 190px;
    object-fit: contain;
    padding: 12px;
    background-color: #ffffff;
  }
`;

const ProductName = styled(Card.Title)`
  min-height: 48px;
  font-size: 1rem;
`;

const Price = styled.p`
  color: #a78bfa;
  font-size: 1.2rem;
  font-weight: 700;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 35px 0;
  color: white;
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
      <Container className="text-center py-5">
        <PageMeta
          title="Catálogo de videojuegos"
          description="Explorá nuestro catálogo de videojuegos y encontrá tus próximos juegos favoritos en Gaming Store."
        />
        <Spinner animation="border" variant="light" />
        <p className="text-white mt-3">Cargando productos...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <PageMeta
        title="Catálogo de videojuegos"
        description="Explorá nuestro catálogo de videojuegos y encontrá tus próximos juegos favoritos en Gaming Store."
      />

      <CatalogTitle>Nuestro catálogo</CatalogTitle>

      <SearchWrapper>
        <FaSearch />
        <Form.Control
          type="text"
          placeholder="Buscar videojuegos..."
          value={search}
          onChange={(event) => handleSearch(event.target.value)}
        />
      </SearchWrapper>

      {error && <p className="text-danger text-center">{error}</p>}

      {!error && filteredProducts.length === 0 && (
        <p className="text-white text-center">
          No se encontraron productos.
        </p>
      )}

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
                <Button
                  as={Link}
                  to={`/producto/${product.id}`}
                  variant="primary"
                  className="mt-auto"
                >
                  Ver detalle
                </Button>
              </Card.Body>
            </ProductCard>
          </Col>
        ))}
      </Row>

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
    </Container>
  );
};

export default ItemListContainer;
