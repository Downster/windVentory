import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadAllUsers } from "../../../store/allUsers"
import UserCard from "../../UserCard"



const AllUsers = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.allUsers)
    const usersObject = Object.values(users)
    console.log(usersObject)

    useEffect(() => {
        dispatch(loadAllUsers())
    }, [dispatch])



    return (
        < div className="app-body" >
            {(usersObject.length) && usersObject.map((user) => (
                <UserCard user={user} admin={true} />
            ))}
        </div>
    )
}

export default AllUsers