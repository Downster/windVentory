import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import states from "../../../utils/states";
import { createJobsite, editJobsite } from "../../../store/jobsites";
import MiniMap from "../MiniMap";
import ImageUpload from "../ImageUpload";
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const CreateJobsiteForm = ({ setShowModal, edit, siteId }) => {
    const hiddenImageInput = useRef(null);
    const jobsite = useSelector(state => state.jobsites[siteId])
    const [errors, setErrors] = useState([]);
    const [siteName, setSiteName] = useState((edit) ? jobsite.name : '');
    const [client, setClient] = useState((edit) ? jobsite.client : '')
    const [state, setState] = useState((edit) ? jobsite.state : '');
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [position, setPosition] = useState((jobsite) ? { 'lat': jobsite?.latitude, 'lng': jobsite?.longitude } : { 'lat': 38.155, 'lng': -121.7336 })
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors;
        const formData = new FormData();
        formData.append('siteName', siteName);
        formData.append('state', state);
        formData.append('client', client);
        formData.append('latitude', position.lat)
        formData.append('longitude', position.lng)
        if (image) {
            formData.append('image', image);
            setImageLoading(true);
        }
        if (edit) {
            formData.append('jobsite_id', jobsite.id)
            errors = await dispatch(editJobsite(formData, jobsite.id))
        } else {
            errors = await dispatch(createJobsite(formData));
        }
        setImageLoading(false);

        if (errors) {
            console.log(errors)
            setErrors(errors)
        } else {
            setShowModal(false);

        }


    };

    const handleCancelClick = async (e) => {
        setShowModal(false);
    };
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }


    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const showImageInput = event => {
        hiddenImageInput.current.click();
    };

    useEffect(() => {
        setErrors(errors)
    }, [errors]);


    return (
        <form autoComplete="off" onSubmit={handleSubmit} className="pt-5 pb-5 pl-5 pr-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Job site Name
            </label>
            <p className="mt-2 text-sm text-red-600" id="name-error">
                {errors && errors.filter((err) => err.siteName).map((err) => <p className="mt-2 text-sm text-red-600" id="email-error">
                    {err.siteName}
                </p>)}
            </p>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    value={siteName}
                    name="name"
                    id="name"
                    className={"block w-full pr-10 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"}
                    aria-invalid="true"
                    onChange={(e) => setSiteName(e.target.value)}
                    aria-describedby="email-error"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {errors && errors.length > 0 && errors.filter((err) => err.siteName).length > 0 && <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
                </div>
            </div>

            <label htmlFor="name" className="block text-sm mt-3 font-medium text-gray-700">
                Job site client
            </label>
            <p className="mt-2 text-sm text-red-600" id="name-error">
                {errors && errors.filter((err) => err.client).map((err) => <p className="mt-2 text-sm text-red-600" id="email-error">
                    {err.client}
                </p>)}
            </p>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    value={client}
                    name="name"
                    id="name"
                    className={"block w-full pr-10 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"}
                    aria-invalid="true"
                    onChange={(e) => setClient(e.target.value)}
                    aria-describedby="email-error"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {errors && errors.length > 0 && errors.filter((err) => err.client).length > 0 && <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
                </div>
            </div>
            <div className="mt-5 mb-5">
                <MiniMap position={position} onPositionChanged={(latlng) => setPosition(latlng)} admin={true} />
            </div>
            <Listbox value={state} onChange={setState}>
                {({ open }) => (
                    <>
                        <Listbox.Label className="block mt-2 text-sm font-medium text-gray-700">Job site State</Listbox.Label>
                        <div className="mt-1 relative">
                            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span className="block truncate">{state}</span>
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
                                    {states.map((state) => (
                                        <Listbox.Option
                                            key={state}
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                    'cursor-default select-none relative py-2 pl-8 pr-4'
                                                )
                                            }
                                            value={state}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                        {state}
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
            <ImageUpload image={image} showImageInput={showImageInput} site={true} />
            <div className="site-add-image-container">
                <input
                    className="site-image-input"
                    type='file'
                    ref={hiddenImageInput}
                    accept="image/*"
                    onChange={updateImage}
                    hidden
                />
                <div className="preview-container site">
                    {imageLoading && (
                        <>
                            <h1 className="loading">loading....</h1>
                            <img
                                alt="preview"
                                src={'https://windventory.s3.amazonaws.com/turbine.gif'}
                                className="loading-image"
                            ></img>
                        </>
                    )}
                </div>
                <button className="mt-3 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">{(edit) ? 'Edit Jobsite' : 'Create Jobsite'}</button>
            </div>


        </form>
    );
};

export default CreateJobsiteForm;