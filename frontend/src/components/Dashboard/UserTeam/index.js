import ReactTooltip from "react-tooltip"
import UserCard from "../UserCard"

const UserTeam = ({ currentTeam }) => {
    console.log(currentTeam)
    return (
        <>
            <>
                <div>
                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Jobtype</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{currentTeam.job_type}</dd>
                        </div>
                        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Team Lead</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{currentTeam.team_lead.firstName}</dd>
                        </div>
                        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Lead contact info</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{currentTeam.team_lead.phoneNumber}</dd>
                        </div>
                    </dl>
                </div>


                {currentTeam?.team_members && currentTeam?.team_members.map((member) => {
                    return (
                        <>
                            <UserCard user={member} />
                        </>
                    )
                })}


            </>
        </>
    )
}

export default UserTeam