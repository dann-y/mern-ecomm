import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded " border="light">
      <div
        style={{
          height: "250px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to={`/product/${product._id}`}>
          <Card.Img
            src={product.image}
            variant="top"
            style={{
              maxHeight: "250px",
              width: "auto",
              maxWidth: "100% ",
            }}
          />
        </Link>
      </div>

      <Card.Body>
        <Card.Text as="div">
          <div className="my-2">{product.brand}</div>
        </Card.Text>

        <Link to={`product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        {product.countInStock > 0 ? (
          <Card.Text as="h4">${product.price}</Card.Text>
        ) : (
          <>
            <Card.Text as="h4">
              {" "}
              <s className="text-muted">${product.price}</s>
            </Card.Text>
            <Card.Text>Sold Out</Card.Text>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
