import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSiteChatRoom, createTeamChatRoom, editJobsiteRoom } from "../../../store/chatRoom";


function ChatRoomForm({ setShowModal, siteId, room, team, edit }) {
    const dispatch = useDispatch();
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
            setErrors(errors.errors)
            console.log(errors)
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


    return (
        <form onSubmit={handleSubmit} className='chat-room-form'>
            <div className="chat-form-input-container">
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
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
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={updateImage}
                    />
                    <div className="preview-container site">
                        {image && (
                            <img
                                alt="preview"
                                src={(edit && !updateCurrentImage) ? image : null}
                                className="preview-image site"
                            ></img>
                        )}
                    </div>
                    <label htmlFor="file-upload">
                        {imageLoading ?
                            <i className="fas fa-spinner fa-pulse"></i>
                            :
                            null
                        }
                    </label>
                </div>
                <button type="submit">{(edit) ? 'Edit Chatroom' : 'Create Chat Room'}</button>
            </div>
        </form>
    );
}
export default ChatRoomForm;