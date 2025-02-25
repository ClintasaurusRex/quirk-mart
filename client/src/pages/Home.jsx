import './Home.scss';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to Quirk Mart 🛍️</h1>
        <p>Your one-stop shop for everything you need!</p>
        <Link to="/products" className="btn-primary">Shop Now</Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🔥 Hot Deals</h3>
          <p>Catch our limited-time offers on top products.</p>
        </div>
        <div className="feature-card">
          <h3>🚀 Fast Shipping</h3>
          <p>Get your items delivered quickly and reliably.</p>
        </div>
        <div className="feature-card">
          <h3>💯 Quality Products</h3>
          <p>We provide only the best for our customers.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;