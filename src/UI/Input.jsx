import { forwardRef } from "react";
import classes from './Input.module.css'

const Input = forwardRef(({ id, label, type='text', placeholder, required=false, defaultValue, onChange }, ref) => {

    return (
        <div className={classes.row}>
            <label className={classes.label} htmlFor={id}>{label}</label>
            <input  className={classes.input} 
                    id={id} 
                    type={type} 
                    placeholder={placeholder} 
                    ref={ref} 
                    required={required} 
                    defaultValue={defaultValue}
                    onChange={onChange} />
        </div>
    );
})

  
export default Input;