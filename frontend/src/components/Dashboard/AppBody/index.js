import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import * as siteOptions from "../../../store/jobsites"
import JobSiteCard from "../JobSiteCard";
const AppBody = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const currentJobsite = useSelector(state => state.jobsites)
    const jobSiteObject = Object.values(currentJobsite)


    useEffect(() => {
        if (!sessionUser.jobsite_id) {
            dispatch(siteOptions.getJobsites())
        } else {
            dispatch(siteOptions.getJobsite(sessionUser.jobsite_id))
        }

    }, [dispatch])

    return (
        < div className="app-body" >
            {!jobSiteObject.length && <h1>Loading</h1>}
            {jobSiteObject && jobSiteObject.map((jobsite) => (
                <JobSiteCard jobsite={jobsite} />
            )
            )}
        </div >
    )
}

export default AppBody