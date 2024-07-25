import classes from './ListItem.module.css'
import Button from '../UI/Button';

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
    return (
        <div className={classes.parentbox}>{
            arrayItem.map((item) => 
                (<div key={item.name} className={classes.childrenbox}>
                    <img src={'./hood.jpg'} className={classes.image} />
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
    );
}

export default ListItem;
