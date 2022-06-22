const UserTeam = ({ currentTeam }) => {
    return (
        <>
            <>
                <div className="team-data">
                    <h1>Jobtype: {currentTeam.job_type}</h1>
                </div>
                <div className="team-lead-data">
                    <img src={currentTeam.team_lead.image}></img>
                    <h1>Team lead: {currentTeam.team_lead.firstName + " " + currentTeam.team_lead.lastName}</h1>
                </div>
                <div className='team-members-data'>
                    <h1>Team members:</h1>
                    {currentTeam.team_members && currentTeam.team_members.map((member) => {
                        return (
                            <>
                                <img src={member.image}></img>
                                <h1>{member.firstName}</h1>
                                <h1>{member.lastName}</h1>
                            </>
                        )
                    })}
                </div>
            </>
        </>
    )
}

export default UserTeam