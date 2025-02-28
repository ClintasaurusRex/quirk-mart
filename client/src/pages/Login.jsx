
import './Login.scss';

function Login() {
  return (
    <div className="login">
      <h1>Login</h1>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
        <button type="submit">Sign In</button>
        <a href="#">Forgot Password?</a>
        <a href="#">Register</a>
      </form>
    </div>
  );
}

export default Login;
