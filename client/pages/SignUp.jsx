import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import useApi from "../hooks/useApi";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

function Register() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { sendRequest, loading, error } = useApi();
  const handleRegister = async (e) => {
    e.preventDefault();
    const userName = e.target.username.value;
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const cnfPass = e.target.confirmPassword.value;

    if (pass !== cnfPass) {
      alert("Passwords do not match!");
      return;
    }

    const result = await sendRequest({
      url: "http://localhost:3000/api/auth/register",
      method: "POST",
      data: { userName, email, pass, cnfPass },
      withAuth: false,
    });

    if (result) {
      localStorage.setItem("token", JSON.stringify(result.token));
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
      navigate("/notes");
    }

    e.target.username.value = "";
    e.target.email.value = "";
    e.target.password.value = "";
    e.target.confirmPassword.value = "";
  };

  return (
    <div className="loginContainer">
      <div className="windowBar">
        <div className="dotsRight">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <span className="windowTitle">Register</span>
      </div>

      <div className="loginHeader">Register</div>
      <form className="loginBody" onSubmit={handleRegister}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="username"
          name="username"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="email"
          name="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="password"
          name="password"
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="confirm password"
          required
        />

        <div className="buttonGroup">
          <button type="submit" className="loginBtn">
            {loading ? "Registering..." : "Register"}
          </button>
          {error && alert(error)}
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
