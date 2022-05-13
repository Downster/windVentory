import LeftMenu from './LeftMenu'
import Navaigation from './Navigation'
import Jobsite from './Jobsite'
import AllSites from './AllSites'
import Team from './Team'
import { Switch, Route } from 'react-router-dom'
import './Dashboard.css'



const Dashboard = () => {

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
                    <Route path='/admin/jobsites'>
                        <AllSites adminPanel={true} />
                    </Route>
                    <Route path='/admin/teams'>
                        <h1>Admin Teams Panel</h1>
                    </Route>
                    <Route path='/admin/users'>
                        <h1>Admin User Panel</h1>
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default Dashboard