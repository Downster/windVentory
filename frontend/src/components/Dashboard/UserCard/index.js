import UserForm from '../UserForm';
import { Modal } from '../../../context/Modal';
import { useState, useEffect } from 'react';
import './userCard.css'
import DeleteUserPrompt from '../DeleteUserPrompt';


const UserCard = ({ user, admin }) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false)

    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    const editUser = () => {
        setShowModal(true)
        setShow(false)
    }


    const deleteUser = async () => {
        setShowDeleteModal(true)
    }


    return (
        <div className='user-container'>
            <div className="user-card" onMouseEnter={(e) => setShow(true)} onMouseLeave={(e) => setShow(false)}>
                {errors && errors.map((err, idx) => <li className='errors' key={idx}>{err}</li>)}
                <img className="user-card-image" alt='user' src={user.image}></img>
                <h1 className="team-name">{user.firstName + " " + user.lastName}</h1>
                {!admin && <button>View User</button>}
                <div className='user-buttons'>
                    {show && admin && <i class="fa-duotone fa-user-pen" onClick={editUser}></i>}
                    {show && admin && <i class="fa-duotone fa-ban" onClick={deleteUser}></i>}
                </div>
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