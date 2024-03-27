import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyTodoItems } from '../services/todoItems'

function Home() {
  // collect the todo items of the user
  const [items, setItems] = useState([])

  // get all items
  const loadAllItems = async () => {
    const result = await getMyTodoItems()
    if (result['status'] == 'success') {
      setItems(result['data'])
    } else {
      alert(result['error'])
    }
  }

  // calls the function when the component gets loaded
  useEffect(() => {
    console.log(`fetching all the items`)
    loadAllItems()
  }, [])

  return (
    <div>
      <h1 style={{ marginTop: 20, marginBottom: 20, textAlign: 'center' }}>
        ToDo Items
      </h1>

      <div>
        <Link to='/create-item' className='btn btn-success'>
          Add New Item
        </Link>
      </div>
      <div className='mt-3'>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Body</th>
              <th>Completed</th>
              <th>Timestamp</th>
              <th style={{ width: 165 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <tr className={item['completed'] ? 'table-success' : ''}>
                  <td>{item['id']}</td>
                  <td>{item['title']}</td>
                  <td>{item['body']}</td>
                  <td>{item['completed'] ? 'Yes' : 'No'}</td>
                  <td>{item['createdTimestamp']}</td>
                  <td>
                    <button className='btn btn-danger btn-sm me-1'>
                      Delete
                    </button>

                    {!item['completed'] && (
                      <button className='btn btn-warning btn-sm '>
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
