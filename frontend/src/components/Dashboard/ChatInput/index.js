import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { joinChatRoom } from '../../../store/chatRoom'
import { loadChatMessages } from '../../../store/messages';

//adding comments to see if i can get docker
//to rebuild


const ChatInput = ({ value, onChange, send, room }) => {
    const dispatch = useDispatch()
    const { roomId } = useParams()
    console.log(value)


    useEffect(() => {
        dispatch(joinChatRoom(roomId, 'site'));
        dispatch(loadChatMessages(roomId))
    }, [])


    const toolbarOptions = [['bold', 'italic', 'strike'], ['link']];
    const modules = {
        'toolbar': toolbarOptions,
        keyboard: {
            bindings: {
                shift_enter: {
                    key: 13,
                    shiftKey: true,
                    handler: (range, ctx) => {
                        console.log(range, ctx); // if you want to see the output of the binding
                    }
                },
                enter: {
                    key: 13,
                    handler: () => send()
                }
            }
        }
    }


    return (
        <>
            <div className='chat-input'>
                <ReactQuill value={value}
                    modules={modules}
                    theme='snow'
                    onChange={onChange}
                    placeholder={`Message # ${room?.room_name}`}
                />
                <div className='button-div'>
                    <button className='send-button' onClick={send}><i className="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        </>
    )
}

export default ChatInput