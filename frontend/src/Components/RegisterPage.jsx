import axios from "axios";
import { useState } from "react";
import AuthFormComponent from "./AuthFormComponent";
import { BASE_URL } from "../utility/constants";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    // States
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [postResponse, setPostResponse] = useState("");

    // Hooks
    const navigate = useNavigate();

    // Handlers
    const handleOnChange = (e) => {
        setFormData((prevData) => {
            return { ...prevData, [e.target.name]: e.target.value };
        });
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/register`, { ...formData });
            if (response.status === 201) {
                navigate("/", { state: { message: response.data.message } });
            }
        } catch (error) {
            setPostResponse(error?.response?.data.message || "Cannot add username");
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        handleRegister();
        setFormData({ username: "", password: "" });
    };

    return (
        <div>
            <AuthFormComponent
                formData={formData}
                postResponse={postResponse}
                handleOnChange={handleOnChange}
                handleOnSubmit={handleOnSubmit}
                currentPage="register"
                locationState={null}
            />
        </div>
    );
}
