import SignupForm from "./SignUpForm"
import LoginForm from './LoginForm'
import { useState } from "react"
import './SplashPage.css'
import DeveloperComponent from "./DeveloperComponent"


const SplashPage = () => {
    const [signup, setSignup] = useState(false);

    return (
        <>
            <div className="splash-page-wrapper">
                <div className="splash-page-container">
                    <h1 className="intro-header">windVentory</h1>
                    {signup ? <SignupForm setSignup={setSignup} /> : <LoginForm setSignup={setSignup} />}
                </div>
                <div className="developer-div">
                    <DeveloperComponent />
                </div>
            </div>
        </>
    )
}

export default SplashPage