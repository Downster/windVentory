import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import SiteInventory from "../SiteInventory";
import { loadSiteInventory } from "../../../store/currentSite";
const Inventory = ({ site }) => {
    const history = useHistory();
    const dispatch = useDispatch();



    return (
        <>{
            site && <div className="app-body"><SiteInventory /></div>
        }
        </>
    )
}

export default Inventory