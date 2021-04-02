import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import Message from "../components/Message";
import { listProductDetails } from "../actions/productActions";

//destructure match from 'props'
const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      {/* <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row className="py-5">
            <Col
              md={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* fluid keeps image within container */}
              <div>
                <Image src={product.image} alt={product.name} fluid />
              </div>
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>{product.brand}</strong>
                  <h3 className="my-2">{product.name}</h3>
                </ListGroup.Item>
                {/* <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item> */}

                <ListGroup.Item>{product.description}</ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {/* if in stock, show qty row */}
                {product.countInStock > 0 ? (
                  <>
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="py-4">
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        type="button"
                      >
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </>
                ) : (
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block py-3"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Out Of Stock
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
            {/* <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* if in stock, show qty row 
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col> */}
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
