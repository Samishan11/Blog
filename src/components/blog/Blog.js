import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
const Blog = ({ user ,error  }) => {
    // socket set up and add clients
  useEffect(() => {
    socket.emit("addClient", {
      userId: user,
      socketId: socket.id
    })
  }, []);
    //   
    let navigator = useNavigate();
    const blogid = useParams().blogid;
    // get blog detail
    const [blogd, setBlogd] = useState([]);
    useEffect(() => {
        const Blogdetail = async () => {
            const _blog = await axios.get(`/blog/${blogid}`)
            setBlogd(_blog.data)
        }
        Blogdetail()
    }, []);

    // delete blog 
    const deleteBlog = async () => {
        const _delete = await axios.delete(`/blog/delete/${blogid}`)
        if (_delete.data.message === "Blog deleted") {
            toast.success(_delete.data.message, { position: toast.POSITION.TOP_RIGHT })
            navigator("/")
        } else {
            toast.error(_delete.data.message, { position: toast.POSITION.TOP_RIGHT })
        }
    }
    // comment post using socket 
    const [text, setText] = useState("");
    const blog = blogd._id
    const commentPost = (e) => {
        e.preventDefault()
        const cmnt = socket.emit("commentPost", {
            user: user,
            blog: blog,
            text: text
        })
        // toast.success("Comment posted sucessfully", { position: toast.POSITION.TOP_RIGHT })
        document.getElementById("comment-form").reset()
    }
    //show comments 
    // const [showcomments, setShowcomments] = useState([]);
    // useEffect(()=>{
    //     socket.on('showcomments', (data)=>{
    //         showcomments =  [...showcomments , data ]
    //         console.log(data);
    //     })
    // },[])
    // console.log(showcomments);

    //show comments 
    const [showcomments, setShowcomments] = useState([]);
    useEffect(() => {
        const comments = async () => {
            const getComments = await axios.get(`/show/comment/${blog}`, {
                blog,
            })
            setShowcomments(getComments.data)
        }
        comments()
    })

    // delete commetn 
    // const commentid = showcomments._id
    const deleteComment = async (commentid) => {
        const deletecommetn_ = await axios.delete(`/delete/comment/${commentid}`, {
            commentid,
        })
    }

    return (
        <>
            <div className="contianer">
                <div className="container-fluid">
                    <div className="card">
                        <img src={blogd?.image} className="img-fluid" style={{ maxWidth: '100%', height: '80vh', objectFit: 'cover' }} alt="" />
                    </div>
                    <section className="site-section py-lg">
                        <div className="container">
                            <div className="row blog-entries element-animate main-content">
                                <div className="col-md-8">
                                    <div className="post-content-body py-3">
                                        <h4 className="text-primary">{blogd?.title}</h4>
                                        <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{blogd?.description}</p>
                                        <div className="row">
                                            <div className="col-md-6 my-2">
                                                <img src={blogd?.image} className="img-fluid" style={{ maxWidth: '100%', height: '40vh', objectFit: 'cover' }} alt="" />
                                            </div>
                                            <div className="col-md-6 my-2">
                                                <img src={blogd?.image} className="img-fluid" style={{ maxWidth: '100%', height: '40vh', objectFit: 'cover' }} alt="" />
                                            </div>
                                            <div className="col-md-6 my-2">
                                                <img src={blogd?.image} className="img-fluid" style={{ maxWidth: '100%', height: '40vh', objectFit: 'cover' }} alt="" />
                                            </div>
                                            <div className="col-md-6 my-2">
                                                <img src={blogd?.image} className="img-fluid" style={{ maxWidth: '100%', height: '40vh', objectFit: 'cover' }} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 py-5">
                                    <div className="post-body-content">
                                        <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                            {
                                                blogd.user?.image ?
                                                    <>
                                                        <img src={blogd.user?.image} height={150} width={150} style={{ borderRadius: '50%', objectFit: 'cover' }} alt="" />

                                                    </>
                                                    : <>
                                                        <img src="https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png" height={150} width={150} style={{ borderRadius: '50%', objectFit: 'cover' }} alt="" />
                                                    </>
                                            }
                                            <Link to={`/profile/${blogd?.user?._id}`} className="btn btn-outline-primary px-3 mt-3">Profile</Link>
                                            <p className="text-center pt-3" style={{ fontSize: '24px' }}>{blogd?.user?.username}</p>
                                            <p className="text-center">{blogd?.date}</p>
                                            <div>
                                                {
                                                    blogd?.user?._id === user ?
                                                        <>
                                                            <Link to={`/updateblog/${blogd._id}`} className="btn btn-outline-success mx-1"><i className="fas fa-pen" /></Link>
                                                            <button onClick={deleteBlog} className="btn btn-outline-danger mx-1"><i className="fas fa-trash" /></button>
                                                        </> :
                                                        <>
                                                        </>
                                                }
                                            </div>
                                            <div className="container mt-5">
                                                <p className="text-center" style={{ fontSize: '18px' }}>Catagory</p>
                                                <hr />
                                                <ul>
                                                    <Link to={'/Animal'} className="list-group-item"><a href className="nav-link">Animal</a></Link>
                                                    <li className="list-group-item"><a href className="nav-link">Nature</a></li>
                                                    <li className="list-group-item"><a href className="nav-link">Books</a></li>
                                                    <li className="list-group-item"><a href className="nav-link">Universe</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* comment post */}
                        <div className="container-fluid">
                            <div className="d-flex justify-content-center row">
                                <div className="col-md-8">
                                    {
                                        showcomments.length === 0 ?
                                            <h4 className="text-secondary m-4 ">No Comment to show</h4>
                                            : <h4 className="text-secondary m-4 ">Comments</h4>
                                    }
                                    <div className="d-flex flex-column comment-section">
                                        {/* comment post form */}
                                        {
                                            user ? <form id='comment-form' method="post" onSubmit={commentPost}>
                                                <div className="bg-light p-2">
                                                    <div className="d-flex flex-row align-items-start">
                                                        <textarea onChange={e => setText(e.target.value)} className="form-control ml-1 shadow-none textarea" />
                                                    </div>
                                                    <div className="mt-2 text-right">
                                                        <button className="btn btn-primary btn-sm shadow-none" type="submit">comment</button>
                                                    </div>
                                                </div>
                                            </form> : <></>
                                        }
                                        {/*  */}

                                        {
                                            showcomments.map((comment, ind) => {
                                                return (
                                                    <div className="bg-white mt-4 mb-3 p-2 shadow">
                                                        <div className="d-flex flex-row user-info" key={ind+1}>
                                                            {
                                                                comment.user?.image ?
                                                                    <img className="rounded-circle" src={comment.user.image} style={{ objectFit: 'cover' }} width={40} height={40} />
                                                                    : <img className="rounded-circle" src="https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png" style={{ objectFit: 'cover' }} width={40} height={40} />

                                                            }
                                                            <div className="d-flex flex-column justify-content-start mx-2">
                                                                <span className="d-block font-weight-bold name text-primary" style={{ fontWeight: 700, fontSize: '18px' }}>{comment.user?.username}</span>
                                                                <span className="date text-black-50" style={{ fontSize: '12px' }}>commented at -
                                                                    {comment.date}1</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2">
                                                            <p className="comment-text">{comment.text}</p>
                                                        </div>
                                                        <div className="bg-white">
                                                            <div className="d-flex flex-row fs-12">
                                                                
                                                                <div className="like p-2 cursor">
                                                                    <i className="fas fa-thumbs-up text-danger" />
                                                                </div>
                                                                <div className="like p-2 cursor">
                                                                    <i className="fa fa-comment text-danger" />
                                                                </div>
                                                                <div className="like p-2 cursor">
                                                                    <i className="fa fa-share text-danger" />
                                                                </div>
                                                                {
                                                                    comment.user._id === user ?
                                                               <>
                                                                <div className="like p-2 cursor">
                                                                    <i onClick={deleteComment.bind(this,comment._id)} className="fas fa-trash text-danger" />
                                                                </div>
                                                               </>:<></>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
};

export default Blog;
