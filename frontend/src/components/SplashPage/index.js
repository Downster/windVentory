import SignupForm from "./SignUpForm"
import LoginForm from './LoginForm'
import { useState } from "react"
import './SplashPage.css'
import wind from "./images/wind.jpeg"

const SplashPage = () => {
    const [signup, setSignup] = useState(false);

    return (
        <div className="splash-page-container">
            <h1 className="intro-header">windVentory</h1>
            {signup ? <SignupForm setSignup={setSignup} /> : <LoginForm setSignup={setSignup} />}
        </div>
    )
}

export default SplashPage