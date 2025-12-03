const express = require("express");
const server = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Product = require("./models/product");
const User = require("./models/user");
const { DB_URI, SECRET_KEY } = process.env;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

mongoose
    .connect(DB_URI)
    .then(() => {
        server.listen(port, () => {
            console.log(`Connected to DB successfully\nServer is running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

server.get("/", (request, response) => {
    response.send("SERVER IS LIVE!");
});

server.get("/products", async (request, response) => {
    try {
        await Product.find().then((result) => response.status(200).send(result));
    } catch (error) {
        console.log(error.message);
    }
});

server.post("/add-product", async (request, response) => {
    const { productName, brand, image, price } = request.body;
    const id = crypto.randomUUID();
    const product = new Product({
        productName,
        brand,
        price,
        image,
        id,
    });

    try {
        await product.save().then((result) => response.status(201).send(`${productName} added\nwith id: ${id}`));
    } catch (error) {
        console.log(error.message);
    }
});

server.delete("/products/:id", async (request, response) => {
    const { id } = request.params;
    try {
        await Product.findByIdAndDelete(id).then((result) => {
            console.log(result);
            response.status(200).send(result);
        });
    } catch (error) {
        console.log(error.message);
    }
});

server.patch("/products/:id", async (request, response) => {
    const prodId = request.params.id;
    const { productName, brand, image, price, id } = request.body;

    try {
        await Product.findByIdAndUpdate(prodId, {
            productName,
            brand,
            image,
            price,
            id,
        }).then((result) => response.status(200).send(`${productName} edited\nwith id: ${prodId}`));
    } catch (error) {
        console.log(error.message);
    }
});

// Login and Register Routes
// Register Route
server.post("/register", async (request, response) => {
    const { username, password } = request.body;
    try {
        // Hashing a password needs bcrypt and salt rounds as an int
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
        });
        await newUser.save();
        response.status(201).send({ message: `User ${username} added! Please login!` });
    } catch (error) {
        response.status(500).send({ message: "User already exists, Enter a new username" });
    }
});

// Login Route
/**
 * @route POST /login
 */
server.post("/login", async (request, response) => {
    const { username, password } = request.body; // get username and password from request body
    console.log(request.body);
    try {
        const user = await User.findOne({ username }); // find user by username
        // CASE 1: user not found -> authentication failed error
        if (!user) {
            return response.status(400).send({ message: "Invalid username or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // CASE 2: password invalid -> authentication failed error
            return response.status(400).send({ message: "Invalid username or password" });
        } else {
            // CASE 3: user found and password valid -> generate JWT token
            const jwtToken = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY);
            // send token in response
            response.status(200).send({ message: "Login Successful", token: jwtToken });
        }
    } catch (error) {
        response.status(500).send({ message: "An error occurred during login" });
    }
});
