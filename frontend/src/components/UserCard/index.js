import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../store/allUsers';
import './userCard.css'


const UserCard = ({ user, admin }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        return () => setShowModal(false);
    }, []);
    console.log(user.id)
    const joinTeam = () => {

    }

    const deleteUser = () => {
        dispatch(removeUser(user.id))
    }


    return (
        <div className='user-container'>
            <div className="user-card">
                <img className="user-card-image" src={user.image}></img>
                <h1 className="team-name">{user.firstName + " " + user.lastName}</h1>
                {!admin && <button onClick={joinTeam}>View User</button>}
                {admin && <button>Edit User</button>}
                {admin && <button onClick={deleteUser}>Delete User</button>}
            </div>
        </div>
    )
}

export default UserCard