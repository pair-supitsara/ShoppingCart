import { forwardRef } from "react";
import classes from './Input.module.css'

const Input = forwardRef(({ id, label, type='text', placeholder }, ref) => {

    return (
        <div className={classes.row}>
            <label className={classes.label} htmlFor={id}>{label}</label>
            <input className={classes.input} id={id} type={type} placeholder={placeholder} ref={ref} />
        </div>
    );
})

  
export default Input;