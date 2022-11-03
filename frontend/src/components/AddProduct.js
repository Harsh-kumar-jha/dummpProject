import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCageory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const addProduct = async () => {
    // console.log(name, price, category, company);'
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    // console.log(userId);
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, userId, company }),
      headers: {
        "Content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
  };
  return (
    <div>
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        value={name}
        className="input-field"
        id="itm"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && !name && (
        <span className="invalid-input">*Enter a valid name</span>
      )}
      <input
        type="text"
        value={price}
        placeholder="Enter Product Price"
        className="input-field"
        id="itm"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && <span className="invalid-input">*Enter price</span>}
      <input
        type="text"
        value={category}
        placeholder="Enter Product Category"
        className="input-field"
        id="itm"
        onChange={(e) => {
          setCageory(e.target.value);
        }}
      />
      {error && !category && (
        <span className="invalid-input">*Enter a valid category</span>
      )}
      <input
        type="text"
        value={company}
        placeholder="Enter Product Company"
        className="input-field"
        id="itm"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      {error && !company && (
        <span className="invalid-input">*Enter a valid company</span>
      )}
      <button type="button" className="button" onClick={addProduct}>
        Click To add
      </button>
    </div>
  );
};

export default AddProduct;
