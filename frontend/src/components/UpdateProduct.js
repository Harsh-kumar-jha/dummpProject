import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCageory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProductDetails();
  }, []);
  const getProductDetails = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      header: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCageory(result.category);
    setCompany(result.company);
  };
  const updateProduct = async () => {
    console.log(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    navigate("/");
  };

  return (
    <div>
      <h1>Update Product</h1>
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

      <button type="button" className="button" onClick={updateProduct}>
        Click To Update
      </button>
    </div>
  );
};

export default UpdateProduct;
