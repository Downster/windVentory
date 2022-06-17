import { useSelector, useDispatch } from "react-redux"
import DisplayInventory from "../DisplayInventory";

const Inventory = ({ site, team }) => {
    const siteInventory = useSelector(state => state.currentSite.inventory)
    const teamInventory = useSelector(state => state.currentTeam.inventory)



    return (
        <>{
            site && <div className="app-body"><DisplayInventory inventory={siteInventory} /></div>
        }
            {
                team && <div className="app-body"><DisplayInventory team={team} inventory={teamInventory} /></div>
            }
        </>
    )
}

export default Inventory