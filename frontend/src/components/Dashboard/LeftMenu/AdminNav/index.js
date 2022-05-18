import CreateJobSiteModal from "../../CreateJobSiteModal"
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { loadAllTeams } from "../../../../store/allTeams"
import { loadAllUsers } from "../../../../store/allUsers"
import CreateTeamModal from "../../CreateTeamModal"
import CreateUserModal from "../../CreateUserModal"



const AdminNav = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadAllTeams())
        dispatch(loadAllUsers())
    })



    return (
        <ul className="left-menu-list">
            <NavLink to='/admin/jobsites'><li className="admin-nav-title">Manage Jobsites</li></NavLink>
            <CreateJobSiteModal />
            <NavLink to='/admin/teams'><li className="admin-nav-title">Manage Teams</li></NavLink>
            <CreateTeamModal />
            <NavLink to='/admin/users'><li className="admin-nav-title">Manage Users</li></NavLink>
            <CreateUserModal />
        </ul>
    )
}

export default AdminNav