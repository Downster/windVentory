import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewTeam, editTeam } from "../../../store/allTeams";
import { setTeam } from "../../../store/currentTeam";
import { getJobsites } from "../../../store/jobsites";
import { loadLeads } from "../../../store/leads";
import { setUserTeam } from "../../../store/session";
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

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
            formData.append('team_id', team.id)
            errors = await dispatch(editTeam(formData, team.id))
            if (errors) {
                console.log(errors)
                setErrors(errors.errors)
            } else {
                setShowModal(false);
            }
        } else {
            newTeam = await dispatch(createNewTeam(formData));
            if (newTeam.errors) {
                setErrors(newTeam.errors)
            } else {
                jobsite && await dispatch(setUserTeam(newTeam.id))
                jobsite && await dispatch(setTeam(newTeam))
                setShowModal(false);
            }


        }
    }
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }


    const handleCancelClick = async (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    function getLeadName(id) {
        const lead = Object.values(leads).find((lead) => lead.id === id)
        return lead.firstName + ' ' + lead.lastName
    }

    function getSiteName(id) {
        const site = Object.values(sites).find((site) => site.id === id)
        return site.name + ' ' + site.client
    }


    useEffect(() => {
        setErrors(errors)
    }, [errors]);


    return (
        <form autoComplete="off" className="pt-5 pl-5 pr-5 pb-5">
            <p className="mt-2 text-sm text-red-600" id="quantity-error">
                {errors && errors.filter((err) => err.lead_id).map((err) => <p className="mt-2 text-sm text-red-600" id="email-error">
                    {err.lead_id}
                </p>)}
            </p>

            <Listbox value={teamLead} onChange={setTeamLead}>
                {({ open }) => (
                    <>
                        <Listbox.Label className="block mt-2 text-sm font-medium text-gray-700">Team Lead</Listbox.Label>
                        <div className="mt-1 relative">
                            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span className="block truncate">{getLeadName(teamLead)}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {leads && Object.values(leads).map((lead) => (
                                        < Listbox.Option
                                            key={lead.id}
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                    'cursor-default select-none relative py-2 pl-8 pr-4'
                                                )
                                            }
                                            value={lead.id}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                        {lead.firstName + " " + lead.lastName}
                                                    </span>

                                                    {selected ? (
                                                        <span
                                                            className={classNames(
                                                                active ? 'text-white' : 'text-indigo-600',
                                                                'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                            )}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
            <Listbox value={selectJobsite} onChange={setSelectJobsite}>
                {({ open }) => (
                    <>
                        <Listbox.Label className="block mt-2 text-sm font-medium text-gray-700">Job site</Listbox.Label>
                        <div className="mt-1 relative">
                            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span className="block truncate">{getSiteName(selectJobsite)}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {sites && Object.values(sites).map((site) => (
                                        < Listbox.Option
                                            key={site.id}
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                    'cursor-default select-none relative py-2 pl-8 pr-4'
                                                )
                                            }
                                            value={site.id}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                        {site.name + " " + site.client}
                                                    </span>

                                                    {selected ? (
                                                        <span
                                                            className={classNames(
                                                                active ? 'text-white' : 'text-indigo-600',
                                                                'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                            )}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
            <div className="sm:col-span-6">
                <label htmlFor="name" className="block text-sm pt-3 font-medium text-gray-700">
                    {(jobsite) ? 'Enter a job type to create a new team with you as the lead' : 'Job Type'}
                </label>
                <p className="mt-2 text-sm text-red-600" id="quantity-error">
                    {errors && errors.filter((err) => err.job_type).map((err) => <p className="mt-2 text-sm text-red-600" id="email-error">
                        {err.job_type}
                    </p>)}
                </p>
            </div>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    value={jobType}
                    name="name"
                    id="name"
                    className={"block w-full pr-10 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"}
                    aria-invalid="true"
                    onChange={(e) => setJobtype(e.target.value)}
                    aria-describedby="email-error"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {errors && errors.length > 0 && errors.filter((err) => err.job_type).length > 0 && <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
                </div>
            </div>
            <button id='create-team'
                onClick={handleSubmit}
                className="mt-3 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{(edit) ? 'Edit Team' : 'Create Team'}</button>
        </form >
    );
};

export default TeamForm;