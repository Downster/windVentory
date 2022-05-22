import CreateJobSiteModal from "../../CreateJobSiteModal"
import { NavLink } from "react-router-dom"



const JobSiteNav = ({ isMember, isAdmin, siteId }) => {

    return (
        <>
            {isMember ?
                <NavLink to={`/jobsite/${siteId}`} ><ul className="jobsite-nav-title">My Jobsite</ul></NavLink> : <ul className="jobsite-nav-title">Jobsites</ul>}
            {isMember &&
                <>

                    <NavLink to={`/jobsite/${siteId}/inventory`}><li className="jobsite-item">Inventory</li></NavLink>
                    <NavLink to={`/jobsite/${siteId}/weather`}><li className="jobsite-item">Weather</li></NavLink>
                    <NavLink to={`/jobsite/${siteId}/teams`}><li className="jobsite-item">Teams</li></NavLink>
                    <li className="jobsite-item">Members</li>
                    <li className="jobsite-item">Leave Jobsite <i className="fas fa-minus"></i></li>
                </>
            }
        </>

    )
}

export default JobSiteNav