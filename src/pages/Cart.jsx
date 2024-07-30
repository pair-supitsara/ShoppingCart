import classes from './Cart.module.css'
import Card from '../UI/Card'
import { useState } from 'react';

function Cart() {
  const [forceRender, setForcedRender] = useState(false)
  
  return (
    <Card className={classes.main}>
      
    </Card>
  );
}

export default Cart;