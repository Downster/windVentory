import { useHistory } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon, XIcon } from '@heroicons/react/outline'
import { setUserTeam, leaveUserTeam } from '../../../store/session';
import { loadTeamInventory, setTeam, leaveCurrentTeam } from '../../../store/currentTeam';
import { removeTeam } from '../../../store/allTeams';
import { Modal } from "../../../context/Modal";
import TeamForm from '../TeamForm';
import { getTeamChatRoom, clearTeamRooms } from '../../../store/chatRoom';
import { DotsVerticalIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import DeleteTeamPrompt from '../DeleteTeamPrompt';
import randomItem from "random-item";
import { fetchTeams } from '../../../store/currentSite';


const TeamCard = ({ team, admin }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const currentTeam = useSelector(state => state.currentTeam.team)
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [leadOpen, setLeadOpen] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    const backgroundColors = ['bg-pink-600', 'bg-purple-600', 'bg-yellow-500', 'bg-green-500']

    const joinTeam = async () => {
        if (user.teams?.id) {
            setOpen(true)
        } else {

            await dispatch(setUserTeam(team.id))
            await dispatch(setTeam(user?.teams))
            await dispatch(loadTeamInventory(user.teams[0].location))
            await dispatch(getTeamChatRoom(team.id))
            await dispatch(fetchTeams(user.jobsite_id))

            history.push(`/team/${team.id}`)
        }
    }

    const deleteTeam = async () => {
        await dispatch(removeTeam(team.id))
        await dispatch(fetchTeams(user.jobsite_id))
        setLeadOpen(false)

    }

    const modifyTeam = () => {
        setShowModal(true)
    }


    const leaveTeam = async () => {
        if (user.teams[0].lead_id === user.id) {
            setLeadOpen(true)
        } else {
            await dispatch(leaveUserTeam(user.teams[0].id))
            await dispatch(leaveCurrentTeam())
            await dispatch(clearTeamRooms())
            await dispatch(fetchTeams(user.jobsite_id))
            if (open) {
                setOpen(false)
            }
        }

    }
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    function randomColor() {
        return randomItem(backgroundColors)
    }


    return (
        <>
            <div className='my-2'>
                <li className="col-span-1 flex flex-col shadow-sm rounded-md">
                    <div className='flex'>
                        <div
                            className={classNames(
                                randomColor(),
                                'flex-shrink-0 flex items-center justify-center w-1/4 text-white text-sm font-medium rounded-l-md'
                            )}
                        >
                            {team.job_type}
                        </div>
                        <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                            <div className="flex-1 px-4 py-2 text-sm truncate">
                                <button
                                    className="text-gray-900 font-medium hover:text-gray-600"
                                    onClick={!currentTeam?.length > 0 ? null : joinTeam}
                                >
                                    {team.team_lead.firstName + " " + team.team_lead.lastName}'s Team
                                </button>
                                <p className="text-gray-500">{team.team_members.length} Members</p>
                            </div>
                            {admin &&
                                <>
                                    <div className="w-0 flex-1 flex">
                                        <button
                                            onClick={modifyTeam}
                                            className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                        >
                                            <PencilAltIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                            <span className="ml-3">Edit</span>
                                        </button>
                                    </div>


                                    <div className="-ml-px w-0 flex-1 flex">
                                        <button
                                            onClick={() => setShowDeleteModal(true)}
                                            className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                        >
                                            <TrashIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                            <span className="ml-3">Delete</span>
                                        </button>
                                    </div>
                                </>}
                            {!admin && <div className="flex-shrink-0 pr-2">
                                <button
                                    type="button"
                                    className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="sr-only">Open options</span>
                                    {admin ? null : (currentTeam?.id !== team?.id) ? <><i class="fa-duotone fa-right-to-bracket" onClick={joinTeam}></i></> : (user.teams[0].lead_id === user.id) ? <i class="fa-duotone fa-ban team" onClick={() => setLeadOpen(true)}></i> : <i class="fa-duotone fa-person-to-door display" onClick={leaveTeam}></i>}

                                </button>
                            </div>}
                        </div>
                    </div>
                </li>

                {/* // <div className='team-container'>
        //     <div className="team-card" onMouseEnter={(e) => setShow(true)} onMouseLeave={(e) => setShow(false)}>
        //         <div className='team-image'>
        //             <i class="fa-duotone fa-people-group display"></i>
        //         </div>
        //         <h1 className="team-name">{team.team_lead.firstName + " " + team.team_lead.lastName}'s Team</h1>
        //         {admin ? null : (currentTeam?.id !== team?.id) ? <><i class="fa-duotone fa-right-to-bracket" onClick={joinTeam}></i></> : <i class="fa-duotone fa-person-to-door display" onClick={leaveTeam}></i>}
        //         <div className='team-buttons'>
        //             {show && admin && <i class="fa-duotone fa-user-pen team" onClick={modifyTeam}></i>}
        //             {show && admin && <i class="fa-duotone fa-ban team" onClick={deleteTeam}></i>}
        //         </div>
        //         {showModal && (
        //             <Modal onClose={() => setShowModal(false)}>
        //                 <TeamForm setShowModal={setShowModal} edit={true} team={team} />
        //             </Modal>
        //         )}
                {showDeleteModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <DeleteTeamPrompt team={team} setShowModal={setShowDeleteModal} />
                    </Modal>
                )}

        //     </div>
        // </div> */}
            </div >
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                                    <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                        <button
                                            type="button"
                                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                You are already part of a team
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Please leave your current team before joining another one.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={leaveTeam}
                                        >
                                            Leave Team
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={() => setOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={leadOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                                    <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                        <button
                                            type="button"
                                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => setLeadOpen(false)}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                You can't leave a team that you are leading
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Would you like to delete your team?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={deleteTeam}
                                        >
                                            Delete Team
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={() => setLeadOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {
                showDeleteModal && (
                    <DeleteTeamPrompt team={team} setShowModal={setShowDeleteModal} />
                )
            }
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TeamForm setShowModal={setShowModal} edit={true} team={team} />
                </Modal>
            )}
        </>
    )
}

export default TeamCard