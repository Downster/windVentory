import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import ChatRoomForm from '../ChatRoomForm';
import { useParams } from 'react-router-dom'
import DeleteRoomPrompt from '../DeleteRoomPrompt';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'


const ChatRoom = ({ room, jobsite, team }) => {
    const user = useSelector(state => state.session.user);
    const currentTeam = useSelector(state => state.currentTeam.team)
    const currentSite = useSelector(state => state.currentSite.site)
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)



    return (
        <>
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
                <div className='flex flex-grow'>
                    <div className="w-0 flex-1 flex-1 flex">
                        <button
                            onClick={() => setShowModal(true)}
                            className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                        >
                            <PencilAltIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-3">Edit</span>
                        </button>
                    </div>


                    <div className="-ml-px w-0 flex-1 flex">
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                        >
                            <TrashIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-3">Delete</span>
                        </button>
                    </div>
                </div>

            </div>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <ChatRoomForm siteId={currentSite.id} teamId={currentTeam.id} edit={true} setShowModal={setShowModal} room={room} type={jobsite ? 'site' : 'team'} />
                    </Modal>
                )
            }
            {
                showDeleteModal && (
                    <DeleteRoomPrompt room={room} setShowModal={setShowDeleteModal} type={jobsite ? 'site' : 'team'} />

                )
            }
        </>
    )
}

export default ChatRoom;