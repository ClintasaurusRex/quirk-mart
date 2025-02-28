import { Link } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
  return (
    <div className='not-found'>
      <h1>404 - Page Not Found ❌</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default NotFound;