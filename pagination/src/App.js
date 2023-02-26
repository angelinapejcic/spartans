import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Navbar, Nav, Table, Row, Col, Container, Form } from "react-bootstrap";

function useDebounce(fn, delay) {
  const [timer, setTimer] = useState(null);

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }

    setTimer(setTimeout(() => {
      fn(...args);
    }, delay));
  };
}

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const page = parseInt(queryParams.get("page")) || 1;
  const perPage = parseInt(queryParams.get("perPage")) || 10;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`
        );
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, perPage]);

  const handlePageChange = (newPage) => {
    queryParams.set("page", newPage);
    navigate(`?${queryParams.toString()}`);
  };

  const handlePerPageChange = (newPerPage) => {
    queryParams.set("perPage", newPerPage);
    navigate(`?${queryParams.toString()}`);
  };

  const debouncedPageChange = useDebounce(handlePageChange, 500);
  const debouncedPerPageChange = useDebounce(handlePerPageChange, 500);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log(data);
  return ( <>
  <Container fluid>
    <Row>
      <Col md={8}>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Beers</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link>Page <Form.Control
            type="number"
            value={page}
            onChange={(e) => debouncedPageChange(e.target.value)}
          /></Nav.Link>
          <Nav.Link>Per Page
          <Form.Control
            type="number"
            value={perPage}
            onChange={(e) => debouncedPerPageChange(e.target.value)}
          /></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </Col>
    </Row>
    <Row>
      <Col md={8} sm={4}>
      <Table striped bordered hover size="sm" className="text-center">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Name</th>
            <th>TagLine</th>
            <th>First Brewed</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
            <td>
              <img src={item.image_url} alt={item.name} style={{width: '50px', height: '100px' }}/>
            </td>
            <td>{item.name}</td>
            <td>{item.tagline}</td>
            <td>{item.first_brewed}</td>
            <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Col>
    </Row>
    </Container></>
  );
}

export default App;