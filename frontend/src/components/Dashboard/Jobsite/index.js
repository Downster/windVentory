import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import * as siteOptions from "../../../store/jobsites"
import { loadUserJobsite } from "../../../store/currentSite";
import AllSites from "../AllSites";
const Jobsite = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)


    useEffect(() => {
        if (sessionUser.jobsite_id) {
            dispatch(loadUserJobsite(sessionUser.jobsite_id))
        }
        dispatch(siteOptions.getJobsites())
    }, [dispatch])

    return (
        <>
            {(sessionUser.jobsite_id) ? <h1>user-job-site</h1> : <AllSites />}
        </>
    )
}

export default Jobsite