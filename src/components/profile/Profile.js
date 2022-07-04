import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import io from "socket.io-client";
let socket = io.connect("http://localhost:5000");
const Profile = ({ currentuser }) => {
    // 
    useEffect(() => {
        socket.emit("addClient", {
            userId: user,
            socketId: socket.id
        })
    }, []);
    // 
    const userId = useParams().userId;
    // 
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");
    // get user info 
    const [user, setUserdata] = useState([]);
    useEffect(() => {
        const userData = async () => {
            const user = await axios.get(`/profile/${userId}`)
            setUserdata(user.data)
            setUsername(user.data.username)
            setEmail(user.data.email)
            setBio(user.data.bio)
        }
        userData();
    }, [userId]);

    // delete user

    const userDelete = async (e) => {
        e.preventDefault();
        const _userDelete = await axios.delete(`/user/delete/${userId}`, {
            userId
        })
        localStorage.removeItem("token")
        window.location.href = "/"
        console.log(_userDelete);
    }

    // get userblogs
    const [userblog, setUserblog] = useState([]);
    useEffect(() => {
        const userBlog = async () => {
            const _blog = await axios.get(`/userblog/${userId}`)
            setUserblog(_blog.data)
        }
        userBlog()
    }, [userId]);
    var size = 4;
    var item = userblog.slice(0, size)

    // update user profile pic 
    function hello() {
        document.getElementById("fileimg").click()
    }

    // const profilePic = async (e) => {
    //     // e.preventDefault()
    //     const fd = new FormData();
    //     fd.append('image', image)
    //     const uploadprofile_ = await axios.put('/profilepic/update', fd)
    //     if (uploadprofile_.data.message === "Profile Pic Update Sucessfully") {
    //         toast.success(uploadprofile_.data.message, { position: toast.POSITION.TOP_RIGHT })
    //         window.location.href = `/profile/${userId}`
    //     } else (
    //         toast.error(uploadprofile_.data.message, { position: toast.POSITION.TOP_RIGHT })
    //     )
    // }



    // update user detail
    const imgChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const updateDetail = async (e) => {
        e.preventDefault()
        const fd = new FormData();
        fd.append('username', username)
        fd.append('email', email)
        fd.append('bio', bio)
        fd.append('image', image)
        const _detail = await axios.put(`/user/update/${userId}`, fd)
        if (_detail.data.message === "Profile Update Sucessfully") {
            toast.success(_detail.data.message, { position: toast.POSITION.TOP_RIGHT })
        } else {
            toast.error(_detail.data.message, { position: toast.POSITION.TOP_RIGHT })
        }
    }

    // // change password
    const [oldpassword, setOldpassword] = useState("");
    const [password, setPassword] = useState("");
    const Changepassword_ = async (e) => {
        e.preventDefault()
        const passUpdate = await axios.put('/change/password', {
            password,
            oldpassword
        })
        if (passUpdate.data.message === 'Password update sucessfully') {
            toast.success(passUpdate.data.message, { position: toast.POSITION.TOP_LEFT })
        } else {
            toast.error(passUpdate.data.message, { position: toast.POSITION.TOP_LEFT })
        }
    }

    // follow user
    const followUser_ = (e) => {
        e.preventDefault()
        socket.emit('follow', {
            follower: currentuser,
            following: userId
        })
    }
    // unfollow user
    const unfollowUser_ = (e) => {
        e.preventDefault()
        socket.emit('unfollow', {
            follower: currentuser,
            following: userId
        })
    }

    // filter follower
    const [filterfollower, setFilterfollower] = useState({});
    const filterFollower = () => {
        axios.get(`/filter/follower/${userId}`, {
            following: userId
        }).then(function (result) {
            setFilterfollower(result.data)
        })
    }
    useEffect(() => {
        filterFollower()
    });

    // show total followers 
    const [followersshow, setfollowersshow] = useState([]);
    useEffect(() => {
        const showFollowers = () => {
            axios.get(`/show/followers/${userId}`, { userId }).then(function (result) {
                setfollowersshow(result.data)
            })
        }
        showFollowers()
    })

    // show total following users
    const [followingshow, setfollowingshow] = useState([]);
    useEffect(() => {
        const showFollowers = () => {
            axios.get(`/show/followings/${userId}`, { userId }).then(function (result) {
                setfollowingshow(result.data)
            })
        }
        showFollowers()
    })


    return (
        <>
            <section className=" gradient-custom-2">
                <div className="container pt-4">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col col-lg-9 col-xl-7">
                            <div className="container">
                                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                        <div className="user-profile position-relative">
                                            <form action="post" id='profileUpdate'>
                                                <input type="file" hidden accept="image/*" name="" id="" />
                                            </form>
                                            <div className="mb-3 position-relative">
                                                <input className='d-none' type="hidden" onChange={imgChange} id='fileimg' type="file" />
    
                                                {
                                                    user.image ? (
                                                        <img src={user?.image} alt="Generic placeholder image" className="img-fluid rounded-circle d-block mx-auto img-thumbnail mt-4 mb-2" style={{ width: '150px', objectFit: "cover", height: "150px", zIndex: 1 }} />
                                                    ) :
                                                        <img src="https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png" alt="Generic placeholder image" className="img-fluid rounded-circle d-block mx-auto img-thumbnail mt-4 mb-2" style={{ width: '150px', objectFit: "cover", height: "150px", zIndex: 1 }} />
                                                }
                                                {/* <button onClick={profilePic}>save</button> */}
                                            </div>
                                        </div>
                                        <div className="container d-flex">
                                            {/*  */}
                                            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title text-dark" id="exampleModalLabel">Update Profile</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                        </div>
                                                        <div className="modal-body">
                                                            <form method='post' onSubmit={updateDetail} >
                                                                <div className="mb-3 position-relative">
                                                                    <input className='d-none' type="hidden" onChange={imgChange} id='fileimg' type="file" />
                                                                    <i onClick={hello} className='fas bg-primary rounded p-1 fa-pen text-light position-absolute' style={{ top: "70%", fontSize: "16px", left: "58%" }}></i>
                                                                    {
                                                                        image ? (
                                                                            <img src={URL.createObjectURL(image)} alt="Generic placeholder image" className="img-fluid rounded-circle d-block mx-auto img-thumbnail mt-4 mb-2" style={{ width: '150px', height: "150px", zIndex: 1 }} />
                                                                        ) :
                                                                            <img defaultValue={image} src={user?.image} alt="Generic placeholder image" className="img-fluid rounded-circle d-block mx-auto img-thumbnail mt-4 mb-2" style={{ width: '150px', height: "150px", zIndex: 1 }} />
                                                                    }
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label htmlFor="recipient-name" className="col-form-label text-dark">Username:</label>
                                                                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="recipient-name" />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label htmlFor="recipient-name text-dark" className="col-form-label">Email:</label>
                                                                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="recipient-name" />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label htmlFor="message-text text-dark" className="col-form-label">Add Bio:</label>
                                                                    <textarea value={bio} onChange={e => setBio(e.target.value)} className="form-control" id="message-text" />
                                                                </div>
                                                                <button type="submit" className="btn btn-outline-primary" >Update</button>
                                                            </form>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                currentuser ?
                                                    userId === currentuser ?
                                                        <>
                                                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" id='updatebtn' type="button" className="btn btn-outline-dark btn-sm mx-2" data-mdb-ripple-color="dark">
                                                                <i className="fas fa-pen text-primary" />
                                                            </button>
                                                            <button onClick={userDelete} type="button" className="btn btn-outline-dark btn-sm mx-2" data-mdb-ripple-color="dark">
                                                                <i className="fas fa-trash text-danger" />
                                                            </button>
                                                        </> :
                                                        <>
                                                            {
                                                                currentuser !== filterfollower?.follower ?
                                                                    <button onClick={followUser_} className='btn btn-outline-success rounded px-2'>Follow</button> :
                                                                    <button onClick={unfollowUser_} className='btn btn-outline-danger rounded px-2'>UnFollow</button>
                                                            }
                                                        </>
                                                    : <></>
                                            }
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '130px', width: '100%' }}>
                                        <h5 className="mx-1">{user?.username}</h5>
                                        <span className="mx-1">{user?.email}</span>
                                    </div>
                                </div>
                                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <div>
                                            <p className="mb-1 h5">{userblog?.length}</p>
                                            <p className="small text-muted mb-0">Post</p>
                                        </div>
                                        <div className="px-3">
                                            <p className="mb-1 h5">{followersshow?.length}</p>
                                            <p className="small text-muted mb-0">Followers</p>
                                        </div>
                                        <div>
                                            <p className="mb-1 h5">{followingshow?.length}</p>
                                            <p className="small text-muted mb-0">Following</p>
                                        </div>
                                    </div>

                                    <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalToggleLabel">Update Password</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <form method="post" >
                                                    <div class="modal-body">
                                                        <div className="mb-3">
                                                            <label htmlFor="recipient-name" className="col-form-label">Old Password:</label>
                                                            <input onChange={e => setOldpassword(e.target.value)} type="password" className="form-control" id="recipient-name" />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="recipient-name" className="col-form-label">New Password:</label>
                                                            <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="recipient-name" />
                                                        </div>
                                                        <button onClick={Changepassword_} className='mx-2 btn btn-outline-primary' type="submit">Update</button>
                                                    </div>
                                                    <div class="modal-footer">
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        userId === currentuser ?
                                            <span className='btn' data-bs-toggle="modal" href="#exampleModalToggle" role="button" style={{ cursor: "pointer" }}><u>Change Password</u></span>
                                            : <></>
                                    }
                                </div>
                                <div className='mx-1'>
                                    {
                                        user?.bio ? <><h5> <u>Bio</u> </h5> {user.bio}</> : <></>
                                    }
                                </div>

                                <div className="card-body p-4 text-black">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0">Recent Posts</p>
                                        {
                                            userblog.length > 4 ?
                                                <Link to={`/user/blogs/${userId}`} className="mb-0"><a href="#!" className="text-muted">Show all</a></Link>
                                                :
                                                <></>
                                        }
                                    </div>
                                    <div className="row g-2">
                                        {
                                            item?.map((blog, index) => {
                                                return (
                                                    <div className="col-md-6 mb-2" key={index + 1}>
                                                        <Link to={`/blog/${blog._id}`}>
                                                            <img src={blog.image} alt="image 1" style={{ height: "300px", width: "300px" }} className="w-100 rounded-3" />
                                                        </Link>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Profile;
