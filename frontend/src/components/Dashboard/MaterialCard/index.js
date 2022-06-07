import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setUserTeam } from '../../../store/session';
import { removeTeam } from '../../../store/allTeams';
import { setTeam } from '../../../store/currentTeam';
import { Modal } from "../../../context/Modal";
import TeamForm from '../TeamForm';


const MaterialCard = ({ material }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        return () => setShowModal(false);
    }, []);



    return (
        <div className='material-container'>
            <div className="material-card">
                <h1 className="material-name">{material.name}</h1>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>

                    </Modal>
                )}
            </div>
        </div>
    )
}

export default MaterialCard


