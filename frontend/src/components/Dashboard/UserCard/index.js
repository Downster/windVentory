import UserForm from '../UserForm';
import { Modal } from '../../../context/Modal';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../../store/allUsers';
import './userCard.css'
import DeleteUserPrompt from '../DeleteUserPrompt';
import ReactTooltip from 'react-tooltip';

const UserCard = ({ user, admin }) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    const editUser = () => {
        setShowModal(true)
    }

    const deleteUser = async () => {
        setShowDeleteModal(true)
    }


    return (
        <div className='user-container'>
            <div className="user-card">
                {errors && errors.map((err, idx) => <li className='errors' key={idx}>{err}</li>)}
                <img className="user-card-image" src={user.image} data-tip={'Current Jobsite: ' + user?.jobsite_info?.name}></img>
                <ReactTooltip
                    className="tool-tip-cls"
                    place="right"
                    type="dark"
                    effect="solid"
                />
                <h1 className="team-name">{user.firstName + " " + user.lastName}</h1>
                {!admin && <button>View User</button>}
                {admin && <button onClick={editUser}>Edit User</button>}
                {admin && <button onClick={deleteUser}>Delete User</button>}
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <UserForm setShowModal={setShowModal} user={user} edit={true} />
                    </Modal>
                )}
                {showDeleteModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <DeleteUserPrompt user={user} setShowModal={setShowDeleteModal} setErrors={setErrors} />
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default UserCard