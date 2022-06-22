import './DeleteUserPrompt.css'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../../store/allUsers'


const DeleteUserPrompt = ({ user, setShowModal, setErrors }) => {
    const dispatch = useDispatch()

    const deleteUser = async () => {
        const error = await dispatch(removeUser(user.id))
        if (error) {
            setErrors([error.errors])
        }
    }


    return (
        <div className="delete-message-prompt">
            <p>Are you sure you want to delete this user?</p>
            <div className="button-div">
                <button className='delete-button' onClick={() => setShowModal(false)}>Cancel</button>
                <button className='delete-button' onClick={(e) => deleteUser()}>Confirm</button>
            </div>
        </div>
    )
}

export default DeleteUserPrompt