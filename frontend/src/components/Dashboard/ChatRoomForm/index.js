import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSiteChatRoom, createTeamChatRoom, editRoom } from "../../../store/chatRoom";
import ImageUpload from "../ImageUpload";
import { io } from 'socket.io-client'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

function ChatRoomForm({ setShowModal, siteId, room, teamId, edit, type }) {
    const dispatch = useDispatch();
    const hiddenImageInput = useRef(null);
    const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState((edit) ? (room.room_name) : "");
    const [updateCurrentImage, setUpdateImage] = useState(false)
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    // const [siteId, setSiteId] = useState(sessionUser.jobsite_id)
    const [errors, setErrors] = useState([]);

    let socket;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        let errors;
        formData.append('room_name', name)
        if (type === 'team') {
            formData.append('team_id', teamId)
        } else {
            formData.append('jobsite_id', siteId)
        }
        if (edit) {
            formData.append('room_id', room.id)
        }
        if (image) {
            formData.append('image', image)
            setImageLoading(true)
        }
        if (edit) {
            if (type === 'team') {
                errors = await dispatch(editRoom(room.id, formData, 'team'))
            } else {
                errors = await dispatch(editRoom(room.id, formData, 'site'))
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
                console.log(errors.errors)
                setErrors(errors.errors)
            } else if (errors.image_errors) {
                setErrors([errors.image_errors])
                setImage(null)
                setImageLoading(false)
            }

        } else {
            socket = io()
            if (teamId) {
                socket.emit('create-team-room', { user: sessionUser })
            } else {
                console.log('here')
                socket.emit('create-site-room', { user: sessionUser })

            }
            setUpdateImage(false)
            setShowModal(false)
            //disconnect socket after message has been sent
            setTimeout(() => {
                socket.disconnect()
            }, 1000)
        }
    };

    useEffect(() => {
        return (() => {
            // socket?.disconnect()
        })
    }, [])

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setUpdateImage(true)
    };
    const showImageInput = event => {
        hiddenImageInput.current.click();
    };


    return (
        <form className='chat-room-form'>
            <div className="chat-form-input-container">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Chatroom Name
                </label>
                <p className="mt-2 text-sm text-red-600" id="name-error">
                    {errors && errors.filter((err) => err.room_name).map((err) => <p className="mt-2 text-sm text-red-600" id="email-error">
                        {err.room_name}
                    </p>)}
                </p>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        value={name}
                        name="name"
                        id="name"
                        className={"block w-full pr-10 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"}
                        aria-invalid="true"
                        onChange={(e) => setName(e.target.value)}
                        aria-describedby="email-error"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {errors.length > 0 && errors.filter((err) => err.room_name).length > 0 && <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
                    </div>
                </div>
                <div className="form-label-container">
                    <label className="form-label">Room image</label>
                </div>
                <ImageUpload image={image} showImageInput={showImageInput} />
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
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="mt-3 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {(edit) ? 'Edit Chatroom' : 'Create Chatroom'}
                </button>
            </div>
        </form>
    );
}
export default ChatRoomForm;