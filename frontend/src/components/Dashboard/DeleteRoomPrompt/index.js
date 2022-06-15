import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import { deleteChatRoom } from "../../../store/chatRoom"


const DeleteRoomPrompt = ({ room, setShowModal }) => {
    const dispatch = useDispatch()
    const history = useHistory();

    const deleteRoom = async () => {
        await dispatch(deleteChatRoom(room.id, 'site'))
        history.push('/inventory')
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