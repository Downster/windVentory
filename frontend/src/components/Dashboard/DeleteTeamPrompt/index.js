import './DeleteTeamPrompt.css'
import { useDispatch } from 'react-redux'
import { removeTeam } from '../../../store/allTeams'


const DeleteTeamPrompt = ({ team, setShowModal, setErrors }) => {
    const dispatch = useDispatch()

    const deleteTeam = async () => {
        dispatch(removeTeam(team.id))
    }


    return (
        <div className="delete-message-prompt">
            <p>Are you sure you want to delete this team?</p>
            <div className="button-div">
                <button className='delete-button' onClick={() => setShowModal(false)}>Cancel</button>
                <button className='delete-button' onClick={(e) => deleteTeam()}>Confirm</button>
            </div>
        </div>
    )
}

export default DeleteTeamPrompt