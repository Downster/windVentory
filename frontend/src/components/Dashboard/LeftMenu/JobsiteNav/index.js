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
import {
    BellIcon,
    CalendarIcon,
    ChartBarIcon,
    ChatAlt2Icon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    LightningBoltIcon,
    MenuAlt2Icon,
    UsersIcon,
    XIcon,
} from '@heroicons/react/outline'




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
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const navigation = [
        { name: 'Inventory', to: `/jobsite/${siteId}/inventory`, icon: FolderIcon, current: false },
        { name: 'Teams', to: `/jobsite/${siteId}/teams`, icon: UsersIcon, current: false },
        { name: 'Weather', to: `/jobsite/${siteId}/weather`, icon: LightningBoltIcon, current: false },
        { name: 'Chatrooms', to: `/jobsite/${siteId}/chats`, icon: ChatAlt2Icon, current: false },
        { name: 'Leave Jobsite', to: `/leave`, icon: XIcon, onClick: leaveJobsite, current: false }
    ]



    return (
        <>
            {isMember ?
                <NavLink to={`/jobsite/${siteId}`} className={classNames('text-gray-300 hover:bg-gray-700 hover:text-white',
                    'group flex items-center px-2 py-2 text-lg font-large rounded-md')} activeClassName='text-white'>My Jobsite</NavLink> : <ul className="jobsite-nav-title">Jobsites</ul>}
            {isMember &&
                <>
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.to}
                            onClick={item.onClick}
                            className={classNames('text-gray-300 hover:bg-gray-700 hover:text-white',
                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                            )}
                            activeClassName='bg-gray-900 text-white'

                        >
                            <item.icon
                                className={classNames(
                                    item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                    'mr-3 flex-shrink-0 h-6 w-6'
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </NavLink>
                    ))}

                    {/* <ChatsNav siteId={siteId} siteChats={siteChats} />
                    <li className="inventory-nav-item"><NavLink to={`/jobsite/${siteId}/inventory`}><i className="fa-solid fa-boxes-stacked"></i>Inventory</NavLink><CreateMaterialModal /></li>
                    <li className="nav-item"><NavLink to={`/jobsite/${siteId}/weather`}><i class="fa-duotone fa-cloud-bolt-sun"></i>Weather</NavLink></li>
                    <li className="nav-item"><NavLink to={`/jobsite/${siteId}/teams`}><i class="fa-duotone fa-people-group"></i>Teams</NavLink>{hasTeam && canCreate && <CreateTeamModal jobsite={true} />}</li>
                    {/* <li><NavLink to={`/jobsite/${siteId}/towers`}><i class="fa-duotone fa-wind-turbine"></i>Towers</NavLink></li> */}
                    {/* <li className="nav-item"><NavLink to={`/jobsite/${siteId}/members`}><i class="fa-duotone fa-user-cowboy"></i>Members</NavLink></li>
                    <li className="nav-item"><NavLink to={`/jobsite/${siteId}/hotel`}><i class="fa-duotone fa-hotel"></i>My Hotel</NavLink></li> */}
                    {/* <li className="nav-item-person"><i class="fa-duotone fa-person-to-door"></i>Leave Jobsite <i className="fas fa-minus" onClick={leaveJobsite}></i></li> */}
                </>
            }
        </>

    )
}

export default JobSiteNav