import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewTeam, editTeam } from "../../../store/allTeams";
import { getJobsites } from "../../../store/jobsites";
import { loadLeads } from "../../../store/leads";

const TeamForm = ({ setShowModal, edit, teamId }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [teamLead, setTeamLead] = useState('')
    const [jobType, setJobtype] = useState('')
    const [jobsite, setJobsite] = useState('')
    const leads = useSelector(state => state.leads);
    const sites = useSelector(state => state.jobsites)
    const team = useSelector(state => state.allTeams[teamId])


    useEffect(() => {
        dispatch(loadLeads())
        dispatch(getJobsites())
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors;
        const formData = new FormData();
        formData.append('lead_id', teamLead)
        formData.append('jobsite_id', jobsite)
        formData.append('job_type', jobType)


        if (edit) {
            errors = await dispatch(editTeam(formData, team.id))
        } else {
            errors = await dispatch(createNewTeam(formData));
        }

        if (errors) {
            console.log(errors)
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
                    <select
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
                    </select>
                </div>

                <div className='form-element-container'>
                    <select
                        value={jobsite}
                        onChange={({ target: { value } }) => setJobsite(value)}
                    >
                        {sites && Object.values(sites).map(site => (
                            <option
                                key={site.id}
                                value={site.id}
                            >
                                {site.name + " " + site.client}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='form-element-container'>
                    <input
                        value={jobType}
                        onChange={(e) => setJobtype(e.target.value)}
                        placeholder='Jobtype'></input>
                </div>
                <button disabled={Object.keys(errors).length > 0} id='create-team' type="submit">{(edit) ? 'Edit Team' : 'Create Team'}</button>
                <button className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
            </div>
        </form>
    );
};

export default TeamForm;