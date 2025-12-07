import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import { jwtDecode } from "jwt-decode";
import { ADMIN_NAMES, BASE_URL } from "../utility/constants";
import Cookies from "js-cookie";
export default function EditPage() {
    //Location
    const location = useLocation();
    //Navigate
    const navigate = useNavigate();

    //States

    //User state
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

    //Form Data state
    const [formData, setFormData] = useState({
        productName: "",
        brand: "",
        image: "",
        price: "",
        _id: "",
    });

    //Editing mode state
    const [isEditing, setIsEditing] = useState(true);

    //Post response state
    const [postResponse, setPostResponse] = useState("");

    //useEffect for checking if the user is an admin and can access the edit page
    //which is restricted
    useEffect(() => {
        if (!currentUser || !ADMIN_NAMES.includes(currentUser) || !location.state) {
            navigate("/not-authorized");
        }
        setFormData({
            productName: location.state.productName,
            brand: location.state.brand,
            image: location.state.image,
            price: location.state.price,
            _id: location.state._id,
        });
    }, []);

    //Handler for submitting the form
    const handleOnSubmit = async (e) => {
        if (isEditing) {
            e.preventDefault();
            handleUpdateProduct(formData._id);
            setFormData({
                productName: "",
                brand: "",
                image: "",
                price: "",
            });
        } else {
            e.preventDefault();
            try {
                await axios.post("http://localhost:3000/add-product", formData).then((result) => {
                    setPostResponse(result.data);
                });
                setFormData({
                    productName: "",
                    brand: "",
                    image: "",
                    price: "",
                });
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    //Handler for changing the form
    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //Handler for updating the product in the DB
    const handleUpdateProduct = async (productId) => {
        try {
            await axios.patch(`http://localhost:3000/products/${productId}`, formData).then((result) => {
                setPostResponse(result.data);
            });
            setFormData({
                productName: "",
                brand: "",
                image: "",
                price: "",
            });
            setIsEditing(false);
            navigate("/main");
        } catch (error) {
            console.log(error.message);
        }
    };

    //Return statement
    return (
        <div>
            <ProductForm
                handleOnSubmit={handleOnSubmit}
                handleOnChange={handleOnChange}
                formData={formData}
                postResponse={postResponse}
                isEditing={isEditing}
            />
            <Link to="/main">Click here to go back to main page</Link>
        </div>
    );
}
