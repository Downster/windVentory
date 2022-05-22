import { useState } from "react";
import { useSelector } from "react-redux"
import { useLocation } from "react-router"
import JobSiteNav from "./JobsiteNav"
import AdminNav from "./AdminNav";
import TeamsNav from "./TeamsNav";
import ChatsNav from "./ChatsNav";

const LeftMenu = () => {
    const location = useLocation();
    const currentUser = useSelector(state => state.session.user)
    const isAdmin = (currentUser.role[0] === 'Admin' ? true : false)
    const [adminPanel, setAdminPanel] = useState(false)

    //if not a member of a jobsite display jobsites
    //if a member of a jobsite display My Jobsite with sub menus
    //if a memeber of a team display Teams
    //if a memeber of a team display teams with sub menus
    // const path = location.pathname;
    // const siteId = path.split('/')[2]
    // if (isAdmin && path.split('/')[1] === 'admin' && !adminPanel) {
    //     setAdminPanel(true)
    // }

    return (
        <>
            {!adminPanel &&
                < div className="left-menu" >
                    <div className="left-menu-list">
                        {(currentUser.jobsite_id) ? <JobSiteNav isMember={true} isAdmin={isAdmin} siteId={currentUser.jobsite_id} /> : <JobSiteNav isMember={false} isAdmin={isAdmin} />
                        }
                        {currentUser.jobsite_id && <TeamsNav siteId={currentUser.jobsite_id} />}
                        {currentUser.jobsite_id && <ChatsNav siteId={currentUser.jobsite_id} />}
                    </div>
                </div >
            }
            {adminPanel &&
                < div className="left-menu" >
                    <AdminNav />
                </div>
            }
        </>
    )
}

export default LeftMenu