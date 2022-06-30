import ReactTooltip from "react-tooltip"

const UserTeam = ({ currentTeam }) => {
    return (
        <>
            <>
                <div className="team-container">
                    <div className="team-data">
                        <h1 className="team-title">Jobtype: {currentTeam?.job_type}</h1>
                    </div>
                    <div className='team-members-data'>
                        <h1 className="team-title">Team members:</h1>
                        <div className="team-info">

                            {currentTeam?.team_members && currentTeam?.team_members.map((member) => {
                                return (
                                    <>
                                        <h1 className="member-info">{member?.firstName} {member?.lastName}</h1>
                                        <img className='team-profile-pic' src={member?.image} data-tip={member.phoneNumber}></img>
                                        <ReactTooltip
                                            className="tool-tip-cls"
                                            place="right"
                                            type="dark"
                                            effect="solid"
                                        />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default UserTeam