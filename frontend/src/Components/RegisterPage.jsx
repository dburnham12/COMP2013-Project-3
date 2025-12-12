import axios from "axios";
import { useState } from "react";
import AuthFormComponent from "./AuthFormComponent";
import { BASE_URL } from "../utility/constants";
import { useNavigate } from "react-router-dom";

// Register Page Component
// Used to register a user to the DB
export default function RegisterPage() {
    // States
    // State for the form data, changes as the user inputs values
    const [formData, setFormData] = useState({ username: "", password: "" });
    // State for post response, used to display messages to user
    const [postResponse, setPostResponse] = useState("");

    // Hooks
    const navigate = useNavigate();

    // Handlers
    // Handle On Change Function
    const handleOnChange = (e) => {
        // Update form data based on the even of changes
        setFormData((prevData) => {
            return { ...prevData, [e.target.name]: e.target.value };
        });
    };

    // Handle Register Function
    const handleRegister = async () => {
        try {
            // Attempt to contact server and register the user
            const response = await axios.post(`${BASE_URL}/register`, { ...formData });
            // If everything is ok
            if (response.status === 201) {
                // Navigate to login page and send a message to display
                navigate("/", { state: { message: response.data.message } });
            }
        } catch (error) {
            // Otherwise set post response to notify user that there was an error
            setPostResponse(error?.response?.data.message || "Cannot add username");
        }
    };

    // Handle On Submit Function
    const handleOnSubmit = (e) => {
        // Prevent default form action
        e.preventDefault();
        // Call handle register function to register the user or set up errors
        handleRegister();
        // Reset the form data to empty
        setFormData({ username: "", password: "" });
    };

    return (
        <div>
            {/* Display the auth form component with necessary props passed */}
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
