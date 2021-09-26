import React, {useState, useEffect} from 'react';
import './App.css';
import BudgetBar from './components/BudgetBar/BudgetBar';
import CashFlow from './components/CashFlow/CashFlow';
import List from './components/List/List';
import {useDispatch, useSelector} from 'react-redux';
import { addUser, deleteUser, loadUsers } from './redux/actions';

function App() {
  const [radioState, setRadioState] = useState('expenses');

  let dispatch = useDispatch();
  
  const { users } = useSelector(state => state.users );

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);
  

  const handleRadioChange = (event) => {
      setRadioState(event.target.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleTransaction = (type) => {
    const name = document.querySelector('#cash-flow-name');
    const amount = document.querySelector('#cash-flow-amount');

    if (name.value && amount.value) {
      dispatch(addUser(name.value, amount.value, type));
    }
  };

  return (
    <div className="App">
      <h1>My Budget Planner</h1>
      <BudgetBar />
      <div className="row">
        <CashFlow click={handleTransaction} />
        <List items={users} selected={radioState} changeRadio={handleRadioChange} delete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
