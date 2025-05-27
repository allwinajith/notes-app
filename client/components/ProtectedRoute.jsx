import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (err) {
    console.log(err);
    return true;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
