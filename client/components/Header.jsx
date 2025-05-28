import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    const perm = confirm("Are you sure, You want to logout?");
    if (!perm) {
      return;
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };
  return (
    <>
      <header className="mainHeader">
        <div className="logo">Keep Notes</div>
        <nav>
          <Link to="/about">About</Link>
          <Link to="/notes">Notes</Link>
          <Link to="/account">Account</Link>
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            Logout
          </Link>
        </nav>
      </header>
      <div className="containerBody"></div>
    </>
  );
}

export default Header;
