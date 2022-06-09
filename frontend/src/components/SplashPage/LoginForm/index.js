// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginForm({ setSignup }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const { errors } = await dispatch(sessionActions.login({ username, password }))
        if (errors) {
            if (Array.isArray(errors)) {
                setErrors(errors)
            } else {
                setErrors([errors])
            }
        }
    }

    const demoUser = async () => {
        const credentials = {
            username: 'demo@demo.com',
            password: 'password'
        }
        await dispatch(sessionActions.login(credentials))
    }

    const changeSignup = (e) => {
        e.preventDefault();
        setSignup(true);

    }

    return (
        <div className='login-container' >
            <h3 className='login-header'>Login to windVentory</h3>
            <form onSubmit={handleSubmit} className='splash-form'>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <input
                    type="text"
                    className='input-field'
                    placeholder='Email'
                    value={username}
                    onChange={(e) => setCredential(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    placeholder='Password'
                    className='input-field'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className='button-div'>

                    <button className='login-button' type="submit">Log In</button>
                    <button className='sign-up-change' onClick={changeSignup}>Not a member? Sign up!</button>
                    <button onClick={demoUser} className='login-button'>Demo User</button>
                </div>
            </form>
        </div >
    );
}

export default LoginForm;