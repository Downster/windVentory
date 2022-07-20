import CreateJobSiteModal from "../../CreateJobSiteModal"
import { NavLink, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import ChatsNav from "../ChatsNav"
import CreateMaterialModal from "../../CreateMaterialModal"
import { useDispatch } from "react-redux"
import { leaveUserTeam } from "../../../../store/session"
import { leaveCurrentTeam } from "../../../../store/currentTeam"
import { clearTeamRooms } from "../../../../store/chatRoom"
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
import { useState } from "react"



const TeamsNav = ({ siteId }) => {
    const teamChats = useSelector(state => state.chatRooms.teamRooms)
    const teamId = useSelector(state => state.currentTeam?.team?.id)
    const [showChats, setShowChats] = useState(true)
    const dispatch = useDispatch()
    const history = useHistory()
    const userTeam = useSelector(state => state.currentTeam.team)

    const leaveTeam = async () => {
        await dispatch(leaveUserTeam(userTeam.id))
        await dispatch(leaveCurrentTeam())
        await dispatch(clearTeamRooms())
        history.push('/')

    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const navigation = [
        { name: 'Inventory', to: `/team/${userTeam?.id}/inventory`, icon: FolderIcon, current: false },
        { name: 'Chatrooms', to: `/team/${userTeam?.id}/chats`, icon: ChatAlt2Icon, current: false },
        { name: 'Leave Team', to: `/leave`, icon: XIcon, onClick: leaveTeam, current: false }
    ]


    return (
        <>
            {(userTeam) ? <NavLink to={`/team/${userTeam?.id}`} className={classNames('text-gray-300 hover:bg-gray-700 hover:text-white',
                'group flex items-center px-2 py-2 text-lg font-large rounded-md')} activeClassName='bg-gray-400 text-white'> My Team</NavLink> : <NavLink to={`/team/${userTeam?.id}`} className={classNames('text-gray-300 hover:bg-gray-700 hover:text-white',
                    'group flex items-center px-2 py-2 text-lg font-large rounded-md')} activeClassName='bg-gray-400 text-white'>Teams</NavLink>}
            {userTeam && <>
                {navigation.map((item) => {
                    if (item.name === 'Chatrooms') {
                        return (
                            <>

                                <li>< NavLink
                                    key={item.name}
                                    to={item.to}
                                    onClick={item.onClick}
                                    className={
                                        classNames('text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                    activeClassName='bg-gray-900 text-white'

                                >
                                    <i className="fa-solid fa-caret-down" onClick={e => showChats ? setShowChats(false) : setShowChats(true)} style={showChats ? null : { transform: "rotate(270deg)" }}></i>
                                    <item.icon
                                        className={classNames(
                                            item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                            'mr-3 flex-shrink-0 h-6 w-6'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </NavLink>
                                </li>
                                {teamChats && showChats && Object.values(teamChats).map((room, idx) => (
                                    <li>
                                        <NavLink to={`/team/${teamId}/chat/${room.id}`}
                                            id={`chat${room.id}`}
                                            className={classNames('text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'group flex items-center px-10 py-2 text-xs font-medium rounded-md')}
                                            activeClassName='bg-gray-900 text-white'
                                        >{room.room_name}</NavLink>
                                    </li>

                                ))}



                            </>)
                    } else {
                        return (
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
                        )
                    }
                })}
                {/* <ChatsNav siteId={siteId} teamId={userTeam?.id} team={true} />
                <li><NavLink to={`/team/${userTeam?.id}/inventory`}><i className="fa-solid fa-boxes-stacked"></i>Inventory</NavLink><CreateMaterialModal team={true} /></li>
                {/* <li className="nav-item"><i class="fa-duotone fa-user-cowboy"></i>Members</li> */}
                {/* <li className="nav-item-person"><i class="fa-duotone fa-person-to-door"></i>Leave Team <i className="fas fa-minus" onClick={leaveTeam}></i></li> */}
            </>
            }
        </>
    )
}

export default TeamsNav