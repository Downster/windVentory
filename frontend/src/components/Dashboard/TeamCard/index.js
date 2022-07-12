import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setUserTeam, leaveUserTeam } from '../../../store/session';
import { loadTeamInventory, setTeam, leaveCurrentTeam } from '../../../store/currentTeam';
import { Modal } from "../../../context/Modal";
import TeamForm from '../TeamForm';
import { getTeamChatRoom, clearTeamRooms } from '../../../store/chatRoom';
import DeleteTeamPrompt from '../DeleteTeamPrompt';


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


    return (
        <div className='team-container'>
            <div className="team-card" onMouseEnter={(e) => setShow(true)} onMouseLeave={(e) => setShow(false)}>
                <div className='team-image'>
                    <i class="fa-duotone fa-people-group display"></i>
                </div>
                <h1 className="team-name">{team.team_lead.firstName + " " + team.team_lead.lastName}'s Team</h1>
                {admin ? null : (currentTeam?.id !== team?.id) ? <><i class="fa-duotone fa-right-to-bracket" onClick={joinTeam}></i></> : <i class="fa-duotone fa-person-to-door display" onClick={leaveTeam}></i>}
                <div className='team-buttons'>
                    {show && admin && <i class="fa-duotone fa-user-pen team" onClick={modifyTeam}></i>}
                    {show && admin && <i class="fa-duotone fa-ban team" onClick={deleteTeam}></i>}
                </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <TeamForm setShowModal={setShowModal} edit={true} team={team} />
                    </Modal>
                )}
                {showDeleteModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <DeleteTeamPrompt team={team} setShowModal={setShowDeleteModal} />
                    </Modal>
                )}

            </div>
        </div>
    )
}

export default TeamCard