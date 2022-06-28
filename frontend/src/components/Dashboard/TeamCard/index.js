import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setUserTeam, leaveUserTeam } from '../../../store/session';
import { removeTeam } from '../../../store/allTeams';
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
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    const joinTeam = async () => {
        await dispatch(setUserTeam(team.id))
        await dispatch(setTeam(team))
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
            <div className="team-card">
                <h1 className="team-name">{team.team_lead.firstName + " " + team.team_lead.lastName}'s Team</h1>
                <h1 className='team-site'>Jobsite: {team.jobsite.name}</h1>
                <h1 className='team-site'>Jobsite state: {team.jobsite.state}</h1>
                <h1 className='team-site'>Client: {team.jobsite.client}</h1>
                {admin ? null : (currentTeam?.id !== team?.id) ? <button onClick={joinTeam}>Join Team</button> : <button onClick={leaveTeam}>Leave Team</button>}
                {admin && <button onClick={modifyTeam}>Edit Team</button>}
                {admin && <button onClick={deleteTeam}>Delete Team</button>}
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <TeamForm setShowModal={setShowModal} edit={true} teamId={team.id} />
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