import { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import UserForm from "../UserForm";


function CreateUserModal() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    return (
        <>
            <li className='create-user'
                onClick={() => setShowModal(true)}
            >
                Add a User <i className="fas fa-plus"></i>
            </li>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UserForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateUserModal;