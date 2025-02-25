import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProductCard.scss';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-card__image" />
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">${product.price.toFixed(2)}</p>
      <Link to={`/products/${product.id}`} className="product-card__details">View Details</Link>
    </div>
  );
}
ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
