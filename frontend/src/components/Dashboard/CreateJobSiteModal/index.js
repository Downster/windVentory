import { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import CreateJobsiteForm from "../JobSiteForm";
import { PlusSmIcon as PlusSmIconOutline } from '@heroicons/react/outline'

function CreateJobSiteModal() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    return (
        <>

            <div class="absolute bottom-0 right-0 h-16 w-16 ...">
                <button
                    onClick={() => setShowModal(true)}
                    type="button"
                    className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusSmIconOutline className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateJobsiteForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateJobSiteModal;