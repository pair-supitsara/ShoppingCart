import Card from '../UI/Card'
import classes from './FormUpdateItem.module.css'
import ListItem from '../components/ListItem'

function FormUpdateItem({ render, setRender }) {
  return (
    <Card className={classes.card}>
        <h2>Edit existing item</h2>
        <span>display item with update button..</span>
        <ListItem type='editable' render={render} setRender={setRender} />
    </Card>
    );
}

export default FormUpdateItem;