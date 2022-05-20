import SignupForm from "./SignUpForm"
import LoginForm from './LoginForm'
import { useLocation } from "react-router"
import { useState } from "react"
import './SplashPage.css'


const SplashPage = () => {
    const location = useLocation();
    const [signup, setSignup] = useState(false);

    console.log(location)
    return (
        <div className="splash-page-container">
            <h1 className="intro-header">windVentory</h1>
            {signup ? <SignupForm setSignup={setSignup} /> : <LoginForm setSignup={setSignup} />}
        </div>
    )
}

export default SplashPage