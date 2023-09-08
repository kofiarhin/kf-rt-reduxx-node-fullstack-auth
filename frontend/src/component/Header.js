import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
// header
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    const res = await dispatch(logoutUser());

    if (!res.error) {
      navigate("/login");
    }
  };
  return (
    <header>
      <div className="container">
        <Link>
          <h1 className="logo">Logo</h1>
        </Link>
        <nav>
          {user ? (
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
