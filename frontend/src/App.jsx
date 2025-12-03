import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RegisterPage from "./Components/RegisterPage";
import LoginPage from "./Components/LoginPage";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/main" element={<GroceriesAppContainer />} />
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/create-user" element={<RegisterPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
