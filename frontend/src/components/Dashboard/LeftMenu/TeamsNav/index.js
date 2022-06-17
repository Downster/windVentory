import CreateJobSiteModal from "../../CreateJobSiteModal"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import ChatsNav from "../ChatsNav"
import CreateMaterialModal from "../../CreateMaterialModal"



const TeamsNav = ({ siteId }) => {
    const userTeam = useSelector(state => state.currentTeam.team)


    return (
        <>
            {(userTeam) ? <NavLink to={`/team/${userTeam?.id}`}><ul className="teams-nav-title"> My Team</ul></NavLink> : <NavLink to={`/jobsite/${siteId}/teams`}><ul className="teams-nav-title">Teams</ul></NavLink>}
            <ChatsNav siteId={siteId} teamId={userTeam?.id} team={true} />
            <li><NavLink to={`/team/${userTeam?.id}/inventory`}><i className="fa-solid fa-boxes-stacked"></i>Inventory</NavLink><CreateMaterialModal team={true} /></li>
            <li className="jobsite-item">Members</li>
            <li className="jobsite-item">Leave Team <i className="fas fa-minus"></i></li>
        </>
    )
}

export default TeamsNav