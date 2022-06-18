import MaterialCard from "../MaterialCard"
import filterMaterials from "../../../utils/filterMaterials"
import './SiteInventory.css'
import { useSelector } from "react-redux"


const DisplayInventory = ({ inventory, team }) => {
    const loading = useSelector(state => state.session.loading)
    let materials, chemicals, misc;
    if (inventory) {
        materials = filterMaterials('material', Object.values(inventory))
        chemicals = filterMaterials('chemical', Object.values(inventory))
        misc = filterMaterials('misc', Object.values(inventory))
    }







    return (
        <>
            {loading &&
                <>
                    <h1>Loading.....</h1>
                    <img src='https://windventory.s3.amazonaws.com/turbine.gif'>
                    </img>
                </>
            }
            {!loading && <div className="material-inventory">
                <div className="materials-header-container">
                    <div className="inventory-title">
                        <h1 className="materials-title">Materials</h1>
                    </div>
                    <div className="inventory-display">
                        {materials && materials.map((mat) => {
                            return <MaterialCard team={team} key={mat.id} material={mat} />
                        })}
                    </div>
                </div>
                <div className="chemicals-header-containter">
                    <div className="inventory-title">
                        <h1 className="chemicals-title">Chemicals</h1>
                    </div>
                    <div className="inventory-display">
                        {chemicals && chemicals.map((mat) => {
                            return <MaterialCard team={team} key={mat.id} material={mat} />
                        })}
                    </div>
                </div>
                <div className="misc-header-container">
                    <div className="inventory-title">
                        <h1 className="misc-title">Misc</h1>
                    </div>
                    <div className="inventory-display">
                        {misc && misc.map((mat) => {
                            return <MaterialCard team={team} key={mat.id} material={mat} />
                        })}
                    </div>
                </div>
            </div>}
        </>
    )
}

export default DisplayInventory