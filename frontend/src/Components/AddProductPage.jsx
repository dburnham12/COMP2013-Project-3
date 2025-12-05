import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ADMIN_NAMES, BASE_URL } from "../utility/constants";
import Cookies from "js-cookie";

export default function AddProductPage() {
  //States
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
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

  //useEffect
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser || !ADMIN_NAMES.includes(currentUser)) {
      navigate("/not-authorized");
    }
  }, []);

  //Handle to reset the form
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
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/products`, formData);
      setPostResponse(response.data.message || "Product added successfully!");
      handleResetForm();
    } catch (error) {
      setPostResponse(error?.response?.data?.message || "Cannot add product.");
    }
  };

  //Render
  return (
    <div>
      <ProductForm
        formData={formData}
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
      />

      <p>{postResponse}</p>

      <Link to="/main">Click here to go back to main page</Link>
    </div>
  );
}
