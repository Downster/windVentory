import LeftMenu from '../Dashboard/LeftMenu'
import Navaigation from '../Dashboard/Navigation'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Dashboard.css'




const CapstoneDashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)




    return (
        <>
            <Navaigation />
            <div className='app-container'>
                <LeftMenu capstone={true} />
                <Switch>
                    <Route exact path='/inventory'>
                        <h1>User Inventory</h1>
                    </Route>
                    <Route exact path='/chat'>
                        <h1>User Chat</h1>
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default CapstoneDashboard