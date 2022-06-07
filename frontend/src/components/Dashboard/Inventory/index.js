import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import SiteInventory from "../SiteInventory";
const Inventory = ({ site }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const siteInventory = useSelector(state => state.currentSite.inventory)




    return (
        <>{
            site && <SiteInventory inventory={siteInventory} />
        }
        </>
    )
}

export default Inventory