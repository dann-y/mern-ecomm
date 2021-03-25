import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products"
        className="mr-sm-2 ml-sm-5"
        style={{ paddingRight: "80px" }}
      ></Form.Control>
      <Button type="submit" variant="outline-light" className="py-2 px-4">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
