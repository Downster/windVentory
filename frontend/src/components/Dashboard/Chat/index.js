import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import { joinChatRoom, leaveChatRoom, getSiteChatRooms } from '../../../store/chatRoom'
import { createChatMessage, loadChatMessages, clearMessages } from '../../../store/messages'


let socket;

const Chat = ({ jobsite }) => {
    let chatMessages;
    let chatRoom;
    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState("");
    const { siteId, roomId } = useParams();
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
        socket.emit('chat', {
            user: `${user.firstName} ${user.lastName}`, msg: messageBody, room: roomId, user_image: user.image, created_at: (new Date()).toLocaleTimeString()
        });
        const errors = await dispatch(createChatMessage(roomId, messageBody));
        setMessageBody("");
    };

    useEffect(() => {
        dispatch(loadChatMessages(roomId))


    }, [roomId, dispatch])





    useEffect(() => {
        socket = io();

        dispatch(joinChatRoom(roomId, 'site'));

        socket.emit('join', { 'username': `${user.firstName} ${user.lastName}`, 'room': roomId });
        socket.emit('join_room', { 'username': `${user.firstName} ${user.lastName}`, 'room': roomId })
        socket.emit('chat', { user: '', msg: `${user.firstName} ${user.lastName} has joined the room.`, room: roomId });


        socket.on('chat', (message) => {
            setMessages(messages => [...messages, message]);
        });

        socket.on('join_room', () => {
            dispatch(getSiteChatRooms(siteId));
        });

        socket.on('leave_room', (user) => {
            dispatch(getSiteChatRooms(siteId));
        });


        return (() => {
            dispatch(leaveChatRoom(roomId, 'site'));
            socket.emit('leave', { 'username': `${user.firstName} ${user.lastName}`, 'room': roomId });
            socket.emit('leave_room', { 'username': `${user.firstName} ${user.lastName}`, 'room': roomId })
            socket.emit('chat', { user: '', msg: `${user.firstName} ${user.lastName} has left the room.`, room: roomId });
            dispatch(clearMessages())
            setMessages([]);

            socket.disconnect();
        })
    }, [roomId, user.firstName, user.lastName, dispatch]);


    return (
        <>
            <div className='chat-container'>
                <h2 className='chat-room-name'>Welcome to #{chatRoom?.room_name}!</h2>
                <div className='active-users-container'>
                    {chatRoom?.active_members.map(member => {
                        return (
                            <div key={user.id} className='active-user-img-container'>
                                <img className='active-user-img' src={member.image} alt={member.id}></img>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='chat-room-container'>
                <div className='chat-messages-container'>
                    {chatMessages?.map(msg => {
                        return (
                            <div className='chat-message' id={msg.id}>
                                <p className='chat-username'>{msg.firstName}<span className='created-at-msg'>{(new Date(msg.created_at)).toLocaleTimeString()}</span></p>
                                <p className='chat-text'>{msg.message}</p>
                            </div>
                        )

                    })}
                    {messages?.map((message, idx) => (
                        <div
                            className={message.user === 'weStudy-Bot' ? 'center chat-msg' : message.user === user.username ? 'right chat-msg' : 'left chat-msg'}
                            key={idx}>
                            {message.user !== 'weStudy-Bot' &&
                                <div className='profile-pic-div chat-profile-pic'>
                                    <img src={message.user_image} alt={message.user}></img>
                                </div>
                            }
                            <div className='chat-message'>
                                {message.user !== 'weStudy-Bot' &&
                                    <p className='chat-username'>{message.user}<span className='created-at-msg'>{message.created_at}</span></p>
                                }
                                <p className='chat-text' id={message.id}>{message.msg}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <form autoComplete="off" className='chat-input-form' onSubmit={sendChat}>
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
