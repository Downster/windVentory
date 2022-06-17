import MaterialCard from "../MaterialCard"
import filterMaterials from "../../../utils/filterMaterials"
import './SiteInventory.css'


const DisplayInventory = ({ inventory, team }) => {
    const materials = filterMaterials('material', Object.values(inventory))
    const chemicals = filterMaterials('chemical', Object.values(inventory))
    const misc = filterMaterials('misc', Object.values(inventory))







    return (
        <>
            <div className="material-inventory">
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
            </div>
        </>
    )
}

export default DisplayInventory