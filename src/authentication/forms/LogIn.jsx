import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { Link, useNavigate } from "react-router-dom";

export default function LogIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate();

    function SignIn(e){
        //prevents automatic auction of Submit button (refreshing page)
        e.preventDefault(); 
    
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            localStorage.setItem("currentUserUID", userCredential.user.uid)
            navigate('/dashboard/BrainDump');
        })
            .catch((error) =>{
                console.log(error);
            })
    }


    return(
        <section className="formContainer">
            <div className="welcomeForm">
                <p>Log In</p>
                <div className="formInputs">
                    <input className="shadow"
                        type='email' 
                        value={email} 
                        onChange={(e => setEmail(e.target.value))}
                        placeholder="E-mail"
                        required/>

                    <input className="shadow"
                    type='password' 
                    value={password}
                    onChange={(e => setPassword(e.target.value))}
                    placeholder="Password"
                    required/>
                </div>
            </div>
            <div>
                <button onClick={SignIn}>Log In</button>
                <div>
                    <p>Dont't Have An Account Yet?</p>
                    <Link to="/createAccount"><p>Sign Up Now</p></Link>
                </div>
            </div>
        </section>
    )

}