import CreateJobSiteModal from "../../CreateJobSiteModal"
import { NavLink } from "react-router-dom"
import CreateChatRoomModal from "../../CreateChatRoomModal"



const ChatsNav = ({ siteId }) => {


    return (
        <>
            {<NavLink to={`/jobsite/${siteId}/chats`}><ul className="chat-nav-title">Jobsite Chat<CreateChatRoomModal siteId={siteId} /></ul></NavLink>}
            <ul><li className="chat-item">Team Chat</li></ul>
        </>
    )
}

export default ChatsNav