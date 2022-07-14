import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import CreateChatRoomModal from "../../CreateChatRoomModal"
import ChatRoom from "../../ChatRoom"
import { useState } from "react"
import checkPermissions from "../../../../utils/checkPermissions"



const ChatsNav = ({ siteId, siteChats, team }) => {
    const [showChats, setShowChats] = useState(true)
    const teamId = useSelector(state => state.currentTeam.id)
    const teamChats = useSelector(state => state.chatRooms.teamRooms)
    const userRole = useSelector(state => state.session.user.role[0])
    const canCreate = checkPermissions(userRole, team ? 'team' : 'site')

    return (
        <>

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