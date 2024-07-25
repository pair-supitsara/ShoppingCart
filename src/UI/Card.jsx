import classes from './Card.module.css'

export default function Card({ cssClass, children }) {

    return (
        <div className={`${classes.card} ${classes[cssClass]}`} >{ children }</div>
    );
}