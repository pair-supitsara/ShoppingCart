import classes from './ListItem.module.css'
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { useState, useEffect, useRef } from 'react';
import { fetchdata } from '../util/api';

function ListItem({ type }) {
    const [products, setProducts] = useState([])
    const isEditable = (type === 'editable')
    const [isUpdated, setUpdated] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)
    const itemToActive = useRef(null);
    let modalRomove, modalUpdate
    const [message, setMessage] = useState(null)
    // const [modal, setModal] = useState(null)
    
    useEffect(() => {
        const data = {}
        /* helper */
        async function fetchProducts() {
            try {
                const result = await fetchdata('http://localhost:8080/api/customers/products', data)
                console.log(result)
                if (result.data.length > 0) {
                    setProducts(result.data)
                }
            } catch (error) {
                setMessage(error.message)
            }
        }
        fetchProducts()
    }, [])

    function fnClickRemove(id) {
        setIsRemoved(true)
        itemToActive.current = id
    }

    if (isRemoved) {
        modalRomove = (
        <Modal 
            onConfirm={() => { fnConfirmRemove() }} 
            onCancel={() => { setIsRemoved(false) }} 
        >
            <h3>Confirm remove item</h3>
            <p>this is modal</p>
        </Modal>)
    }

    function fnConfirmRemove() {
        async function removeProduct() {
            try {
                const result = await fetchdata('http://localhost:8080/api/admin/removeproduct', { product_id: itemToActive.current })
                if (result && result.message) {
                    setMessage(result.message)
                }
                setIsRemoved(false)
            } catch (error) {
                setMessage(error.message)
            }
        }
        removeProduct()
    }

    function fnClickUpdate(id) {
        setUpdated(true)
        itemToActive.current = id
    }

    if (isUpdated) {
        modalUpdate = (
            <Modal 
                onConfirm={() => { fnConfirmUpdate() }} 
                onCancel={() => { setUpdated(false) }}
            >
                <h3>detail product that want to updated</h3>
                <p>{ 0 }</p>
            </Modal>)

        async function getProductById() {
            try {
                const result = await fetchdata('http://localhost:8080/api/customers/getproductbyid', { product_id: itemToActive.current })
                console.log(result)
                if (result.data.length > 0) {
                    modalUpdate = (
                        <Modal 
                            onConfirm={() => { fnConfirmUpdate() }} 
                            onCancel={() => { setUpdated(false) }}
                        >
                            <h3>detail product that want to updated</h3>
                            <p>{ result.data[0].name }</p>
                        </Modal>)
                }
            } catch (error) {
                setMessage(error.message)
            }
        }
        getProductById()
    }

    function fnConfirmUpdate() {
        
    }

    return (
        <>
            {modalUpdate}
            {modalRomove}
            {message && <Modal onCancel={() => setMessage('')}>
                <p>{ message }</p>
            </Modal>}
            <div className={classes.parentbox}>{
                products.map((item) => 
                    (<div key={item.product_id} className={classes.childrenbox}>
                        <img src={item.url} className={classes.image} alt='hood' />
                        <div className={classes.info}>
                            <h3>{item.name}</h3>
                            <p>{item.detail}</p>
                            {isEditable && <div className={classes.buttons}>
                                <Button text='update' cssClass='navy' onClick={() => fnClickUpdate(item.product_id) } />
                                <Button text='remove' cssClass='red' onClick={() => fnClickRemove(item.product_id)} />
                            </div>}
                        </div>
                    </div>)
                )
            }</div>
        </>
    );
}

export default ListItem;
