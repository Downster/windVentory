import './DeleteMessagePrompt.css'


const DeleteMessagePrompt = ({ msg, setShowModal, socket }) => {

    const deleteMessage = () => {
        setShowModal(false)
        socket.emit('delete', {
            msgId: `${msg.id}`, room: `${msg.room_id}`
        })
    }


    return (
        <div className="delete-message-prompt">
            <p>Are you sure you want to delete this message?</p>
            <div className="button-div">
                <button className='delete-button' onClick={() => setShowModal(false)}>Cancel</button>
                <button className='delete-button' onClick={(e) => deleteMessage()}>Confirm</button>
            </div>
        </div>
    )
}

export default DeleteMessagePrompt