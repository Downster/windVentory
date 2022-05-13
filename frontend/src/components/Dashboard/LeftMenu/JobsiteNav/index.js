import CreateJobSiteModal from "../../CreateJobSiteModal"
import { NavLink } from "react-router-dom"



const JobSiteNav = ({ isMember, isAdmin, siteId }) => {

    return (
        <>
            {isMember ?
                <NavLink to={`/jobsite/${siteId}`} ><li className="jobsite-nav-title">My Jobsite</li></NavLink> : <li className="jobsite-nav-title">Jobsites</li>}
            {isMember &&
                <>

                    <NavLink to={`/jobsite/${siteId}/inventory`}><li className="jobsite-item">Inventory</li></NavLink>
                    <li className="jobsite-item">Weather</li>
                    <li className="jobsite-item">Teams</li>
                    <li className="jobsite-item">Members</li>
                    <li className="jobsite-item">Leave Jobsite <i className="fas fa-minus"></i></li>
                </>
            }
        </>

    )
}

export default JobSiteNav