import './jobSiteCard.css'
import { useHistory } from 'react-router-dom'
import { Modal } from "../../../context/Modal";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setUserJobsite } from '../../../store/session'
import { deleteJobsite, editJobsite } from '../../../store/jobsites'
import { fetchTeams } from '../../../store/siteTeams';
import CreateJobsiteForm from '../JobSiteForm';


const JobSiteCard = ({ jobsite, adminPanel }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    const role = user?.role[0]

    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    const setJobsite = () => {
        dispatch(setUserJobsite(jobsite.id))
        dispatch(fetchTeams(jobsite.id))
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
            <div className="jobSite-card">
                <h1 className="jobsite-name">{jobsite.name}</h1>
                <h1 className="jobsite-client">{jobsite.client}</h1>
                <h1 className="jobsite-state">{jobsite.state}</h1>
                <button onClick={setJobsite}>+</button>
                {adminPanel && <button onClick={modifyJobsite}>Edit</button>}
                {adminPanel && <button onClick={destroyJobsite}>-</button>}
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateJobsiteForm setShowModal={setShowModal} edit={true} siteId={jobsite.id} />
                    </Modal>
                )}

            </div>
        </div>
    )
}

export default JobSiteCard