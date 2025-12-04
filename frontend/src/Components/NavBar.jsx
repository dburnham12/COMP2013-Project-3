export default function NavBar({
    quantity,
    navigate,
    currentUser,
    adminNames,
}) {
    return (
        <nav className="NavBar">
            <div className="NavDiv NavUser">
                <h3>Hello, {currentUser}</h3>
            </div>
            <div className="NavDiv NavTitle">
                <h2>Groceries App 🍎</h2>
                {adminNames.includes(currentUser) && ( //Checking Current User against Admin Names
                    <button onClick={() => navigate("/add-product")}>
                        Add New Product
                    </button>
                )}
            </div>
            <div className="NavDiv NavCart">
                <img
                    src={
                        quantity > 0
                            ? "src/assets/cart-full.png"
                            : "src/assets/cart-empty.png"
                    }
                />
            </div>
        </nav>
    );
}
