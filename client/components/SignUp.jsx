import { useNavigate } from "react-router-dom";
import "../styles/login.css"; // Reuse the same CSS

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Registered:", { username, email, password });
  };

  return (
    <div className="loginContainer">
      <div className="windowBar">
        <span className="dot red"></span>
        <span className="dot yellow"></span>
        <span className="dot green"></span>
        <span className="windowTitle">Register</span>
      </div>

      <div className="loginHeader">Register</div>
      <form className="loginBody" onSubmit={handleRegister}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
        />

        <div className="buttonGroup">
          <button type="submit" className="loginBtn">
            Register
          </button>
          <button
            type="button"
            className="registerBtn"
            onClick={() => navigate("/")}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
