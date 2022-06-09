import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser, modifyUser } from "../../../store/allUsers";
import { addMaterialToSite, editSiteMaterial } from "../../../store/currentSite";
import roleToNum from "../../../utils/roleToNum";


function MaterialForm({ setShowModal, material, edit }) {
    const dispatch = useDispatch();
    const [materialClass, setMaterialClass] = useState((edit) ? material.class_id : 1)
    const [name, setName] = useState((edit) ? material.name : '')
    const [quantity, setQuantity] = useState(edit ? material.quantity : '')
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        let errors;
        formData.append('class_id', materialClass)
        formData.append('storage_id', 4)
        formData.append('name', name)
        formData.append('quantity', quantity)
        if (image) {
            formData.append('image', image)
        }

        if (edit) {
            errors = await dispatch(editSiteMaterial(material.id, formData))
        } else {
            errors = await dispatch(addMaterialToSite(formData))
        }
        if (errors) {
            if (Array.isArray(errors.errors)) {
                setErrors(errors.errors)
            } else {
                setErrors([errors.errors])
            }
        } else {
            setShowModal(false)
        }

    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };


    return (
        <form onSubmit={handleSubmit} className='sign-up-form'>
            <ul>
                {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="user-form-input-container">
                <div className="form-element-container">
                    <select
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
                    </select>

                </div>
                <div className="form-element-container">
                    <input
                        type="text"
                        className="input-field"
                        value={name}
                        placeholder='Material Name'
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-element-container">
                    <input
                        type="number"
                        className="input-field"
                        value={quantity}
                        placeholder='Quantity'
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>
                <div className="material-add-image-container">
                    <input
                        type='file'
                        accept="image/*"
                        onChange={updateImage}
                    />
                    <div className="preview-container site">
                        {image && (
                            <img
                                alt="preview"
                                src={(edit) ? image : null}
                                className="preview-image site"
                            ></img>
                        )}
                    </div>
                </div>
                <div className="button-div">
                    <button type="submit" className='signup-button'>{(edit) ? 'Edit Material' : 'Add Material'}</button>
                </div>
            </div>
        </form>


    );
}
export default MaterialForm;