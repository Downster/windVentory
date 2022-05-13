import CreateJobSiteModal from "../../CreateJobSiteModal"
import { NavLink } from "react-router-dom"



const AdminNav = () => {

    return (
        <ul className="left-menu-list">
            <NavLink to='/admin/jobsites'><li className="admin-nav-title">Manage Jobsites</li></NavLink>
            <CreateJobSiteModal />
            <NavLink to='/admin/teams'><li className="admin-nav-title">Manage Teams</li></NavLink>
            <NavLink to='/admin/users'><li className="admin-nav-title">Manage Users</li></NavLink>
        </ul>
    )
}

export default AdminNav