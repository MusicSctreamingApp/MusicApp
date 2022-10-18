import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import imgs from "../pages/assets/logo-white.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ReactDOM from "react-dom/client";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (

    <div className="container-fluid fixed-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-0 py-3">
        {/* <a className="navbar-brand" href="#">Navbar</a> */}

        <Link to="/">
          <img src={imgs} className="img1" />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse  justify-content-center" id="navbarSupportedContent">

          <ul className="nav navbar-nav mr-auto gap-2 justify-content-end">
            <li className="nav-item active">
              <a className="nav-link pe-4" href="#">
                <Link className="fs-4" to="/">Home</Link> <span className="sr-only"></span>
              </a>
            </li>

            {user && user.role === "ADMIN" && (
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  <Link className="fs-4 pe-4" to={"/AdminPanel"}>Admin Panel </Link>{" "}
                  <span className="sr-only"></span>
                </a>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <div className="align-items-right">
                    <Link className="pe-4 fs-4" to={"/myalbums"}> My Albums</Link>
                    <span className="pe-4 fs-4">{user.email}</span>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm active fs-4"
                      onClick={handleClick}
                    >
                      Log Out
                    </button>
                  </div>
                </a>
              </li>
            )}
            {!user && (
              <div className="row">
                <li className="nav-item col">
                  <a className="nav-link" href="#">
                    <div className="align-items-right">
                      <Link className="fs-4 pe-4" to={"/login"}> Login</Link>

                    </div>

                  </a>
                </li>
                <li className="nav-item col">
                  <a className="nav-link" href="#">
                    <div className="align-items-right">

                      <Link className="fs-4 pe-4" to={"/signup"}> Signup</Link>
                    </div>

                  </a>
                </li>
              </div>

            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
