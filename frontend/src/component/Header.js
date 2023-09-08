import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <div className="container">
        <Link>
          <h1 className="logo">Logo</h1>
        </Link>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
