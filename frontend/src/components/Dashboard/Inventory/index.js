import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import SiteInventory from "../SiteInventory";
import { loadSiteInventory } from "../../../store/currentSite";
const Inventory = ({ site }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const jobsite = useSelector(state => state.currentSite)
    const siteInventory = useSelector(state => state.currentSite.inventory)



    return (
        <>{
            site && <div className="app-body"><SiteInventory siteInventory={siteInventory} /></div>
        }
        </>
    )
}

export default Inventory