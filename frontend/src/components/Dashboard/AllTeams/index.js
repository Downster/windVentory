import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import CreateTeamModal from "../CreateTeamModal"
import TeamCard from "../TeamCard"


const AllTeams = () => {
    const dispatch = useDispatch()
    const teams = useSelector(state => state.allTeams)
    const user = useSelector(state => state.session.user)
    const teamsObject = Object.values(teams)

    useEffect(() => {
    }, [dispatch])



    return (
        <>
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {(teamsObject.length) ? teamsObject.map((team) => (
                    <TeamCard key={team.id} team={team} admin={(user.role.includes('Admin')) ? true : false} />)) : <h1>There are no teams, create one?</h1>}
            </ul>
            <CreateTeamModal />
        </>
    )
}

export default AllTeams