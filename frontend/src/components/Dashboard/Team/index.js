import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { fetchTeams } from "../../../store/siteTeams";
import UserTeam from "../UserTeam";
import SiteTeams from "../SiteTeams";
const Team = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(fetchTeams(sessionUser.jobsite_id))
    }, [dispatch, sessionUser])

    return (
        <> {(sessionUser.teams ? <UserTeam /> : <SiteTeams />)}
        </>
    )
}

export default Team