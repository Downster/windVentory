import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import MaterialCard from "../MaterialCard"
import filterMaterials from "../../../utils/filterMaterials"


const SiteInventory = ({ inventory }) => {
    const materials = filterMaterials('material', Object.values(inventory))
    const chemicals = filterMaterials('chemical', Object.values(inventory))



    return (
        <>
            <div className="material-inventory">
                <div className="materials-header-container">
                    <h1>Materials</h1>
                    <div className="inventory-display">
                        {materials && materials.map((mat) => {
                            return <MaterialCard material={mat} />
                        })}
                    </div>
                </div>
                <div className="chemicals-header-containter">
                    <h1>Chemicals</h1>
                    <div className="inventory-display">
                        {chemicals && chemicals.map((mat) => {
                            return <MaterialCard material={mat} />
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