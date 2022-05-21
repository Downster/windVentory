import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import states from "../../../utils/states";
import { createJobsite, editJobsite, getJobsites } from "../../../store/jobsites";

const CreateJobsiteForm = ({ setShowModal, edit, siteId }) => {
    const history = useHistory();
    const location = useLocation();
    const jobsite = useSelector(state => state.jobsites[siteId])
    const [errors, setErrors] = useState({});
    const [siteName, setSiteName] = useState((edit) ? jobsite.name : '');
    const [client, setClient] = useState((edit) ? jobsite.client : '')
    const [state, setState] = useState((edit) ? jobsite.state : '');
    const [image, setImage] = useState(null);
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [imageLoading, setImageLoading] = useState(false);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const errors = {};
        if (siteName.length > 40)
            errors['group_name'] = 'Group name must be less than 40 characters.';
        if (client.length > 60)
            errors['client_name'] = 'Client name must be less than 60 characters';
        setErrors(errors);
    }, [siteName, client]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors;
        const formData = new FormData();
        formData.append('siteName', siteName);
        formData.append('state', state);
        formData.append('client', client);
        formData.append('latitude', latitude)
        formData.append('longitude', longitude)
        if (image) {
            formData.append('image', image);
            setImageLoading(true);
        }
        if (edit) {
            errors = await dispatch(editJobsite(formData, jobsite.id))
        } else {
            errors = await dispatch(createJobsite(formData));
        }
        setImageLoading(false);

        if (errors) {
            console.log(errors)
        }


        setShowModal(false);
    };

    const handleCancelClick = async (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const updateSiteName = (e) => {
        setSiteName(e.target.value);
    };

    const updateClient = (e) => {
        setClient(e.target.value);
    };

    useEffect(() => {
        setErrors(errors)
    }, [errors]);


    return (
        <form autoComplete="off" onSubmit={handleSubmit} className="site-form-container">
            <div className='site-form-input-container'>
                <div className='form-element-container'>
                    <input
                        name="site_name"
                        type="text"
                        placeholder="Jobsite Name"
                        value={siteName}
                        onChange={updateSiteName}
                    />
                    <div className='errors-container'>
                        {errors.site_name ? `${errors.site_name}` : ""}
                    </div>
                </div>

                <div className='form-element-container'>
                    <select
                        value={state}
                        onChange={({ target: { value } }) => setState(value)}
                    >
                        {states.map(state => (
                            <option
                                key={state}
                                value={state}
                            >
                                {state}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='form-element-container'>
                    <input
                        name="client"
                        type="text"
                        placeholder="Client Name"
                        value={client}
                        onChange={updateClient}
                    />
                    <div className='errors-container'>
                        {errors.site_name ? `${errors.site_name}` : ""}
                    </div>
                </div>
                <div className='form-element-container'>
                    <input
                        name="latitude"
                        type="number"
                        step='0.0001'
                        placeholder="Latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                </div>
                <div className='form-element-container'>
                    <input
                        name="longitude"
                        type="number"
                        step='0.0001'
                        placeholder="Longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </div>
                <button disabled={Object.keys(errors).length > 0} id='create-jobsite' type="submit">{(edit) ? 'Edit Jobsite' : 'Create Jobsite'}</button>
                <button className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
            </div>

            <div className="site-add-image-container">
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={updateImage}
                ></input>
                <div className="preview-container site">
                    {image && (
                        <img
                            alt="preview"
                            src={URL.createObjectURL(image)}
                            className="preview-image site"
                        ></img>
                    )}
                </div>
                <label htmlFor="file-upload">
                    {imageLoading ?
                        <i className="fas fa-spinner fa-pulse"></i>
                        :
                        <i className="fas fa-image"></i>
                    }
                </label>
            </div>

        </form>
    );
};

export default CreateJobsiteForm;