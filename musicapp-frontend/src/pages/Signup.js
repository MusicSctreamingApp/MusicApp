import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()
  const [emptyFields, setEmptyFields] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };


  return (
    <div className="col-lg-12 col-xl-5 m-auto">
      <div class=" card text-black  bg-light bg-gradient">
        <div class="col">
          <h3 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" >Sign up</h3>

          <form className="mx-1 mx-md-4 " onSubmit={handleSubmit}>
            <div class="form-group">
              <label className="form-label" htmlFor="title">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={emptyFields.includes("email") ? "error" : "" + " form-control mb-2"}
              />

              <label className="form-label" htmlFor="artist">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={emptyFields.includes("password") ? "error" : "" + " form-control mb-2"}
              />

              <div className="form-group text-center">

                <button disabled={isLoading} className="btn btn-warning btn-lg btn-block mt-4 mb-4">Sign In</button>
              </div>
              {error && <div className="error">{error}</div>}
            </div>
          </form>
          <div>

          </div>
        </div>
      </div>
    </div>

  );
};


export default Signup;
