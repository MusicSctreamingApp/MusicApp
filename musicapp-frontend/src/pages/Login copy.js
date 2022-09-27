import { useState } from "react";
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return ( 
//        
   <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
    <div className="card bg-dark text-white" >
    <div className="mb-md-5 mt-md-4 pb-5">
        <form onSubmit={handleSubmit} className="login">
            <h3>Log In</h3>

            <label htmlFor="email" className = "fw-bold mb-2 text-uppercase text-white">Email:</label>
            <input type="email" name="email" id="email" className = "form-control form-control-lg"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
             />
             <label htmlFor="password" className = "fw-bold mb-2 text-uppercase text-white">Password:</label>
            <input type="password" name="password" id="password" className = "form-control form-control-lg"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
             />
             <button className = "fw-bold mb-2 text-uppercase text-white" disabled={isLoading}>Log In</button>
             {error && <div className="error">{error}</div>}
        </form>
    </div>
         </div>
         </div>
         </div>
         </div>
    );}



{/* <section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" style="border-radius: 1rem;">
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <div className="form-outline form-white mb-4">
                <input type="email" id="typeEmailX" className="form-control form-control-lg" />
                <label className="form-label" for="typeEmailX">Email</label>
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" id="typePasswordX" className="form-control form-control-lg" />
                <label className="form-label" for="typePasswordX">Password</label>
              </div>

              <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

              <button className="btn btn-outline-light btn-lg px-5" type="submit" onSubmit={handleSubmit}>Login</button>

              <div className="d-flex justify-content-center text-center mt-4 pt-1">
                <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
              </div>

            </div>

            <div>
              <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section> */}





     
 
export default Login;