import { NavLink, Form, useRouteLoaderData } from "react-router-dom";
import classes from './Navigation.module.css'
import Button from "../UI/Button";

function Navigation() {
    const token = useRouteLoaderData('root')

    return (
        <ul className={classes.nav}>
            <li className={classes['nav-item']}>
                <NavLink to='/' className={({ isActive }) => isActive ? classes.active : undefined}>Home</NavLink>
            </li>
            {/*<li className={classes['nav-item']}>
                <NavLink to='/shop' className={({ isActive }) => isActive ? classes.active : undefined}>Shop</NavLink>
            </li>*/}
            {token && <li className={classes['nav-item']}>
                <NavLink to='/cart' className={({ isActive }) => isActive ? classes.active : undefined}>Cart</NavLink>
            </li>}
            {token && <li className={classes['nav-item']}>
                <NavLink to='/admin' className={({ isActive }) => isActive ? classes.active : undefined}>Admin</NavLink>
            </li>}
            {!token && <li className={classes['nav-item']}>
                <NavLink to='/auth' className={({ isActive }) => isActive ? classes.active : undefined}>Auth</NavLink>
            </li>}
            {token && <li className={classes['nav-item']}>
                <Form action='/logout' method="post">
                    <Button type='submit' text='Logout' />    
                </Form>
            </li>}
            
        </ul>
    );
}
  
export default Navigation;