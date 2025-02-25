import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found 😢</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default NotFound;