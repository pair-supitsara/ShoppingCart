import { useState, useEffect, useCallback } from 'react';
import Loader from '../UI/Loader';
import Modal from '../UI/Modal';
import { fetchdata } from '../util/api';
import classes from './User.module.css'
import { useRouteLoaderData } from "react-router-dom";

function User({  }) {
    const { token } = useRouteLoaderData('root')
    const [users, setUsers] = useState(null)
    const [message, setMessage] = useState(null)

    const fetchUsers = useCallback(async () => {
        try {
            const result = await fetchdata('http://localhost:8080/api/admin/getusers', { token })
            if (result.data && result.data.length > 0) {
                setUsers(result.data)
            }
            if (result && result.message) {
                setMessage(result.message)
            }
        } catch (error) {
            console.log(error)
            setMessage(error.message)
        }
    }, [])

    useEffect(() => {
        fetchUsers()
    }, [])
    
    return (
        <>
            <h2>Users</h2>
            {message && <Modal onCancel={() => setMessage('')}>
                { message }
            </Modal>}
            {!users && <Loader text='fetching all users...' />}
            {users && (<ul className={classes['parent-box']}>{
                users.map((item) => {
                    return (<li key={item.user_id} className={classes['children-box']}>
                        <div>{item.email}</div>
                        <div>
                            <div className={classes.permisstion}>{item.permission}</div>
                            <div className={classes.date}>{item.createdate}</div>
                        </div>
                        
                    </li>)
                })
            }</ul>)}
        </>);
}

export default User;