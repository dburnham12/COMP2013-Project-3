import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ADMIN_NAMES, BASE_URL } from "../utility/constants";
import Cookies from "js-cookie";

export default function AddProductPage() {
    //States
    //Form input state for adding a product
    const [formData, setFormData] = useState({
        productName: "",
        brand: "",
        image: "",
        price: "",
    });
    //State for displaying response message after submission
    const [postResponse, setPostResponse] = useState("");
    //Get current user from JWT token stored in cookies
    const [currentUser, setCurrentUser] = useState(() => {
        const jwtToken = Cookies.get("jwt-authorization");
        //If no token exists, user is not logged in
        if (!jwtToken) {
            return "";
        }
        try {
            //Decode token to get username
            const decodedToken = jwtDecode(jwtToken);
            return decodedToken.username;
        } catch {
            //If decoding fails, user is not logged in
            return "";
        }
    });

    //useEffect
    const navigate = useNavigate();
    useEffect(() => {
        //Redirect user if they are not one of the admins
        if (!currentUser || !ADMIN_NAMES.includes(currentUser)) {
            navigate("/not-authorized");
        }
    }, []);

    //Handle to reset the form back to empty values
    const handleResetForm = () => {
        setFormData({
            productName: "",
            brand: "",
            image: "",
            price: "",
        });
    };

    //Handle the onChange event for the form
    const handleOnChange = (e) => {
        setFormData((prevData) => {
            return { ...prevData, [e.target.name]: e.target.value };
        });
    };

    //Handle onSubmit when adding new product
    const handleOnSubmit = async (e) => {
        e.preventDefault(); //Prevent default page reload on form submission
        try {
            //Send POST request to backend
            const response = await axios.post(`${BASE_URL}/products`, formData);
            //Send message if product added successfully
            setPostResponse(
                response.data.message || "Product added successfully!"
            );
            handleResetForm(); //Clear form if product added successfully
        } catch (error) {
            //Disply error message
            setPostResponse(
                error?.response?.data?.message || "Cannot add product."
            );
        }
    };

    //Render
    return (
        <div>
            {/* Product form component with data and handlers */}
            <ProductForm
                formData={formData}
                handleOnSubmit={handleOnSubmit}
                handleOnChange={handleOnChange}
            />
            {/* Response message for submission */}
            <p>{postResponse}</p>

            {/* Link back to main page */}
            <Link to="/main">Click here to go back to main page</Link>
        </div>
    );
}
