import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import imgs from '../pages/assets/logo-white.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

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

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  {/* <a class="navbar-brand" href="#">Navbar</a> */}
  <Link to="/">
          <img src={imgs} className="img1" />
        </Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">  
        <Link to="/">Home</Link> <span class="sr-only"></span>
        </a>
      </li>

      {user && user.user.role === "ADMIN" && (
        <li class="nav-item active">
            <a class="nav-link" href="#">  
            <Link to={"/AdminPanel"}>Admin Panel </Link> <span class="sr-only"></span>
            </a>
        </li> 
      )}
      
      <li class="nav-item">
        <a class="nav-link" href="#">
        {user && (<div>
                <span>{user.email}</span>
               <Link to={"/myalbums"}> My Albums</Link>
               <button type="button" class="btn btn-secondary btn-sm active" onClick={handleClick}>Log Out</button>
        </div>)}
        </a>
      </li>

    </ul>
  </div>
</nav>
  );
};

export default Navbar;
