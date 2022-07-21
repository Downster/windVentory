import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import CreateChatRoomModal from "../../CreateChatRoomModal"
import ChatRoom from "../../ChatRoom"
import { useState } from "react"
import checkPermissions from "../../../../utils/checkPermissions"



const ChatsNav = ({ siteId, siteChats, team }) => {
    const [showChats, setShowChats] = useState(true)
    const teamId = useSelector(state => state.currentTeam?.team?.id)
    const teamChats = useSelector(state => state.chatRooms.teamRooms)
    const userRole = useSelector(state => state.session.user.role[0])
    const canCreate = checkPermissions(userRole, team ? 'team' : 'site')

    return (
        <>
            {Object.values(siteChats).length === 0 && <h1>There are no chat rooms at this site, please contact your supervisor.</h1>}
            {team && Object.values(teamChats).length === 0 && <h1>There are no chat rooms for this team, create one?</h1>}

            {
                siteChats && showChats && Object.values(siteChats).map((room, idx) => (
                    <ChatRoom key={idx} room={room} jobsite={true} />
                ))
            }
            {team && teamChats && showChats && Object.values(teamChats).filter((room) => room.team_id === teamId).map((room, idx) => (
                <ChatRoom key={room.id} room={room} team={true} />
            ))}
            {canCreate && <CreateChatRoomModal siteId={siteId} teamId={teamId} type={team ? 'team' : 'site'} />}

        </>
    )
}

export default ChatsNav