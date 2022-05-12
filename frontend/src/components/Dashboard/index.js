import LeftMenu from './LeftMenu'
import Navaigation from './Navigation'
import Jobsite from './Jobsite'
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
                    <Route path='/jobsite/:jobsiteId'>

                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default Dashboard