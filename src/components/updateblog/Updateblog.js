import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Updateblog = () => {
    let navigator = useNavigate()
    const { blogid } = useParams()
    const [blogdd, setblogdd] = useState([]);
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [catagory, setCatagory] = useState("");
    // preview img before upload
    const imgChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };
    const updateblog = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        if(!image){
            fd.append('title', title)
            fd.append('description', description)
            fd.append('catagory', catagory)
        }else{
            fd.append('image', image)
            fd.append('title', title)
            fd.append('description', description)
            fd.append('catagory', catagory)

        }
        
        const _updateBlog = await axios.put(`/blog/update/${blogid}`, fd)
        console.log(_updateBlog);
        if (_updateBlog.data.message === "Blog update sucessfully") {
            toast.success(_updateBlog.data.message, { position: toast.POSITION.TOP_RIGHT })
            navigator('/')
        } else {
            toast.error(_updateBlog.data.message, { position: toast.POSITION.TOP_RIGHT })
        }
    }

    // get blog detail
    // const [blogd, setBlogd] = useState([]);
    useEffect(() => {
        const Blogdetail = async () => {
            const _blog = await axios.get(`/blog/${blogid}`)
            setblogdd(_blog.data)
            // setImage(_blog.data.image)
            setTitle(_blog.data.title)
            setDescription(_blog.data.description)
            setCatagory(_blog.data.catagory)

        }
        Blogdetail()
    }, []);


    return (
        <>
            <div className="container my-5">
                <h3 className="text-center">Update your blog</h3>
                <div className="row">
                    <div className="col-md-12 col-md-offset-2">
                        {image ? (
                            <img
                                id="img"
                                src={URL.createObjectURL(image)} 
                                className="img-fluid my-3 mx-auto d-block"
                                style={{
                                    height:"400px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                                alt="img" />
                        )
                            : <img
                                id="img"
                                
                                src={blogdd?.image}
                                className="img-fluid my-3 mx-auto d-block"
                                style={{
                                    height:"400px",
                                    width:"30%",
                                    display: "flex",
                                    objectFit:"cover",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                                alt="img" />
                        }
                        <form id='_form' method='post' onSubmit={updateblog}>
                            <div className="form-group ">
                                <input
                                value={image.url}
                                    onChange={imgChange}
                                    id="img_field"
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    name="image"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">
                                    Title <span className="require">*</span>
                                </label>
                                <input value={title} type="text" onChange={e => setTitle(e.target.value)} className="form-control" name="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">
                                    Catagory <span className="require">*</span>
                                </label>
                                <select className="form-select" onChange={e => setCatagory(e.target.value)} name='catagory' aria-label="Default select example">
                                    <option selected value={catagory}>{catagory}</option>
                                    <option value={"Nature"}>Nature</option>
                                    <option value={"Animal"}>Animal</option>
                                    <option value={"Travel"}>Travel</option>
                                    <option value={"Universe"}>Universe</option>
                                    <option value={"Food"}>Food</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    onChange={e => setDescription(e.target.value)}
                                    rows={5}
                                    className="form-control"
                                    name="description"
                                    value={description}
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-outline-success mt-2 px-5">
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Updateblog;
