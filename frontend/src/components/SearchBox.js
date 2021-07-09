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
    <Form onSubmit={submitHandler} inline >
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products"
        className=" shadow-none"
        style={{ paddingRight: "80px", borderRadius: "5px", maxHeight:"40px", marginRight:"10px",}}
      ></Form.Control>
      <Button type="submit" variant="outline-primary shadow-none" className="py-1 px-3" style={{ borderRadius:"5px",  borderWidth:"1px", borderColor:"gray", marginTop:"2px"}}>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
