import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { loadUserJobsite } from "../../../store/currentSite";
import AllSites from "../AllSites";
import { fetchTeams } from "../../../store/siteTeams";
const Jobsite = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)


    useEffect(() => {
        if (sessionUser.jobsite_id) {
            dispatch(loadUserJobsite(sessionUser.jobsite_id))
            dispatch(fetchTeams(sessionUser.jobsite_id))
            history.push(`/jobsite/${sessionUser.jobsite_id}/inventory`)
        }
    }, [dispatch, sessionUser])

    return (
        <>
            <AllSites />
        </>
    )
}

export default Jobsite