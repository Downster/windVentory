import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setUserTeam } from '../../../store/session';
import { removeTeam } from '../../../store/allTeams';
import { setTeam } from '../../../store/currentTeam';
import { Modal } from "../../../context/Modal";
import TeamForm from '../TeamForm';
import './MaterialCard.css'
import MaterialForm from '../MaterialForm';
import DeleteMaterialPrompt from '../DeleteInventoryPrompt';
import getImageBrightness from '../../../utils/imageBrightness';


const MaterialCard = ({ material }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [hover, setHover] = useState(false)
    const [dark, setDark] = useState(false)
    const [low, setLow] = useState(false)
    useEffect(() => {
        if (material.quantity < 4) {
            setLow(true)
        }
        getImageBrightness(material.image, darkOrLight)
        return () => setShowModal(false);
    }, []);

    const darkOrLight = (brightness) => {
        if (brightness < 127.5) {
            setDark(true)
        }
        console.log(dark)
    }




    return (
        <div className={low ? 'material-container low' : 'material-container'}>
            <div className="material-card">
                <div className='material-image-container' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>

                    <div className='material-actions'>
                        <div className='edit-delete-material'>
                            {hover && <i className={dark ? "fa-solid fa-pen-to-square dark" : "fa-solid fa-pen-to-square"} onClick={() => setShowModal(true)}></i>}
                            {hover && <i className={dark ? "fa-solid fa-trash-can dark" : "fa-solid fa-trash-can"} onClick={() => setShowDeleteModal(true)}></i>}
                        </div>
                        <div className='increment-decrement-material'>
                            {hover && <i className={dark ? "fa-solid fa-plus dark" : "fa-solid fa-plus"} ></i>}
                            {hover && <i className={dark ? "fa-solid fa-minus dark" : "fa-solid fa-minus"}></i>}
                        </div>
                    </div>
                    <img className={hover ? 'material-image blur' : 'material-image'} id={`material-image-${material.id}`} src={material.image}>
                    </img>
                </div>
                <h1 className="material-name">{material.name}</h1>
                <h1 className='material-quantity'>{material.quantity} {material.class.unit}</h1>
                {low && <h1 className='low-indicator'>Restock</h1>}
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <MaterialForm material={material} edit={true} setShowModal={setShowModal} />
                    </Modal>
                )}
                {showDeleteModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <DeleteMaterialPrompt material={material} setShowModal={setShowDeleteModal} />
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default MaterialCard


