import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import CreateChatRoomModal from "../../CreateChatRoomModal"
import ChatRoom from "../../ChatRoom"
import { useState } from "react"



const ChatsNav = ({ siteId, siteChats }) => {

    const [showChats, setShowChats] = useState(true)


    return (
        <>
            <button className='chat-menu-button' onClick={e => showChats ? setShowChats(false) : setShowChats(true)}>
                <ul className="chat-nav-title"><NavLink className='menu-nav' to={`/chat`}> <i className="fa-solid fa-caret-down" style={showChats ? null : { transform: "rotate(270deg)" }}></i><i class="fa-solid fa-comment"></i>Chat Rooms</NavLink></ul>
            </button>
            <CreateChatRoomModal siteId={1} />
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