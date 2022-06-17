import './jobSiteCard.css'
import { useHistory } from 'react-router-dom'
import { Modal } from "../../../context/Modal";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setUserJobsite } from '../../../store/session'
import { deleteJobsite, editJobsite } from '../../../store/jobsites'
import { fetchTeams, fetchWeather, loadSiteInventory } from '../../../store/currentSite';
import CreateJobsiteForm from '../JobSiteForm';
import { getSiteChatRooms } from '../../../store/chatRoom';


const JobSiteCard = ({ jobsite, adminPanel, single }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const userSite = useSelector(state => state.currentSite.site)
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    const setJobsite = async () => {
        await dispatch(setUserJobsite(jobsite.id))
        await dispatch(fetchTeams(jobsite.id))
        await dispatch(loadSiteInventory(jobsite.id))
        await dispatch(getSiteChatRooms(jobsite.id))
        await dispatch(fetchWeather(jobsite.id))
        history.push(`/jobsite/${jobsite.id}/inventory`)
    }

    const modifyJobsite = () => {
        setShowModal(true)
    }

    const destroyJobsite = () => {
        dispatch(deleteJobsite(jobsite.id))
    }
    return (
        <div className='jobsite-container'>
            {!single && <div className="jobSite-card">
                <h1 className="jobsite-name">{jobsite.name}</h1>
                <h1 className="jobsite-client">{jobsite.client}</h1>
                <h1 className="jobsite-state">{jobsite.state}</h1>
                {!adminPanel && <button onClick={setJobsite}>+</button>}
                {adminPanel && <button onClick={modifyJobsite}>Edit</button>}
                {adminPanel && <button onClick={destroyJobsite}>-</button>}
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateJobsiteForm setShowModal={setShowModal} edit={true} siteId={jobsite.id} />
                    </Modal>
                )}

            </div>
            }
            {single && userSite && < div className='single-user-site'>
                <h1 className="jobsite-name">{userSite.name}</h1>
                <h1 className="jobsite-client">{userSite.client}</h1>
                <h1 className="jobsite-state">{userSite.state}</h1>
            </div>
            }
        </div >
    )
}

export default JobSiteCard