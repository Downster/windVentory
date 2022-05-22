import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { fetchTeams } from "../../../store/currentSite";
import UserTeam from "../UserTeam";
import SiteTeams from "../SiteTeams";
const Team = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const team = useSelector(state => state.currentTeam)


    useEffect(() => {
        dispatch(fetchTeams(sessionUser.jobsite_id))
    }, [dispatch, sessionUser])

    return (
        <> {team ? <UserTeam /> : <SiteTeams />}
        </>
    )
}

export default Team