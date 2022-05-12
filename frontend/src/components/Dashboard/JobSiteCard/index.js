import './jobSiteCard.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserJobsite } from '../../../store/session'


const JobSiteCard = ({ jobsite }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const role = user?.role[0]


    const setJobsite = () => {
        dispatch(setUserJobsite(jobsite.id))
    }
    return (
        <div className='jobsite-container'>
            <div className="jobSite-card">
                <h1 className="jobsite-name">{jobsite.name}</h1>
                <h1 className="jobsite-client">{jobsite.client}</h1>
                <h1 className="jobsite-state">{jobsite.state}</h1>
                <button onClick={setJobsite}>+</button>
                {role === 'Admin' ? <button>-</button> : null}
            </div>
        </div>
    )
}

export default JobSiteCard