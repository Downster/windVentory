import { useSelector } from "react-redux"
import JobSiteNav from "./JobsiteNav"

const LeftMenu = () => {
    const currentUser = useSelector(state => state.session.user)
    const isAdmin = (currentUser.role[0] === 'Admin' ? true : false)
    //if not a member of a jobsite display jobsites
    //if a member of a jobsite display My Jobsite with sub menus
    //if a memeber of a team display Teams
    //if a memeber of a team display teams with sub menus
    return (
        <div className="left-menu">
            {(currentUser.jobsite_id) ? <JobSiteNav isMember={true} isAdmin={isAdmin} /> : <JobSiteNav isMember={false} isAdmin={isAdmin} />}
        </div>
    )
}

export default LeftMenu