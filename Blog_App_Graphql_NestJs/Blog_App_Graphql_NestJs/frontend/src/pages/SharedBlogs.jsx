import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Card from '../components/Card'
import Search from '../components/Search'
import { renderDate } from '../services/renderDate'
import { SEARCH_SHARED_BLOG_MUTATION, SHARED_MUTATION } from '../mutations/blog';
import { useMutation } from '@apollo/client';

const SharedBlogs = ({ setPage }) => {

  const [blogs, setBlog] = useState([])
  const [getSharedBlogs] = useMutation(SHARED_MUTATION);
  const [getSearchSharedBlogs] = useMutation(SEARCH_SHARED_BLOG_MUTATION)
  const [text, setText] = useState("")


  const loadBlogs = async () => {
    const id = parseInt(localStorage.getItem("id"))
    const result = await getSharedBlogs({
      variables: {
        id
      },
    })
    if (result.data.getSharedBlogsForUser.status === 'success') {
      const data = result["data"].getSharedBlogsForUser.data?.map((obj) => {
        return {
          ...obj, publish_date: renderDate(obj?.publish_date)
        }
      })
      setBlog(data)
    } else {
      toast.error(result['error'])
    }
  }
  const getSearch = async (text) => {
    const id = parseInt(localStorage.getItem("id"))
    const result = await getSearchSharedBlogs({
      variables: {
        text,
        id
      },
    });
    if (result['data'].searchSharedBlogsByText.status === 'success') {
      const data = result["data"].searchSharedBlogsByText.data?.map((obj) => {
        return {
          ...obj, publish_date: renderDate(obj?.publish_date)
        }
      })
      setBlog(data)
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
    setPage(2)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])


  return (
    <>
      <Search text={text} handleChange={handleChange} title={"Search Shared Blogs"} field={"Search Blogs"} />
      <div className="container mt-5">
        <div className="row">
          <section className="py-3 py-md-5 py-xl-8">
            <div className="container overflow-hidden">
              <div className="row gy-4 gy-lg-0">
                {
                  blogs?.map((blog, index) => {
                    return (
                      <Card
                        blog={blog}
                        index={index}
                        is_private={blog?.is_private}
                        diff={0} />
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

export default SharedBlogs
