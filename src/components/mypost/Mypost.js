import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from "../loading/Skeleton"
import { SkeletonTheme } from 'react-loading-skeleton'
import "./mypost.css"
const Mypost = () => {
    const userId = useParams().userId;
    // get userblogs
    const [userblog, setUserblog] = useState([]);
    const [loading, setloading] = useState(true);
    useEffect(() => {
        const userBlog = async () => {
            try {
                const _blog = await axios.get(`/userblog/${userId}`)
                setUserblog(_blog.data)
                setloading(false)
            } catch (error) {
                setloading(true)
            }
        }
        setTimeout(()=>{
            userBlog()
        },1000)
    }, [userId]);


    return (
        <>
            <div className="container mt-5 mb-3">
                {/* <h3 className='mx-2'>Posts</h3> */}
                <div className="row">
                    <SkeletonTheme highlightColor='lightgray'>
                        {
                            loading ?
                                <Skeleton /> :
                                userblog.map((data, ind) => {
                                    return (
                                        <div className="col-md-4" key={ind + 1}>
                                            <div className="profile-card-4 ">
                                                <img src={data.image} className="img img-responsive" />
                                                <div className="profile-content">
                                                    <div className="profile-name">
                                                        <p className="text-center">{data.title}</p>
                                                    </div>
                                                    <div className="profile-description">{data.description}</div>
                                                </div>
                                                <div className="read-more my-3">
                                                    <Link to={`/blog/${data._id}`} className="mx-3 p-2 text-light rounded text-start" style={{ textDecoration: 'none', background: 'rgb(81, 141, 177)' }}>Readmore</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </SkeletonTheme>
                </div>
            </div>
        </>
    )
};

export default Mypost;
