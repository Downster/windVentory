import { useState } from "react";
import { useSelector } from "react-redux"
import { useLocation } from "react-router"
import JobSiteNav from "./JobsiteNav"
import AdminNav from "./AdminNav";
import TeamsNav from "./TeamsNav";
import InventoryNav from "./InventoryNav";
import ChatsNav from "./ChatsNav";

const LeftMenu = ({ capstone }) => {
    const location = useLocation();
    const currentUser = useSelector(state => state.session.user)
    const siteChats = useSelector(state => state.chatRooms.siteRooms)
    const isAdmin = (currentUser.role[0] === 'Admin' ? true : false)
    const [adminPanel, setAdminPanel] = useState(false)
    console.log(siteChats)

    //if not a member of a jobsite display jobsites
    //if a member of a jobsite display My Jobsite with sub menus
    //if a memeber of a team display Teams
    //if a memeber of a team display teams with sub menus
    const path = location.pathname;
    const splitpath = path.split('/')
    let siteId;
    if (splitpath[1] === 'jobsite' && currentUser.jobsite_id) {
        siteId = path.split('/')[2]
    }
    if (isAdmin && path.split('/')[1] === 'admin' && !adminPanel) {
        setAdminPanel(true)
    }

    return (
        <>
            {capstone &&
                < div className="left-menu" >
                    <InventoryNav />
                    <ChatsNav siteId={1} siteChats={siteChats} />
                </div>
            }

            {/* {!adminPanel &&
                < div className="left-menu" >
                    <ul className="left-menu-list">
                        {(siteId) ? <JobSiteNav isMember={true} isAdmin={isAdmin} siteId={siteId} /> : <JobSiteNav isMember={false} isAdmin={isAdmin} />
                        }
                        {siteId && <TeamsNav siteId={siteId} />}
                        {siteId && <ChatsNav siteId={siteId} siteChats={siteChats} />}
                    </ul>
                </div >
            }
            {adminPanel &&
                < div className="left-menu" >
                    <AdminNav />
                </div>
            } */}
        </>
    )
}

export default LeftMenu