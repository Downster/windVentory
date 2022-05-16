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
import { loadUserJobsite } from '../../store/currentSite'
import { loadAllTeams } from '../../store/allTeams'
import { useEffect } from 'react'
import { getJobsites } from '../../store/jobsites'
import { fetchTeams } from '../../store/siteTeams'
import { fetchUserTeam } from '../../store/currentTeam'



const Dashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        if (user.jobsite_id) {
            dispatch(loadUserJobsite(user.jobsite_id))
            dispatch(fetchTeams(user.jobsite_id))
        }
        dispatch(loadAllTeams())
        dispatch(getJobsites())
        dispatch(fetchUserTeam(user))
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
                        <h1>User-site</h1>
                    </Route>
                    <Route exact path='/jobsite/:jobsiteId/teams'>
                        <Team />
                    </Route>
                    <Route exact path='/team/:teamId'>
                        <Team />
                    </Route>
                    <Route exact path='/team/:teamId/inventory'>
                        <Team />
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