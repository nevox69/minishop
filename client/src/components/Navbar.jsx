import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  // Get login status and logout function from AuthContext
  const { token, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">MiniShop</h1>

        <div className="flex gap-4">
          {/* Home is always visible */}
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>

          {token ? (
            <>
              {/* Show Add Product */}
              <Link to="/add-product" className="hover:text-blue-400">
                Add Product
              </Link>

              <Link to="/carts" className="hover:text-blue-400">
                Cart
              </Link>

              {/* Show Logout */}
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Show Login */}
              <Link to="/login" className="hover:text-blue-400">
                Login
              </Link>

              {/* Show Signup */}
              <Link to="/signup" className="hover:text-blue-400">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// {token ? (
//    // logged in
// ) : (
//    // not logged in
// )}
