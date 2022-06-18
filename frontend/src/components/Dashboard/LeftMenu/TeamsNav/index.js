import CreateJobSiteModal from "../../CreateJobSiteModal"
import { NavLink, useHistory } from "react-router-dom"

import { useSelector } from "react-redux"
import ChatsNav from "../ChatsNav"
import CreateMaterialModal from "../../CreateMaterialModal"
import { useDispatch } from "react-redux"
import { leaveUserTeam } from "../../../../store/session"
import { leaveCurrentTeam } from "../../../../store/currentTeam"
import { clearTeamRooms } from "../../../../store/chatRoom"



const TeamsNav = ({ siteId }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userTeam = useSelector(state => state.currentTeam.team)

    const leaveTeam = async () => {
        await dispatch(leaveUserTeam(userTeam.id))
        await dispatch(leaveCurrentTeam())
        await dispatch(clearTeamRooms())
        history.push('/')

    }


    return (
        <>
            {(userTeam) ? <NavLink to={`/team/${userTeam?.id}`}><ul className="teams-nav-title"> My Team</ul></NavLink> : <NavLink to={`/jobsite/${siteId}/teams`}><ul className="teams-nav-title">Teams</ul></NavLink>}
            {userTeam && <>
                <ChatsNav siteId={siteId} teamId={userTeam?.id} team={true} />
                <li><NavLink to={`/team/${userTeam?.id}/inventory`}><i className="fa-solid fa-boxes-stacked"></i>Inventory</NavLink><CreateMaterialModal team={true} /></li>
                <li className="nav-item"><i class="fa-duotone fa-user-cowboy"></i>Members</li>
                <li className="nav-item-person"><i class="fa-duotone fa-person-to-door"></i>Leave Team <i className="fas fa-minus" onClick={leaveTeam}></i></li>
            </>
            }
        </>
    )
}

export default TeamsNav