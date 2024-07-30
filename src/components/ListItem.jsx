import classes from './ListItem.module.css'
import Button from '../UI/Button';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import { useState, useEffect, useRef } from 'react';
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
    const isEditable = (type === 'editable')
    const [isUpdated, setUpdated] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)
    const selectedId = useRef(null);
    let modalRomove, modalUpdate
    const [message, setMessage] = useState(null)
    const name = useRef(null);
    const detail = useRef(null);
    const token = useRouteLoaderData('root')
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

    if (isRemoved) {
        modalRomove = (
        <Modal 
            onConfirm={fnRemoveSelectedId} 
            onCancel={() => { setIsRemoved(false) }} 
        >
            <h3>Confirm remove item</h3>
            <p>this is modal</p>
        </Modal>)
    }

    function fnRemoveSelectedId() {
        async function removeProduct() {
            try {
                const result = await fetchdata('http://localhost:8080/api/admin/removeproduct', { product_id: selectedId.current })
                if (result && result.message) {
                    setMessage(result.message)
                    setRender((prev) => !prev)
                }
                setIsRemoved(false)
            } catch (error) {
                setMessage(error.message)
            }
        }
        removeProduct()
    }

    function fnClickUpdateButton(id) {
        setUpdated(true)
        selectedId.current = id
        setImage({
            file: null,
            filename: null
        })
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

    return (
        <>
            {modalUpdate}
            {modalRomove}
            {message && <Modal onCancel={() => setMessage('')}>
                { message }
            </Modal>}
            { !products && <Loader text='fetching data...' />}
            { products && <div className={classes.parentbox}>{
                products.map((item) => 
                    (<div key={item.product_id} className={classes.childrenbox}>
                        <img src={item.url} className={classes.image} alt='hood' />
                        <div className={classes.info}>
                            <h3>{item.name}</h3>
                            <p>{item.detail}</p>
                            {(token && !isEditable) && <Button text='Add to cart' cssClass='navy' onClick={() => { }} />}
                            {isEditable && <div className={classes.buttons}>
                                <Button text='update' cssClass='navy' onClick={() => fnClickUpdateButton(item.product_id) } />
                                <Button text='remove' cssClass='red' onClick={() => fnClickRemoveButton(item.product_id)} />
                            </div>}
                        </div>
                    </div>)
                )
            }</div>
            }
        </>
    );
}

export default ListItem;
