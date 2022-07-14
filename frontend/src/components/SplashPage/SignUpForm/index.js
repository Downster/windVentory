import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import './SignUpForm.css';

function SignupForm({ inputEmail }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState(inputEmail ? inputEmail : "");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);

    if (sessionUser) {
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const formData = new FormData()
            formData.append('email', email)
            formData.append('firstName', firstName)
            formData.append('lastName', lastName)
            formData.append('phoneNumber', phoneNumber)
            formData.append('password', password)
            formData.append('image', image)
            setErrors([]);
            const errors = await dispatch(sessionActions.signup(formData))
            if (errors) {
                setErrors(errors.errors)
            }
        } else {
            return setErrors(['Confirm Password field must be the same as the Password field']);
        }
    };


    const demoUser = async (e) => {
        e.preventDefault()
        const credentials = {
            username: 'demo@demo.com',
            password: 'password'
        }
        await dispatch(sessionActions.login(credentials))
        history.push('/')
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <>
            <div className="signup-container">
                <h3 className="sign-up-header">Sign up for windVentory</h3>
                <form onSubmit={handleSubmit} className='sign-up-form'>
                    <ul>
                        {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
                    </ul>
                    <div className="form-label-container">
                        <label className="form-label">Email *</label>
                    </div>
                    <input
                        type="text"
                        className="input-field"
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    <div className="form-label-container">
                        <label className="form-label">First name *</label>
                    </div>
                    <input
                        type="text"
                        className="input-field"
                        value={firstName}
                        placeholder='First Name'
                        onChange={(e) => setFirstName(e.target.value)}

                    />
                    <div className="form-label-container">
                        <label className="form-label">Last name *</label>
                    </div>
                    <input
                        type="text"
                        className="input-field"
                        value={lastName}
                        placeholder='Last Name'
                        onChange={(e) => setLastName(e.target.value)}

                    />
                    <div className="form-label-container">
                        <label className="form-label">Phone number *</label>
                    </div>
                    <input
                        type="text"
                        className="input-field"
                        value={phoneNumber}
                        placeholder='Phone Number'
                        onChange={(e) => setPhoneNumber(e.target.value)}

                    />
                    <div className="form-label-container">
                        <label className="form-label">Password *</label>
                    </div>
                    <input
                        className="input-field"
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <div className="form-label-container">
                        <label className="form-label">Confirm password *</label>
                    </div>
                    <input
                        className="input-field"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}

                    />
                    <div className="form-label-container">
                        <label className="form-label">Profile image</label>
                    </div>
                    <input
                        type='file'
                        onChange={updateImage}
                    />
                    <p className="form-label-required">* Required fields</p>
                    <div className="button-div">
                        <button type="submit" className='signup-button'>Sign Up</button>
                        <button onClick={demoUser} className='demo-button'>Demo User</button>
                    </div>
                </form>
            </div >
        </>


    );
}
export default SignupForm;