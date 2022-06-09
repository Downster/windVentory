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


const MaterialCard = ({ material }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [hover, setHover] = useState(false)
    useEffect(() => {
        return () => setShowModal(false);
    }, []);



    return (
        <div className={material.quantity < 4 ? 'material-container low' : 'material-container'}>
            <div className="material-card" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {hover && <i className="fa-solid fa-pen-to-square" onClick={() => setShowModal(true)}></i>}
                {hover && <i className="fa-solid fa-trash-can" onClick={() => setShowDeleteModal(true)}></i>}
                {hover && <i className="fa-solid fa-plus"></i>}
                {hover && <i className="fa-solid fa-minus"></i>}
                <img className='material-image' src={material.image}>
                </img>
                <h1 className="material-name">{material.name}</h1>
                <h1 className='material-quantity'>{material.quantity}</h1>
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


