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

            <i className="fas fa-plus" onClick={() => setShowModal(true)}></i>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TeamForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateTeamModal;