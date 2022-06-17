const checkPermissions = (role, type) => {
    if (type === 'team') {
        if (role === 'Admin' || role === 'Supervisor' || role === 'Lead') {
            return true
        } else {
            return false
        }
    } else if (type === 'site') {
        if (role === 'Admin' || role === 'Supervisor') {
            return true
        } else {
            return false
        }
    }
}

export default checkPermissions