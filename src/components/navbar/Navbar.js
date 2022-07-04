import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import io from "socket.io-client";
import humanizeDuration from 'humanize-duration';
const Navbar = ({ user, socket }) => {
    // logout 
    function logout() {
        localStorage.removeItem("token")
        window.location.href = "/"
    }
    useEffect(() => {
        socket.emit("addClient", {
            userId: user,
            socketId: socket.id
        })
    }, []);

    // get user info 
    const [userdata, setUserdata] = useState([]);
    // console.log(user);
    const userId = user?.userId
    useEffect(() => {
        const userData = async () => {
            const user = await axios.get(`/profile/${userId}`)
            setUserdata(user.data)
        }
        userData();
    }, [user]);

    // get notifications
    const [notification, setNotification] = useState([]);
    // useEffect(() => {
    //   socket.on('notification',(data)=>{
    //     notification = [...notification, data]
    //   })
    // }, []);
    useEffect(() => {
        axios.get(`/notifications/${user}`).then((res) => {
            setNotification(res.data)
        })
    })

    // clearnotification
    const cleatNotification = async (e) => {
        const cleatNotify = await axios.delete(`/clearnotification/${user}`)
        setNotification()
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link style={{ fontWeight: "w-500" }} className="navbar-brand d-flex" to="/">
                        <h5>sBlog</h5>
                        <h5 style={{ color: "red" }} >App</h5>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active px-3" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            {
                                user ?
                                    <li className="nav-item">
                                        <Link className="nav-link px-3" to="/postblog">
                                            Add Blog
                                        </Link>
                                    </li> : <></>
                            }
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle px-3"
                                    to="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Catagory
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                    <li>
                                        <Link className="dropdown-item" to="/Animal">
                                            Animal
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="#">
                                            Nature
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="#">
                                            Travel
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            {

                                user ?
                                    <li className="nav-item">
                                        <Link className="nav-link px-3" to={`/user/blogs/${user.userId}`}>
                                            My Post
                                        </Link>
                                    </li>
                                    : <></>

                            }
                            {/* <li className='mx-5'>
                            <form class="d-flex" >
                                <input className="form-control mx-2" name='name' type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                            </li> */}
                        </ul>
                        <div className="position-relative">
                            {
                                user ? <button onClick={logout} className="mx-1 btn btn-outline-danger">Logout</button>
                                    : <>
                                        <Link to="/login" className="mx-1 btn btn-outline-success">Signin</Link>
                                        <Link to="/register" className="mx-1 btn btn-outline-success">Signup</Link>
                                    </>
                            }
                            {
                                user ?
                                    <>
                                        {
                                            notification?.length === 0 ?
                                                <i role="button" data-bs-toggle="dropdown"
                                                    aria-expanded="false" id='bell' style={{ cursor: "pointer" }} className='fas fa-bell text-muted mx-5'></i> :
                                                <i role="button" data-bs-toggle="dropdown"
                                                    aria-expanded="false" id='bell' style={{ cursor: "pointer" }} className='fas fa-bell text-danger mx-5'>{notification?.length}</i>
                                        }
                                        <ul style={{ left: "-40%", zIndex: "200", minHeight: "400px", minWidth: "20vw", position: "absolute" }} className="dropdown-menu mt-1" aria-labelledby="notificationbox">
                                       
                                            <div style={{ maxHeight: "400px", zIndex: "1000", minWidth: "20vw", overflowY: "scroll" }} className="notifications_">
                                                {
                                                    notification?.map((data, index) => {
                                                        return (
                                                            <>
                                                                <div className="d-flex align-items-center justify-content-between rounded noti_bg px-2 py-1">
                                                                    <div className="d-flex align-items-center justify-content-start" key={index + 1}>
                                                                        {
                                                                            data.notification_by?.image ?
                                                                                <img
                                                                                    src={data.notification_by.image}
                                                                                    alt="avatar"
                                                                                    className="rounded-circle"
                                                                                    style={{ width: "30px", height: "30px", objectFit: "cover", display: "block" }}
                                                                                /> :
                                                                                <img
                                                                                    src="https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png"
                                                                                    alt="avatar"
                                                                                    className="rounded-circle me-2"
                                                                                    style={{ width: "30px", height: "30px", objectFit: "cover" }}
                                                                                />
                                                                        }
                                                                        <div className="align-items-center justify-content-start mx-1 my-0">
                                                                            <p
                                                                                className="text my-auto"
                                                                                style={{ fontSize: "0.8rem" }}
                                                                            >
                                                                                {data.notification}
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }

                                            </div>
                                            <div style={{ position: "absolute", left: "0", width: "100%", bottom: "0" }} className="clear-noftification py-1">
                                                <hr className='w-100' />
                                                <span style={{ cursor: "pointer" }} onClick={cleatNotification} className='d-block rounded px-1 text-center mx-auto'>clear notification</span>
                                            </div>
                                        </ul>
                                        <Link to={`/profile/${user.userId}`}>
                                            {
                                                userdata?.image ?
                                                    <img src={userdata.image} className="" alt='dss' width={30} height={30} style={{ borderRadius: "50%", objectFit: "cover" }} /> :
                                                    <img src="https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png" className="" alt='dss' width={30} height={30} style={{ borderRadius: "50%", objectFit: "cover" }} />

                                            }
                                        </Link>
                                    </> : <></>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
