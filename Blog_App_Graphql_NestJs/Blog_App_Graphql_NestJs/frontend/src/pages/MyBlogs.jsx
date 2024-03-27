import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { useState } from 'react';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import Search from '../components/Search';
import { renderDate } from '../services/renderDate';
import { GET_BLOGS_MUTATION, MARK_PUBLIC_MUTATION, MARK_PRIVATE_MUTATION, ONE_BLOG_MUTATION, DELETE_BLOG_MUTATION, SEARCH_MY_BLOG_MUTATION } from '../mutations/blog';
import { useMutation } from '@apollo/client';

const MyBlogs = ({ setPage }) => {

    const [blogs, setBlogs] = useState([])
    const [text, setText] = useState("")
    const [getBlogs] = useMutation(GET_BLOGS_MUTATION);
    const [markBlogPublic] = useMutation(MARK_PUBLIC_MUTATION);
    const [markBlogPrivate] = useMutation(MARK_PRIVATE_MUTATION);
    const [getOneBlog] = useMutation(ONE_BLOG_MUTATION);
    const [deleteOneBlog] = useMutation(DELETE_BLOG_MUTATION);
    const [getSearchMyBlogs] = useMutation(SEARCH_MY_BLOG_MUTATION);

    const navigate = useNavigate()

    const getMyBlogs = async () => {
        try {
            const id = localStorage.getItem("id")
            const result = await getBlogs({
                variables: {
                    id
                },
            });
            if (result.data.getBlogsByUserId.status === 'success') {

                const data = result["data"].getBlogsByUserId.data.map((obj) => {
                    return {
                        ...obj, publish_date: renderDate(obj.publish_date)
                    }
                })
                setBlogs(data)
            } else {
                toast.error(result['data'].getBlogsByUserId.data)
            }
        } catch (error) {
            return toast.error(error.message)
        }
    }

    const onMarkPublicBlog = async (bid) => {
        const uid = localStorage.getItem("id")
        const result = await markBlogPublic({
            variables: {
                bid,
                uid,
            },
        });
        if (result.data.markBlogAsPublic.status === 'success') {
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

    const onMarkPrivateBlog = async (bid) => {
        const uid = localStorage.getItem("id")
        const result = await markBlogPrivate({
            variables: {
                bid,
                uid,
            },
        });
        if (result.data.markBlogAsPrivate.status === 'success') {
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
        const result = await deleteOneBlog({
            variables: {
                id
            },
        });
        if (result['data'].deleteBlogById.status === 'success') {
            toast.success(result['data'].deleteBlogById.data)
            if (text.length === 0) {
                getMyBlogs()
            } else {
                getSearch(text)
            }

        } else {
            toast.error(result['data'].deleteBlogById.data)
        }
    }

    const onUpdateBlog = async (id) => {
        const result = await getOneBlog({
            variables: {
                id
            },
        });
        localStorage.setItem("updateBlog", JSON.stringify(result["data"].getBlogById))
        navigate("/update-blogs")
    }

    const onShareBlog = async (id) => {
        const result = await getOneBlog({
            variables: {
                id
            },
        });
        const res = {
            blog_id: result.data.getBlogById.blog_id,
            title: result.data.getBlogById.title,
            content: result.data.getBlogById.content,
            file_path: result.data.getBlogById.file_path,
            category_name: result.data.getBlogById.category_name,
            is_private: result.data.getBlogById.is_private,
            publish_date: result.data.getBlogById.publish_date
        }
        localStorage.setItem("shareBlog", JSON.stringify(res))
        navigate("/share-blog")
    }



    const getSearch = async (text) => {
        const id = parseInt(localStorage.getItem("id"))
        const result = await getSearchMyBlogs({
            variables: {
                text,
                id
            },
        });
        if (result['data'].searchBlogsByTextForUser.status === 'success') {
            const data = result["data"].searchBlogsByTextForUser.data.map((obj) => {
                return {
                    ...obj, publish_date: renderDate(obj.publish_date)
                }
            })
            setBlogs(data)
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
                                                blog={blog}
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
