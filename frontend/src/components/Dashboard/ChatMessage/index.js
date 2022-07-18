import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteMessagePrompt from "../DeleteMessagePrompt";
import { editChatMessage } from "../../../store/messages";
import Parser from 'html-react-parser';
import EditChatInput from "../EditChatInput";
import OnlineAvatar from "../OnlineAvatar";

const ChatMessage = ({ msg, socket, sameUser, lastUser }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const [edit, setEdit] = useState(false)
    const [mouse, setMouse] = useState(false)
    const [message, setMessage] = useState(msg.message)
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([])

    const editMessage = async (msg, body) => {
        if (message !== "<p><br></p>") {
            const errors = await dispatch(editChatMessage(msg.id, body, msg.room_id))
            if (errors) {
                setErrors(errors.errors)
            } else {
                socket.emit('edit', {
                    user: `${user.firstName} ${user.lastName}`, userId: `${user.id}`, msgId: msg.id, msg: message, room: msg.room_id, created_at: (new Date()).toLocaleTimeString()
                });
                setEdit(false)
                setErrors([])
            }
        } else {
            setErrors(['Message cannot be empty'])
        }
    }

    const deleteMessage = () => {
        setShowModal(true)
    }

    const cancelAndClear = () => {
        setEdit(false)
        setMessage(msg.message)
        setErrors([])
    }

    return (
        <>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteMessagePrompt msg={msg} setShowModal={setShowModal} socket={socket} />
                </Modal>
            )}
            <div className={msg.user_id === user.id ? "chat-message-inner-container owner" : 'chat-message-inner-container'} onMouseEnter={() => setMouse(true)} onMouseLeave={() => setMouse(false)}>
                <div className={msg.user_id === user.id ? 'chat-message owner' : 'chat-message'} id={msg.id}>
                    <div className={msg.user_id === user.id ? "chat-message-meta-data owner" : 'chat-message-meta-data'}>

                        {errors && errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
                        <div className={msg.user_id === user.id ? "chat-message-info owner" : "chat-message-info"}>
                            {!sameUser && <p className='chat-username'>{msg.user.firstName + " " + msg.user.lastName} <span className='created-at-msg'>{" at " + (new Date(msg.created_at)).toLocaleTimeString()}</span></p>}
                            {!sameUser && <OnlineAvatar image={msg.user.image} />
                            }
                        </div>
                        {edit ? <EditChatInput value={message} onChange={(e) => setMessage(e)} send={() => editMessage(msg, message)} /> : <span className={msg.user_id === user.id ? 'chat-text owner1' : 'chat-text'} > {Parser(msg.message)}</span>}
                        {mouse && msg.user_id === user.id && <div className='message-buttons'>
                            {!edit && <button className='message-button' onClick={(e) => setEdit(true)}>Edit</button>}
                            {!edit && <button className='message-button' onClick={deleteMessage}>Delete</button>}
                            {edit && <button className="message-button" onClick={cancelAndClear}>Cancel</button>}
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )

}

export default ChatMessage