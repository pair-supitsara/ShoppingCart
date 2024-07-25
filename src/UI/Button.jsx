import classes from './Button.module.css'

export default function Button({ text, type='button', cssClass, onClick }) {

    return (
        <button type={type} className={`${classes.button} ${classes[cssClass]}`} onClick={onClick}>{text}</button>
    );
}