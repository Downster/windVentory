import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import TeamCard from "../TeamCard"
import CreateTeamModal from "../CreateTeamModal"
import checkPermissions from "../../../utils/checkPermissions"


const SiteTeams = () => {
    const dispatch = useDispatch()
    const teams = useSelector(state => state.currentSite.teams)
    const user = useSelector(state => state.session.user)
    const teamsObject = Object.values(teams)
    const canCreate = checkPermissions(user.role[0], 'team')


    useEffect(() => {
    }, [dispatch])



    return (
        <>
            {(teamsObject.length) ? teamsObject.map((team) => (
                <TeamCard key={team.id} team={team} />)) : <h1>This site has no teams, create one?</h1>}
            {canCreate && <CreateTeamModal jobsite={true} />}
        </>
    )
}

export default SiteTeams