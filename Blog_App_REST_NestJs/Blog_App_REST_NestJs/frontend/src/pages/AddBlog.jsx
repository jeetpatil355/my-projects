import React, { useRef } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Form } from "react-bootstrap";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { toast } from "react-toastify"
import { uploadSingleImage, createBlog } from "../services/blog"
import { useNavigate } from 'react-router-dom';
import { blogCategories } from "../data"

const defaultTheme = createTheme();

const AddBlog = () => {

    const navigate = useNavigate()

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [pic, setPic] = useState("");
    const [category, setCategory] = useState("0");
    const [is_private, setIs_private] = useState(0)

    const ref = useRef();

    const clearField = () => {
        setTitle("")
        setContent("")
        setPic("")
        setCategory("0")
        setIs_private(0)
        ref.current.value = "";
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadImg = async (event) => {
        try {
            event.preventDefault()
            const files = event.target.files;

            if (files.length === 1) {
                const image = await convertBase64(files[0]);
                const result = await uploadSingleImage(image);
                if (result['status'] === 'success') {
                    toast.success(result["data"].message)
                    setPic(result["data"].result.secure_url)
                } else {
                    toast.error(result['data'])
                }
            } else {
                toast.error("uploading...")
            }
        } catch (er) {
            return toast.error(er.message)
        }
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault()

            if (pic.length === 0) {
                toast.error("uploading...")
            } else {
                const result = await createBlog(title, content, pic, category, is_private)

                if (result['status'] === 'success') {
                    toast.success(result["data"])
                    navigate('/add-blogs')
                } else {
                    toast.error(result['data'])
                }
                clearField()
            }
        } catch (er) {
            return toast.error(er.message)
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Create Blog
                    </Typography>
                    <Box sx={{ mt: 3 }} className="col-12">
                        <div className="mb-3 col">
                            <label for="title" className="form-label">Title</label>
                            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" id="title" name="title" placeholder="Enter Title" />
                        </div>
                        <div className="mb-3">
                            <label for="content" className="form-label">Content</label>
                            <textarea className="form-control" onChange={(e) => setContent(e.target.value)} value={content} placeholder="Enter Blog Content" id="content" name="content" rows="3"></textarea>
                        </div>

                        <Form.Group className="mb-3">
                            <Form.Label>Blog Picture</Form.Label>
                            <Form.Control
                                onChange={uploadImg}
                                ref={ref}
                                id="custom-file"
                                name="custom-file"
                                type="file"
                                label="Upload Blog Picture"
                                custom
                            />
                        </Form.Group>

                        <div className="mb-3">
                            <label for="category" name="category" className="form-label">Category</label>
                            <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option selected value="0">Select Category</option>
                                {
                                    blogCategories.map((blog) => {
                                        return (
                                            <>
                                                <option value={blog}>{blog}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-outline mb-3">
                            <label className="form-label float-start " for="form2Example1">Mark Private</label>
                            <select
                                className="form-select mb-4"
                                aria-label="Default select example"
                                value={is_private}
                                onChange={(e) => setIs_private(e.target.value)}
                            >
                                <option selected value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default AddBlog
