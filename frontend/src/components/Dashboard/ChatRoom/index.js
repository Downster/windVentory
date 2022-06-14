import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { deleteChatRoom } from '../../../store/chatRoom';
import { Modal } from '../../../context/Modal';
import ChatRoomForm from '../ChatRoomForm';
import ChatRoomCard from '../ChatRoomCard';


const ChatRoom = ({ room }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

    }, [dispatch])

    const deleteRoom = async () => {
        const errors = await dispatch(deleteChatRoom(room.id, 'site'))
        history.push('/inventory')
    }


    return (
        <div className='chat-room'>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ChatRoomForm edit={true} setShowModal={setShowModal} room={room} />
                </Modal>
            )}
            <NavLink activeClassName='active'
                to={`/chat/${room.id}`}>
                <p className='side-nav-overflow-control'>{room.room_name}</p>
            </NavLink>
            {room.user_id === user.id && <i class="fa-solid fa-pen-to-square" onClick={(e) => setShowModal(true)}></i>}
            {room.user_id === user.id && <i className="fa-solid fa-minus" onClick={deleteRoom}></i>}
            {/* <i className='active-users-num'>[ {room.active_users.length} ]</i> */}

        </div>
    )
}

export default ChatRoom;