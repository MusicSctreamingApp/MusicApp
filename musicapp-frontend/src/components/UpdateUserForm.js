import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateUserForm = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const { userInfo } = location.state;
  let navigate = useNavigate();

  useEffect(() => {
    set_id(userInfo._id);
    setEmail(userInfo.email);
    setAvatar(userInfo.avatar);
    setBio(userInfo.bio);
    setRole(userInfo.role);
  }, [userInfo]);
  const [_id, set_id] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const [resOk, setResOk] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);

  //change select value
  const handleSelect = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user && !user.role === "ADMIN") {
      setError("Admin only Area");
      return;
    }

    const response = await fetch(`/api/admin/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        email: email,
        avatar: avatar,
        bio: bio,
        role: role,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      setResOk(false);
    }
    if (response.ok) {
      setEmptyFields([]);
      setEmail("");
      setAvatar("");
      setBio("");
      setRole("");
      setError(null);
      setResOk(true);
      navigate(`/AdminPanel`);
    }
  };
  return (
    <div className="container">
      <div className="row w-25">
        <h3 className="center">Update User</h3>
        <div className="font-weight-light">
          <label htmlFor="id">User Id:</label>
          <p id="id" name="id">
            {_id}
          </p>
        </div>
      </div>

      <form id="form" onSubmit={handleSubmit}>
        <div className="row w-25">
          <label htmlFor="email">Album email:</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={emptyFields.includes("email") ? "error" : ""}
          />
        </div>
        <div className="row w-25">
          <label htmlFor="role">User Role:</label>
          <select
            type="text"
            name="role"
            id="role"
            onChange={(e) => handleSelect(e)}
            value={role}
            className={emptyFields.includes("role") ? "error" : ""}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <div className="row w-25">
          <label htmlFor="avatar">Avatar Url:</label>
          <input
            type="text"
            name="avatar"
            id="avatar"
            onChange={(e) => setAvatar(e.target.value)}
            value={avatar}
            className={emptyFields.includes("avatar") ? "error" : ""}
          />
        </div>
        <div className="row w-25">
          <label htmlFor="bio">Bio:</label>
          <input
            type="text"
            name="bio"
            id="bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            className={emptyFields.includes("bio") ? "error" : ""}
          />

        </div>
        <div className="row w-25">
          <div className="center">
            <button type="submit">Update User</button>
          </div>
          {error && <div className="error">{error}</div>}
          {resOk && (
            <div className="alert alert-success" role="alert">
              User successfully updated
            </div>
          )}
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default UpdateUserForm;
