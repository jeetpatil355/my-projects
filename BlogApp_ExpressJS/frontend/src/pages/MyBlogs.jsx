import React, { useEffect } from 'react'
import { getBlogs, markBlogPublic, markBlogPrivate, deleteOneBlog, getOneBlog, getSearchMyBlogs } from "../services/blog"
import { toast } from 'react-toastify';
import { useState } from 'react';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import Search from '../components/Search';
import { renderDate } from '../services/renderDate';
import { getSpecificUserName } from "../services/user"


const MyBlogs = ({ name , setPage}) => {

    const [blogs, setBlogs] = useState([])
    const [users, setUsers] = useState([])
    const [text, setText] = useState("")

    const navigate = useNavigate()

    const getAllNames = async (data) => {
        const usersArray = []
        for (let i = 0; i < data.length; i++) {
            const name = await getSpecificUserName(data[i])
            usersArray.push(name.data)
        }
        setUsers(usersArray)
    }

    const getMyBlogs = async () => {
        try {
            const result = await getBlogs();
            if (result['status'] === 'success') {

                const data = result["data"].result.map((obj) => {
                    return {
                        ...obj, publish_date: renderDate(obj.publish_date)
                    }
                })
                setBlogs(data)

                const dataUser = result["data"].result.map((obj) => {
                    return obj.user_id
                })
                getAllNames(dataUser)

            } else {
                toast.error(result['data'])
            }
        } catch (error) {
            return toast.error(error.message)
        }
    }

    const onMarkPublicBlog = async (id) => {
        const result = await markBlogPublic(id)
        if (result['status'] === 'success') {
            toast.success('Successfully marked this blog as public')
            if (text.length === 0) {
                getMyBlogs()
            } else {
                getSearch(text)
            }
        } else {
            toast.error(result['error'])
        }
    }

    const onMarkPrivateBlog = async (id) => {
        const result = await markBlogPrivate(id)
        if (result['status'] === 'success') {
            toast.success('Successfully marked this blog as private')
            if (text.length === 0) {
                getMyBlogs()
            } else {
                getSearch(text)
            }
        } else {
            toast.error(result['error'])
        }
    }

    const onDeleteBlog = async (id) => {
        const result = await deleteOneBlog(id)
        if (result['status'] === 'success') {
            toast.success(result['data'])
            if (text.length === 0) {
                getMyBlogs()
            } else {
                getSearch(text)
            }

        } else {
            toast.error(result['error'])
        }
    }

    const onUpdateBlog = async (id) => {
        const result = await getOneBlog(id)
        if (result['status'] === 'success') {
            localStorage.setItem("updateBlog", JSON.stringify(result["data"][0]))
            navigate("/update-blogs")
        } else {
            toast.error(result['error'])
        }

    }

    const onShareBlog = async (id) => {
        const result = await getOneBlog(id)
        if (result['status'] === 'success') {
            localStorage.setItem("shareBlog", JSON.stringify(result["data"][0]))
            navigate("/share-blog")
        } else {
            toast.error(result['error'])
        }
    }



    const getSearch = async (text) => {
        const result = await getSearchMyBlogs(text)
        if (result['status'] === 'success') {
            const data = result["data"].result.map((obj) => {
                return {
                    ...obj, publish_date: renderDate(obj.publish_date)
                }
            })
            setBlogs(data)

            const dataUser = result["data"].result.map((obj) => {
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
            getMyBlogs()
        }
        setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text])
    return (
        <>
            <Search text={text} handleChange={handleChange} title={"Search My Blogs"} field={"Search Blogs"} />
            <div className="container mt-5">
                <div className="row">
                    <section className="py-3 py-md-5 py-xl-8">
                        <div className="container overflow-hidden">
                            <div className="row gy-4 gy-lg-0">
                                {
                                    blogs?.map((blog, index) => {
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
                                                diff={1}
                                                onMarkPublicBlog={onMarkPublicBlog}
                                                onMarkPrivateBlog={onMarkPrivateBlog}
                                                onDeleteBlog={onDeleteBlog}
                                                onUpdateBlog={onUpdateBlog}
                                                onShareBlog={onShareBlog}
              
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

export default MyBlogs
