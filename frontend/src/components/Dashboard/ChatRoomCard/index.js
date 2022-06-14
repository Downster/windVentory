

const ChatRoomCard = ({ room }) => {
    return (
        <>
            <div className="chat-room-card">
                <img
                    className="chat-card-image"
                    src={room.image}></img>
                <h1>{room.room_name}</h1>
            </div>
        </>
    )

}

export default ChatRoomCard