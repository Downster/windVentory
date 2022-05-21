const roleToNum = (role) => {
    if (role === 'Worker' || role === undefined) {
        return 1
    } else if (role === 'Lead') {
        return 2
    } else if (role === 'Supervisor') {
        return 3
    } else if (role === 'Admin') {
        return 4
    }
}

export default roleToNum