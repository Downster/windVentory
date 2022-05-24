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
import { fetchTeams } from '../../store/currentSite'
import { fetchUserTeam } from '../../store/currentTeam'
import JobSiteCard from './JobSiteCard'
import SiteWeather from './SiteWeather'
import SiteTeams from './SiteTeams'
import { getSiteChatRooms } from '../../store/chatRoom'



const Dashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const getAllUserInfo = async (user) => {
        await dispatch(loadUserJobsite(user.jobsite_id))
        await dispatch(fetchWeather(user.jobsite_id))
        await dispatch(fetchTeams(user.jobsite_id))
        await dispatch(getSiteChatRooms(user.jobsite_id))
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
                        <h1>User-site-inventory</h1>
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
                    <Route exact path='/team/:teamId'>
                        <Team />
                    </Route>
                    <Route exact path='/team/:teamId/inventory'>
                        <Team />
                    </Route>
                    <Route exact path='/jobsite/:siteId/chats'>
                        <h1>Chat rooms</h1>
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