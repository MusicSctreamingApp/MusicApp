import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Music App</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <Link to={"/myalbums"}> My Albums</Link>
              <button onClick={handleClick}>Log Out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
          {user && user.role === "ADMIN" && (
            <div>
              <Link to="/AdminPanel">Admin Panel</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;