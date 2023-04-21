import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import Header from './components/Header';


function App() {

  const [loading, setLoading] = useState(true);
  const [itemList, setItemList] = useState();


  return (
    <main>
      <h1>Much Todo</h1>
      <Header setLoading={setLoading} setItemList={setItemList}/>
      <TodoList loading={loading} itemList={itemList} setLoading={setLoading} setItemList={setItemList}/>
      
    </main>
  );
}

export default App;
