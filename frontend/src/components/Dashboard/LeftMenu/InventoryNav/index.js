import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import CreateChatRoomModal from "../../CreateChatRoomModal"
import ChatRoom from "../../ChatRoom"



const InventoryNav = () => {


    return (
        <>
            {<ul className="chat-nav-title"><NavLink to={`/inventory`}>Inventory</NavLink></ul>}
            {/* <ul><li className="chat-item">Team Chat</li></ul> */}
        </>
    )
}

export default InventoryNav