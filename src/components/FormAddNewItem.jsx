import { Form } from 'react-router-dom'
import Button from '../UI/Button'
import Card from '../UI/Card'
import Input from '../UI/Input';
import classes from './FormAddNewItem.module.css'

function FormAddNewItem() {
  return (
    <Card className={classes.card}>
        <h2>Add new Item</h2>
        <span>This is form for add new item..</span>
        <Form className={classes.form}>
          <div className={classes.center}>
            <Input type='text' id='name' name='name' label='Name' placeholder='name..'/>
          
            <Input label='Detail' />
          </div>
          <div className={classes.between}>
            <Button type='button' text='upload' />
            <Button type='button' text='preview' />
          </div>
          <div className={classes.between}>
            <Button type='submit' text='Add New Item' cssClass='navy' />
          </div>
          
        </Form>
    </Card>
  );
}

export default FormAddNewItem;