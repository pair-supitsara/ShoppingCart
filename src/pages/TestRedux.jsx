import { useSelector, useDispatch } from 'react-redux'
import { counterActions } from '../store/index';
import Button from '../UI/Button';

function TestRedux() {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.counter.counter)
  
  const add = () => {
    dispatch(counterActions.increment())
  }

  const remove = () => {
    dispatch(counterActions.decrement())
  }
  return (
    <div>
      <p>{ counter }</p>
      <Button type='button' onClick={add} text='counter' />
      <Button type='button' onClick={remove} text='decrement' />
    </div>
  );
}

export default TestRedux;
