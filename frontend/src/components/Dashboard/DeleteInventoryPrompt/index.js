import { deleteSiteMaterial } from "../../../store/currentSite"
import { useDispatch } from "react-redux"


const DeleteMaterialPrompt = ({ material, setShowModal }) => {
    const dispatch = useDispatch()

    const deleteMaterial = async (e, material) => {
        e.preventDefault()
        await dispatch(deleteSiteMaterial(material.id))
        setShowModal(false)
        // socket.emit('delete', {
        //     msgId: `${msg.id}`, room: `${msg.room_id}`
        // })
    }


    return (
        <div className="delete-material-prompt">
            <p>Are you sure you want to delete this material?</p>
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button onClick={(e) => deleteMaterial(e, material)}>Confirm</button>
        </div>
    )
}

export default DeleteMaterialPrompt