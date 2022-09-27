import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSideBarButtons = () => {};

  const handleDelete = async (_id) => {
    const response = await fetch(`/api/admin/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setUsers(users.filter((s) => s._id !== _id));
    } else {
      setError(json.error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/admin/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setUsers(json);
      }
    };
    if (user) {
      fetchUsers();
    }
  }, [setUsers, user]);

  return (
    <div className="container-fluid">
      <div className="row">
        <nav
          id="sidebarMenu"
          className="col-md-3 col-lg-2 d-md-block bg-Secondary sidebar collapse"
        >
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="/AdminPanel">
                  <span className= "h1" data-feather="home"></span>
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <button
                  type="button" className="btn-secondary btn-primary text-primary" data-toggle="button" aria-pressed="false" autocomplete="off"
                  onClick={() => handleSideBarButtons()}
                >
                  <span data-feather="file"></span>
                  Users
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button" className="btn-secondary btn-primary text-primary" data-toggle="button" aria-pressed="false" autocomplete="off"
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
            <h1 className="h2 ">Admin Panel</h1>
          </div>
          <h2 className="text-light">Users</h2>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col" className="text-light">#ID</th>
                  <th scope="col" className="text-light">Email</th>
                  <th scope="col" className="text-light">Role</th>
                  <th scope="col" className="text-light">Edit</th>
                  <th scope="col" className="text-light">Banned</th>
                </tr>
              </thead>
              <tbody>
                {error && <div className="error">{error}</div>}
                {users &&
                  users.map((users) => (
                    <tr key={users._id}>
                      <td className="text-light">{users._id}</td>
                      <td className="text-light">{users.email}</td>
                      <td className="text-light">{users.role}</td>
                      <td>
                        <button>
                          <Link to="/UpdateUser" state={{ userInfo: users }}>
                            Edit
                          </Link>
                        </button>
                      </td>
                      <td>
                        <button type="button" className="btn-secondary btn-primary text-primary" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={() => handleDelete(users._id)}>
                          Delete | Ban
                        </button>
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
