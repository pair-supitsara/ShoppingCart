import { useSelector } from 'react-redux'
import './App.css';
import Button from './UI/Button';

function App() {
  const counter = useSelector(state => state.counter.counter)
  
  return (
    <div className="App">
      <h2>NEW ITEM</h2>
      <p>{ counter }</p>
    </div>
  );
}

export default App;
