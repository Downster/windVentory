import CreateMaterialModal from "../../CreateMaterialModal"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import { NavLink } from "react-router-dom"
import ChatsNav from "../ChatsNav"
import { leaveHotel, leaveUserJobsite } from "../../../../store/session"
import { leaveSite } from "../../../../store/currentSite"
import { leaveCurrentTeam } from "../../../../store/currentTeam"
import CreateTeamModal from "../../CreateTeamModal"
import checkPermissions from "../../../../utils/checkPermissions"
import { clearRooms, clearTeamRooms } from "../../../../store/chatRoom"
import { useState } from "react"




const JobSiteNav = ({ isMember, isAdmin, siteChats, siteId }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userRole = useSelector(state => state.session.user.role[0])
    const user = useSelector(state => state?.session?.user)
    const canCreate = checkPermissions(userRole, 'team')
    const siteTeams = useSelector(state => state.currentSite.teams)
    const teamCreated = Object.values(siteTeams).filter((team) => {
        return (team.lead_id === user.id)
    })
    const [hasTeam, setHasTeam] = useState(teamCreated.length > 0 ? false : true)

    const leaveJobsite = async () => {
        await dispatch(leaveUserJobsite(siteId))
        history.push('/')
        await dispatch(leaveSite())
        await dispatch(clearRooms())
        // await dispatch(fetchUserTeam(user))
        await dispatch(leaveHotel(user.id))
        await dispatch(leaveCurrentTeam())
        await dispatch(clearTeamRooms())
    }


    return (
        <>
            {isMember ?
                <NavLink to={`/jobsite/${siteId}`} ><ul className="jobsite-nav-title">My Jobsite</ul></NavLink> : <ul className="jobsite-nav-title">Jobsites</ul>}
            {isMember &&
                <>

                    <ChatsNav siteId={siteId} siteChats={siteChats} />
                    <li className="inventory-nav-item"><NavLink to={`/jobsite/${siteId}/inventory`}><i className="fa-solid fa-boxes-stacked"></i>Inventory</NavLink><CreateMaterialModal /></li>
                    <li className="nav-item"><NavLink to={`/jobsite/${siteId}/weather`}><i class="fa-duotone fa-cloud-bolt-sun"></i>Weather</NavLink></li>
                    <li className="nav-item"><NavLink to={`/jobsite/${siteId}/teams`}><i class="fa-duotone fa-people-group"></i>Teams</NavLink>{hasTeam && canCreate && <CreateTeamModal jobsite={true} />}</li>
                    {/* <li><NavLink to={`/jobsite/${siteId}/towers`}><i class="fa-duotone fa-wind-turbine"></i>Towers</NavLink></li> */}
                    {/* <li className="nav-item"><NavLink to={`/jobsite/${siteId}/members`}><i class="fa-duotone fa-user-cowboy"></i>Members</NavLink></li>
                    <li className="nav-item"><NavLink to={`/jobsite/${siteId}/hotel`}><i class="fa-duotone fa-hotel"></i>My Hotel</NavLink></li> */}
                    <li className="nav-item-person"><i class="fa-duotone fa-person-to-door"></i>Leave Jobsite <i className="fas fa-minus" onClick={leaveJobsite}></i></li>
                </>
            }
        </>

    )
}

export default JobSiteNav