import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__logo">
        <Link to="/">Quirk Mart 🛍️</Link>
      </div>
      <nav className="navbar__links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </header>
  );
}

export default Navbar;