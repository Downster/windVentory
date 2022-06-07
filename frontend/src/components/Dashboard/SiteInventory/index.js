import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import MaterialCard from "../MaterialCard"


const SiteInventory = ({ inventory }) => {
    console.log(Object.values(inventory))

    return (
        <>
            <h1>Materials</h1>
            {inventory && Object.values(inventory).filter((item) => item.class_id === 1).map((mat) => <MaterialCard material={mat} />)}
            <h1>Chemicals</h1>
            {inventory && Object.values(inventory).filter((item) => item.class_id === 2).map((mat) => <MaterialCard material={mat} />)}
            <h1>Misc</h1>
            {inventory && Object.values(inventory).filter((item) => item.class_id === 3).map((mat) => <MaterialCard material={mat} />)}
        </>
    )
}

export default SiteInventory