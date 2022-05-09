import './jobSiteCard.css'
import { Link } from 'react-router-dom'


const JobSiteCard = ({ jobsite }) => {
    console.log(jobsite)
    return (
        <Link to={`/jobsites/${jobsite.id}`} >
            <div className="jobSite-card">
                <h1 className="jobsite-name">{jobsite.name}</h1>
                <h1 className="jobsite-client">{jobsite.client}</h1>
                <h1 className="jobsite-state">{jobsite.state}</h1>
            </div>
        </Link>
    )
}

export default JobSiteCard