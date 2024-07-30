import { Form } from 'react-router-dom'
import Button from '../UI/Button'
import Card from '../UI/Card'
import Input from '../UI/Input';
import classes from './FormAddNewItem.module.css'
import { useRef, useState, useEffect } from 'react';
import Modal from '../UI/Modal'
import { fetchdata } from '../util/api';
import { generateFilename } from '../util/gen_random';

function FormAddNewItem({ render, setRender }) {
  const name = useRef(null)
  const detail = useRef(null)
  const [message, setMessage] = useState(null)
  const [image, setImage] = useState({
    file: null,
    filename: null
  });

  useEffect(() => { console.log('FormAddNewItem') }, [render])

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage((state) => { 
        const filetype = file.name ? file.name.split('.')[1] : 'jpg'
        return {
          file: reader.result,
          filename: `${generateFilename()}.${filetype}`
      } })
    };
    reader.readAsDataURL(file);
  };

  async function addNewItemHandler(event) {
    event.preventDefault();
    try {
      const data = {
        name: name.current.value,
        detail: detail.current.value,
        image: image.file ? image.file.split(',')[1] : null,
        filename: image.filename
      }
      const isValid = fnValidateData(data)
      if (isValid) {
        const result = await fetchdata('http://localhost:8080/api/admin/addnewitem', data)
        if (result && result.message) {
          setMessage(result.message)
          setRender((prev) => !prev)
        }
      } else {
        setMessage('Fill out the form')
      }
    } catch (error) {
      setMessage(error.message)
    }
  }
  function fnValidateData(data) {
    const array = Object.values(data)
    console.log(array.filter((item) => !item))
    return array.filter((item) => !item).length === 0
  }

  return (<>
      {message && <Modal onCancel={() => { setMessage('') }}>
        <p>{ message }</p>
      </Modal>}
      <Card className={classes.card}>
          <h2>Add new Item</h2>
          <span>This is form for add new item..</span>
          <Form onSubmit={addNewItemHandler} className={classes.form} >
            <div className={classes.flex}>
              <div className={classes.left}>
                <img className={classes.image} src={image.file || './defaultImage.jpg'} accept="image/*" alt='hood' />
              </div>
              <div className={classes.right}>
                <Input type='text' id='name' name='name' label='Name' ref={name} placeholder='enter name...' />
                <Input type='text' id='detail' name='detail' label='Detail' ref={detail} placeholder='enter detail...'/>
                <br />
                <input type="file" onChange={handleFileChange} />
              </div>
            </div>
            <div className={classes.between}>
              <Button type='submit' text='Add New Item' cssClass='navy' />
            </div>
          </Form>
      </Card>
    </>
  );
}

export default FormAddNewItem;