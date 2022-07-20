import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser, modifyUser } from "../../../store/allUsers";
import { loadLeads } from '../../../store/leads'
import roleToNum from "../../../utils/roleToNum";
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'


function UserForm({ setShowModal, user, edit }) {
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

    const types = [
        { value: 1, name: 'Worker' },
        { value: 2, name: 'Lead' },
        { value: 3, name: 'Supervisor' },
        { value: 4, name: 'Admin' },
    ]


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
        } else if (!edit && password === confirmPassword) {
            formData.append('password', password)
            errors = await dispatch(createNewUser(formData))
        }
        if (errors) {
            console.log(errors)
            setErrors(errors.errors)
        } else {
            setShowModal(false)
        }
    };
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    function toName(value) {
        return types.find((el) => el.value === value).name
    }


    return (
        <form onSubmit={handleSubmit} className='sign-up-form'>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Email
            </label>
            <p className="mt-2 text-sm text-red-600" id="name-error">
                {errors && errors.filter((err) => err.email).map((err) => <p className="mt-2 text-sm text-red-600" id="email-error">
                    {err.email}
                </p>)}
            </p>
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
            <Listbox value={role} onChange={setRole}>
                {({ open }) => (
                    <>
                        <Listbox.Label className="block mt-2 text-sm font-medium text-gray-700">User Role</Listbox.Label>
                        <div className="mt-1 relative">
                            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span className="block truncate">{toName(role)}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {types.map((type) => (
                                        <Listbox.Option
                                            key={type.value}
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                    'cursor-default select-none relative py-2 pl-8 pr-4'
                                                )
                                            }
                                            value={type.value}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                        {type.name}
                                                    </span>

                                                    {selected ? (
                                                        <span
                                                            className={classNames(
                                                                active ? 'text-white' : 'text-indigo-600',
                                                                'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                            )}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
            {!edit && <div className="form-element-container">
                <input
                    className="input-field"
                    type="password"
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
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
                />
            </div>
            }

            <button type="submit" className="mt-3 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{(edit) ? 'Edit user' : 'Create User'}</button>

        </form>


    );
}
export default UserForm;