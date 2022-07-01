import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewTeam, editTeam } from "../../../store/allTeams";
import { fetchTeams } from "../../../store/currentSite";
import { setTeam } from "../../../store/currentTeam";
import { getJobsites } from "../../../store/jobsites";
import { loadLeads } from "../../../store/leads";
import { setUserTeam } from "../../../store/session";

const TeamForm = ({ setShowModal, edit, teamId, jobsite }) => {
    let newTeam
    const dispatch = useDispatch();
    const currentSite = useSelector(state => state.currentSite?.site?.id)
    const currentUser = useSelector(state => state.session.user.id)
    const leads = useSelector(state => state.leads);
    const sites = useSelector(state => state.jobsites)
    console.log(leads)
    const [errors, setErrors] = useState({});
    const [teamLead, setTeamLead] = useState(leads[1].id)
    const [jobType, setJobtype] = useState('')
    const [selectJobsite, setSelectJobsite] = useState(sites[1].id)
    const team = useSelector(state => state.allTeams[teamId])


    useEffect(() => {
        dispatch(loadLeads())
        dispatch(getJobsites())
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors;
        const formData = new FormData();
        formData.append('lead_id', (jobsite) ? currentUser : teamLead)
        console.log(teamLead)
        formData.append('jobsite_id', jobsite ? currentSite : selectJobsite)
        formData.append('job_type', jobType)


        if (edit) {
            errors = await dispatch(editTeam(formData, team.id))
        } else {
            newTeam = await dispatch(createNewTeam(formData));
            jobsite && await dispatch(setUserTeam(newTeam.id))
            jobsite && await dispatch(setTeam(newTeam))
            await dispatch(fetchTeams(currentSite))
        }

        if (newTeam.errors) {
            console.log(newTeam.errors)
        }


        setShowModal(false);

    }


    const handleCancelClick = async (e) => {
        e.preventDefault();
        setShowModal(false);
    };


    useEffect(() => {
        setErrors(errors)
    }, [errors]);


    return (
        <form autoComplete="off" className="team-form-container" onSubmit={handleSubmit}>
            <div className='team-form-input-container'>

                <div className='form-element-container'>
                    {!jobsite && <select
                        className="input-field"
                        value={teamLead}
                        onChange={({ target: { value } }) => setTeamLead(value)}
                    >
                        {leads && Object.values(leads).map(lead => (
                            <option
                                key={lead.id}
                                value={lead.id}
                            >
                                {lead.firstName + " " + lead.lastName}
                            </option>
                        ))}
                    </select>}
                </div>

                <div className='form-element-container'>
                    {!jobsite && <select
                        className="input-field"
                        value={selectJobsite}
                        onChange={({ target: { value } }) => setSelectJobsite(value)}
                    >
                        {sites && Object.values(sites).map(site => (
                            <option
                                key={site.id}
                                value={site.id}
                            >
                                {site.name + " " + site.client}
                            </option>
                        ))}
                    </select>}
                </div>
                <div className='form-element-container'>
                    <input
                        className="input-field"
                        value={jobType}
                        onChange={(e) => setJobtype(e.target.value)}
                        placeholder='Jobtype'></input>
                </div>
                <button disabled={Object.keys(errors).length > 0} id='create-team' type="submit">{(edit) ? 'Edit' : 'Create'}</button>
                <button className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
            </div>
        </form>
    );
};

export default TeamForm;