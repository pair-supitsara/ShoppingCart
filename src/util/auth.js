export function getAuthToken() {
    const token = localStorage.getItem('token')
    const permission = localStorage.getItem('permission')
    const user_id = localStorage.getItem('user_id')
    
    return { token, permission, user_id }
}
