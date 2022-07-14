import { useSelector, useDispatch } from "react-redux"
import DisplayInventory from "../DisplayInventory";

const Inventory = ({ site, team }) => {
    const siteInventory = useSelector(state => state.currentSite.inventory)
    const teamInventory = useSelector(state => state.currentTeam.inventory)



    return (
        <>{
            site && <DisplayInventory inventory={siteInventory} />
        }
            {
                team && <DisplayInventory team={team} inventory={teamInventory} />
            }
        </>
    )
}

export default Inventory