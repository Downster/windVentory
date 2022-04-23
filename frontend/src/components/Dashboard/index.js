import LeftMenu from './LeftMenu'
import Navaigation from './Navigation'
import AppBody from './AppBody'
import './Dashboard.css'



const Dashboard = ({ user }) => {


    return (
        <>
            <Navaigation />
            <div className='app-container'>
                <LeftMenu />
                <AppBody />
            </div>

        </>
    )
}

export default Dashboard