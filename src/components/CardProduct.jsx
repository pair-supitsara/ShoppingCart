import classes from './CardProduct.module.css'
import Button from '../UI/Button';

function CardProduct({ type, product_id, name, detail, url, token
  , fnClickAddCartButton, fnClickUpdateButton, fnClickRemoveButton, fnClickRemoveAll, count }) {
  return (
    <div key={product_id} className={classes.childrenbox}>
        <img src={url} className={classes.image} alt='hood' />
        <div className={classes.info}>
            { count && <span className={classes.count}>{count}</span>}
            <h3>{name}</h3>
            <p>{detail}</p>
            {(token && (type !== 'editable')) && <Button text='Add to cart' cssClass='navy' onClick={() => { fnClickAddCartButton(product_id) }} />}
            {(token && (type === 'editable')) && <div className={classes.buttons}>
                <Button text='update' cssClass='navy' onClick={() => fnClickUpdateButton(product_id) } />
                <Button text='remove' cssClass='red' onClick={() => fnClickRemoveButton(product_id)} />
            </div>}
            {(type === 'cart') && 
                <Button text='remove all' cssClass='red' onClick={fnClickRemoveAll} />
            }
        </div>
    </div>
  );
}

export default CardProduct;