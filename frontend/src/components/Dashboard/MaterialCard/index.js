import { useState, useEffect } from 'react';
import { Modal } from "../../../context/Modal";
import { StarIcon } from '@heroicons/react/solid'
import './MaterialCard.css'
import MaterialForm from '../MaterialForm';
import DeleteMaterialPrompt from '../DeleteInventoryPrompt';
import { TrashIcon, PencilAltIcon } from '@heroicons/react/solid'


const MaterialCard = ({ material, team }) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [hover, setHover] = useState(false)
    const [low, setLow] = useState('bg-green-100')
    useEffect(() => {
        if (material.quantity < 4) {
            setLow('bg-yellow-100')
        } else {
            setLow('bg-green-100')
        }
        return () => setShowModal(false);
    }, [material]);





    return (
        <>
            <li
                key={material.id}
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
            >
                <div className="flex-1 flex flex-col p-8">
                    <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={material.image} alt="" />
                    <h3 className="mt-6 text-gray-900 text-sm font-medium">{material.name}</h3>
                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                        <dt className="sr-only">Title</dt>
                        <dt className="sr-only">Role</dt>
                        <dd className="mt-3">
                            <span className={`px-2 py-1 text-green-800 text-xs font-medium ${low} rounded-full`}>
                                {material.quantity} {material.class.unit}
                            </span>
                        </dd>
                    </dl>
                </div>
                <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="w-0 flex-1 flex">
                            <button
                                onClick={() => setShowModal(true)}
                                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                            >
                                <PencilAltIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                <span className="ml-3">Edit</span>
                            </button>
                        </div>
                        <div className="-ml-px w-0 flex-1 flex">
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                            >
                                <TrashIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                <span className="ml-3">Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <MaterialForm team={team} material={material} edit={true} setShowModal={setShowModal} />
                    </Modal>
                )
            }
            {
                showDeleteModal && (
                    <DeleteMaterialPrompt team={team} material={material} setShowModal={setShowDeleteModal} />
                )
            }
        </>
    )
}

export default MaterialCard


