import { useSelector } from "react-redux"

const LeftMenu = () => {
    const currentUser = useSelector(state => state.session.user)
    console.log(currentUser)
    //if not a member of a jobsite display jobsites
    //if a member of a jobsite display My Jobsite with sub menus
    //if a memeber of a team display Teams
    //if a memeber of a team display teams with sub menus
    return (
        <div className="left-menu">
            {(currentUser.jobsite) ? <h1>My Jobsite</h1> : <h1>Jobsites</h1>}

        </div>
    )
}

export default LeftMenu