import { NavLink } from "react-router-dom"
import CreateChatRoomModal from "../../CreateChatRoomModal"



const ChatsNav = ({ siteId }) => {


    return (
        <>
            {<ul className="chat-nav-title"><NavLink to={`/jobsite/${siteId}/chats`}>Jobsite Chat</NavLink><CreateChatRoomModal siteId={siteId} /></ul>}
            <ul><li className="chat-item">Team Chat</li></ul>
        </>
    )
}

export default ChatsNav