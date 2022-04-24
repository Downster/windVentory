import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import './SignUpForm.css';

function SignupForm({ setSignup }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
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
            return dispatch(sessionActions.signup(formData))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    const changeSignup = (e) => {
        e.preventDefault();
        setSignup(false);

    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className='sign-up-form'>
                <h3 className="sign-up-header">Sign up for windVentory</h3>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <input
                    type="text"
                    className="input-field"
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="input-field"
                    value={firstName}
                    placeholder='First Name'
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="input-field"
                    value={lastName}
                    placeholder='Last Name'
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="input-field"
                    value={phoneNumber}
                    placeholder='Phone Number'
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <input
                    className="input-field"
                    type="password"
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    className="input-field"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <input
                    type='file'
                    onChange={updateImage}
                />
                <div className="button-div">
                    <button type="submit" className='signup-button'>Sign Up</button>
                    <button onClick={changeSignup} className='back-to-login-button'>Back to Login!</button >
                </div>
            </form>
        </div >


    );
}
export default SignupForm;