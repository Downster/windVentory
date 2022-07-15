import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import TeamCard from "../TeamCard"


const SiteTeams = () => {
    const dispatch = useDispatch()
    const teams = useSelector(state => state.currentSite.teams)
    const user = useSelector(state => state.session.user)
    const teamsObject = Object.values(teams)


    useEffect(() => {
    }, [dispatch])



    return (
        <>
            {(teamsObject.length) ? teamsObject.map((team) => (
                <TeamCard key={team.id} team={team} />)) : <h1>This site has no teams, create one?</h1>}

        </>
    )
}

export default SiteTeams