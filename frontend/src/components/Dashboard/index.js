import LeftMenu from './LeftMenu'
import Navaigation from './Navigation'
import Jobsite from './Jobsite'
import AllSites from './AllSites'
import AllUsers from './AllUsers'
import AllTeams from './AllTeams'
import Team from './Team'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Dashboard.css'
import { fetchWeather, loadUserJobsite } from '../../store/currentSite'
import { useParams } from 'react-router'
import { loadAllTeams } from '../../store/allTeams'
import { useEffect } from 'react'
import { getJobsites } from '../../store/jobsites'
import { fetchTeams, loadSiteInventory } from '../../store/currentSite'
import { fetchUserTeam, loadTeamInventory } from '../../store/currentTeam'
import JobSiteCard from './JobSiteCard'
import SiteWeather from './SiteWeather'
import SiteTeams from './SiteTeams'
import Chat from './Chat'
import { getSiteChatRooms, getTeamChatRoom } from '../../store/chatRoom'
import DisplayInventory from './DisplayInventory'
import Inventory from './Inventory'



const Dashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const getAllUserInfo = async (user) => {
        await dispatch(loadUserJobsite(user.jobsite_id))
        await dispatch(fetchWeather(user.jobsite_id))
        await dispatch(fetchTeams(user.jobsite_id))
        await dispatch(getSiteChatRooms(user.jobsite_id))
        await dispatch(loadSiteInventory(user.jobsite_id))
        if (user.teams[0]) {
            await dispatch(getTeamChatRoom(user.teams[0].id))
            await dispatch(loadTeamInventory(user.teams[0].location))
        }
    }

    useEffect(() => {
        if (user) {
            if (user.jobsite_id) {
                getAllUserInfo(user)
            }
            dispatch(loadAllTeams())
            dispatch(getJobsites())
            dispatch(fetchUserTeam(user))
        }
    }, [dispatch])

    return (
        <>
            <Navaigation />
            <div className='app-container'>
                <LeftMenu />
                <Switch>
                    <Route exact path='/'>
                        <Jobsite />
                    </Route>
                    <Route exact path='/jobsite/:jobsiteId/inventory'>
                        <Inventory site={true} />
                    </Route>
                    <Route exact path='/jobsite/:jobsiteId/'>
                        <JobSiteCard single={true} />
                    </Route>
                    <Route exact path='/jobsite/:jobsiteId/teams'>
                        <SiteTeams />
                    </Route>
                    <Route exact path='/jobsite/:jobsiteId/weather'>
                        <SiteWeather />
                    </Route>
                    <Route exact path='/jobsite/:jobsiteId/towers'>
                        <h1> Site tower</h1>
                    </Route>

                    <Route exact path='/team/:teamId'>
                        <Team />
                    </Route>
                    <Route exact path='/team/:teamId/inventory'>
                        <Inventory team={true} />
                    </Route>
                    <Route exact path='/team/:teamId/chat/:roomId'>
                        <Team />
                    </Route>
                    <Route exact path='/jobsite/:siteId/chats'>
                        <h1>Jobsite Chats</h1>
                    </Route>
                    <Route exact path='/jobsite/:siteId/chat/:roomId'>
                        <Chat jobsite={true} />
                    </Route>
                    <Route path='/admin/jobsites'>
                        <AllSites adminPanel={true} />
                    </Route>
                    <Route path='/admin/teams'>
                        <AllTeams />
                    </Route>
                    <Route path='/admin/users'>
                        <AllUsers />
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default Dashboard