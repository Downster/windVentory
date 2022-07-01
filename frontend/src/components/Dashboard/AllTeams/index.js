import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import TeamCard from "../TeamCard"


const AllTeams = () => {
    const dispatch = useDispatch()
    const teams = useSelector(state => state.allTeams)
    const user = useSelector(state => state.session.user)
    const teamsObject = Object.values(teams)

    useEffect(() => {
    }, [dispatch])



    return (
        < div className="app-body" >
            {(teamsObject.length) ? teamsObject.map((team) => (
                <TeamCard key={team.id} team={team} admin={(user.role.includes('Admin')) ? true : false} />)) : <h1>There are no teams, create one?</h1>}
        </div>
    )
}

export default AllTeams