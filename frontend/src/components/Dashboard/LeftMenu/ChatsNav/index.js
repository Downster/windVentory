import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import CreateChatRoomModal from "../../CreateChatRoomModal"
import ChatRoom from "../../ChatRoom"
import { useState } from "react"



const ChatsNav = ({ siteId, siteChats }) => {

    const [showChats, setShowChats] = useState(true)


    return (
        <>
            <ul className="chat-nav-title"><i className="fa-solid fa-caret-down" onClick={e => showChats ? setShowChats(false) : setShowChats(true)} style={showChats ? null : { transform: "rotate(270deg)" }}></i><NavLink className='menu-nav' to={`/chat`}> <i class="fa-solid fa-comment"></i>Chat Rooms</NavLink> <CreateChatRoomModal siteId={1} /></ul>
            {
                siteChats && showChats && Object.values(siteChats).map((room, idx) => (
                    <ChatRoom key={idx} room={room} />
                ))
            }
            {/* <ul><li className="chat-item">Team Chat</li></ul> */}
        </>
    )
}

export default ChatsNav