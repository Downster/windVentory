import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import ImageUpload from "../../Dashboard/ImageUpload";
import './SignUpForm.css';

function SignupForm({ inputEmail }) {
    const dispatch = useDispatch();
    const hiddenImageInput = useRef(null);
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
                console.log(errors)
                setErrors(errors.errors)
            }
        } else {
            return setErrors([{ confirmPassword: 'Confirm Password field must be the same as the Password field' }]);
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

    const showImageInput = event => {
        hiddenImageInput.current.click();
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='pt-5 pb-5 pl-5 pr-5'>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Email
                </label>

                {errors && errors.filter((err) => err.email).map((err) => <p className="mt-2 text-sm text-red-600" id="email-error">
                    {err.email}
                </p>)}

                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        value={email}
                        name="name"
                        id="name"
                        className={"block w-full pr-10 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"}
                        aria-invalid="true"
                        onChange={(e) => setEmail(e.target.value)}
                        aria-describedby="email-error"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {errors && errors.length > 0 && errors.filter((err) => err.email).length > 0 && <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
                    </div>
                </div>
                <label htmlFor="name" className="block text-sm mt-3 font-medium text-gray-700">
                    First Name
                </label>
                <p className="mt-2 text-sm text-red-600" id="name-error">
                    {errors && errors.filter((err) => err.firstName).map((err) => <p className="mt-2 text-sm text-red-600" id="email-error">
                        {err.firstName}
                    </p>)}
                </p>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        value={firstName}
                        name="name"
                        id="name"
                        className={"block w-full pr-10 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"}
                        aria-invalid="true"
                        onChange={(e) => setFirstName(e.target.value)}
                        aria-describedby="email-error"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {errors && errors.length > 0 && errors.filter((err) => err.firstName).length > 0 && <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
                    </div>
                </div>
                <label htmlFor="name" className="block text-sm mt-3 font-medium text-gray-700">
                    Last Name
                </label>
                <p className="mt-2 text-sm text-red-600" id="name-error">
                    {errors && errors.filter((err) => err.lastName).map((err) => <p className="mt-2 text-sm text-red-600" id="email-error">
                        {err.lastName}
                    </p>)}
                </p>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        value={lastName}
                        name="name"
                        id="name"
                        className={"block w-full pr-10 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"}
                        aria-invalid="true"
                        onChange={(e) => setLastName(e.target.value)}
                        aria-describedby="email-error"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {errors && errors.length > 0 && errors.filter((err) => err.lastName).length > 0 && <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
                    </div>
                </div>
                <label htmlFor="name" className="block text-sm mt-3 font-medium text-gray-700">
                    Phone Number
                </label>
                <p className="mt-2 text-sm text-red-600" id="name-error">
                    {errors && errors.filter((err) => err.phoneNumber).map((err) => <p className="mt-2 text-sm text-red-600" id="email-error">
                        {err.phoneNumber}
                    </p>)}
                </p>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        value={phoneNumber}
                        name="name"
                        id="name"
                        className={"block w-full pr-10 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"}
                        aria-invalid="true"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        aria-describedby="email-error"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {errors && errors.length > 0 && errors.filter((err) => err.phoneNumber).length > 0 && <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
                    </div>
                </div>
                <label htmlFor="name" className="block text-sm mt-3 font-medium text-gray-700">
                    Password
                </label>
                <p className="mt-2 text-sm text-red-600" id="name-error">
                    {errors && errors.filter((err) => err.password).map((err) => <p className="mt-2 text-sm text-red-600" id="email-error">
                        {err.password}
                    </p>)}
                </p>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        value={password}
                        name="name"
                        id="name"
                        type='password'
                        className={"block w-full pr-10 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"}
                        aria-invalid="true"
                        onChange={(e) => setPassword(e.target.value)}
                        aria-describedby="email-error"

                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {errors && errors.length > 0 && errors.filter((err) => err.password).length > 0 && <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
                    </div>
                </div>
                <label htmlFor="name" className="block text-sm mt-3 font-medium text-gray-700">
                    Confirm Password
                </label>
                <p className="mt-2 text-sm text-red-600" id="name-error">
                    {errors && errors.filter((err) => err.confirmPassword).map((err) => <p className="mt-2 text-sm text-red-600" id="email-error">
                        {err.confirmPassword}
                    </p>)}
                </p>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        value={confirmPassword}
                        name="name"
                        id="name"
                        type='password'
                        className={"block w-full pr-10 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"}
                        aria-invalid="true"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        aria-describedby="email-error"
                        password
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {errors && errors.length > 0 && errors.filter((err) => err.confirmPassword).length > 0 && <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
                    </div>
                </div>
                <div className="form-label-container">
                    <label className="form-label">Profile image</label>
                </div>
                <input
                    className="site-image-input"
                    type='file'
                    ref={hiddenImageInput}
                    accept="image/*"
                    onChange={updateImage}
                    hidden
                />
                <ImageUpload image={image} showImageInput={showImageInput} site={true} />
                <button type="submit" className="mt-3 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign Up</button>

            </form>
        </>


    );
}
export default SignupForm;