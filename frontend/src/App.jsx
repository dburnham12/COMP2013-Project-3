import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RegisterPage from "./Components/RegisterPage";
import LoginPage from "./Components/LoginPage";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import AddProductPage from "./Components/AddProductPage";
import EditPage from "./Components/EditPage";
import NotAuthorized from "./Components/NotAuthorized";
import PageNotFound from "./Components/PageNotFound";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/main" element={<GroceriesAppContainer />} />
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/create-user" element={<RegisterPage />} />
                    <Route path="/add-product" element={<AddProductPage />} />
                    <Route path="/edit-product" element={<EditPage />} />
                    <Route path="/not-authorized" element={<NotAuthorized />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
