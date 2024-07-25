import FormAddNewItem from '../components/FormAddNewItem';
import FormUpdateItem from '../components/FormUpdateItem';
import classes from './Admin.module.css'
import Card from '../UI/Card'

function Admin() {
  return (
    <div className={classes.main}>
      <FormAddNewItem />
      <FormUpdateItem />
    </div>
      
  );
}

export default Admin;