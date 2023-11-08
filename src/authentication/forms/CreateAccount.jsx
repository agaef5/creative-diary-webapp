import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { database } from "../../../firebase-config";
import { ref, set } from "firebase/database";

export default function CreateAccount(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    // upload user data to Realtime Database
    async function writeUserData(userID, email, username) {
        set(ref(database, 'users/' + userID), {
            username: username,
            email: email,
            theme: 'light',
            color: 'green'
        });
      }

    function SignUp(e){
        //prevents automatic auction of Submit button (refreshing page)
        e.preventDefault(); 
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //call function that uploads data from Authentication to Realtime Database
            writeUserData(userCredential.user.uid, email, username);
            // navigate user to dashboard with UseNAvigate
            navigate('/dashboard/BrainDump');
            localStorage.setItem("currentUserUID", userCredential.user.uid)
        })
        .catch((error) =>{
            console.log(error);
        });
    }

    return(
        <section className="formContainer">
            <div className="welcomeForm">
                <p>Create Account</p>
                <div className="formInputs">
                    <input className="shadow"
                        type='text' 
                        value={username} 
                        onChange={(e => setUsername(e.target.value))}
                        placeholder="Name"
                        required/>


                    <input className="shadow"
                        type='email' 
                        value={email} 
                        onChange={(e => setEmail(e.target.value))}
                        placeholder="E-mail"/>

                    <input className="shadow"
                        type='password' 
                        value={password}
                        onChange={(e => setPassword(e.target.value))}
                        placeholder="Password"/>

                    <div>
                        <input type="checkbox" id="privacyPolicy"/>
                        <label for="privacyPolicy">I Read And Accept The <span>Privacy Policy</span></label>
                    </div>
                    
                    
                    
                </div>
            </div>
            <div>
                <button onClick={SignUp}>Create Account</button>
                <div>
                    <p>Already Have An Account?</p>
                    <Link to="/logIn"><p>Sign Up Now</p></Link>
                </div>
            </div>
        </section>
    )

}