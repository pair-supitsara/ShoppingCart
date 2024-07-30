import FormAddNewItem from '../components/FormAddNewItem';
import FormUpdateItem from '../components/FormUpdateItem';
import classes from './Admin.module.css'
import Card from '../UI/Card'
import { useState } from 'react';

function Admin() {
  const [forceRender, setForcedRender] = useState(false)
  
  return (
    <div className={classes.main}>
      <FormAddNewItem render={forceRender} setRender={setForcedRender} />
      <FormUpdateItem render={forceRender} setRender={setForcedRender} />
    </div>
  );
}

export default Admin;