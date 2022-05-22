import CreateJobSiteModal from "../../CreateJobSiteModal"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"



const TeamsNav = ({ siteId }) => {
    const userTeam = useSelector(state => state.currentTeam)


    return (
        <>
            {(userTeam.team) ? <NavLink to={`/team/${userTeam?.team?.id}`}><ul className="teams-nav-title"> My Team</ul></NavLink> : <NavLink to={`/jobsite/${siteId}/teams`}><ul className="teams-nav-title">Teams</ul></NavLink>}
            <li className="jobsite-item">Inventory</li>
            <li className="jobsite-item">Members</li>
            <li className="jobsite-item">Leave Team <i className="fas fa-minus"></i></li>
        </>
    )
}

export default TeamsNav