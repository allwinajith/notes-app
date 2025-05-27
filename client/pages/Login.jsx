import {  useNavigate } from "react-router-dom";
import "../styles/login.css";
import useApi from "../hooks/useApi";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

function Login() {
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate();

  const { sendRequest, loading, error } = useApi();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    e.target.email.value = "";
    e.target.password.value = "";

    const result = await sendRequest({
      url: "http://localhost:3000/api/auth/login",
      method: "POST",
      data: { email, password },
      withAuth: false,
    });

    if (result) {
      localStorage.setItem("token", JSON.stringify(result.token));
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
      navigate("/notes");
      console.log("Logged in:", result);
    }
  };

  return (
    <div className="loginContainer">
      <div className="windowBar">
        <div className="dotsRight">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <span className="windowTitle">Login</span>
      </div>

      <div className="loginHeader">Login</div>
      <form className="loginBody" onSubmit={handleLogin}>
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
          placeholder="Password"
          name="password"
          required
        />

        <div className="buttonGroup">
          <button type="submit" disabled={loading} className="loginBtn">
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && alert(error)}
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
