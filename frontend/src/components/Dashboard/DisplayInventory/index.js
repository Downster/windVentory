import MaterialCard from "../MaterialCard"
import filterMaterials from "../../../utils/filterMaterials"
import './SiteInventory.css'
import { useSelector } from "react-redux"
import { useRef, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import CreateMaterialModal from "../CreateMaterialModal"


const DisplayInventory = ({ inventory, team }) => {
    const loading = useSelector(state => state.session.loading)
    const { jobsiteId } = useParams()
    const tabs = useRef(
        [
            { name: 'Materials', to: '#', current: true },
            { name: 'Chemicals', to: '#', current: false },
            { name: 'Misc', to: '#', current: false },
        ]
    )
    const [category, setCategory] = useState('Materials')
    let materials, chemicals, misc;
    if (inventory) {
        materials = filterMaterials('material', Object.values(inventory))
        chemicals = filterMaterials('chemical', Object.values(inventory))
        misc = filterMaterials('misc', Object.values(inventory))
    }


    function setTab(inputTab) {
        const currentTab = tabs.current.find((tab) => tab.current)
        tabs.current[tabs.current.indexOf(currentTab)].current = false
        const changeTab = tabs.current.find((tab) => tab.name === inputTab)
        tabs.current[tabs.current.indexOf(changeTab)].current = true
        setCategory(inputTab)
    }




    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }





    return (
        <>
            {!loading &&
                <>
                    <div className="sm:hidden">
                        <label htmlFor="tabs" className="sr-only">
                            Select a tab
                        </label>

                        <select
                            id="tabs"
                            name="tabs"
                            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            onChange={({ target: { value } }) => setCategory(value)}
                            defaultValue={tabs.current.find((tab) => tab.current).name}

                        >
                            {tabs.current.map((tab) => (
                                <option key={tab.name} value={tab.name}>{tab.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="hidden sm:block">
                        <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
                            {tabs.current.map((tab, tabIdx) => (
                                <button
                                    key={tab.name}
                                    className={classNames(
                                        tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                                        tabIdx === 0 ? 'rounded-l-lg' : '',
                                        tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                                        'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                                    )}
                                    aria-current={tab.current ? 'page' : undefined}
                                    onClick={() => setTab(tab.name)}
                                >
                                    <span>{tab.name}</span>
                                    <span
                                        aria-hidden="true"
                                        className={classNames(
                                            tab.current ? 'bg-indigo-500' : 'bg-transparent',
                                            'absolute inset-x-0 bottom-0 h-0.5'
                                        )}
                                    />
                                </button>
                            ))}
                        </nav>
                    </div>
                    <ul className="grid grid-cols-1 mt-4 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {category === 'Materials' && materials.map((mat) => {
                            return <MaterialCard team={team} key={mat.id} material={mat} />
                        })}
                    </ul>
                    <ul className="grid grid-cols-1 mt-4 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {category === 'Chemicals' && chemicals?.map((mat) => {
                            return <MaterialCard team={team} key={mat.id} material={mat} />
                        })}
                    </ul>
                    <ul className="grid grid-cols-1 mt-4 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {category === 'Misc' && misc.map((mat) => {
                            return <MaterialCard team={team} key={mat.id} material={mat} />
                        })}
                        <CreateMaterialModal />
                    </ul>
                </>
            }



            {
                loading &&
                <>
                    <img src='https://windventory.s3.amazonaws.com/turbine.gif'>
                    </img>
                </>
            }
        </>
    )
}
// <>
//     {!loading && <div className="material-inventory">

//         <div className="materials-header-container">
//             <div className="inventory-title">
//                 <h1 className="materials-title">Materials</h1>
//             </div>
//             <div className="inventory-display">
//                 {materials && materials.map((mat) => {
//                     return <MaterialCard team={team} key={mat.id} material={mat} />
//                 })}
//             </div>
//         </div>
//         <div className="chemicals-header-containter">
//             <div className="inventory-title">
//                 <h1 className="chemicals-title">Chemicals</h1>
//             </div>
//             <div className="inventory-display">
//                 {chemicals && chemicals.map((mat) => {
//                     return <MaterialCard team={team} key={mat.id} material={mat} />
//                 })}
//             </div>
//         </div>
//         <div className="misc-header-container">
//             <div className="inventory-title">
//                 <h1 className="misc-title">Misc</h1>
//             </div>
//             <div className="inventory-display">
//                 {misc && misc.map((mat) => {
//                     return <MaterialCard team={team} key={mat.id} material={mat} />
//                 })}
//             </div>
//         </div>
//     </div>}
// </>

export default DisplayInventory