import classes from './ListItem.module.css'
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { useState, useEffect } from 'react';

function ListItem({ type }) {
    const [products, setProducts] = useState([])
    const isEditable = (type === 'editable')
    const [isUpdated, setUpdated] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)
    useEffect(() => {
        const data = {}
        async function fetchProducts() {
            try {
                const response = await fetch(`http://localhost:8080/api/customers/products`, {
                    method: 'post',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const rpjson = await response.json();
                if (rpjson && rpjson.json) {
                    setProducts(rpjson.json.data)
                } else {

                }
            } catch (error) {
                alert(error.message)
            }
        }
        fetchProducts()
    }, [])
    return (
        <>
            {isUpdated && <Modal>
                <h3>Updated</h3>
                <p>this is modal</p>
                <div className={classes.buttons}>
                    <Button text='confirm' cssClass='navy' onClick={() => { setUpdated(false) }} />
                    <Button text='close' cssClass='red' onClick={() => { setUpdated(false) }} />
                </div>
                
            </Modal>}

            {isRemoved && <Modal>
                <h3>Confirm remove item</h3>
                <p>this is modal</p>
                <div className={classes.buttons}>
                    <Button text='confirm' cssClass='navy' onClick={() => { setIsRemoved(false) }} />
                    <Button text='close' cssClass='red' onClick={() => { setIsRemoved(false) }} />
                </div>
                
            </Modal>}

            <div className={classes.parentbox}>{
                products.map((item) => 
                    (<div key={item.name} className={classes.childrenbox}>
                        <img src={'./hood.jpg'} className={classes.image} alt='hood' />
                        <div className={classes.info}>
                            <h3>{item.name}</h3>
                            <p>{item.detail}</p>
                            {isEditable && <div className={classes.buttons}>
                                <Button text='update' cssClass='navy' onClick={() => setUpdated(true) } />
                                <Button text='remove' cssClass='red' onClick={() => setIsRemoved(true) } />
                            </div>}
                        </div>
                    </div>)
                )
            }</div>
        </>
    );
}

export default ListItem;
