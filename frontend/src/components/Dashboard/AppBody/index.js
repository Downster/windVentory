import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import * as siteOptions from "../../../store/jobsites"
const AppBody = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const currentJobsite = useSelector(state => state.jobsites)
    const jobSiteObject = Object.entries(currentJobsite)
    useEffect(() => {
        if (!sessionUser.jobsite_id) {
            dispatch(siteOptions.getJobsites())
        } else {
            dispatch(siteOptions.getJobsite(sessionUser.jobsite_id))
        }

    }, [dispatch])

    return (
        < div className="here" >
            {!jobSiteObject.length && <h1>Loading</h1>}
            {jobSiteObject && jobSiteObject.map((jobsite) => {
                return (
                    <div>
                        <h1>{jobsite[1].name}</h1>
                        <h1>{jobsite[1].client}</h1>
                    </div>
                )
            })}
        </div >
    )
}

export default AppBody