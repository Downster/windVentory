import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteMessagePrompt from "../DeleteMessagePrompt";
import { editChatMessage } from "../../../store/messages";

const ChatMessage = ({ msg, socket }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const [edit, setEdit] = useState(false)
    const [mouse, setMouse] = useState(false)
    const [message, setMessage] = useState(msg.message)
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([])

    const editMessage = async (msg, body) => {
        const errors = await dispatch(editChatMessage(msg.id, body, msg.room_id))
        if (errors) {
            setErrors(errors.errors)
        } else {
            socket.emit('edit', {
                user: `${user.username}`, userId: `${user.id}`, msgId: msg.id, msg: message, room: msg.room_id, created_at: (new Date()).toLocaleTimeString()
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
            <div className="chat-message-inner-container" onMouseEnter={() => setMouse(true)} onMouseLeave={() => setMouse(false)}>
                <div className='chat-message' id={msg.id}>
                    {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    <p className='chat-username'>{msg.firstName}<span className='created-at-msg'>{(new Date(msg.created_at)).toLocaleTimeString()}</span></p>
                    {edit ? <><input value={message} onChange={(e) => setMessage(e.target.value)}></input><button onClick={() => editMessage(msg, message)}>Send</button></> : <p className='chat-text'>{msg.message}</p>}
                </div>
                {mouse && msg.user_id === user.id && <div className='message-buttons'>
                    <button onClick={(e) => setEdit(true)}>Edit</button>
                    <button onClick={deleteMessage}>Delete</button>
                </div>
                }
            </div>
        </>
    )

}

export default ChatMessage