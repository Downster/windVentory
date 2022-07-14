import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setUserTeam, leaveUserTeam } from '../../../store/session';
import { loadTeamInventory, setTeam, leaveCurrentTeam } from '../../../store/currentTeam';
import { Modal } from "../../../context/Modal";
import TeamForm from '../TeamForm';
import { getTeamChatRoom, clearTeamRooms } from '../../../store/chatRoom';
import { DotsVerticalIcon } from '@heroicons/react/solid'
import DeleteTeamPrompt from '../DeleteTeamPrompt';
import randomItem from "random-item";


const TeamCard = ({ team, admin }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const currentTeam = useSelector(state => state.currentTeam.team)
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    const backgroundColors = ['bg-pink-600', 'bg-purple-600', 'bg-yellow-500', 'bg-green-500']

    const joinTeam = async () => {
        await dispatch(setUserTeam(team.id))
        await dispatch(setTeam(user?.teams))
        await dispatch(loadTeamInventory(user.teams.location))
        await dispatch(getTeamChatRoom(team.id))

        history.push(`/team/${team.id}`)
    }

    const deleteTeam = () => {
        setShowDeleteModal(true)
    }

    const modifyTeam = () => {
        setShowModal(true)
    }

    const leaveTeam = async () => {
        await dispatch(leaveUserTeam(team.id))
        await dispatch(leaveCurrentTeam())
        await dispatch(clearTeamRooms())

    }
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    function randomColor() {
        return randomItem(backgroundColors)
    }


    return (
        <li className="col-span-1 flex shadow-sm rounded-md">
            <div
                className={classNames(
                    randomColor(),
                    'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                )}
            >
                {team.job_type}
            </div>
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm truncate">
                    <button
                        className="text-gray-900 font-medium hover:text-gray-600"
                        onClick={joinTeam}
                    >
                        {team.team_lead.firstName + " " + team.team_lead.lastName}'s Team
                    </button>
                    <p className="text-gray-500">{team.team_members.length} Members</p>
                </div>
                {/* <div className="flex-shrink-0 pr-2">
                    <button
                        type="button"
                        className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <span className="sr-only">Open options</span>
                        <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
                </div> */}
            </div>
        </li>
        // <div className='team-container'>
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
        //         {showDeleteModal && (
        //             <Modal onClose={() => setShowModal(false)}>
        //                 <DeleteTeamPrompt team={team} setShowModal={setShowDeleteModal} />
        //             </Modal>
        //         )}

        //     </div>
        // </div>
    )
}

export default TeamCard