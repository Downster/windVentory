import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getJobsites } from "../../../store/jobsites"
import { useHistory } from 'react-router-dom'
import JobSiteCard from "../JobSiteCard"

const AllSites = ({ adminPanel }) => {
    const dispatch = useDispatch()

    const jobsites = useSelector(state => state.jobsites)
    const user = useSelector(state => state.session.user)
    const jobSiteObject = Object.values(jobsites)

    useEffect(() => {
        dispatch(getJobsites())
    }, [dispatch])



    return (
        < div className="app-body" >
            {jobSiteObject && jobSiteObject.map((jobsite) => (
                <JobSiteCard key={jobsite.id} jobsite={jobsite} adminPanel={adminPanel} />
            )
            )}
        </div >
    )
}

export default AllSites