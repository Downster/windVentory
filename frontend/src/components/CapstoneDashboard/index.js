import LeftMenu from '../Dashboard/LeftMenu'
import Navaigation from '../Dashboard/Navigation'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Dashboard.css'
import { useEffect } from 'react'
import { getSiteChatRooms } from '../../store/chatRoom'
import Chat from '../Dashboard/Chat'




const CapstoneDashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getSiteChatRooms(1))
    }, [dispatch])




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
                        <h1>All Chat Rooms</h1>
                    </Route>
                    <Route exact path='/chat/:roomId'>
                        <Chat jobsite={true} />
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default CapstoneDashboard