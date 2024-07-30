import classes from './Modal.module.css'
import Button from '../UI/Button';

export default function Modal({ children, onConfirm, onCancel, cssClass}) {

    return (
        <div className={classes.backdrop}>
            <dialog className={`${classes.dialog} ${cssClass}`} open>
                { children }
                <div className={classes.buttons}>
                    {onConfirm && <Button text='confirm' cssClass='navy' onClick={onConfirm} />}
                    {onCancel && <Button text='close' cssClass='red' onClick={onCancel} />}
                </div>
            </dialog>
        </div>
    );
}