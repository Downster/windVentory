import CreateJobSiteModal from "../../CreateJobSiteModal"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"



const TeamsNav = ({ siteId }) => {
    const userTeam = useSelector(state => state.session.user.teams)

    return (
        <>
            {(userTeam.length) ? <NavLink to={`/team/${userTeam[0].id}`}><li className="teams-nav-title"> My Team</li></NavLink> : <NavLink to={`/jobsite/${siteId}/teams`}><li className="teams-nav-title">Teams</li></NavLink>}
            <li className="jobsite-item">Inventory</li>
            <li className="jobsite-item">Members</li>
            <li className="jobsite-item">Chat</li>
            <li className="jobsite-item">Leave Team <i className="fas fa-minus"></i></li>
        </>

    )
}

export default TeamsNav