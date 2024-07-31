import classes from './ListItem.module.css'
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import CardProduct from './CardProduct';
import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchdata } from '../util/api';
import { generateFilename } from '../util/gen_random';
import { useRouteLoaderData } from "react-router-dom";
import Loader from '../UI/Loader';

function fnValidateData(json) {
    const result = {
        isvalid: true,
        messages: []
    }
    if (!json.name) { 
        result.isvalid = false 
        result.messages.push('enter name of product')
    }
    if (!json.detail) { 
        result.isvalid = false 
        result.messages.push('enter detail of product')
    }
    if (!json.image.file || !json.image.filename) {
        result.messages.push("you didn't change image, so it wouldn't be updated.")
    }
    return result
}

function ListItem({ type, render, setRender }) {
    const [products, setProducts] = useState()
    const [isUpdated, setUpdated] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)
    const [isAddedCart, setIsAddedCart] = useState(false)
    const selectedId = useRef(null);
    let modalRomove, modalUpdate, modalAddtoCart
    const [message, setMessage] = useState(null)
    const name = useRef(null);
    const detail = useRef(null);
    const { token, user_id } = useRouteLoaderData('root')
    const [image, setImage] = useState({
        file: null,
        filename: null
    });

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
    }, [render])

    function fnClickRemoveButton(id) {
        setIsRemoved(true)
        selectedId.current = id
    }

    const removeProduct = useCallback(async () => { 
        try {
            const result = await fetchdata('http://localhost:8080/api/admin/removeproduct', { token, product_id: selectedId.current })
            if (result && result.message) {
                setMessage(result.message)
                setRender((prev) => !prev)
            }
            setIsRemoved(false)
        } catch (error) {
            setMessage(error.message)
        }
    }, [])

    if (isRemoved) {
        modalRomove = (
        <Modal 
            onConfirm={removeProduct} 
            onCancel={() => { setIsRemoved(false) }} 
        >
            <h3>Confirm remove item</h3>
            <p>this is modal</p>
        </Modal>)
    }

    function fnClickUpdateButton(id) {
        setUpdated(true)
        selectedId.current = id
    }

    if (isUpdated) {
        const selectedItem = products.filter(item => item.product_id === selectedId.current)
        if (selectedItem && selectedItem[0]) {
            modalUpdate = (
                <Modal onConfirm={fnUpdateSelectedId} onCancel={() => { setUpdated(false) }} >
                    <div className={classes['modal-update']}>
                        <img className={classes.image} src={image.file || selectedItem[0].url} alt='hood' />
                        <div className={classes.info}>
                            <Input type='text' id='name' label='Name' name='name' defaultValue={ selectedItem[0].name } ref={name} />
                            <Input type='text' id='detail' label='Detail' name='detail' defaultValue={ selectedItem[0].detail } ref={detail} />
                            <Input type='file' id='image' label='Image' name='image' onChange={handleFileChange} />
                        </div>
                    </div>
                </Modal>)
        }
    }

    function handleFileChange(event) {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            const filetype = file.name ? file.name.split('.')[1] : 'jpg'
            setImage({
                file: reader.result,
                filename: `${generateFilename()}.${filetype}`
            })
        };
        reader.readAsDataURL(file)
      };

    function fnUpdateSelectedId() {
        const json = {
            token,
            product_id: selectedId.current,
            name: name.current.value,
            detail: detail.current.value,
            image: {
                file: image.file ? image.file.split(',')[1] : null,
                filename: image.filename
            }
        }
        const result = fnValidateData(json)
        if (result && result.messages.length > 0) { 
            const html = (<ul>{ result.messages.map((item, index) => <li key={index}>{item}</li>) }</ul>)
            setMessage(html)
        }
        if (result && result.isvalid) {
            async function updateSelectedProduct() {
                try {
                    const result = await fetchdata('http://localhost:8080/api/admin/updateproduct', json)
                    if (result && result.message) {
                        setMessage(result.message)
                        setRender((prev) => !prev)
                    }
                    setIsRemoved(false)
                } catch (error) {
                    setMessage(error.message)
                }
            }
            updateSelectedProduct()
        }
    }

    function fnClickAddCartButton(id) {
        setIsAddedCart(true)
        selectedId.current = id
    }

    const insertCart = useCallback(async () => {
        try {
            const json = {
                token,
                user_id: user_id,
                product_id: selectedId.current,
                quantity: 1
            }
            const result = await fetchdata('http://localhost:8080/api/customers/addtocart', json)
            if (result && result.message) {
                setMessage(result.message)
            }
            setIsAddedCart(false)
        } catch (error) {
            setMessage(error.message)
        }
    }, [user_id, selectedId])

    if (isAddedCart) {
        modalAddtoCart = (
            <Modal onConfirm={insertCart} onCancel={() => { setIsAddedCart(false) }} >
                isAddedCart
            </Modal>
        )
    }

    return (
        <>
            {modalUpdate}
            {modalRomove}
            {modalAddtoCart}
            {message && <Modal onCancel={() => setMessage('')}>
                { message }
            </Modal>}
            { !products && <Loader text='fetching all products...' />}
            { products && <div className={classes.parentbox}>{
                products.map((item) => {
                    return (
                        <CardProduct
                            key={item.product_id} 
                            type={type} 
                            product_id={item.product_id} 
                            name={item.name}
                            detail={item.detail} 
                            url={item.url}
                            token={token}
                            fnClickAddCartButton={fnClickAddCartButton} 
                            fnClickUpdateButton={fnClickUpdateButton}
                            fnClickRemoveButton={fnClickRemoveButton}
                        />)
                    }
                )
            }</div>
            }
        </>
    );
}

export default ListItem;
