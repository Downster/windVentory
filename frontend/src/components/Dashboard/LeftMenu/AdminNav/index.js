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
            <ul className="admin-nav-title"><NavLink to='/admin/jobsites'>Manage Jobsites</NavLink><CreateJobSiteModal /></ul>
            <ul className="admin-nav-title"><NavLink to='/admin/teams'>Manage Teams</NavLink><CreateTeamModal /></ul>
            <ul className="admin-nav-title"><NavLink to='/admin/users'>Manage Users</NavLink><CreateUserModal /></ul>
        </ul>
    )
}

export default AdminNav