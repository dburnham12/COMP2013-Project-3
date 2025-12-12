import { Link, useNavigate } from "react-router-dom";

// Auth Form Component
// Used to display a form for login and register
export default function AuthFormComponent({
    formData,
    handleOnSubmit,
    handleOnChange,
    currentPage,
    postResponse,
    locationState,
}) {
    return (
        <div className="AuthFormContainer">
            {/* Display Header Based off current page */}
            <h1>{currentPage === "register" ? "Create a new user" : "Groceries App"}</h1>
            {/* Set up the form component */}
            <form onSubmit={handleOnSubmit} className="AuthForm">
                {/* Input group for the username */}
                <div className="FormField">
                    <label className="FormLabel" htmlFor="username">
                        Username:
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleOnChange}
                    />
                </div>
                {/* Input group for the password */}
                <div className="FormField">
                    <label className="FormLabel" htmlFor="password">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleOnChange}
                    />
                </div>
                {/* Button with appropriate message based off of current page */}
                <button>{currentPage === "register" ? "Create New User" : "Login"}</button>
            </form>
            {/* Display any errors from postResponse */}
            <p className="ErrorMessage">{postResponse}</p>
            {/* Display correct message and links for the current page */}
            {currentPage === "register" ? (
                <Link to="/">Back to login page</Link>
            ) : (
                <p>
                    Not a member yet click <Link to="/create-user">here</Link> to join
                </p>
            )}
            {/* If we recieved something from a seperate page (login=>register) display it */}
            {locationState && <h3>{locationState.message}</h3>}
        </div>
    );
}
