import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import { jwtDecode } from "jwt-decode";
import { ADMIN_NAMES, BASE_URL } from "../utility/constants";
import Cookies from "js-cookie";
export default function EditPage() {
  //Location
  const location = useLocation();
  //Navigate
  const navigate = useNavigate();

  //States

  //User state
  const [currentUser, setCurrentUser] = useState(() => {
    //Check if the user has the cookie to state they are logged in
    const jwtToken = Cookies.get("jwt-authorization");
    if (!jwtToken) {
      //If they are not authorized, currentUser is set to an empty string
      return "";
    }
    try {
      const decodedToken = jwtDecode(jwtToken);
      return decodedToken.username; //If they are authorized, the currentUser state is set to their username
    } catch {
      return ""; //If there was an error, the currentUser is set to an empty string
    }
  });

  //Form Data state
  //By default the formData is empty
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
    _id: "",
  });

  //Editing mode state to ensure that the form is set to edit, not submit
  const [isEditing, setIsEditing] = useState(true);

  //Post response state
  const [postResponse, setPostResponse] = useState("");

  //useEffect for checking if the user is an admin and can access the edit page
  //which is restricted
  useEffect(() => {
    //If there is no user, or the user isnt authorized,
    // or if the page was accessed incorrectly, navigate to
    //the not authorized page
    if (!currentUser || !ADMIN_NAMES.includes(currentUser) || !location.state) {
      navigate("/not-authorized");
    } else {
      setFormData({
        //Otherwise, set the form data to the information grabbed from the product card (stored in location)
        productName: location.state.productName,
        brand: location.state.brand,
        image: location.state.image,
        price: location.state.price,
        _id: location.state._id,
      });
    }
  }, []);

  //Handler for submitting the form
  const handleOnSubmit = async (e) => {
    //Prevent default function of submission
    e.preventDefault();
    handleUpdateProduct(formData._id); //Update the product
  };

  //Handler for changing the form
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Handler for updating the product in the DB
  const handleUpdateProduct = async (productId) => {
    try {
      await axios
        .patch(`http://localhost:3000/products/${productId}`, formData) //Update(patch) the DB with new form data
        .then((result) => {
          setPostResponse(result.data); //Update the post response
        });
      setFormData({
        //Ensure the form data is empty
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
      //Automatically navigate the user back to the main page
      navigate("/main");
    } catch (error) {
      console.log(error.message); //If there is an error updating the product, display it in the console
    }
  };
  //Return statement
  return (
    <div>
      <ProductForm
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
        formData={formData}
        postResponse={postResponse}
        isEditing={isEditing}
      />
      {/* Link to go back to the main page */}
      <Link to="/main">Click here to go back to main page</Link>
    </div>
  );
}
