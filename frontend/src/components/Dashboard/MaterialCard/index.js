import { useState, useEffect } from 'react';
import { Modal } from "../../../context/Modal";
import './MaterialCard.css'
import MaterialForm from '../MaterialForm';
import DeleteMaterialPrompt from '../DeleteInventoryPrompt';


const MaterialCard = ({ material, team }) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [hover, setHover] = useState(false)
    const [low, setLow] = useState(false)
    useEffect(() => {
        if (material.quantity < 4) {
            setLow(true)
        } else {
            setLow(false)
        }
        // getImageBrightness(material.image, darkOrLight)
        return () => setShowModal(false);
    }, [material]);

    // const darkOrLight = (brightness) => {
    //     if (brightness < 127.5) {
    //         setDark(true)
    //     }
    // }




    return (
        <div className={low ? 'material-container low' : 'material-container'}>
            <div className="material-card">
                <div className='material-image-container' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>

                    <div className='material-actions'>
                        <div className='edit-delete-material'>
                            {hover && <i className={"fa-duotone fa-pen-to-square dark"} onClick={() => setShowModal(true)}></i>}
                            {hover && <i className={"fa-duotone fa-trash-can dark"} onClick={() => setShowDeleteModal(true)}></i>}
                        </div>
                        {/* <div className='increment-decrement-material'>
                            {hover && <i className={dark ? "fa-solid fa-plus-large dark" : "fa-solid fa-plus-large"} ></i>}
                            {hover && <i className={dark ? "fa-solid fa-minus-large dark" : "fa-solid fa-minus-large"}></i>}
                        </div> */}
                    </div>
                    <img className={hover ? 'material-image blur' : 'material-image'} id={`material-image-${material.id}`} src={material.image} alt='material'>
                    </img>
                </div>
                <h1 className="material-name">{material.name}</h1>
                <h1 className='material-quantity'>{material.quantity} {material.class.unit}</h1>
                {low && <h1 className='low-indicator'>Restock</h1>}
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <MaterialForm team={team} material={material} edit={true} setShowModal={setShowModal} />
                    </Modal>
                )}
                {showDeleteModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <DeleteMaterialPrompt team={team} material={material} setShowModal={setShowDeleteModal} />
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default MaterialCard


