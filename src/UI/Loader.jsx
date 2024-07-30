import classes from './Loader.module.css'

function Loader({ text }) {
  
  return (
    <div className={classes.backdrop}>
        <div className={classes.loader}></div>
        <div>{ text }</div>
    </div>
  );
}

export default Loader;