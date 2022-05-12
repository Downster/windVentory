import CreateJobSiteModal from "../../CreateJobSiteModal"




const JobSiteNav = ({ isMember, isAdmin }) => {

    return (
        <ul className="left-menu-list">
            {isMember ? <li className="jobsite-nav-title">My Jobsite</li> : <li className="jobsite-nav-title">Jobsites</li>}
            {isAdmin && <CreateJobSiteModal />}
            {isMember &&
                <>
                    <li className="jobsite-item">Inventory</li>
                    <li className="jobsite-item">Chat</li>
                    <li className="jobsite-item">Weather</li>
                    <li className="jobsite-item">Members</li>
                </>
            }
        </ul>
    )
}

export default JobSiteNav