import CreateJobSiteModal from "../../CreateJobSiteModal"
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { loadAllTeams } from "../../../../store/allTeams"
import { loadAllUsers } from "../../../../store/allUsers"
import CreateTeamModal from "../../CreateTeamModal"
import CreateUserModal from "../../CreateUserModal"

import { UserGroupIcon, UserIcon, GlobeIcon } from "@heroicons/react/outline"



const AdminNav = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadAllTeams())
        dispatch(loadAllUsers())
    })

    const navigation = [
        { name: 'Manage Jobsites', to: `/admin/jobsites`, icon: GlobeIcon, current: false },
        { name: 'Manage Teams', to: `/admin/teams`, icon: UserGroupIcon, current: false },
        { name: 'Manage Users', to: `/admin/users`, icon: UserIcon, current: false }
    ]
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }



    return (
        // <ul className="left-menu-list">
        //     <ul className="admin-nav-title"><NavLink to='/admin/jobsites'>Manage Jobsites</NavLink><CreateJobSiteModal /></ul>
        //     <ul className="admin-nav-title"><NavLink to='/admin/teams'>Manage Teams</NavLink><CreateTeamModal /></ul>
        //     <ul className="admin-nav-title"><NavLink to='/admin/users'>Manage Users</NavLink><CreateUserModal /></ul>
        // </ul>
        <>
            {
                navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.to}
                        onClick={item.onClick}
                        className={classNames('text-gray-300 hover:bg-gray-700 hover:text-white',
                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                        )}
                        activeClassName='bg-gray-900 text-white'

                    >
                        <item.icon
                            className={classNames(
                                item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                'mr-3 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                        />
                        {item.name}
                    </NavLink>
                ))
            }
        </>
    )
}

export default AdminNav