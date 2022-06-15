import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import CreateChatRoomModal from "../../CreateChatRoomModal"
import ChatRoom from "../../ChatRoom"
import { useState } from "react"



const ChatsNav = ({ siteId, siteChats }) => {

    const [showChats, setShowChats] = useState(true)


    return (
        <>
            <ul className="chat-nav-title">
                <div className="chat-nav">
                    <i className="fa-solid fa-caret-down" onClick={e => showChats ? setShowChats(false) : setShowChats(true)} style={showChats ? null : { transform: "rotate(270deg)" }}></i>
                    <i className="fa-solid fa-comment"></i>
                    <p className="room-text">Chat Rooms</p>
                    <CreateChatRoomModal siteId={1} />
                </div>
            </ul>
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