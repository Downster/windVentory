import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import CreateChatRoomModal from "../../CreateChatRoomModal"
import ChatRoom from "../../ChatRoom"



const ChatsNav = ({ siteId, siteChats }) => {


    return (
        <>
            {<ul className="chat-nav-title"><NavLink to={`/chat`}>Chat Rooms</NavLink><CreateChatRoomModal siteId={1} /></ul>}
            {siteChats && Object.values(siteChats).map((room, idx) => (
                <ChatRoom key={idx} room={room} />
            ))}
            {/* <ul><li className="chat-item">Team Chat</li></ul> */}
        </>
    )
}

export default ChatsNav