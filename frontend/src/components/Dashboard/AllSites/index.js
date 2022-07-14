import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getJobsites } from "../../../store/jobsites"
import { useHistory } from 'react-router-dom'
import JobSiteCard from "../JobSiteCard"

const AllSites = ({ adminPanel }) => {
    const dispatch = useDispatch()

    const jobsites = useSelector(state => state.jobsites)
    const user = useSelector(state => state.session.user)
    const loading = useSelector(state => state.session.loading)
    const jobSiteObject = Object.values(jobsites)

    useEffect(() => {
        dispatch(getJobsites())
    }, [dispatch])



    return (
        <>
            {loading &&
                <>
                    <h1>Loading.....</h1>
                    <img src='https://windventory.s3.amazonaws.com/turbine.gif'>
                    </img>
                </>}
            {!loading &&
                <>
                    {jobSiteObject && jobSiteObject.map((jobsite) => (
                        <JobSiteCard key={jobsite.id} jobsite={jobsite} adminPanel={adminPanel} />
                    )
                    )}
                </>
            }
        </>
    )
}

export default AllSites