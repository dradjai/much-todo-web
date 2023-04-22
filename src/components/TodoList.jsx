import { useEffect } from 'react'
import { List } from 'antd';

export default function TodoList({ loading, itemList, setItemList, setLoading}) {
  
  useEffect(() => {
    fetch('https://express-deploy-dr.web.app/items')
      .then(resp => resp.json())
      .then(setItemList)
      .catch(alert) // we can do better
      .finally(() => setLoading(false))
  }, [])


  const handleDone = async (item) => {
    
    const newItem = {
      done: true,
      userId: "me",
      item: item.item, //what the user typed in is "value"
    }
    const response = await fetch(`https://express-deploy-dr.web.app/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
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
          <List.Item onClick={() => {handleDone(task)}} className={(task.done) && 'done'}>
            {task.item}
          </List.Item>
         )} 
        />
   </section>
  )
}