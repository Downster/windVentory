import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'


const TeamCard = ({ team }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        return () => setShowModal(false);
    }, []);


    return (
        <div className='team-container'>
            <div className="team-card">
                <h1 className="team-name">{team.team_lead.firstName + " " + team.team_lead.lastName}'s Team</h1>

            </div>
        </div>
    )
}

export default TeamCard