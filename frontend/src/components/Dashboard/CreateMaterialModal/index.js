import { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import MaterialForm from "../MaterialForm";


function CreateMaterialModal() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    return (
        <>
            <i className="fas fa-plus" onClick={() => setShowModal(true)}></i>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <MaterialForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateMaterialModal;