import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import states from "../../../utils/states";

const CreateJobsiteForm = ({ setShowModal }) => {
    const history = useHistory();
    const location = useLocation();
    const [errors, setErrors] = useState({});
    const [siteName, setSiteName] = useState("");
    const [client, setClient] = useState('')
    const [state, setState] = useState('');
    const [image, setImage] = useState(null);
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
        const errors = {};
        if (!siteName.length) errors['group_name'] = 'This field is required.';
        if (Object.values(errors).length) return setErrors(errors);

        const formData = new FormData();
        formData.append('site_name', siteName);
        formData.append('state', state);
        formData.append('client', client);
        if (image) {
            formData.append('group_image', image);
            setImageLoading(true);
        }

        setImageLoading(false);

        setShowModal(false);

        if (location.pathname !== '/') history.push('/');
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
                <button disabled={Object.keys(errors).length > 0} id='create-jobsite' type="submit">Create Jobsite</button>
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