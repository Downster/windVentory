import LeftMenu from './LeftMenu'
import Navaigation from './Navigation'
import AppBody from './AppBody'
import './Dashboard.css'



const Dashboard = () => {


    return (
        <>
            <div className='whole-page-container'>
                <Navaigation />
                <div className='app-container'>
                    <LeftMenu />
                    <AppBody />
                </div>
            </div>
        </>
    )
}

export default Dashboard