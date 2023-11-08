import { Outlet } from "react-router-dom";
import '../styles/welcomePage.css'
import '../index.css'
import logo from "../styles/images/logo.png"
import welcome from "../styles/images/welcome.png"



export default function WelcomePage(){


    return(
        <section className="welcomePage">
          <div className="welcomeContent">
            <img src={logo}/>
            <h1>Welcome To BrainDump</h1>
            <p>Your Digital Creative Journal</p>
          </div>

          <Outlet/>

          <div className="welcomeImg">
            <img src={welcome}/>
          </div>
        </section>
    )
}