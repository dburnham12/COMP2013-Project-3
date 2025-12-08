import ProductCard from "./ProductCard";
export default function ProductsContainer({
  products,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  productQuantity,
  //handleEditProduct,
  handleDeleteProduct,
  navigate,
  currentUser,
  adminNames,
}) {
  return (
    <div className="ProductsContainer">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={
            productQuantity.find((p) => p.id === product.id).quantity
          }
          //handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
          navigate={navigate}
          currentUser={currentUser}
          adminNames={adminNames}
        />
      ))}
    </div>
  );
}
