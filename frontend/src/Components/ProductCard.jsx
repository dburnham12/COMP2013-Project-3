import QuantityCounter from "./QuantityCounter";
export default function ProductCard({
  productName,
  brand,
  image,
  price,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  id,
  handleEditProduct,
  _id,
  handleDeleteProduct,
  navigate,
}) {
  return (
    <div className="ProductCard">
      <h3>{productName}</h3>
      <img src={image} alt="" />
      <h4>{brand}</h4>
      <QuantityCounter
        handleAddQuantity={handleAddQuantity}
        productQuantity={productQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={id}
        mode="product"
      />
      <h3>{price}</h3>
      <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
      <button
        id="edit-button"
        onClick={() => {
          //When button is pushed, navigate to edit-product route and
          //transfer all product information over there aswell
          handleEditProduct({ productName, brand, image, price, _id });
          navigate("/edit-product", {
            state: { productName, brand, image, price, _id },
          });
        }}
      >
        Edit
      </button>
      <button className="RemoveButton" onClick={() => handleDeleteProduct(_id)}>
        Delete
      </button>
    </div>
  );
}
