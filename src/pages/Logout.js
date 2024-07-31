import { redirect } from "react-router-dom"

export function action() {
    localStorage.removeItem('token')
    localStorage.removeItem('permission')
    localStorage.removeItem('user_id')

    return redirect('/')
}