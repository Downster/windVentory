import { NavLink } from "react-router-dom"
import CreateMaterialModal from "../../CreateMaterialModal"




const InventoryNav = () => {


    return (
        <>
            {<ul className="chat-nav-title"><NavLink to={`/inventory`}><i className="fa-solid fa-boxes-stacked"></i>Inventory</NavLink><CreateMaterialModal /></ul>}
            {/* <ul><li className="chat-item">Team Chat</li></ul> */}
        </>
    )
}

export default InventoryNav