import CreateJobSiteModal from "../../CreateJobSiteModal"
import CreateMaterialModal from "../../CreateMaterialModal"
import { NavLink } from "react-router-dom"
import ChatsNav from "../ChatsNav"



const JobSiteNav = ({ isMember, isAdmin, siteChats, siteId }) => {

    return (
        <>
            {isMember ?
                <NavLink to={`/jobsite/${siteId}`} ><ul className="jobsite-nav-title">My Jobsite</ul></NavLink> : <ul className="jobsite-nav-title">Jobsites</ul>}
            {isMember &&
                <>

                    <ChatsNav siteId={siteId} siteChats={siteChats} />
                    <li><NavLink to={`/jobsite/${siteId}/inventory`}><i className="fa-solid fa-boxes-stacked"></i>Inventory</NavLink><CreateMaterialModal /></li>
                    <li><NavLink to={`/jobsite/${siteId}/weather`}><i class="fa-duotone fa-cloud-bolt-sun"></i>Weather</NavLink></li>
                    <li><NavLink to={`/jobsite/${siteId}/teams`}><i class="fa-duotone fa-people-group"></i>Teams</NavLink></li>
                    <li><NavLink to={`/jobsite/${siteId}/towers`}><i class="fa-duotone fa-wind-turbine"></i>Towers</NavLink></li>
                    <li><i class="fa-duotone fa-user-cowboy"></i>Members</li>
                    <li className="jobsite-item"><i class="fa-duotone fa-person-to-door"></i>Leave Jobsite <i className="fas fa-minus"></i></li>
                </>
            }
        </>

    )
}

export default JobSiteNav