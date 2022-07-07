import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import states from "../../../utils/states";
import { createJobsite, editJobsite, getJobsites } from "../../../store/jobsites";
import MiniMap from "../MiniMap";
import ImageUpload from "../ImageUpload";

const CreateJobsiteForm = ({ setShowModal, edit, siteId }) => {
    const history = useHistory();
    const location = useLocation();
    const hiddenImageInput = useRef(null);
    const jobsite = useSelector(state => state.jobsites[siteId])
    const [errors, setErrors] = useState([]);
    const [siteName, setSiteName] = useState((edit) ? jobsite.name : '');
    const [client, setClient] = useState((edit) ? jobsite.client : '')
    const [state, setState] = useState((edit) ? jobsite.state : '');
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const user = useSelector(state => state.session.user);
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
            setErrors(errors)
        } else {
            setShowModal(false);

        }


    };

    const handleCancelClick = async (e) => {
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
    const showImageInput = event => {
        hiddenImageInput.current.click();
    };

    useEffect(() => {
        setErrors(errors)
    }, [errors]);


    return (
        <form autoComplete="off" onSubmit={handleSubmit} className="site-form-container">
            <ul>
                {errors && errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
            </ul>
            <div className='site-form-input-container'>
                <div className='form-element-container'>
                    <input
                        className="input-field"
                        name="site_name"
                        type="text"
                        placeholder="Jobsite Name"
                        value={siteName}
                        onChange={updateSiteName}
                    />
                </div>

                <div className='form-element-container'>
                    <select className="input-field"
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
                    <input className="input-field"
                        name="client"
                        type="text"
                        placeholder="Client Name"
                        value={client}
                        onChange={updateClient}
                    />
                </div>
                <div className="form-map-container">
                    <MiniMap position={position} onPositionChanged={(latlng) => setPosition(latlng)} admin={true} />
                </div>
                {/* <div className='form-element-container'>
                    <input
                        className="input-field"
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
                        className="input-field"
                        name="longitude"
                        type="number"
                        step='0.0001'
                        placeholder="Longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </div> */}
                <ImageUpload image={image} showImageInput={showImageInput} site={true} />
                <div className="site-add-image-container">
                    <input
                        className="site-image-input"
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
                                    className="loading-image"
                                ></img>
                            </>
                        )}
                    </div>
                    <button id='create-jobsite' type="submit">{(edit) ? 'Edit Jobsite' : 'Create Jobsite'}</button>
                    <button className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
                </div>
            </div>


        </form>
    );
};

export default CreateJobsiteForm;