const LOAD_MESSAGES = 'messages/LOAD_MESSAGES'
const CREATE_MESSAGE = 'messages/CREATE_MESSAGE'
const EDIT_MESSAGE = 'messages/EDIT_MESSAGE'
const DELETE_MESSAGE = 'messages/DELETE_MESSAGE'

const loadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    messages
});

const createMessage = (message) => ({
    type: CREATE_MESSAGE,
    messages
});

const removeMessage = (messageID) => ({
    type: REMOVE_MESSAGE,
    messageID
})

const editMessage = (message) => ({
    type: EDIT_MESSAGE,
    message
})





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
        case EDIT_MESSAGE:
            newState[action.message.id] = action.message
            return newState
        case DELETE_MESSAGE:
            delete newState[action.messageId]
            return newState
        default:
            return state;

    }
}

export default messagesReducer
