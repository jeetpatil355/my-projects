import React, { useEffect } from 'react'
import { getPublicBlogs, getSearchQuestion} from "../services/blog"
import { useState } from 'react'
import { toast } from 'react-toastify'
import Card from '../components/Card'
import Search from '../components/Search'
import { renderDate} from '../services/renderDate'
import {getSpecificUserName} from "../services/user"


const Home = ({setPage}) => {

  const [blogs, setBlog] = useState([])
  const [users, setUsers] = useState([])
  const [text, setText] = useState("")


  const getAllNames = async(data) =>{
    const usersArray = []
    for(let i=0; i<data.length; i++){
        const name = await getSpecificUserName(data[i])
        usersArray.push(name.data)
    }
    setUsers(usersArray)
}

  const loadBlogs = async () => {
    const result = await getPublicBlogs()
    if (result['status'] === 'success') {

      const data = result["data"].map((obj) => {
        return {
          ...obj, publish_date: renderDate(obj.publish_date)
        }
      })
      setBlog(data)

      const dataUser = result["data"].map((obj) => {
        return obj.user_id
      })
      getAllNames(dataUser)
      
    } else {
      toast.error(result['error'])
    }
  }

  const getSearch = async (text) => {
    const result = await getSearchQuestion(text)
    if (result['status'] === 'success') {
      const data = result["data"].map((obj) => {
        return {
          ...obj, publish_date: renderDate(obj.publish_date)
        }
      })
      setBlog(data)

      const dataUser = result["data"].map((obj) => {
        return obj.user_id
      })
      getAllNames(dataUser)
    } else {
      toast.error(result['error'])
    }
  }

  const handleChange = (e) => {
    setText(e.target.value)
    getSearch(text)
  }



  useEffect(() => {
    if (text.length === 0) {
      loadBlogs()
    }
    setPage(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])
  return (
    <>
      <Search text={text} handleChange={handleChange} title={"Search Public Blogs"} field={"Search Blogs"} />
      <div className="container">
        <div className="row">
          <section className="py-3 py-md-5 py-xl-8">
            <div className="container overflow-hidden">
              <div className="row gy-4 gy-lg-0">
                {
                  blogs.map((blog, index) => {
                    return (
                      <Card 
                      bid={blog.blog_id} 
                      image={blog.file_path} 
                      category={blog.category_name} 
                      title={blog.title} 
                      content={blog.content} 
                      user={users} 
                      date={blog.publish_date} 
                      index={index} 
                      is_private={blog.is_private} 
                      diff={0} 
                      />
                    )
                  })
                }
              </div>
            </div>
          </section>
        </div >
      </div >
    </>
  )
}

export default Home
