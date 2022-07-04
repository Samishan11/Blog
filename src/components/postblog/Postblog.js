import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Postblog = () => {

    let navigator = useNavigate();

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
    // post blog
    const onSubmit = async(e)=>{
        e.preventDefault();
        const fd = new FormData();
        fd.append('image', image)
        fd.append('title', title)
        fd.append('description', description)
        fd.append('catagory',catagory)
        try {
            const _postBlog = await axios.post("/blog/post",fd);
        if(_postBlog.data.message === "Blog Post Sucessfully"){
            toast.success(_postBlog.data.message ,{position:toast.POSITION.TOP_RIGHT });
            document.getElementById("_form").reset()
            navigator("/")
        }else{
            toast.error(_postBlog.data.message ,{position:toast.POSITION.TOP_RIGHT });
        }
        console.log(_postBlog);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="container my-5">
                <h3 className="text-center">Add a blog</h3>
                <div className="row">
                    <div className="col-md-12 col-md-offset-2">
                        {image && (
                            <img
                                id="img"
                                src={URL.createObjectURL(image)}
                                className="img-fluid my-3"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                                alt="img" />
                        )}
                        <form id='_form' method='post' onSubmit={onSubmit}>
                            <div className="form-group ">
                                <input
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
                                <input type="text" onChange={e => setTitle(e.target.value)} className="form-control" name="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">
                                    Catagory <span className="require">*</span>
                                </label>
                                <select className="form-select" onChange={e => setCatagory(e.target.value)} name='catagory' aria-label="Default select example">
                                    <option selected>Open this select menu</option>
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
                                    defaultValue={""}
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
    )
};

export default Postblog;
