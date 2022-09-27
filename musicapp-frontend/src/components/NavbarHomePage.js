import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import imgs from "../pages/assets/logo-white.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    // <header>
    //    {/* <div className="container">  */}
    //   <div className="home">
    //   <div className="songs">
    //     <Link to="/">
    //       <img src={imgs} className="img1" />
    //     </Link>
    //     <nav>
    //       {user && (
    //         <div>
    //           <span>{user.email}</span>
    //           <Link to={"/myalbums"}> My Albums</Link>
    //           <button onClick={handleClick}>Log Out</button>
    //         </div>
    //       )}
    //       {!user && (
    //         <div>
    //           <Link to="/login">Login</Link>
    //           <Link to="/signup">Sign Up</Link>
    //         </div>
    //       )}
    //       {user && user.role === "ADMIN" && (
    //         <div>
    //           <Link to="/AdminPanel">Admin Panel</Link>
    //         </div>
    //       )}
    //     </nav>
    //   </div>
    //   </div>
    //    {/* </div>  */}
    // </header>
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {/* <a className="navbar-brand" href="#">Navbar</a> */}
        <Link to="/">
          <img src={imgs} className="img1" />
        </Link>
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button> */}

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                <Link to="/">Home</Link> <span className="sr-only"></span>
              </a>
            </li>

            {user && user.role === "ADMIN" && (
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  <Link to={"/AdminPanel"}>Admin Panel </Link>{" "}
                  <span className="sr-only"></span>
                </a>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <div className="align-items-right">
                    <span>{user.email}</span>
                    <Link to={"/myalbums"}> My Albums</Link>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm active"
                      onClick={handleClick}
                    >
                      Log Out
                    </button>
                  </div>
                </a>
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <div className="align-items-right">
                    <Link to={"/login"}> Login</Link>
                    <Link to={"/signup"}> Signup</Link>
                  </div>
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
