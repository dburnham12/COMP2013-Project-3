import { Link } from "react-router-dom";

// not authorized page

export default function NotAuthorized() {
    return (
        <div>
            <h1>You are not authorized to visit this page &#128533;</h1>
            <Link to="/">Back to login page</Link>
        </div>
    );
}
