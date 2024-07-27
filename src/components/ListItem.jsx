import classes from './ListItem.module.css'
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { useState } from 'react';

function ListItem({ type }) {
    const arrayItem = [
        {
            name: 'name item 1',
            description: 'description...'
        },
        {
            name: 'name item 2',
            description: 'description...'
        },
        {
            name: 'name item 3',
            description: 'description...'
        },
        {
            name: 'name item 4',
            description: 'description...'
        }
    ]
    const isEditable = (type === 'editable')
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {isOpen && <Modal>
                <h3>Confirm remove item</h3>
                <p>this is modal</p>
                <div className={classes.buttons}>
                    <Button text='confirm' cssClass='navy' onClick={ ()=> { setIsOpen(false) }} />
                    <Button text='close' cssClass='red' onClick={ ()=> { setIsOpen(false) }} />
                </div>
                
            </Modal>}

            <div className={classes.parentbox}>{
                arrayItem.map((item) => 
                    (<div key={item.name} className={classes.childrenbox}>
                        <img src={'./hood.jpg'} className={classes.image} alt='hood' />
                        <div className={classes.info}>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            {isEditable && <div className={classes.buttons}>
                                <Button text='update' cssClass='navy' />
                                <Button text='remove' cssClass='red' />
                            </div>}
                        </div>
                    </div>)
                )
            }</div>
        </>
    );
}

export default ListItem;
