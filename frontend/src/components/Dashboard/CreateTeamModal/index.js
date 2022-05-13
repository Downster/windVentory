import { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import TeamForm from "../TeamForm";


function CreateTeamModal() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    return (
        <>
            <li className='create-team'
                onClick={() => setShowModal(true)}
            >
                Add a Team <i className="fas fa-plus"></i>
            </li>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TeamForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateTeamModal;