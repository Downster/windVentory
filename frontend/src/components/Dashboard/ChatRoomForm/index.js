import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSiteChatRoom, createTeamChatRoom } from "../../../store/chatRoom";


function ChatRoomForm({ setShowModal, roomId, team, edit }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [teamId, setTeamId] = useState((team) ? team : null)
    const [imageLoading, setImageLoading] = useState(false);
    const [siteId, setSiteId] = useState(sessionUser.jobsite_id)
    const [errors, setErrors] = useState([]);



    const handleSubmit = async (e) => {
        console.log('please work')
        e.preventDefault();
        const formData = new FormData()
        let errors;
        formData.append('room_name', name)
        formData.append('jobsite_id', siteId)
        if (image) {
            formData.append('image', image)
        }
        if (teamId) {
            errors = await dispatch(createTeamChatRoom(formData))
        } else {
            errors = await dispatch(createSiteChatRoom(formData))
        }
        console.log(errors)
        setShowModal(false)
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };


    return (
        <form onSubmit={handleSubmit} className='chat-room-form'>
            <div className="chat-form-input-container">
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
                <button type="submit">Create Chat Room</button>
            </div>
        </form>
    );
}
export default ChatRoomForm;