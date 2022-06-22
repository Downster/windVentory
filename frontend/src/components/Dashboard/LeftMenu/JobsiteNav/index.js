import CreateJobSiteModal from "../../CreateJobSiteModal"
import CreateMaterialModal from "../../CreateMaterialModal"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import { NavLink } from "react-router-dom"
import ChatsNav from "../ChatsNav"
import { leaveUserJobsite, leaveUserTeam } from "../../../../store/session"
import { leaveSite } from "../../../../store/currentSite"
import { leaveCurrentTeam } from "../../../../store/currentTeam"
import CreateTeamModal from "../../CreateTeamModal"
import checkPermissions from "../../../../utils/checkPermissions"
import { clearRooms, clearTeamRooms } from "../../../../store/chatRoom"



const JobSiteNav = ({ isMember, isAdmin, siteChats, siteId }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userRole = useSelector(state => state.session.user.role[0])
    const userTeam = useSelector(state => state?.session?.user?.teams[0])
    const canCreate = checkPermissions(userRole, 'team')

    const leaveJobsite = async () => {
        await dispatch(leaveUserJobsite(siteId))
        history.push('/')
        await dispatch(leaveSite())
        await dispatch(clearRooms())
        if (userTeam) {
            await dispatch(leaveUserTeam(userTeam.id))
            await dispatch(leaveCurrentTeam())
            await dispatch(clearTeamRooms())
        }
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
                    <li className="nav-item"><NavLink to={`/jobsite/${siteId}/teams`}><i class="fa-duotone fa-people-group"></i>Teams</NavLink>{canCreate && <CreateTeamModal jobsite={true} />}</li>
                    {/* <li><NavLink to={`/jobsite/${siteId}/towers`}><i class="fa-duotone fa-wind-turbine"></i>Towers</NavLink></li> */}
                    {/* <li className="nav-item"><i class="fa-duotone fa-user-cowboy"></i>Members</li> */}
                    <li className="nav-item-person"><i class="fa-duotone fa-person-to-door"></i>Leave Jobsite <i className="fas fa-minus" onClick={leaveJobsite}></i></li>
                </>
            }
        </>

    )
}

export default JobSiteNav