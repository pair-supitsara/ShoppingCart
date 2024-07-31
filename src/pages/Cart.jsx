import classes from './Cart.module.css'
import Card from '../UI/Card'
import { useState, useCallback, useEffect } from 'react';
import { fetchdata } from '../util/api';
import { useRouteLoaderData } from "react-router-dom";
import Loader from '../UI/Loader';
import CardProduct from '../components/CardProduct';
import Modal from '../UI/Modal';

function Cart() {
  const { token, user_id } = useRouteLoaderData('root')
  const [message, setMessage] = useState(null)
  const [cart, setCart] = useState(null)

  const fnGetMyCart = useCallback(async () => {
    try {
      const result = await fetchdata('http://localhost:8080/api/customers/getmycart', { token, user_id })
      if (result.data) {
        setCart(result.data)
      }
    } catch (error) {
      setMessage(error.message)
    }
  }, [])

  useEffect(() => {
    fnGetMyCart()
  }, [])

  function fnClickRemoveAll(id) {
    const json = {
      product_id: id,
      user_id,
      quantity: 0
    }
    console.log(json)
  }
  
  return (
    <Card>
      {message && <Modal onCancel={() => setMessage('')}>
          { message }
      </Modal>}
      {!cart && <Loader text='fetching my cart...' />}
      {cart && (<div className={classes.parentbox}>
        {cart.map((item) => {
          return (
            <CardProduct
              key={item.product_id} 
              type='cart'
              name={item.name}
              detail={item.detail} 
              url={item.image_url}
              count={item.quantity}
              fnClickRemoveAll={() => { fnClickRemoveAll(item.product_id) }}
            />
          )
        })}
        </div>
      )}
    </Card>
  );
}

export default Cart;