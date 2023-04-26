import { useEffect, useContext } from 'react'
import { Button, List } from 'antd';
import { UserStatus } from '../App';

export default function TodoList({ loading, itemList, setItemList, setLoading}) {
  
  const { user } = useContext(UserStatus);

  useEffect(() => {
    fetch(`https://express-deploy-dr.web.app/items/${user.id}`)
      .then(resp => resp.json())
      .then(setItemList)
      .catch(alert) // we can do better
      .finally(() => setLoading(false))
  }, [user])


  const handleDone = async (item) => {
    
    setLoading(true)

    const newItem = {
      done: !item.done,
    }
    const response = await fetch(`https://express-deploy-dr.web.app/items/${user.id}/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    })
    const data = await response.json()
    setItemList(data);
    setLoading(false);
  }

  const handleDelete = async (item) => {
    
    const response = await fetch(`https://express-deploy-dr.web.app/items/${user.id}/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await response.json()
    setItemList(data);
  }


  return(
    <section>
      <List
        bordered
        dataSource={itemList}
        loading={loading}
        size='large'
        renderItem={(task) => (
          <List.Item onClick={() => handleDone(task) } className={(task.done) && 'done'}>
            {task.item}
            <Button onClick={() => handleDelete(task) } className='btn-remove'>Remove</Button>
          </List.Item>
         )} 
        />
   </section>
  )
}