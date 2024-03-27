import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import React, { useNavigate } from 'react-router-dom';
import {renderDate} from "../services/renderDate"
import {getSpecificUserName} from "../services/user"

const Display = ({page}) => {
    const navigate = useNavigate()
    const [blog, setBlog] = useState({})
    const [name, setName] = useState("")
    const [date, setDate] = useState("")

    const goBack = () => {
        if(page === 0){
            navigate("/")
        }else if(page === 1){
            navigate("/my-blogs")
        }else if(page === 2){
            navigate("/shared-blogs")
        }else{
            navigate("/")
        }
        localStorage.removeItem("shareBlog")
    };

    const getName = async(data)=>{
        const username = await getSpecificUserName(data.user_id)
        setName(username.data)
    }


    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("shareBlog"))
        setBlog(data)
        const newDate = renderDate(data.publish_date)
        setDate(newDate)
        getName(data)
    },[])
    return (
        <div className='container'> 
            <Button
                type="submit"
                onClick={goBack}
                variant="contained"
                sx={{ m: 3 }}
            >
                <span className="material-symbols-outlined">
                    arrow_back
                </span>
            </Button>
            <hr />

            <div className="card">
                    <div className="card-body">
                        <h5 className="card-title"><b>Title : </b>{blog.title}</h5>
                        <p className="card-text"><b>Content :</b> {blog.content}</p>
                        <p className="card-text"><b>Category : </b> {blog.category_name}</p>
                        <hr />
                        <p className="card-text"><b>Published At : </b> {date}</p>
                        <p className="card-text"><b>Created By : </b> {name}</p>
                    </div>
            </div>
        </div>
    )
}

export default Display
