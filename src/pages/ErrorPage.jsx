 import { Link } from 'react-router-dom'
import image404 from '../styles/images/404sadguy.png'
 
 export function ErrorPage(){
    <div className="errorPage">
        <div className="errorPageContainer">
            <div className="errorPageContent">
                <h1>Error 404</h1>
                <p>Oops, looks like you've gone off the map! 
                    Let's steer you back to familiar territory. </p>
                <p>Head back home and let's pretend this never happened!</p>
                <Link to='/'>
                    <button>Go Home</button>
                </Link>
                
            </div>
            <div className="errorPageImage">
                <img src={image404}/>
            </div>
        </div>
    </div>
 }