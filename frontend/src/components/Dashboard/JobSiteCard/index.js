import './jobSiteCard.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserJobsite } from '../../../store/session'


const JobSiteCard = ({ jobsite }) => {
    const dispatch = useDispatch()
    console.log(jobsite.id)
    const setJobsite = () => {
        dispatch(setUserJobsite(jobsite.id))
    }
    return (
        <div className='jobsite-container'>
            <Link to={`/jobsites/${jobsite.id}`} >
                <div className="jobSite-card">
                    <h1 className="jobsite-name">{jobsite.name}</h1>
                    <h1 className="jobsite-client">{jobsite.client}</h1>
                    <h1 className="jobsite-state">{jobsite.state}</h1>
                    <button onClick={setJobsite}>+</button>
                </div>
            </Link>
        </div>
    )
}

export default JobSiteCard