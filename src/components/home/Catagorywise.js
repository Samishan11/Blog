import { Link } from 'react-router-dom'
import React, { useState , useEffect } from 'react'
import axios from 'axios'
import Skeletonn from '../loading/Skeleton'
import "./home.css"
import { SkeletonTheme } from 'react-loading-skeleton'
import { motion } from 'framer-motion';
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
const Catagorywise = ({userid }) => {
   
    // 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);

    useEffect(() => {
        const getblog = async () => {
            try {
                const getallBlog = await axios.get(`/get/allblog/Animal`);
                setData(getallBlog.data)
                setLoading(false)
                setError(false)
            } catch (error) {
                setLoading(true);
                setError(true)
            }
        }
        setTimeout(() => {
            getblog()
        }, 1000);
    }, [data])


    const like = (blogid) => {
        axios.put(`/blog/like/${blogid}`, {
            userid
        }).then(d => {
            const liked = data.map(item => {
                if (item._id === d._id) {
                    return d;
                } else {
                    return item;
                }
            })
            console.log('liked', d);
        }).catch(e => {
            console.log(e);
        })
        console.log(blogid);
    }
    const unlike = (blogid) => {
        axios.put(`/blog/unlike/${blogid}`, {
            userid
        }).then(d => {
            const liked = data.map(item => {
                if (item._id === d._id) {
                    return d;
                } else {
                    return item;
                }
            })
            console.log('liked', d);
        }).catch(e => {
            console.log(e);
        })
        console.log(blogid);
    }
    // paginaltion
    const [pagination, setPagination] = useState(3)
    const blog = data.slice(0, pagination)
    function loadMore() {
        setPagination(pagination + 3)
    }

    // hover effeect

    const hover = {
        scale: 0.9,
        color: 'red'
    }

    return (
        <>
            <div className="container">
                {/* <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-12 carousel">
                                    <img src="https://cdn.pixabay.com/photo/2012/06/19/10/32/owl-50267__340.jpg" className="img-fluid border rounded" alt="" />
                                    <div className="carousel-caption">
                                        <h5>Catagory Name</h5>
                                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum voluptatum sapiente corrupti temporibus consequuntur fugiat?</p>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-1 carousel">
                                    <img src="https://cdn.pixabay.com/photo/2018/03/06/22/57/portrait-3204843__340.jpg" className="img-fluid border rounded" alt="" />
                                    <div className="carousel-caption">
                                        <h5>Catagory Name</h5>
                                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum voluptatum sapiente corrupti temporibus consequuntur fugiat?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 my-auto" style={{ height: "560px" }}>
                            <div className="carousel" style={{ height: "100%" }}>
                                <img src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_960_720.jpg" style={{ height: "100%", objectFit: "cover" }} className="img-fluid border rounded" alt="" />
                                <div className="carousel-caption">
                                    <h5>Catagory Name</h5>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum voluptatum sapiente corrupti temporibus consequuntur fugiat?</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-12 carousel">
                                    <img src="https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519__340.jpg" className="img-fluid border rounded" alt="" />
                                    <div className="carousel-caption">
                                        <h5>Catagory Name</h5>
                                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum voluptatum sapiente corrupti temporibus consequuntur fugiat?</p>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-1 carousel">
                                    <img src="https://cdn.pixabay.com/photo/2015/03/27/13/16/maine-coon-694730__340.jpg" className="img-fluid border rounded" alt="" />
                                    <div className="carousel-caption">
                                        <h5>Catagory Name</h5>
                                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum voluptatum sapiente corrupti temporibus consequuntur fugiat?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/*  */}

                <div className="container mt-5 mb-3">
                    <h3 className='mx-2'>Recent Post</h3>
                    <div className="row">
                        <SkeletonTheme highlightColor='lightgray'>
                            {
                                loading ?
                                    <Skeletonn /> :
                                    blog.map((data, ind) => {
                                        return (
                                            <motion.div className="col-md-4" key={ind + 1}>
                                                <div className="profile-card-4 " >
                                                    <Link to={`/blog/${data._id}`}>
                                                        <img src={data.image} className="img img-responsive" />
                                                    </Link>
                                                    <div className="profile-content">
                                                        <div className="profile-name">
                                                            <p className="text-center">{data.title}</p>
                                                        </div>
                                                        <div className="profile-description">{data.description}</div>
                                                    </div>
                                                    {
                                                        userid ?
                                                            <div className="read-more d-flex mx-2">
                                                                {
                                                                    data.like.includes(userid) ?
                                                                        <>
                                                                            <form method="post">
                                                                                <h3 style={{ 'hover': 'scale' }} onClick={unlike.bind(this, data._id)}> <i className='fas fa-heart my-auto text-danger'></i></h3>
                                                                            </form>
                                                                        </> :
                                                                        <form method="post">
                                                                            <h3 onClick={like.bind(this, data._id)}> <i className='fas fa-heart my-auto '></i></h3>

                                                                        </form>
                                                                }
                                                            </div>
                                                            : null
                                                    }
                                                    <p className='mx-2'>Like {data.like.length}</p>

                                                    {/* <Link to={`/blog/${data._id}`} className="mx-3 p-2 text-light rounded text-start" style={{ textDecoration: 'none', background: 'rgb(81, 141, 177)' }}>Readmore</Link> */}
                                                </div>
                                            </motion.div>
                                        )
                                    })
                            }
                        </SkeletonTheme>
                    </div>
                </div>
                {
                    blog.length !== data.length ?
                        <button onClick={loadMore} className='btn btn-outline-primary my-2 d-block mx-auto'>Load More</button>
                        : <></>
                }
            </div>
        </>
    )
}

export default Catagorywise;
