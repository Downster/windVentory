import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import ChatRoomForm from '../ChatRoomForm';
import DeleteRoomPrompt from '../DeleteRoomPrompt';


const ChatRoom = ({ room }) => {
    const user = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)




    return (
        <div className='chat-room'>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ChatRoomForm edit={true} setShowModal={setShowModal} room={room} />
                </Modal>
            )}
            {showDeleteModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteRoomPrompt room={room} setShowModal={setShowDeleteModal} />
                </Modal>
            )}
            <NavLink activeClassName='active'
                to={`/chat/${room.id}`}>
                {room.room_name}
            </NavLink>
            {room.user_id === user.id && <i className="fa-solid fa-pen-to-square" onClick={(e) => setShowModal(true)}></i>}
            {room.user_id === user.id && <i className="fa-solid fa-minus" onClick={(e) => setShowDeleteModal(true)}></i>}
            {/* <i className='active-users-num'>[ {room.active_users.length} ]</i> */}

        </div>
    )
}

export default ChatRoom;