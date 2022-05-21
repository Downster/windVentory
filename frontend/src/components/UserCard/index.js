import UserForm from '../Dashboard/UserForm';
import { Modal } from '../../context/Modal';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../store/allUsers';
import './userCard.css'


const UserCard = ({ user, admin }) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    const editUser = () => {
        setShowModal(true)
    }

    const deleteUser = () => {
        dispatch(removeUser(user.id))
    }


    return (
        <div className='user-container'>
            <div className="user-card">
                <img className="user-card-image" src={user.image}></img>
                <h1 className="team-name">{user.firstName + " " + user.lastName}</h1>
                {!admin && <button>View User</button>}
                {admin && <button onClick={editUser}>Edit User</button>}
                {admin && <button onClick={deleteUser}>Delete User</button>}
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <UserForm setShowModal={setShowModal} user={user} edit={true} />
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default UserCard