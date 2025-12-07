import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { ADMIN_NAMES } from "../utility/constants";

export default function GroceriesAppContainer() {
    /////////// States ///////////
    const [productQuantity, setProductQuantity] = useState();
    const [cartList, setCartList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [postResponse, setPostResponse] = useState("");
    const [currentUser, setCurrentUser] = useState(() => {
        const jwtToken = Cookies.get("jwt-authorization");
        if (!jwtToken) {
            return "";
        }
        try {
            const decodedToken = jwtDecode(jwtToken);
            return decodedToken.username;
        } catch {
            return "";
        }
    });

    const navigate = useNavigate();

    //////////useEffect////////

    useEffect(() => {
        handleProductsFromDB();
    }, [postResponse]);

    useEffect(() => {
        if (!currentUser) {
            navigate("/not-authorized");
        }
    }, []);

    ////////Handlers//////////
    const initialProductQuantity = (prods) =>
        prods.map((prod) => {
            return { id: prod.id, quantity: 0 };
        });

    const handleProductsFromDB = async () => {
        try {
            await axios.get("http://localhost:3000/products").then((result) => {
                setProductList(result.data);
                setProductQuantity(initialProductQuantity(result.data));
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEditProduct = (product) => {
        // setFormData({
        //     productName: product.productName,
        //     brand: product.brand,
        //     image: product.image,
        //     price: product.price,
        //     _id: product._id,
        // });
        // setIsEditing(true);
        // setPostResponse("");
    };

    const handleAddQuantity = (productId, mode) => {
        if (mode === "cart") {
            const newCartList = cartList.map((product) => {
                if (product.id === productId) {
                    return { ...product, quantity: product.quantity + 1 };
                }
                return product;
            });
            setCartList(newCartList);
            return;
        } else if (mode === "product") {
            const newProductQuantity = productQuantity.map((product) => {
                if (product.id === productId) {
                    return { ...product, quantity: product.quantity + 1 };
                }
                return product;
            });
            setProductQuantity(newProductQuantity);
            return;
        }
    };

    const handleRemoveQuantity = (productId, mode) => {
        if (mode === "cart") {
            const newCartList = cartList.map((product) => {
                if (product.id === productId && product.quantity > 1) {
                    return { ...product, quantity: product.quantity - 1 };
                }
                return product;
            });
            setCartList(newCartList);
            return;
        } else if (mode === "product") {
            const newProductQuantity = productQuantity.map((product) => {
                if (product.id === productId && product.quantity > 0) {
                    return { ...product, quantity: product.quantity - 1 };
                }
                return product;
            });
            setProductQuantity(newProductQuantity);
            return;
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:3000/products/${productId}`).then((result) => {
                console.log(result);
                setPostResponse(`${result.data.productName} deleted\n with id: ${result.data.id}`);
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleAddToCart = (productId) => {
        const product = productList.find((product) => product.id === productId);
        const pQuantity = productQuantity.find((product) => product.id === productId);
        const newCartList = [...cartList];
        const productInCart = newCartList.find((product) => product.id === productId);
        if (productInCart) {
            productInCart.quantity += pQuantity.quantity;
        } else if (pQuantity.quantity === 0) {
            alert(`Please select quantity for ${product.productName}`);
        } else {
            newCartList.push({ ...product, quantity: pQuantity.quantity });
        }
        setCartList(newCartList);
    };

    const handleRemoveFromCart = (productId) => {
        const newCartList = cartList.filter((product) => product.id !== productId);
        setCartList(newCartList);
    };

    const handleClearCart = () => {
        setCartList([]);
    };

    const handleLogout = () => {
        Cookies.remove("jwt-authorization");
        setCurrentUser("");
        navigate("/");
    };

    /////////Renderer
    return (
        <div>
            <NavBar
                quantity={cartList.length}
                navigate={navigate}
                currentUser={currentUser}
                adminNames={ADMIN_NAMES}
                handleLogout={handleLogout}
            />
            <div className="GroceriesApp-Container">
                <ProductsContainer
                    products={productList}
                    handleAddQuantity={handleAddQuantity}
                    handleRemoveQuantity={handleRemoveQuantity}
                    handleAddToCart={handleAddToCart}
                    productQuantity={productQuantity}
                    handleEditProduct={handleEditProduct}
                    handleDeleteProduct={handleDeleteProduct}
                    navigate={navigate}
                    currentUser={currentUser}
                    adminNames={ADMIN_NAMES}
                />
                <CartContainer
                    cartList={cartList}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleAddQuantity={handleAddQuantity}
                    handleRemoveQuantity={handleRemoveQuantity}
                    handleClearCart={handleClearCart}
                />
            </div>
        </div>
    );
}
