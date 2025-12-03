import { Link, useNavigate } from "react-router-dom";

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
            <h1>{currentPage === "register" ? "Create a new user" : "Groceries App"}</h1>
            <form onSubmit={handleOnSubmit} className="AuthForm">
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
                <button>{currentPage === "register" ? "Create New User" : "Login"}</button>
            </form>
            <p className="ErrorMessage">{postResponse}</p>
            {currentPage === "register" ? (
                <Link to="/">Back to login page</Link>
            ) : (
                <p>
                    Not a member yet click <Link to="/create-user">here</Link> to join
                </p>
            )}
            {locationState && <h3>{locationState.message}</h3>}
        </div>
    );
}
