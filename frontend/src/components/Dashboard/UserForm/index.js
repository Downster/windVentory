import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


function UserForm({ setShowModal, userId, edit }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const formData = new FormData()
            formData.append('email', email)
            formData.append('firstName', firstName)
            formData.append('lastName', lastName)
            formData.append('phoneNumber', phoneNumber)
            formData.append('password', password)
            setErrors([]);
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };


    return (
        <form onSubmit={handleSubmit} className='sign-up-form'>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="user-form-input-container">
                <div className="form-element-container">
                    <input
                        type="text"
                        className="input-field"
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-element-container">
                    <input
                        type="text"
                        className="input-field"
                        value={firstName}
                        placeholder='First Name'
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-element-container">
                    <select
                        value={role}
                        onChange={({ target: { value } }) => setRole(value)}
                    >
                        <option
                            value={1}
                        >
                            Worker
                        </option>
                        <option
                            value={2}
                        >
                            Lead
                        </option>
                        <option
                            value={3}
                        >
                            Supervisor
                        </option>
                        <option
                            value={4}
                        >
                            Admin
                        </option>
                    </select>

                </div>
                <div className="form-element-container">
                    <input
                        type="text"
                        className="input-field"
                        value={lastName}
                        placeholder='Last Name'
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-element-container">
                    <input
                        type="text"
                        className="input-field"
                        value={phoneNumber}
                        placeholder='Phone Number'
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-element-container">
                    <input
                        className="input-field"
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-element-container">
                    <input
                        className="input-field"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="button-div">
                    <button type="submit" className='signup-button'>Create User</button>
                </div>
            </div>
        </form>


    );
}
export default UserForm;