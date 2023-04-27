import { useState, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import TodoList from './components/TodoList';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import './App.css';

export const UserStatus = createContext(null);

function App() {

  const [loading, setLoading] = useState(true);
  const [itemList, setItemList] = useState();
  const [user, setUser] = useState();



  return (
    
    <main>
      <UserStatus.Provider value={{ user, setUser}}>
       
      
      {!user
      ? <>
        <BrowserRouter>
          <nav>
            <Link to="/"className='App-link'>Login</Link> | &nbsp;  
            <Link to="/signup"className='App-link'>Signup</Link> 
          </nav>
        
      
          <Routes>

            <Route path="/signup" element={<Signup />}/>   
            <Route path="/" element={<LoginForm /> }/>
              
          </Routes>
        </BrowserRouter>
        </>   
          
      :
       <>
       <h1>Much Todo</h1>
      <Header setLoading={setLoading} setItemList={setItemList}/>
      <TodoList loading={loading} itemList={itemList} setLoading={setLoading} setItemList={setItemList} />
      </>}
      </UserStatus.Provider>
      
      
    </main>
    
  );
}

export default App;
