import axios from 'axios'
import { createUrl } from './utils'


export async function uploadSingleImage(image) {
    const url = createUrl('blog/uploadImage')

    try {
        const body = {image}
        const response = await axios.post(url,body, {
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}



export async function createBlog(title, content, pic, category,is_private) {
    const url = createUrl('blog/create-blog')

    try {
        const body = {title, content, pic, category,is_private}
        const response = await axios.post(url,body, {
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}


export async function updateBlog(id,title, content, pic, category,is_private) {
    const url = createUrl('blog/update-blog/'+id)

    try {
        const body = {title, content, pic, category,is_private}
        const response = await axios.put(url,body, {
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}


export async function getBlogs() {
    const url = createUrl('blog/get-blogs')

    try {
        const response = await axios.get(url, {
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}


export async function markBlogPrivate(id) {
    const url = createUrl('blog/private/' + id)

    try {
        const response = await axios.patch(
            url,
            {},
            {
                headers: {
                    token: localStorage['token'],
                },
            }
        )
        return response.data
    } catch (ex) {
        return { status: 'error', error: ex }
    }
}

export async function markBlogPublic(id) {
    const url = createUrl('blog/public/' + id)

    try {
        const response = await axios.patch(
            url,
            {},
            {
                headers: {
                    token: localStorage['token'],
                },
            }
        )
        return response.data
    } catch (ex) {
        return { status: 'error', error: ex }
    }
    
}



export async function getSharedBlogs() {
    const url = createUrl('blog/shared')

    try {
        const response = await axios.get(url, {
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (ex) {
        return { status: 'error', error: ex }
    }
}

export async function getPublicBlogs() {
    const url = createUrl('blog/public')

    try {
        const response = await axios.get(url, {
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (ex) {
        return { status: 'error', error: ex }
    }
}

export async function getBlogUser(id) {
    const url = createUrl('blog/get-user/' + id)

    try {
        const response = await axios.get(url, {
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}


export async function deleteOneBlog(id) {
    const url = createUrl('blog/' + id)
    try {
        const response = await axios.delete(url, {
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}

export async function getOneBlog(id){
    const url = createUrl("blog/get-one-blog/"+id)
    try {
        const response = await axios.get(url, {
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}

export async function shareWithUser(blog_id , shared_with_user_id){
    const url = createUrl("blog/share-blog/")
    const body = {
        blog_id,
        shared_with_user_id
    }
    try {
        const response = await axios.post(url, body,{
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}


export async function unShareUser(blog_id , shared_with_user_id){
    const url = createUrl("blog/unShared/")
    const body = {
        blog_id,
        shared_with_user_id
    }
    try {
        const response = await axios.post(url,body,{
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}

export async function clearSharedList(){
    const url = createUrl("blog/clear-all/")

    try {
        const response = await axios.put(url,{},{
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}


export async function updateUserAdded(blog_id){
    const url = createUrl("blog/update-add-user/")

    const body = {blog_id}
    try {
        const response = await axios.put(url,body,{
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}


export async function getSearchQuestion(text) {
    const url = createUrl('blog/search/' + text)
    try {
        const response = await axios.get(url, {
            headers: {
                token: localStorage['token'],
            },
        });
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}

export async function getSearchMyBlogs(text) {
    const url = createUrl('blog/my-search/' + text)
    try {
        const response = await axios.get(url, {
            headers: {
                token: localStorage['token'],
            },
        });
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}

export async function getSearchSharedBlogs(text) {
    const url = createUrl('blog/shared-search/' + text)
    try {
        const response = await axios.get(url, {
            headers: {
                token: localStorage['token'],
            },
        });
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}
