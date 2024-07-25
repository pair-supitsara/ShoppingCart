import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import classes from './Root.module.css'

function RootLayout() {
    return (
        <div className={classes.container}>
            <nav className={classes.navigation}>
                <Navigation />
            </nav>
            <main className={classes.main}>
                <Outlet />
            </main>
        </div>
    );
}
  
export default RootLayout;