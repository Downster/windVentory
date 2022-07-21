import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import * as sessionActions from '../../store/session';
import filterMaterials from '../../utils/filterMaterials';
import {
    BellIcon,
    LightningBoltIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    MenuAlt2Icon,
    UsersIcon,
    XIcon,
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import LeftMenu from './LeftMenu'
import Navaigation from './Navigation'
import Jobsite from './Jobsite'
import AllSites from './AllSites'
import AllUsers from './AllUsers'
import AllTeams from './AllTeams'
import Hotel from './Hotel'
import Team from './Team'
import { Switch, Route, NavLink, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Dashboard.css'
import { fetchWeather, loadUserJobsite } from '../../store/currentSite'
import { loadAllTeams } from '../../store/allTeams'
import { loadAllUsers } from '../../store/allUsers';
import { useEffect } from 'react'
import { getJobsites } from '../../store/jobsites'
import { fetchTeams, loadSiteInventory } from '../../store/currentSite'
import { fetchUserTeam, loadTeamInventory } from '../../store/currentTeam'
import JobSiteCard from './JobSiteCard'
import SiteWeather from './SiteWeather'
import SiteTeams from './SiteTeams'
import Chat from './Chat'
import { getSiteChatRooms, getTeamChatRoom } from '../../store/chatRoom'
import Inventory from './Inventory'
import { flipLoading } from '../../store/session'
import { loadLeads } from '../../store/leads'
import { io } from 'socket.io-client'
import checkPermissions from '../../utils/checkPermissions'
import Navigation from './Navigation'
import ChatsNav from './LeftMenu/ChatsNav'
import MaterialCard from './MaterialCard'


let socket;
const Dashboard = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const role = user.role[0]
    const canAccess = checkPermissions(role, 'panel')
    const siteChats = useSelector(state => state?.chatRooms?.siteRooms)
    const [hasJobsite, setHasJobsite] = useState(user?.jobsite_id ? true : false)
    const getAllUserInfo = async (user) => {
        await dispatch(flipLoading())
        await dispatch(loadUserJobsite(user.jobsite_id))
        await dispatch(fetchWeather(user.jobsite_id))
        await dispatch(fetchTeams(user.jobsite_id))
        await dispatch(getSiteChatRooms(user.jobsite_id))
        await dispatch(loadSiteInventory(user.jobsite_id))
        if (user.teams[0]) {
            await dispatch(getTeamChatRoom(user.teams[0].id))
            await dispatch(loadTeamInventory(user.teams[0].location))
        }
        await dispatch(flipLoading())
    }


    useEffect(() => {
        if (user) {
            if (user.jobsite_id) {
                getAllUserInfo(user)
            }
            dispatch(loadAllTeams())
            dispatch(loadLeads())
            dispatch(getJobsites())
            dispatch(fetchUserTeam(user))
        }
        socket = io()
        socket.emit('sign-in', { 'id': user.id, 'username': user.firstName, 'online': true })
        socket.on('chat-global', (data) => {
            const path = window.location.href.split('/')
            if ((path[5] !== 'chat' && path[6] !== data.room) || (path[5] === 'chat' && path[6] !== data.room)) {
                if (document.getElementById(`chat${data.room}`)) {
                    const room = document.getElementById(`chat${data.room}`)
                    room.classList.add('text-amber-300')
                }
            }
        })
        socket.on('sign-in', async (data) => {
            await dispatch(loadAllUsers())
        });

        socket.on('log-out', async (data) => {
            console.log('loggedOut')
            await dispatch(loadAllUsers())
        })

        socket.on('create-site-room', (data) => {
            dispatch(getSiteChatRooms(user.jobsite_id))
        })

        socket.on('create-team-room', (data) => {
            dispatch(getTeamChatRoom(user.teams[0].id))
        })
        return (() => {
            socket.emit('log-out', { 'id': user.id, 'room': 'chatter', 'online': false })
            socket.disconnect()
        })

    }, [dispatch, user])

    //global socket listener
    //on chat check the path of the user
    //if they aren't on that chatrooms path and belong to the chatroom
    //change the style of the chatroom
    const logout = async () => {
        await dispatch(sessionActions.logout());
        history.push('/')
    };

    const adminPanel = () => {
        history.push('/admin/jobsites')
    }
    const admin = { name: 'Admin Panel', href: '#', onClick: adminPanel }

    const userNavigation = [
        // { name: 'Your Profile', href: '#', onClick: null },
        // { name: 'Settings', href: '#', onClick: null },
        { name: 'Sign out', href: '#', onClick: logout },
    ]
    if (canAccess) {
        userNavigation.push(admin)
    }


    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>

            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex z-40">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-shrink-0 flex items-center px-4">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                        alt="Workflow"
                                    />
                                </div>
                                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                    <LeftMenu />
                                    {/* <nav className="px-2 space-y-1"> */}
                                    {/* {navigation.map((item) => (
                                                <Navlink
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                                            'mr-4 flex-shrink-0 h-6 w-6'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Navlink>
                                            ))}
                                        </nav> */}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
                    <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
                        <i className="fa-duotone fa-wind-turbine splash" style={{ "--fa-primary-color": "#FFFFFF", "--fa-secondary-color": "#FFFFFF" }}>
                        </i>
                        <p
                            onClick={() => history.push('/')}
                            className='cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        >windVentory</p>
                    </div>
                    <div className="flex-1 flex flex-col overflow-y-auto">
                        <nav className="flex-1 px-2 py-4 space-y-1">
                            <LeftMenu />
                            {/* {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                                'mr-3 flex-shrink-0 h-6 w-6'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </a>
                                ))} */}
                        </nav>
                    </div>
                </div>
            </div>
            <div className="md:pl-64 h-full flex flex-col">
                <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                    <button
                        type="button"
                        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex-1 px-4 flex justify-end">
                        <div className="ml-4 flex items-center md:ml-6">
                            <button
                                type="button"
                                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {/* <span className="sr-only">View notifications</span>
                                <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                            </button>

                            {/* Profile dropdown */}
                            <Menu as="div" className="ml-3 relative">
                                <div>
                                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={user?.image}
                                            alt=""
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {userNavigation.map((item) => (
                                            <Menu.Item key={item.name}>
                                                {({ active }) => (
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                        onClick={item.onClick}
                                                    >
                                                        {item.name}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>

                <main className="flex-1">
                    <Switch>
                        <Route exact path='/'>
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
                                <Jobsite />
                            </div>
                        </Route>
                        <Route exact path='/jobsite/:jobsiteId/inventory'>
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
                                <Inventory site={true} />
                            </div>
                        </Route>
                        <Route exact path='/jobsite/:jobsiteId/'>
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
                                <JobSiteCard single={true} />
                            </div>
                        </Route>
                        <Route exact path='/jobsite/:jobsiteId/teams'>
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
                                <SiteTeams />
                            </div>
                        </Route>
                        <Route exact path='/jobsite/:jobsiteId/weather'>
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
                                <SiteWeather />
                            </div>
                        </Route>
                        <Route exact path='/jobsite/:jobsiteId/hotel'>
                            <div className="max-w-7xl mx-auto h-full w-full py-6 px-4 sm:px-6 md:px-8">
                                <Hotel />
                            </div>
                        </Route>
                        <Route exact path='/jobsite/:siteId/chat/:roomId'>
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8 h-full w-full">
                                <Chat jobsite={true} />
                            </div>
                        </Route>
                        <Route exact path='/team/:teamId'>
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
                                <Team />
                            </div>
                        </Route>
                        <Route exact path='/team/:teamId/inventory'>
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
                                <Inventory team={true} />
                            </div>
                        </Route>
                        <Route exact path='/team/:teamId/chats'>
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
                                <ChatsNav siteId={user.jobsite_id} team={true} />
                            </div>
                        </Route>
                        <Route exact path='/jobsite/:siteId/chats'>
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
                                <ChatsNav siteId={user.jobsite_id} siteChats={siteChats} />
                            </div>
                        </Route>
                        <Route exact path='/team/:teamId/chat/:roomId'>
                            <div id='chat-div' className="flex max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8 h-most w-full">
                                <Chat />
                            </div>
                        </Route>
                        <Route path='/admin/jobsites'>
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
                                {canAccess ?
                                    <AllSites adminPanel={true} /> : <h1>Unauthorized</h1>
                                }
                            </div>
                        </Route>
                        <Route path='/admin/teams'>
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
                                {canAccess ?
                                    <AllTeams /> :
                                    <h1>Unauthorized</h1>}
                            </div>
                        </Route>
                        <Route path='/admin/users'>
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
                                {canAccess ?
                                    <AllUsers /> :
                                    <h1>Unauthorized</h1>
                                }
                            </div>
                        </Route>
                        <Route>
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
                                <h1>Sorry, an error occured. Url not found</h1>
                            </div>
                        </Route>
                    </Switch>

                </main>
            </div>

        </>
    )
}
{/* <Navaigation />
            <div className='app-container'>
                <LeftMenu />
                <Switch>
                    <Route exact path='/'>
                        <Jobsite />
                    </Route>
                    <Route exact path='/jobsite/:jobsiteId/inventory'>
                        <Inventory site={true} />
                    </Route>
                    <Route exact path='/jobsite/:jobsiteId/'>
                        <JobSiteCard single={true} />
                    </Route>
                    {/* <Route exact path='/jobsite/:jobsiteId/events'>
                        <h1>Events</h1>
                    </Route>
                    <Route exact path='/jobsite/:jobsiteId/teams'>
                        <SiteTeams />
                    </Route>
                    <Route exact path='/jobsite/:jobsiteId/weather'>
                        <SiteWeather />
                    </Route>
                    <Route exact path='/jobsite/:jobsiteId/hotel'>
                        <Hotel />
                    </Route>
                    <Route exact path='/jobsite/:jobsiteId/members'>
                        <h1>Site members</h1>
                    </Route>
                    <Route exact path='/team/:teamId'>
                        <Team />
                    </Route>
                    <Route exact path='/team/:teamId/inventory'>
                        <Inventory team={true} />
                    </Route>
                    <Route exact path='/team/:teamId/chat/:roomId'>
                        <Chat />
                    </Route>
                    {/* <Route exact path='/team/:teamId/events'>
                        <h1>Events</h1>
                    </Route>
                    <Route exact path='/jobsite/:siteId/chat/:roomId'>
                        <Chat jobsite={true} />
                    </Route>
                    <Route path='/admin/jobsites'>
                        {canAccess ?
                            <AllSites adminPanel={true} /> : <h1>Unauthorized</h1>
                        }
                    </Route>
                    <Route path='/admin/teams'>
                        {canAccess ?
                            <AllTeams /> :
                            <h1>Unauthorized</h1>}
                    </Route>
                    <Route path='/admin/users'>
                        {canAccess ?
                            <AllUsers /> :
                            <h1>Unauthorized</h1>
                        }
                    </Route>
                    <Route>
                        <h1>Sorry, an error occured. Url not found</h1>
                    </Route>
                </Switch>
            </div>
        </> */}

export default Dashboard