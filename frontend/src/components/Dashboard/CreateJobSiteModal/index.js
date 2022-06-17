import { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import CreateJobsiteForm from "../JobSiteForm";

function CreateJobSiteModal() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    return (
        <>

            <i className="fas fa-plus" onClick={() => setShowModal(true)}></i>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateJobsiteForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateJobSiteModal;