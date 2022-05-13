import { useState } from "react";
import { useSelector } from "react-redux"
import { useLocation } from "react-router"
import JobSiteNav from "./JobsiteNav"
import AdminNav from "./AdminNav";
import TeamsNav from "./TeamsNav";

const LeftMenu = () => {
    const location = useLocation();
    const currentUser = useSelector(state => state.session.user)
    const isAdmin = (currentUser.role[0] === 'Admin' ? true : false)
    const [adminPanel, setAdminPanel] = useState(false)

    //if not a member of a jobsite display jobsites
    //if a member of a jobsite display My Jobsite with sub menus
    //if a memeber of a team display Teams
    //if a memeber of a team display teams with sub menus
    const path = location.pathname;
    const siteId = path.split('/')[2]
    if (isAdmin && path.split('/')[1] === 'admin' && !adminPanel) {
        setAdminPanel(true)
    }

    return (
        <>
            {!adminPanel &&
                < div className="left-menu" >
                    <ul className="left-menu-list">
                        {(siteId) ? <JobSiteNav isMember={true} isAdmin={isAdmin} siteId={siteId} /> : <JobSiteNav isMember={false} isAdmin={isAdmin} />
                        }
                        {siteId && <TeamsNav siteId={siteId} />}
                    </ul>
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