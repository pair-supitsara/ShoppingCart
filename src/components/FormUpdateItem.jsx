import { Form } from 'react-router-dom'
import Button from '../UI/Button'
import Card from '../UI/Card'
import Input from '../UI/Input';
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