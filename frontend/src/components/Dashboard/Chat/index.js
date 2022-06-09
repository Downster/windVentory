import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import { joinChatRoom, leaveChatRoom, getSiteChatRooms } from '../../../store/chatRoom'
import { createChatMessage, loadChatMessages, clearMessages, removeMessage } from '../../../store/messages'
import ChatMessage from '../ChatMessage';


let socket;

const Chat = ({ jobsite }) => {
    let chatMessages;
    let chatRoom;
    const [messageBody, setMessageBody] = useState("");
    const [errors, setErrors] = useState([])
    const { siteId, roomId } = useParams();
    console.log(jobsite)
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const stateMessages = useSelector(state => state.messages);
    chatMessages = Object.values(stateMessages)


    const chatRooms = useSelector(state => state.chatRooms);
    if (jobsite) {
        chatRoom = chatRooms.siteRooms[roomId];
    } else {
        chatRoom = chatRooms.teamRooms[roomId];
    }








    const sendChat = async (e) => {
        e.preventDefault();
        const errors = await dispatch(createChatMessage(roomId, messageBody));
        if (errors) {
            setErrors(errors.errors)
        } else {
            socket.emit('chat', {
                user: `${user.firstName} ${user.lastName}`, msg: messageBody, room: roomId, user_image: user.image, created_at: (new Date()).toLocaleTimeString()
            });
            setMessageBody("");
            setErrors([])
        }
    };

    useEffect(() => {
        dispatch(loadChatMessages(roomId))


    }, [roomId, dispatch])





    useEffect(() => {
        socket = io();

        dispatch(joinChatRoom(roomId, 'site'));

        socket.emit('join', { 'username': `${user.firstName} ${user.lastName}`, 'room': roomId });
        socket.emit('join_room', { 'username': `${user.firstName} ${user.lastName}`, 'room': roomId })


        socket.on('chat', (message) => {
            dispatch(loadChatMessages(roomId))
        });

        socket.on('edit', (message) => {
            dispatch(loadChatMessages(roomId))
        })

        socket.on('delete', (message) => {
            dispatch(removeMessage(message.msgId))
        })

        socket.on('join_room', () => {
            dispatch(getSiteChatRooms(user.jobsite_id));
        });

        socket.on('leave_room', (user) => {
            dispatch(getSiteChatRooms(user.jobsite_id));
        });


        return (() => {
            dispatch(leaveChatRoom(roomId, 'site'));
            socket.emit('leave', { 'username': `${user.firstName} ${user.lastName}`, 'room': roomId });
            socket.emit('leave_room', { 'username': `${user.firstName} ${user.lastName}`, 'room': roomId })
            dispatch(clearMessages())

            socket.disconnect();
        })
    }, [roomId, user.firstName, user.lastName, dispatch]);


    return (
        <>
            <div className='chat-container'>
                <h2 className='chat-room-name'>Welcome to #{chatRoom?.room_name}!</h2>
            </div>
            <div className='chat-room-container'>
                <div className='chat-messages-container'>
                    {chatMessages?.map(msg => {
                        return (
                            <>
                                <ChatMessage msg={msg} socket={socket} />
                            </>
                        )

                    })}
                </div>
                <form autoComplete="off" className='chat-input-form' onSubmit={sendChat}>
                    {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    <input
                        value={messageBody}
                        onChange={(e) => setMessageBody(e.target.value)}
                        placeholder={`Message #${chatRoom?.room_name}`}
                    />
                    <button disabled={!messageBody.length} id='send-chat' type='submit'><i className="fas fa-paper-plane"></i></button>
                </form>
            </div>
        </>
    )
}


export default Chat;
