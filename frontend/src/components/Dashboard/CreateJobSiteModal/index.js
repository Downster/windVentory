

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
            <li className='create-job-site'
                onClick={() => setShowModal(true)}
            >
                Add a jobsite <i className="fas fa-plus"></i>
            </li>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateJobsiteForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateJobSiteModal;