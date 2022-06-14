import LeftMenu from '../Dashboard/LeftMenu'
import Navaigation from '../Dashboard/Navigation'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Dashboard.css'
import { useEffect } from 'react'
import { getSiteChatRooms } from '../../store/chatRoom'
import { loadUserJobsite, fetchWeather, fetchTeams, loadSiteInventory } from '../../store/currentSite'
import Chat from '../Dashboard/Chat'
import Inventory from '../Dashboard/Inventory'
import ChatRoomCard from '../Dashboard/ChatRoomCard'




const CapstoneDashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const siteRooms = useSelector(state => state.chatRooms.siteRooms)

    const getAllUserInfo = async (user) => {
        await dispatch(loadUserJobsite(user.jobsite_id))
        await dispatch(fetchWeather(user.jobsite_id))
        await dispatch(fetchTeams(user.jobsite_id))
        await dispatch(getSiteChatRooms(user.jobsite_id))
        await dispatch(loadSiteInventory(user.jobsite_id))
    }

    useEffect(() => {
        if (user) {
            if (user.jobsite_id) {
                getAllUserInfo(user)
            }
        }
    }, [dispatch])




    return (
        <>
            <Navaigation />
            <div className='app-container'>
                <LeftMenu capstone={true} />
                <Switch>
                    <Route exact path='/inventory'>
                        <Inventory site={true} />
                    </Route>
                    {/* <Route exact path='/chat'>
                        {Object.values(siteRooms).map((site) => <ChatRoomCard room={site} />)}

                    </Route> */}
                    <Route exact path='/chat/:roomId'>
                        <Chat jobsite={true} />
                    </Route>
                    <Route>
                        <h1>404 errors</h1>
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default CapstoneDashboard