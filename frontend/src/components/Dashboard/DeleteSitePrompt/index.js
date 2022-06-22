import './DeleteSitePrompt.css'
import { useDispatch } from 'react-redux'
import { deleteJobsite } from '../../../store/jobsites'


const DeleteSitePrompt = ({ site, setShowModal }) => {
    const dispatch = useDispatch()

    const deleteMessage = async () => {
        await dispatch(deleteJobsite(site.id))
        setShowModal(false)
    }


    return (
        <div className="delete-message-prompt">
            <p>Are you sure you want to delete this Jopbsite?</p>
            <div className="button-div">
                <button className='delete-button' onClick={() => setShowModal(false)}>Cancel</button>
                <button className='delete-button' onClick={(e) => deleteMessage()}>Confirm</button>
            </div>
        </div>
    )
}

export default DeleteSitePrompt