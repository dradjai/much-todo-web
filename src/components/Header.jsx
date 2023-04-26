import { useContext } from 'react';
import { Button, Input } from 'antd';
import { UserStatus } from '../App';



export default function Header({ setItemList, setLoading }) {

  const { user, setUser } = useContext(UserStatus);

  const handleAdd = async (value) => {

    //validation
    if(value.length < 3) return 

    setLoading(true) // turn on spinner

    const newItem = {
      done: false,
      userId: user.id,
      item: value, //what the user typed in is "value"
    }
    const response = await fetch(`https://express-deploy-dr.web.app/items/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    })
    const data = await response.json()
    setItemList(data);
    setLoading(false);
  }

  return(
    <header>
      <div className='btn-logout'>
      <Button onClick={ () => setUser(!user)}>Logout</Button>
      </div>
      <div>
        <h2>{user.email} </h2> &nbsp;
      </div> 
      <Input.Search 
      allowClear
      enterButton="Add"
      size="large"
      onSearch={handleAdd}
      placeholder='Add new todo item'
      />
    </header>
  )
}