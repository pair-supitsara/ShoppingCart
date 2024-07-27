import { Form } from 'react-router-dom'
import Button from '../UI/Button'
import Card from '../UI/Card'
import Input from '../UI/Input';
import classes from './FormAddNewItem.module.css'
import { useRef } from 'react';

function generateFilename() {
  const date = new Date()
  return `${date.getFullYear()}${date.getMonth()}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
}

function FormAddNewItem() {
  const name = useRef(null)
  const detail = useRef(null)
  const selectedfile = useRef(null);
  let filetype = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    filetype.current = file.name ? file.name.split('.')[1] : 'jpg'
    console.log(file)
    console.log(filetype.current)
    const reader = new FileReader();
    reader.onloadend = () => {
      selectedfile.current.file = reader.result;
    };
    reader.readAsDataURL(file);
  };

  async function addNewItemHandler(event) {
    event.preventDefault();

    const data = {
      name: name.current.value,
      detail: detail.current.value,
      image: selectedfile.current.file.split(',')[1],
      filename: `${generateFilename()}.${filetype.current}`
    }
    const response = await fetch(`http://localhost:8080/api/admin/addnewitem`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    })
  }

  return (
    <Card className={classes.card}>
        <h2>Add new Item</h2>
        <span>This is form for add new item..</span>
        <Form onSubmit={addNewItemHandler} className={classes.form} >
          <div className={classes.center}>
            <Input type='text' id='name' name='name' label='Name' ref={name} placeholder='enter name...' />
          
            <Input type='text' id='detail' name='detail' label='Detail' ref={detail} placeholder='enter detail...'/>
          </div>
          <div className={classes.between}>
            <input type="file" onChange={handleFileChange} ref={selectedfile} />
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