import CreateJobSiteModal from "../../CreateJobSiteModal"
import { NavLink } from "react-router-dom"



const ChatsNav = ({ siteId }) => {


    return (
        <>
            {<NavLink to={`/chats`}><ul className="chat-nav-title">Chat</ul></NavLink>}
            <ul><li className="chat-item">Jobsite Chat</li></ul>
            <ul><li className="chat-item">Team Chat</li></ul>
        </>
    )
}

export default ChatsNav