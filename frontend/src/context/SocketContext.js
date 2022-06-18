import React, { createContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadChatMessages, removeMessage } from '../store/messages';
import { getSiteChatRooms, getTeamChatRoom } from '../store/chatRoom';


//import client-side socket package
//https://socket.io/docs/v4/client-initialization/
import { io } from 'socket.io-client';


export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const dispatch = useDispatch();


    const socket = useRef();

    const user = useSelector((state) => state.session.user);


    useEffect(() => {

        if (user) {

            socket.current = io();

            socket.current.on('chat', (message) => {
                dispatch(loadChatMessages(message.room))
            });

            socket.current.on('edit', (message) => {
                dispatch(loadChatMessages(message.room))
            })

            socket.current.on('delete', (message) => {
                console.log(message)
                dispatch(removeMessage(message.msgId))
            })

            socket.current.on('join_site_room', () => {
                dispatch(getSiteChatRooms(user.jobsite_id));
            });

            socket.current.on('join_team_room', () => {
                dispatch(getTeamChatRoom(user.teams[0].id));
            });


            socket.current.on('leave_site_room', () => {
                dispatch(getSiteChatRooms(user.jobsite_id));
            });

            socket.current.on('leave_team_room', () => {
                dispatch(getTeamChatRoom(user.teams[0].id));
            });

            socket.current.on('delete-room', async (data) => {
                const path = window.location.href.split('/')
                console.log(path)
            })
        }

        // when component unmounts, disconnect from socket
        return () => {
            if (user) {
                socket.current.disconnect();
                console.log('Socket disconnected');
            }
        };
    }, [dispatch, user]);

    return (
        <>
            <SocketContext.Provider value={{ socket }}>
                {children}
            </SocketContext.Provider>
        </>
    );
};