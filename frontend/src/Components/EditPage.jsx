import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import { jwtDecode } from "jwt-decode";
import { ADMIN_NAMES, BASE_URL } from "../utility/constants";
import Cookies from "js-cookie";
export default function EditPage(
  {
    /*handleOnSubmit,
  handleOnChange,
  formData,
  postResponse,
  isEditing,
  setFormData,
  */
  }
) {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

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
  useEffect(() => {
    console.log(location);
    if (!currentUser || !ADMIN_NAMES.includes(currentUser) || !location.state) {
      navigate("/not-authorized");
    }
    setFormData({
      productName: location.state.productName,
      brand: location.state.brand,
      image: location.state.image,
      price: location.state.price,
      _id: location.state._id,
    });
  }, []);

  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
    _id: "",
  });
  const [isEditing, setIsEditing] = useState(true);
  const [postResponse, setPostResponse] = useState("");

  const handleOnSubmit = async (e) => {
    if (isEditing) {
      e.preventDefault();
      handleUpdateProduct(formData._id);
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
    } else {
      e.preventDefault();
      try {
        await axios
          .post("http://localhost:3000/add-product", formData)
          .then((result) => {
            setPostResponse(result.data);
          });
        setFormData({
          productName: "",
          brand: "",
          image: "",
          price: "",
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProduct = async (productId) => {
    try {
      await axios
        .patch(`http://localhost:3000/products/${productId}`, formData)
        .then((result) => {
          setPostResponse(result.data);
        });
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
      setIsEditing(false);
      navigate("/main");
    } catch (error) {
      console.log(error.message);
    }
  };

  /*
  setFormData({
    productName: location.state.productName,
    brand: location.state.brand,
    price: location.state.price,
    image: location.state.image,
  });
*/
  console.log(location);
  return (
    <div>
      <ProductForm
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
        formData={formData}
        postResponse={postResponse}
        isEditing={isEditing}
      />
      <Link to="/main">Click here to go back to main page</Link>
    </div>
  );
}
