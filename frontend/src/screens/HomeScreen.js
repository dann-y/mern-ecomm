import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  //grab from state
  const productList = useSelector((state) => state.productList);

  //pulling what we want from state
  const { loading, error, products, page, pages } = productList;

  //occurs upon load
  useEffect(
    () => {
      //fire off action, get products & send through reducer to the state
      dispatch(listProducts(keyword, pageNumber));
    },
    //dependency
    [dispatch, keyword, pageNumber]
  );

  return (
    <>
      <Meta />

      {keyword ? (
        <>
          <h2>Search results for "{keyword}"</h2>
          <Link to="/" className="btn btn-light">
            Go Back
          </Link>
        </>
      ) : (
        <h2 className="py-4">Latest Products</h2>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
