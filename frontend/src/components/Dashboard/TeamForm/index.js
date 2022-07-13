import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewTeam, editTeam } from "../../../store/allTeams";
import { fetchTeams } from "../../../store/currentSite";
import { setTeam } from "../../../store/currentTeam";
import { getJobsites } from "../../../store/jobsites";
import { loadLeads } from "../../../store/leads";
import { setUserTeam } from "../../../store/session";

const TeamForm = ({ setShowModal, edit, team, jobsite }) => {
    let newTeam
    const dispatch = useDispatch();
    const currentSite = useSelector(state => state.currentSite?.site?.id)
    const currentUser = useSelector(state => state.session.user.id)
    const leads = useSelector(state => state.leads);
    const sites = useSelector(state => state.jobsites)
    const [errors, setErrors] = useState([]);
    const [teamLead, setTeamLead] = useState((edit) ? team.lead_id : leads[1].id)
    const [jobType, setJobtype] = useState((edit) ? team.job_type : '')
    const [selectJobsite, setSelectJobsite] = useState((edit) ? team.jobsite_id : sites[1].id)


    useEffect(() => {
        dispatch(loadLeads())
        dispatch(getJobsites())
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors;
        const formData = new FormData();
        formData.append('lead_id', (jobsite) ? currentUser : teamLead)
        formData.append('jobsite_id', jobsite ? currentSite : selectJobsite)
        formData.append('job_type', jobType)


        if (edit) {
            errors = await dispatch(editTeam(formData, team.id))
            if (errors) {
                setErrors(errors.errors)
            } else {
                setShowModal(false);
            }
        } else {
            newTeam = await dispatch(createNewTeam(formData));
            if (newTeam) {
                console.log(newTeam)
                setErrors(newTeam.errors)
            } else {
                jobsite && await dispatch(setUserTeam(newTeam.id))
                jobsite && await dispatch(setTeam(newTeam))
                setShowModal(false);
            }


        }
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
                <ul>
                    {errors.map((error, idx) => <li key={idx} className='errors'>{error}</li>)}
                </ul>
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
                {jobsite && <div><label>Creates a new team with you as the lead</label></div>}
                <div className='form-element-container'>
                    <input
                        className="input-field"
                        value={jobType}
                        onChange={(e) => setJobtype(e.target.value)}
                        placeholder='Jobtype'></input>
                </div>
                <button id='create-team' type="submit">{(edit) ? 'Edit' : 'Create'}</button>
                <button className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
            </div>
        </form>
    );
};

export default TeamForm;