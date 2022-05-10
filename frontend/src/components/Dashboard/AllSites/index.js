import { useSelector } from "react-redux"
import JobSiteCard from "../JobSiteCard"

const AllSites = () => {
    const jobsites = useSelector(state => state.jobsites)
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