import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { loadSiteInventory } from "../../../store/currentSite"
import MaterialCard from "../MaterialCard"
import filterMaterials from "../../../utils/filterMaterials"
import './SiteInventory.css'


const SiteInventory = ({ siteInventory }) => {
    const dispatch = useDispatch()
    const materials = filterMaterials('material', Object.values(siteInventory))
    const chemicals = filterMaterials('chemical', Object.values(siteInventory))

    useEffect(() => {
        dispatch(loadSiteInventory(1))
    }, [dispatch])






    return (
        <>
            <div className="material-inventory">
                <div className="materials-header-container">
                    <h1>Materials</h1>
                    <div className="inventory-display">
                        {materials && materials.map((mat) => {
                            return <MaterialCard key={mat.id} material={mat} />
                        })}
                    </div>
                </div>
                <div className="chemicals-header-containter">
                    <h1>Chemicals</h1>
                    <div className="inventory-display">
                        {chemicals && chemicals.map((mat) => {
                            return <MaterialCard key={mat.id} material={mat} />
                        })}
                    </div>
                </div>
                <div className="misc-header-container">
                    <h1>Misc</h1>
                    <div className="inventory-display">

                    </div>
                </div>
            </div>
        </>
    )
}

export default SiteInventory