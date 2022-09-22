import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
// Test
const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('')
    const [bio, setBio] = useState('')
    const { signup, error, isLoading } = useSignup() 

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return ( 
        <form onSubmit={handleSubmit} className="signup">
            <h3>Sign up</h3>

            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
             />
             <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
             />
            {/* <label htmlFor="avatar">Avatar:</label>
            <input type="avatar" name="avatar" id="avatar"
                onChange={(e) => setAvatar(e.target.value)}
                value={avatar}
             /> */}

            <form method="post" enctype="multipart/form-data" id="file_upload"> 
	        <p>Avatar：</p>
	            <img id="image-preview"/>
	            <p>
	            <input type="file" id="file" name="upload_image" accept="image/gif, image/jpeg, image/png, image/jpg"/>
	            <input type="button" value="Upload Avatar" onclick="save()"  
                // onChange={(e) => setAvatar(e.target.value)}
                // value={avatar} 
                />
	        </p>
                <p id="info"></p>
             </form>  

             <label htmlFor="bio">Bio:</label>
                <input type="bio" name="bio" id="bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
             />
             <button disabled={isLoading}>Sign In</button>
             {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default Signup;
