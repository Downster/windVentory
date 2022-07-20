import './jobSiteCard.css'
import { useHistory } from 'react-router-dom'
import { Modal } from "../../../context/Modal";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { flipLoading, setUserJobsite } from '../../../store/session'
import { fetchTeams, fetchWeather, loadSiteInventory, loadUserJobsite } from '../../../store/currentSite';
import CreateJobsiteForm from '../JobSiteForm';
import { getSiteChatRooms } from '../../../store/chatRoom';
import ReactTooltip from 'react-tooltip';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import DeleteSitePrompt from '../DeleteSitePrompt';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'


const JobSiteCard = ({ jobsite, adminPanel, single }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const userSite = useSelector(state => state.currentSite.site)
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [show, setShow] = useState(false)
    const currentWeather = useSelector(state => state.currentSite.currentWeather)
    const coord = currentWeather?.coord
    const { data, isLoading, errorMessage } = useOpenWeather({
        key: process.env.REACT_APP_OPENWEATHER_API_KEY,
        lat: coord?.lat,
        lon: coord?.lon,
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
    });



    // useEffect(() => {
    //     // dispatch(loadUserJobsite(jobsite?.id))
    //     return () => setShowModal(false);
    // }, []);

    const setJobsite = async () => {
        await dispatch(flipLoading())
        await dispatch(setUserJobsite(jobsite.id))
        await dispatch(fetchTeams(jobsite.id))
        await dispatch(loadSiteInventory(jobsite.id))
        await dispatch(getSiteChatRooms(jobsite.id))
        await dispatch(fetchWeather(jobsite.id))
        await dispatch(loadUserJobsite(jobsite.id))
        await dispatch(flipLoading())
        history.push(`/jobsite/${jobsite.id}/inventory`)
    }

    const modifyJobsite = () => {
        setShowModal(true)
        setShow(false)
    }

    const destroyJobsite = () => {
        setShowDeleteModal(true)
        setShow(false)
    }
    return (
        <>
            {showDeleteModal && (
                <DeleteSitePrompt site={jobsite} setShowModal={setShowDeleteModal} />

            )}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateJobsiteForm setShowModal={setShowModal} edit={true} siteId={jobsite.id} />
                </Modal>
            )}
            {!single &&
                <li
                    className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                    onClick={(adminPanel) ? null : setJobsite}
                >
                    <div className="flex-1 flex flex-col p-8">
                        <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={jobsite.image} alt="" />
                        <h3 className="mt-6 text-gray-900 text-sm font-medium">{jobsite.name}</h3>
                        <dl className="mt-1 flex-grow flex flex-col justify-between">
                            <dt className="sr-only">Title</dt>
                            <dd className="text-gray-500 text-sm">{jobsite.state}</dd>
                            <dt className="sr-only">Role</dt>
                            <dd className="mt-3">
                                <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                    {jobsite.client}
                                </span>
                            </dd>
                        </dl>
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="w-0 flex-1 flex">
                                {adminPanel && <button
                                    onClick={modifyJobsite}
                                    className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                >
                                    <PencilAltIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                    <span className="ml-3">Edit</span>
                                </button>}
                            </div>
                            <div className="-ml-px w-0 flex-1 flex">
                                {adminPanel && <button
                                    onClick={destroyJobsite}
                                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                >
                                    <TrashIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                    <span className="ml-3">Delete</span>
                                </button>}
                            </div>
                        </div>
                    </div>
                </li>}
            {single && userSite && <li
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                onClick={(adminPanel) ? null : setJobsite}
            >
                <div className='weather-div'>
                    <ReactWeather
                        isLoading={isLoading}
                        errorMessage={errorMessage}
                        data={data}
                        lang="en"
                        locationLabel={currentWeather.name}
                        unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                        showForecast={false}
                    />
                </div>
                <div className="flex-1 flex flex-col p-8">
                    <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={userSite.image} alt="" />
                    <h3 className="mt-6 text-gray-900 text-sm font-medium">{userSite.name}</h3>
                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                        <dt className="sr-only">Title</dt>
                        <dd className="text-gray-500 text-sm">{userSite.state}</dd>
                        <dt className="sr-only">Role</dt>
                        <dd className="mt-3">
                            <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                {userSite.client}
                            </span>
                        </dd>
                    </dl>
                </div>
                <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="w-0 flex-1 flex">
                            {adminPanel && <button
                                onClick={modifyJobsite}
                                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                            >
                                <PencilAltIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                <span className="ml-3">Edit</span>
                            </button>}
                        </div>
                        <div className="-ml-px w-0 flex-1 flex">
                            {adminPanel && <button
                                onClick={destroyJobsite}
                                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                            >
                                <TrashIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                <span className="ml-3">Delete</span>
                            </button>}
                        </div>
                    </div>
                </div>
            </li>}
            {/* {
                single && userSite && < div className='single-user-site'>
                    <div className='jobsite-data'>

                        <img alt='jobsite' className='jobsite-image' src={userSite.image}></img>

                        <h1 className="jobsite-name">{userSite.name}</h1>
                        <h1 className="jobsite-client">Client: {userSite.client}</h1>
                        <h1 className="jobsite-state">State: {userSite.state}</h1>
                    </div>
                    <div className='weather-div'>
                        <ReactWeather
                            isLoading={isLoading}
                            errorMessage={errorMessage}
                            data={data}
                            lang="en"
                            locationLabel={currentWeather.name}
                            unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                            showForecast={false}
                        />
                    </div>
                </div>
            } */}


        </>
    )
}

export default JobSiteCard