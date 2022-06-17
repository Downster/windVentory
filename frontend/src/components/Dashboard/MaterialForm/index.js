import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser, modifyUser } from "../../../store/allUsers";
import { addMaterialToSite, editSiteMaterial } from "../../../store/currentSite";
import { addMaterialToTeam, editTeamMaterial } from "../../../store/currentTeam";
import ImageUpload from "../ImageUpload";
import './MaterialForm.css'


function MaterialForm({ team, setShowModal, material, edit }) {
    const siteStorageId = useSelector(state => state.currentSite.site.connex_location[0].id)
    const teamStorageId = useSelector(state => state.currentTeam.team.location)
    const dispatch = useDispatch();
    const hiddenImageInput = useRef(null);
    const [materialClass, setMaterialClass] = useState((edit) ? material.class_id : 1)
    const [name, setName] = useState((edit) ? material.name : '')
    const [quantity, setQuantity] = useState(edit ? material.quantity : '')
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState([]);


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

    const updateImage = (e) => {
        const file = e.target.files[0];
        console.log('here')
        setImage(file);
    };

    const showImageInput = event => {
        hiddenImageInput.current.click();
    };


    return (
        <form onSubmit={handleSubmit} className='material-form'>
            <ul>
                {errors && errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
            </ul>
            <div className="form-input-container material">
                <div className="form-element-container">
                    <div className="form-label-container">
                        <label className="form-label">Material image</label>
                        <p className="form-label-required">Required</p>
                    </div>
                    <ImageUpload image={image} showImageInput={showImageInput} />
                    <div className="form-label-container">
                        <label className="form-label">Material class</label>
                        <p className="form-label-required">Required</p>
                    </div>
                    <div className="form-element-container">
                        <select
                            className="input-field"
                            value={materialClass}
                            onChange={({ target: { value } }) => setMaterialClass(value)}
                        >
                            <option
                                value={1}
                            >
                                Fiberglass
                            </option>
                            <option
                                value={2}
                            >
                                Carbon
                            </option>
                            <option
                                value={3}
                            >
                                PVC Core
                            </option>
                            <option
                                value={4}
                            >
                                Balsa Core
                            </option>
                            <option
                                value={5}
                            >
                                Slow Curing Adhesive
                            </option>
                            <option
                                value={6}
                            >
                                Fast Curing Adhesive
                            </option>
                            <option
                                value={7}
                            >
                                Epoxy
                            </option>
                            <option
                                value={8}
                            >
                                Plastic Sheeting
                            </option>
                            <option
                                value={9}
                            >
                                Spreaders
                            </option>
                            <option
                                value={10}
                            >
                                Stir Sticks
                            </option>
                        </select>
                    </div>

                </div>
                <div className="form-label-container">
                    <label className="form-label">Material name</label>
                    <p className="form-label-required">Required</p>
                </div>
                <div className="form-element-container">
                    <input
                        type="text"
                        className="input-field"
                        value={name}
                        placeholder='Material Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-label-container">
                    <label className="form-label">Material quantity</label>
                    <p className="form-label-required">Required</p>
                </div>
                <div className="form-element-container">
                    <input
                        type="number"
                        className="input-field"
                        value={quantity}
                        placeholder='Quantity'
                        onChange={(e) => setQuantity(e.target.value)}

                    />
                </div>
                <div className="material-add-image-container">
                    <input
                        className="material-image-input"
                        type='file'
                        ref={hiddenImageInput}
                        accept="image/*"
                        onChange={updateImage}
                    />
                    <div className="preview-container site">
                        {imageLoading && (
                            <>
                                <h1 className="loading">loading....</h1>
                                <img
                                    alt="preview"
                                    src={'https://windventory.s3.amazonaws.com/turbine.gif'}
                                    className="loading-image site"
                                ></img>
                            </>
                        )}
                    </div>
                </div>
                <div className="button-div">
                    <button type="submit" className='material-button'>{(edit) ? 'Edit Material' : 'Add Material'}</button>
                </div>
            </div>
        </form >


    );
}
export default MaterialForm;