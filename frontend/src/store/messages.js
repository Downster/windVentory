import { tokenFetch } from "./csrf"

const LOAD_MESSAGES = 'messages/LOAD_MESSAGES'
const CREATE_MESSAGE = 'messages/CREATE_MESSAGE'
const EDIT_MESSAGE = 'messages/EDIT_MESSAGE'
const CLEAR_MESSAGE = 'messages/CLEAR_MESSAGE'
const DELETE_MESSAGE = 'messages/DELETE_MESSAGE'

const loadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    messages
});

const createMessage = (message) => ({
    type: CREATE_MESSAGE,
    message
});

export const clearMessages = () => ({
    type: CLEAR_MESSAGE
})

export const removeMessage = (messageId) => ({
    type: DELETE_MESSAGE,
    messageId
})

const editMessage = (message) => ({
    type: EDIT_MESSAGE,
    message
})

export const createChatMessage = (roomID, messageBody) => async (dispatch) => {
    const res = await tokenFetch(`/messages/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            room_id: roomID,
            message: messageBody
        })
    });

    const message = await res.json();
    if (res.ok) {
        dispatch(createMessage(message))
    } else {
        return message
    }
}

export const loadChatMessages = (roomId) => async (dispatch) => {
    const res = await tokenFetch(`/messages/${roomId}`)

    const messages = await res.json();
    if (res.ok) {
        dispatch(loadMessages(messages.messages))
    } else {
        return messages
    }

}

export const editChatMessage = (msgId, messageBody, roomId) => async (dispatch) => {
    const res = await tokenFetch(`/messages/${msgId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            room_id: roomId,
            message: messageBody
        })
    })

    const message = await res.json();
    if (res.ok) {
        dispatch(editMessage(message))
    } else {
        return message
    }

}





const initialState = {}

const messagesReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_MESSAGES:
            if (action.messages) {
                action.messages.forEach(message => {
                    newState[message.id] = message;
                });
            }
            return newState
        case CREATE_MESSAGE:
            newState[action.message.id] = action.message
            return newState
        case CLEAR_MESSAGE:
            return initialState
        case EDIT_MESSAGE:
            newState[action.message.id] = action.message
            return newState
        case DELETE_MESSAGE:
            delete newState[action.messageId]
            console.log(newState)
            return newState
        default:
            return state;

    }
}

export default messagesReducer
