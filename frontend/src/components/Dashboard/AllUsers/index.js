import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadAllUsers } from "../../../store/allUsers"
import CreateUserModal from "../CreateUserModal"
import UserCard from "../UserCard"



const AllUsers = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.allUsers)
    const usersObject = Object.values(users)
    console.log(usersObject)

    useEffect(() => {
        dispatch(loadAllUsers())
    }, [dispatch])



    return (
        <>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {(usersObject.length) && usersObject.map((user) => (
                    <UserCard user={user} admin={true} />
                ))}
            </ul>
            <CreateUserModal />
        </>
    )
}

export default AllUsers