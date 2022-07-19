import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getJobsites } from "../../../store/jobsites"
import { useHistory } from 'react-router-dom'
import JobSiteCard from "../JobSiteCard"
import CreateJobSiteModal from "../CreateJobSiteModal"

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
                    <img src='https://windventory.s3.amazonaws.com/turbine.gif'>
                    </img>
                </>}
            {!loading &&
                <>
                    {!adminPanel && <h1 className="text-2xl font-semibold text-gray-900">You are not a member of a jobsite yet, join one here</h1>}
                    <div className="flex max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {jobSiteObject && jobSiteObject.map((jobsite) => (
                                <JobSiteCard key={jobsite.id} jobsite={jobsite} adminPanel={adminPanel} />
                            )
                            )}
                        </ul>
                    </div>
                    {adminPanel && <CreateJobSiteModal />}
                </>
            }
        </>
    )
}

export default AllSites