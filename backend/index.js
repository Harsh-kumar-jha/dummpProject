const express = require("express");
require("./db/config");
const cors = require("cors");
const User = require("./db/user");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");

const jwtKey = "Harsh";
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register",  async (req, res) => {
  const user1 = new User(req.body);
  let result = await user1.save();
  result = result.toObject();
  delete result.password;

  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send("Something wend wrong!!!");
    } else {
      res.send({ result, auth: token });
    }
  });
});

app.post("/login",  async (req, res) => {
  if (req.body.password && req.body.email) {
    const user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send("Something wend wrong!!!");
        } else {
          res.send({ user, auth: token });
        }
      });
    } else {
      res.send({ result: "no users found" });
    }
  } else {
    res.send({ result: "no users found" });
  }
});

app.post("/add-product", verifingToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", verifingToken, async (req, res) => {
  let product = await Product.find();
  if (product.length > 0) {
    res.send(product);
  } else {
    res.send({ result: "No product found!!" });
  }
});
app.delete("/product/:id", verifingToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", verifingToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });

  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No record found!!" });
  }
});

app.put("/product/:id", verifingToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});
app.get("/search/:key", verifingToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifingToken(req, res, next) {
  let token = req.header["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send("Please enter a valid token!!");
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "Please Enter a token" });
  }
}
app.listen(5000);
