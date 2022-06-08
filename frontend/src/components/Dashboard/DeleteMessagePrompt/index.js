


const DeleteMessagePrompt = ({ msg, setShowModal, socket }) => {

    const deleteMessage = (e, msg) => {
        console.log(msg)
        e.preventDefault()
        setShowModal(false)
        socket.emit('delete', {
            msgId: `${msg.id}`, room: `${msg.room_id}`
        })
    }


    return (
        <div className="delete-message-prompt">
            <p>Are you sure you want to delete this message?</p>
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button onClick={(e) => deleteMessage(e, msg)}>Confirm</button>
        </div>
    )
}

export default DeleteMessagePrompt