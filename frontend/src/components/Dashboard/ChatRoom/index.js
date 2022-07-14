import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import ChatRoomForm from '../ChatRoomForm';
import { useParams } from 'react-router-dom'
import DeleteRoomPrompt from '../DeleteRoomPrompt';


const ChatRoom = ({ room, jobsite, team }) => {
    const user = useSelector(state => state.session.user);
    const currentTeam = useSelector(state => state.currentTeam.team)
    const currentSite = useSelector(state => state.currentSite.site)
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)



    return (
        <div
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
            <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={room.image} alt="" />
            </div>
            <div className="flex-1 min-w-0">
                {team && <NavLink to={`/team/${currentTeam.id}/chat/${room.id}`} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">{room.room_name}</p>
                    <p className="text-sm text-gray-500 truncate">{room.active_members.length} Active users</p>
                </NavLink>
                }
                {jobsite && <NavLink to={`/jobsite/${user.jobsite_id}/chat/${room.id}`} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">{room.room_name}</p>
                    <p className="text-sm text-gray-500 truncate">{room.active_members.length} Active users</p>
                </NavLink>}
            </div>
        </div>
        // <div className='chat-room'>
        //     {showModal && (
        //         <Modal onClose={() => setShowModal(false)}>
        //             <ChatRoomForm siteId={currentSite.id} teamId={currentTeam.id} edit={true} setShowModal={setShowModal} room={room} type={jobsite ? 'site' : 'team'} />
        //         </Modal>
        //     )}
        //     {showDeleteModal && (
        //         <Modal onClose={() => setShowModal(false)}>
        //             <DeleteRoomPrompt room={room} setShowModal={setShowDeleteModal} type={jobsite ? 'site' : 'team'} />
        //         </Modal>
        //     )}
        //     {jobsite && <NavLink className='chat-nav' id={`chat${room.id}`} activeClassName='active'
        //         to={`/jobsite/${user.jobsite_id}/chat/${room.id}`}>
        //         {room.room_name}
        //     </NavLink>
        //     }
        //     {team && <NavLink className='chat-nav' id={`chat${room.id}`} activeClassName='active'
        //         to={`/team/${currentTeam.id}/chat/${room.id}`}>
        //         {room.room_name}
        //     </NavLink>
        //     }
        //     <div className='room-buttons'>
        //         {room.user_id === user.id && <i className="fa-solid fa-pen-to-square" onClick={(e) => setShowModal(true)}></i>}
        //         {room.user_id === user.id && <i className="fa-solid fa-minus" onClick={(e) => setShowDeleteModal(true)}></i>}
        //     </div>
        //     {/* <i className='active-users-num'>[ {room.active_users.length} ]</i> */}

        // </div>
    )
}

export default ChatRoom;