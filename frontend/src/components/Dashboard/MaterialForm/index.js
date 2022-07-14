import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMaterialToSite, editSiteMaterial } from "../../../store/currentSite";
import { addMaterialToTeam, editTeamMaterial } from "../../../store/currentTeam";
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import ImageUpload from "../ImageUpload";
import './MaterialForm.css'


function MaterialForm({ team, setShowModal, material, edit }) {
    const siteStorageId = useSelector(state => state?.currentSite?.site?.connex_id[0]?.id)
    const teamStorageId = useSelector(state => state?.currentTeam?.team?.location)
    const dispatch = useDispatch();
    const hiddenImageInput = useRef(null);
    const [materialClass, setMaterialClass] = useState((edit) ? material.class_id : 1)
    const [name, setName] = useState((edit) ? material.name : '')
    const [quantity, setQuantity] = useState(edit ? material.quantity : '')
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState([]);

    const types = [
        { value: 1, name: 'Fiberglass' },
        { value: 2, name: 'Carbon' },
        { value: 3, name: 'PVC Core' },
        { value: 4, name: 'Balsa Core' },
        { value: 5, name: 'Slow Curing Adhesive' },
        { value: 6, name: 'Fast Curing Adhesive' },
        { value: 7, name: 'Epoxy' },
        { value: 8, name: 'Plastic Sheeting' },
        { value: 9, name: 'Spreaders' },
    ]

    function toName(value) {
        return types.find((el) => el.value === value).name
    }
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        let errors;
        if (edit) {
            formData.append('material_id', material.id)
        }
        formData.append('class_id', materialClass)
        formData.append('storage_id', (team) ? teamStorageId : siteStorageId)
        formData.append('name', name)
        formData.append('quantity', quantity)
        if (image) {
            formData.append('image', image)
            setImageLoading(true)
        }

        if (edit) {
            if (team) {
                errors = await dispatch(editTeamMaterial(material.id, formData))
            } else {
                errors = await dispatch(editSiteMaterial(material.id, formData))
            }
        } else {
            if (team) {
                errors = await dispatch(addMaterialToTeam(formData))
            } else {
                errors = await dispatch(addMaterialToSite(formData))
            }
        }
        if (errors) {
            console.log(errors)
            setImageLoading(false)
            if (errors.errors) {
                if (Array.isArray(errors.errors)) {
                    setErrors(errors.errors)
                } else {
                    setErrors([errors.errors])
                }
            } else if (errors.image_errors) {
                setErrors([errors.image_errors])
                setImage(null)
                setImageLoading(false)
            }
        } else {
            setShowModal(false)
        }


    };

    function hasErrors(name) {
        const error = errors.filter((err) => err[name])
        return error ? true : false
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const showImageInput = event => {
        hiddenImageInput.current.click();
    };


    return (
        <form onSubmit={handleSubmit} className='material-form'>
            {/* <ul>
                {errors && errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
            </ul> */}
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Material Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    value={name}
                    name="name"
                    id="name"
                    className={hasErrors('name') ? "block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md" : "block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"}
                    placeholder="Material Name"
                    aria-invalid="true"
                    onChange={(e) => setName(e.target.value)}
                    aria-describedby="email-error"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
            </div>
            <p className="mt-2 text-sm text-red-600" id="name-error">
                {errors && errors.filter((err) => err.name).map((err) => <p className="mt-2 text-sm text-red-600" id="email-error">
                    {err.name}
                </p>)}
            </p>
            <Listbox value={materialClass} onChange={setMaterialClass}>
                {({ open }) => (
                    <>
                        <Listbox.Label className="block text-sm font-medium text-gray-700">Material Class</Listbox.Label>
                        <div className="mt-1 relative">
                            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span className="block truncate">{toName(materialClass)}</span>
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
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    onChange={((e) => setQuantity(e.target.value))}
                    className="block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                    placeholder="Quantity"
                    defaultValue='1'
                    aria-invalid="true"
                    aria-describedby="email-error"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
            </div>
            <p className="mt-2 text-sm text-red-600" id="quantity-error">
                {errors && errors.filter((err) => err.quantity).map((err) => <p className="mt-2 text-sm text-red-600" id="email-error">
                    {err.quantity}
                </p>)}
            </p>
            <input
                className="material-image-input"
                type='file'
                ref={hiddenImageInput}
                accept="image/*"
                onChange={updateImage}
            />

            <div className="sm:col-span-6">
                <label htmlFor="material-photo" className="block text-sm font-medium text-gray-700">
                    Material Image
                </label>
                <ImageUpload image={image} showImageInput={showImageInput} />
            </div>
            <p className="mt-2 text-sm text-red-600" id="quantity-error">
                {errors && errors.filter((err) => err.image).map((err) => <p className="mt-2 text-sm text-red-600" id="email-error">
                    {err.image}
                </p>)}
            </p>
            <div className="preview-container site">
                {imageLoading && (
                    <>
                        <img
                            alt="preview"
                            src={'https://windventory.s3.amazonaws.com/turbine.gif'}
                            className="loading-image"
                        ></img>
                    </>
                )}
            </div>
            <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {(edit) ? 'Edit Material' : 'Add Material'}
            </button>
        </form >


    );
}
export default MaterialForm;