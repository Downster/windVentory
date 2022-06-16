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
                {!signup && < div className="windVentory-intro">
                    <div className="content">
                        <h1 className="intro-text">windVentory is an Inventory tracking application focused on cutting repair costs in the wind energy sector</h1>
                    </div>
                </div>}
                {!signup && <div className="features">
                    <div className="content2">
                        <h1>- Track Inventory</h1>
                        <h1>- Chat with teammates</h1>
                    </div>
                </div>}
                <div className="developer-div">
                    <DeveloperComponent />
                </div>
            </div>
        </>
    )
}

export default SplashPage