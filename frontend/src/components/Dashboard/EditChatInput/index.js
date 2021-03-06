import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


const EditChatInput = ({ value, onChange, send }) => {

    const toolbarOptions = [];

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
                    handler: send
                }
            }
        }
    }


    return (
        <>
            <div className='chat-input-container'>

                <div className='chat-input'>
                    <ReactQuill value={value}
                        modules={modules}
                        theme='snow'
                        onChange={onChange} />
                    <div className='button-div'>
                        <button className='send-button' onClick={send}><i className="fa-solid fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditChatInput