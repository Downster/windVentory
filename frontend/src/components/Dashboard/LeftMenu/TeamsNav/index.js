import CreateJobSiteModal from "../../CreateJobSiteModal"
import { NavLink } from "react-router-dom"



const TeamsNav = ({ siteId }) => {

    return (
        <>
            <NavLink to={`/jobsite/${siteId}/teams`}><li className="teams-nav-title">Teams</li></NavLink>
            <li className="jobsite-item">Inventory</li>
            <li className="jobsite-item">Members</li>
            <li className="jobsite-item">Leave Team <i className="fas fa-minus"></i></li>
        </>

    )
}

export default TeamsNav