import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AuthFormComponent from "./AuthFormComponent";
/**
 * Login Page Component
 * @return JSX.Element
 */
export default function LoginPage() {
  // States
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [postResponse, setPostResponse] = useState("");
  const navigate = useNavigate();

  // Base URL
  const BASE_URL = "http://localhost:3000/login";

  // Handlers
  /**
   * Reset form fields
   */
  const restForm = () => {
    setFormData({ username: "", password: "" });
  };

  /**
   * Handle input change event
   * @param {*} e Event object
   */
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  /**
   * Handle login process
   */
  const handleLogin = async () => {
    try {
      const response = await axios.post(BASE_URL, formData);
      setPostResponse(response.data.message);
      if (response.status === 200) {
        Cookies.set("jwt-authorization", response.data.token);
        navigate("/main");
      }
    } catch (error) {
      setPostResponse(error.response?.data?.message || "Login failed");
    }
  };

  /**
   * Handle form submit event
   * @param {*} e Event object
   */
  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    restForm();
  };
  return (
    <div>
      <AuthFormComponent
        formData={formData}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        currentPage="login"
        postResponse={postResponse}
      />
    </div>
  );
}
