import { deleteSiteMaterial } from "../../../store/currentSite"
import { useDispatch } from "react-redux"
import './DeletePrompt.css'
import { deleteTeamMaterial } from "../../../store/currentTeam"


const DeleteMaterialPrompt = ({ team, material, setShowModal }) => {
    const dispatch = useDispatch()

    const deleteMaterial = async (e, material) => {
        e.preventDefault()
        if (team) {
            await dispatch(deleteTeamMaterial(material.id))
        } else {
            await dispatch(deleteSiteMaterial(material.id))
        }
        setShowModal(false)
        // socket.emit('delete', {
        //     msgId: `${msg.id}`, room: `${msg.room_id}`
        // })
    }


    return (
        <div className="delete-material-prompt">
            <p>Are you sure you want to delete this material?</p>
            <div className="button-div">
                <button className="delete-button" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="delete-button" onClick={(e) => deleteMaterial(e, material)}>Confirm</button>
            </div>
        </div>
    )
}

export default DeleteMaterialPrompt