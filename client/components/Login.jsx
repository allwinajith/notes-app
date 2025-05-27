import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="loginContainer">
      <div className="windowBar">
        <span className="dot red"></span>
        <span className="dot yellow"></span>
        <span className="dot green"></span>
        <span className="windowTitle">Login</span>
      </div>

      <div className="loginHeader">Login</div>
      <form className="loginBody" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <div className="buttonGroup">
          <button type="submit" className="loginBtn">
            Login
          </button>
          <button
            type="button"
            className="registerBtn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
