import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import CreateChatRoomModal from "../../CreateChatRoomModal"
import ChatRoom from "../../ChatRoom"
import { useState } from "react"



const ChatsNav = ({ siteId, teamId, siteChats, team }) => {
    const [showChats, setShowChats] = useState(true)
    const teamChats = useSelector(state => state.chatRooms.teamRooms)


    return (
        <>
            <ul className="chat-nav-title">
                <div className="chat-nav">
                    <i className="fa-solid fa-caret-down" onClick={e => showChats ? setShowChats(false) : setShowChats(true)} style={showChats ? null : { transform: "rotate(270deg)" }}></i>
                    <i className="fa-solid fa-comment"></i>
                    <p className="room-text">Chat Rooms</p>
                    <CreateChatRoomModal siteId={siteId} teamId={teamId} />
                </div>
            </ul>
            {
                siteChats && showChats && Object.values(siteChats).map((room, idx) => (
                    <ChatRoom key={idx} room={room} jobsite={true} />
                ))
            }
            {team && teamChats && showChats && Object.values(teamChats).filter((room) => room.team_id === teamId).map((room, idx) => (
                <ChatRoom key={room.id} room={room} team={true} />
            ))}

        </>
    )
}

export default ChatsNav