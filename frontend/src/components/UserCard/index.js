import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'



const UserCard = ({ user, admin }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    const joinTeam = () => {

    }

    const deleteTeam = () => {
    }


    return (
        <div className='user-container'>
            <div className="user-card">
                <h1 className="team-name">{user.firstName + " " + user.lastName}</h1>
                {!admin && <button onClick={joinTeam}>View User</button>}
                {admin && <button>Edit User</button>}
                {admin && <button onClick={deleteTeam}>Delete User</button>}

            </div>
        </div>
    )
}

export default UserCard