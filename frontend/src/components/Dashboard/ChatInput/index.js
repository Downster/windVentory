import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';

//adding comments to see if i can get docker
//to rebuild


const ChatInput = ({ value, onChange, send, room }) => {
    const dispatch = useDispatch()


    const toolbarOptions = [['bold', 'italic', 'strike']];
    const modules = {
        'toolbar': toolbarOptions,
        keyboard: {
            bindings: {
                shift_enter: {
                    key: 13,
                    shiftKey: true,
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
                <div className='chat-button-div'>
                    <button className='send-button' onClick={send}><i className="fa-solid fa-paper-plane-top"></i></button>
                </div>
            </div>
        </>
    )
}

export default ChatInput