import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteMessagePrompt from "../DeleteMessagePrompt";
import { editChatMessage } from "../../../store/messages";
import Parser from 'html-react-parser';
import EditChatInput from "../EditChatInput";

const ChatMessage = ({ msg, socket }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const [edit, setEdit] = useState(false)
    const [mouse, setMouse] = useState(false)
    const [message, setMessage] = useState(msg.message)
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([])

    const editMessage = async (msg, body) => {
        console.log(msg)
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
    }

    const deleteMessage = () => {
        setShowModal(true)

    }

    return (
        <>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteMessagePrompt msg={msg} setShowModal={setShowModal} socket={socket} />
                </Modal>
            )}
            <div className={msg.user_id === user.id ? "chat-message-inner-container owner" : 'chat-message-inner-container'} onMouseEnter={() => setMouse(true)} onMouseLeave={() => setMouse(false)}>
                <div className='chat-message' id={msg.id}>
                    <div className="chat-message-meta-data">

                        {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        <p className='chat-username'>{msg.user.firstName + " " + msg.user.lastName}<span className='created-at-msg'>{(new Date(msg.created_at)).toLocaleTimeString()}</span></p>
                        {edit ? <EditChatInput value={message} onChange={(e) => setMessage(e)} send={() => editMessage(msg, message)} /> : <p className='chat-text'>{Parser(msg.message)}</p>}
                    </div>
                    {mouse && msg.user_id === user.id && <div className='message-buttons'>
                        <button className='message-button' onClick={(e) => setEdit(true)}>Edit</button>
                        <button className='message-button' onClick={deleteMessage}>Delete</button>
                    </div>
                    }
                </div>
            </div>
        </>
    )

}

export default ChatMessage