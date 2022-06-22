import './jobSiteCard.css'
import { useHistory } from 'react-router-dom'
import { Modal } from "../../../context/Modal";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { flipLoading, setUserJobsite } from '../../../store/session'
import { deleteJobsite, editJobsite } from '../../../store/jobsites'
import { fetchTeams, fetchWeather, loadSiteInventory, loadUserJobsite } from '../../../store/currentSite';
import CreateJobsiteForm from '../JobSiteForm';
import { getSiteChatRooms } from '../../../store/chatRoom';
import ReactTooltip from 'react-tooltip';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import DeleteSitePrompt from '../DeleteSitePrompt';


const JobSiteCard = ({ jobsite, adminPanel, single }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const userSite = useSelector(state => state.currentSite.site)
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const currentWeather = useSelector(state => state.currentSite.currentWeather)
    const coord = currentWeather?.coord
    const { data, isLoading, errorMessage } = useOpenWeather({
        key: process.env.REACT_APP_OPENWEATHER_API_KEY,
        lat: coord?.lat,
        lon: coord?.lon,
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
    });


    useEffect(() => {
        dispatch(loadUserJobsite(jobsite?.id))
        return () => setShowModal(false);
    }, []);

    const setJobsite = async () => {
        await dispatch(flipLoading())
        await dispatch(setUserJobsite(jobsite.id))
        await dispatch(fetchTeams(jobsite.id))
        await dispatch(loadSiteInventory(jobsite.id))
        await dispatch(getSiteChatRooms(jobsite.id))
        await dispatch(fetchWeather(jobsite.id))
        await dispatch(flipLoading())
        history.push(`/jobsite/${jobsite.id}/inventory`)
    }

    const modifyJobsite = () => {
        setShowModal(true)
    }

    const destroyJobsite = () => {
        setShowDeleteModal(true)
    }
    return (
        <>
            {showDeleteModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteSitePrompt site={jobsite} setShowModal={setShowDeleteModal} />
                </Modal>
            )}
            {!single && <div className="jobSite-card" >
                <img className='jobsite-image' src={jobsite.image} data-tip={'State: ' + jobsite.state}></img>
                <ReactTooltip
                    className="tool-tip-cls"
                    place="right"
                    type="dark"
                    effect="solid"
                />
                <h1 className="jobsite-name">{jobsite.name}</h1>
                <h1 className="jobsite-client">Client: {jobsite.client}</h1>
                {/* <h1 className="jobsite-state">{jobsite.state}</h1> */}
                {!adminPanel && <><p>Join site</p><i class="fa-duotone fa-right-to-bracket" onClick={setJobsite}></i></>}
                {adminPanel && <button onClick={modifyJobsite}>Edit</button>}
                {adminPanel && <button onClick={destroyJobsite}>-</button>}
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateJobsiteForm setShowModal={setShowModal} edit={true} siteId={jobsite.id} />
                    </Modal>
                )}

            </div>
            }
            {
                single && userSite && < div className='single-user-site'>
                    <div className='jobsite-data'>

                        <img className='jobsite-image' src={userSite.image}></img>

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
            }


        </>
    )
}

export default JobSiteCard