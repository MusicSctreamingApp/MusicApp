import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const AdminPanel = () => {
  const [users, setUser] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSideBarButtons = () => { };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/admin/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setUser(json);
      }
    };
    if (user) {
      fetchUsers();
    }
  }, [setUser, user]);

  return (
    <div className="container-fluid">
      <div className="row">
        <nav
          id="sidebarMenu"
          className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        >
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="/AdminPanel">
                  <span data-feather="home"></span>
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => handleSideBarButtons()}
                >
                  <span data-feather="file"></span>
                  Users
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => navigate("/UpdateUser")}
                >
                  <span data-feather="file"></span>
                  Update User
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Admin Panel</h1>
          </div>
          <h2>Users</h2>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">#id</th>
                  <th scope="col">email</th>
                  <th scope="col">role</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Banned</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((users) => (
                    <tr key={users._id}>
                      <td>{users._id}</td>
                      <td>{users.email}</td>
                      <td>user role : {users.role}</td>
                      <td>
                        <button>
                          <Link to="/UpdateUser" state={{ userInfo: users }}>
                            Edit
                          </Link>
                        </button>
                      </td>
                      <td>
                        <button>Delete / Ban </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
