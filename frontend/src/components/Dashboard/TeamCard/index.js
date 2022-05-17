import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setUserTeam } from '../../../store/session';
import { removeTeam } from '../../../store/allTeams';
import { setTeam } from '../../../store/currentTeam';
import { Modal } from "../../../context/Modal";
import TeamForm from '../TeamForm';


const TeamCard = ({ team, admin }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    const joinTeam = () => {
        dispatch(setUserTeam(team.id))
        dispatch(setTeam(team))
        history.push(`/team/${team.id}`)
    }

    const deleteTeam = () => {
        dispatch(removeTeam(team.id))
    }

    const modifyTeam = () => {
        setShowModal(true)
    }


    return (
        <div className='team-container'>
            <div className="team-card">
                <h1 className="team-name">{team.team_lead.firstName + " " + team.team_lead.lastName}'s Team</h1>
                {!admin && <button onClick={joinTeam}>Join Team</button>}
                {admin && <button onClick={modifyTeam}>Edit Team</button>}
                {admin && <button onClick={deleteTeam}>Delete Team</button>}
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <TeamForm setShowModal={setShowModal} edit={true} teamId={team.id} />
                    </Modal>
                )}

            </div>
        </div>
    )
}

export default TeamCard