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


     
 
export default Login;