import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
  return (
    <header className="mainHeader">
      <div className="logo">Keep Notes</div>
      <nav>
        <Link to="/about">About</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/account">Account</Link>
        <Link to="/">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
