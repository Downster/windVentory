import UserForm from '../UserForm';
import { Modal } from '../../../context/Modal';
import { useState, useEffect } from 'react';
import './userCard.css'
import DeleteUserPrompt from '../DeleteUserPrompt';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'


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

    function roleColor(role) {
        let className;
        if (role === 'Admin' || 'Supervisor') {
            className = "px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full"
        } else if (role === 'Lead') {
            className = "px-2 py-1 text-green-800 text-xs font-medium bg-yellow-100 rounded-full"
        } else if (role === 'Worker') {
            className = "px-2 py-1 text-green-800 text-xs font-medium bg-red-100 rounded-full"
        }
        return className
    }


    return (
        <>
            <li
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
            >
                <div className="flex-1 flex flex-col p-8">
                    <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={user.image} alt="" />
                    <h3 className="mt-6 text-gray-900 text-sm font-medium">{user.firstName + " " + user.lastName}</h3>
                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                        <dt className="sr-only">Title</dt>
                        <dt className="sr-only">Role</dt>
                        <dd className="mt-3">
                            <span className={roleColor(user.role[0])}>
                                {user.role}
                            </span>
                        </dd>
                    </dl>
                </div>
                <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="w-0 flex-1 flex">
                            <button
                                onClick={editUser}
                                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                            >
                                <PencilAltIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                <span className="ml-3">Edit User</span>
                            </button>
                        </div>
                        <div className="-ml-px w-0 flex-1 flex">
                            <button
                                onClick={deleteUser}
                                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                            >
                                <TrashIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                <span className="ml-3">Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <UserForm setShowModal={setShowModal} user={user} edit={true} />
                    </Modal>
                )
            }
            {
                showDeleteModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <DeleteUserPrompt user={user} setShowModal={setShowDeleteModal} setErrors={setErrors} />
                    </Modal>
                )
            }
        </>

    )
}

export default UserCard