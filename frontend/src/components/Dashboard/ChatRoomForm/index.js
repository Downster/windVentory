import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSiteChatRoom, createTeamChatRoom, editJobsiteRoom } from "../../../store/chatRoom";
import ImageUpload from "../ImageUpload";

function ChatRoomForm({ setShowModal, siteId, room, team, edit }) {
    const dispatch = useDispatch();
    const hiddenImageInput = useRef(null);
    const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState((edit) ? (room.room_name) : "");
    const [updateCurrentImage, setUpdateImage] = useState(false)
    const [image, setImage] = useState(null);
    const [teamId, setTeamId] = useState((team) ? team : null)
    const [imageLoading, setImageLoading] = useState(false);
    // const [siteId, setSiteId] = useState(sessionUser.jobsite_id)
    const [errors, setErrors] = useState([]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        let errors;
        formData.append('room_name', name)
        formData.append('jobsite_id', 1)
        if (image) {
            formData.append('image', image)
            setImageLoading(true)
        }
        if (edit) {
            if (teamId) {

            } else {
                errors = await dispatch(editJobsiteRoom(room.id, formData, 'site'))
            }


        } else {
            if (teamId) {
                errors = await dispatch(createTeamChatRoom(formData))
            } else {
                errors = await dispatch(createSiteChatRoom(formData))
            }
        }
        if (errors) {
            if (errors.errors) {
                setErrors(errors.errors)
            } else if (errors.image_errors) {
                setErrors([errors.image_errors])
                setImage(null)
                setImageLoading(false)
            }

        } else {
            setUpdateImage(false)
            setShowModal(false)
        }
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setUpdateImage(true)
    };
    const showImageInput = event => {
        hiddenImageInput.current.click();
    };


    return (
        <form onSubmit={handleSubmit} className='chat-room-form'>
            <div className="chat-form-input-container">
                <div className="form-errors">
                    <ul>
                        {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
                    </ul>
                </div>
                <div className="form-label-container">
                    <label className="form-label">Room image</label>
                </div>
                <ImageUpload image={image} showImageInput={showImageInput} />
                <div className="form-label-container">
                    <label className="form-label">Room name</label>
                    <p className="form-label-required">Required</p>
                </div>
                <div className="form-element-container">
                    <input
                        type="text"
                        className="input-field"
                        value={name}
                        placeholder='Room Name'
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="chat-room-add-image-container">
                    <input
                        className="material-image-input"
                        ref={hiddenImageInput}
                        type="file"
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
                <button type="submit">{(edit) ? 'Edit Chatroom' : 'Create Chat Room'}</button>
            </div>
        </form>
    );
}
export default ChatRoomForm;