import { useSelector, useDispatch } from "react-redux"
import JobSiteCard from "../JobSiteCard"

const AllSites = () => {
    const dispatch = useDispatch()
    const jobsites = useSelector(state => state.jobsites)
    const user = useSelector(state => state.session.user)
    const jobSiteObject = Object.values(jobsites)



    return (
        < div className="app-body" >
            {jobSiteObject && jobSiteObject.map((jobsite) => (
                <JobSiteCard jobsite={jobsite} />
            )
            )}
        </div >
    )
}

export default AllSites