import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import { deleteChatRoom } from "../../../store/chatRoom"
import { io } from 'socket.io-client'

let socket;
const DeleteRoomPrompt = ({ room, setShowModal, type }) => {
    const dispatch = useDispatch()
    const history = useHistory();

    const deleteRoom = async () => {
        await dispatch(deleteChatRoom(room.id, type))
        history.push('/')
        setShowModal(false)

    }


    return (
        <div className="delete-material-prompt">
            <p>Are you sure you want to delete this chat room?</p>
            <div className="button-div">
                <button className="delete-button" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="delete-button" onClick={deleteRoom}>Confirm</button>
            </div>
        </div>
    )
}

export default DeleteRoomPrompt