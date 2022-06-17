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

            <i className="fas fa-plus" onClick={() => setShowModal(true)}></i>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UserForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateUserModal;