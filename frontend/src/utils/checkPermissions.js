const checkPermissions = (role, type) => {
    if (type === 'team') {
        if (role === 'Supervisor' || role === 'Lead' || role === 'Admin') {
            return true
        } else {
            return false
        }
    } else if (type === 'site') {
        if (role === 'Supervisor' || role === 'Admin') {
            return true
        } else {
            return false
        }
    } else if (type === 'panel') {
        if (role === 'Admin') {
            return true
        } else {
            return false
        }
    }
}

export default checkPermissions