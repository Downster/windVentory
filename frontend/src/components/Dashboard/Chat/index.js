import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import { joinChatRoom, leaveChatRoom, getSiteChatRooms, getTeamChatRoom } from '../../../store/chatRoom'
import { createChatMessage, loadChatMessages, clearMessages, removeMessage } from '../../../store/messages'
import ChatMessage from '../ChatMessage';
import ChatInput from '../ChatInput';
import './Chat.css'
import { useContext } from 'react';
import { SocketContext } from '../../../context/SocketContext'



const Chat = ({ jobsite }) => {
    let { socket: { current: socket } } = useContext(SocketContext);
    let chatMessages;
    let chatRoom;
    const [messageBody, setMessageBody] = useState("");
    const [errors, setErrors] = useState([])
    const { roomId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const stateMessages = useSelector(state => state.messages);
    chatMessages = Object.values(stateMessages)


    const chatRooms = useSelector(state => state.chatRooms);

    if (jobsite) {
        chatRoom = chatRooms.siteRooms[roomId];
        // if (!chatRoom) {
        //     history.push('/inventory')
        // }
    } else {
        chatRoom = chatRooms.teamRooms[roomId];
    }

    const scroll = () => {
        const container = document.querySelector('.outer-chat-container');
        if (container) {
            container.scrollTop = container.scrollHeight
        }
    }










    const sendChat = async (e) => {
        if (messageBody !== "<p><br></p>") {
            const errors = await dispatch(createChatMessage(roomId, messageBody));
            if (errors) {
                setErrors(errors.errors)
            } else {
                socket.emit('chat', {
                    user: `${user.firstName} ${user.lastName}`, msg: messageBody, room: roomId, user_image: user.image, created_at: (new Date()).toLocaleTimeString()
                });
                setMessageBody("");
                setErrors([])
                scroll()
            }
        } else {
            setErrors(['Message cannot be empty, please input a message'])
        }
    };

    useEffect(() => {
        dispatch(loadChatMessages(roomId))
        jobsite && dispatch(joinChatRoom(roomId, 'site'));
        !jobsite && dispatch(joinChatRoom(roomId, 'team'));
    }, [roomId, dispatch])





    useEffect(() => {
        if (chatRoom) {
            scroll()



            socket.emit('join', { 'username': `${user.firstName} ${user.lastName}`, 'room': roomId });
            jobsite && socket.emit('join_site_room', { 'username': `${user.firstName} ${user.lastName}`, 'room': roomId })
            !jobsite && socket.emit('join_team_room', { 'username': `${user.firstName} ${user.lastName}`, 'room': roomId })


            // socket.on('chat', (message) => {
            //     dispatch(loadChatMessages(roomId))
            // });

            // socket.on('edit', (message) => {
            //     dispatch(loadChatMessages(roomId))
            // })

            // socket.on('delete', (message) => {
            //     dispatch(removeMessage(message.msgId))
            // })

            // socket.on('join_site_room', () => {
            //     dispatch(getSiteChatRooms(user.jobsite_id));
            // });

            // socket.on('join_team_room', () => {
            //     dispatch(getTeamChatRoom(user.teams[0].id));
            // });


            // socket.on('leave_site_room', (user) => {
            //     dispatch(getSiteChatRooms(user.jobsite_id));
            // });

            // socket.on('leave_team_room', (user) => {
            //     dispatch(getTeamChatRoom(user.teams[0].id));
            // });

            // socket.on('delete-room', async (data) => {
            //     const path = window.location.href.split('/')
            //     console.log(path)
            // })


        }
        return (() => {
            if (chatRoom) {

                jobsite && dispatch(leaveChatRoom(roomId, 'site'));
                !jobsite && dispatch(leaveChatRoom(roomId, 'team'))
                socket.emit('leave', { 'username': `${user.firstName} ${user.lastName}`, 'room': roomId });
                jobsite && socket.emit('leave_site_room', { 'username': `${user.firstName} ${user.lastName}`, 'room': roomId })
                dispatch(clearMessages())

                socket.disconnect();
            }
        })
    }, [roomId, user.firstName, user.lastName, dispatch]);


    return (
        <>
            <div className='whole-chat-container'>
                <div className='outer-chat-container'>
                    <div className='chat-container'>
                        <h2 className='chat-room-name'>Welcome to #{chatRoom?.room_name}!</h2>
                    </div>
                    <div className='chat-room-container'>
                        <div className='chat-messages-container'>
                            {chatMessages?.map((msg, idx) => {
                                if (idx !== 0 && chatMessages[idx - 1].user_id === msg.user_id) {
                                    return <ChatMessage key={msg.id + 'M'} msg={msg} socket={socket} sameUser={true} />
                                } else {
                                    return (
                                        <>
                                            <ChatMessage key={msg.id + 'M'} msg={msg} socket={socket} />
                                        </>
                                    )
                                }

                            })}
                        </div>
                    </div>
                </div>
                <div className='chat-input-container'>
                    {errors && errors.map((error, idx) => <li className='errors' key={idx + 'e'}>{error}</li>)}
                    <ChatInput
                        value={messageBody}
                        onChange={(e) => setMessageBody(e)}
                        room={chatRoom}
                        send={sendChat}
                    />
                </div>
            </div>
        </>
    )
}


export default Chat;
