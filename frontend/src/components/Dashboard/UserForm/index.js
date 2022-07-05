import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser, modifyUser } from "../../../store/allUsers";
import { loadLeads } from '../../../store/leads'
import roleToNum from "../../../utils/roleToNum";


function UserForm({ setShowModal, user, edit }) {
    console.log(user)
    const dispatch = useDispatch();
    const [email, setEmail] = useState((edit) ? user.email : "");
    const [role, setRole] = useState((edit) ? roleToNum(user.role[0]) : 1)
    const [firstName, setFirstName] = useState((edit) ? user.firstName : '');
    const [lastName, setLastName] = useState((edit) ? user.lastName : '')
    const [phoneNumber, setPhoneNumber] = useState((edit) ? user.phoneNumber : '')
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState((edit) ? user.id : "")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        let errors;
        formData.append('email', email)
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        formData.append('phoneNumber', phoneNumber)
        formData.append('roleId', role)
        if (!edit && password !== confirmPassword) {
            return setErrors(['Confirm Password field must be the same as the Password field']);
        } else if (edit) {
            formData.append('userId', userId)
            errors = await dispatch(modifyUser(formData, user.id))
            await dispatch(loadLeads())
        } else if (edit && password === confirmPassword) {
            formData.append('password', password)
            errors = await dispatch(createNewUser(formData))
        }
        if (errors) {
            console.log(errors)
        }
        setShowModal(false)
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
                        className="input-field"
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
                {!edit && <div className="form-element-container">
                    <input
                        className="input-field"
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                }
                {!edit && <div className="form-element-container">
                    <input
                        className="input-field"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                }
                <div className="button-div">
                    <button type="submit" className='edit-user-button'>{(edit) ? 'Edit user' : 'Create User'}</button>
                </div>
            </div>
        </form>


    );
}
export default UserForm;