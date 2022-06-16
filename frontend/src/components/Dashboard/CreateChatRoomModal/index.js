import { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import ChatRoomForm from "../ChatRoomForm";


function CreateChatRoomModal({ siteId, teamId }) {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    return (
        <>
            <i className="fas fa-plus" onClick={() => setShowModal(true)}></i>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ChatRoomForm setShowModal={setShowModal} siteId={siteId} teamId={teamId} />
                </Modal>
            )}
        </>
    );
}

export default CreateChatRoomModal;