import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <Link to="/">Quirk Mart 💪 </Link>
      </div>
      <nav className="navbar__links">
      <Link to="/login">SignUp/Login</Link>
        <Link to="/cart" aria-label="Cart">
          <FaShoppingCart aria-hidden="true" />
        </Link>
        <Link to="/products">Shop</Link>
        <div className="navbar__profile">
          <button onClick={handleToggle} className="navbar__profile-button">
            Profile {showDropdown ? "▲" : "▼"}
          </button>
          {showDropdown && (
            <div className="navbar__profile-dropdown">
              <Link to="/profile">Your profile</Link>
              <Link to="/settings">Settings</Link>
              <button>Logout</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
