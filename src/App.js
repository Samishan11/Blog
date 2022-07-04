import React, { useEffect, useState } from 'react'
import Home from "./components/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Footer from "./components/footer/Footer";
import Blog from "./components/blog/Blog";
import Postblog from "./components/postblog/Postblog";
import Updateblog from "./components/updateblog/Updateblog";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import Mypost from "./components/mypost/Mypost";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import io from "socket.io-client";
import Catagorywise from './components/home/Catagorywise';
const socket = io.connect("http://localhost:5000");
function App() {

  // jsonwebtoken
  function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  // get user form the token
  const token_data = localStorage.getItem("token")
  const token = parseJwt(token_data)
  const userid = token?.userId

  // socket set up and add clients
  useEffect(() => {
    socket.emit("addClient", {
      userId: userid,
      socketId: socket.id
    })
  }, []);

  // const [blog, setBlog] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const getblog = async () => {
      try {
        const getallBlog = await axios.get("/get/allblog");
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
  },[data])
  return (
    <>
      <Router>
        <Navbar socket={socket} user={token} />
        <Routes>
          <Route path='/' caseSensitive={false} element={<Home data={data} userid={userid} loading={loading} error={error} />} />
          <Route path='/:catagory' caseSensitive={false} element={<Catagorywise userid={userid} loading={loading} error={error} />} />
          <Route path="/register" caseSensitive={false} element={<Register />} />
          <Route path="/login" caseSensitive={false} element={<Login />} />
          <Route path="/blog/:blogid" caseSensitive={false} element={<Blog user={userid} error ={error} socket={socket} />} />
          <Route path="/postblog" caseSensitive={false} element={<Postblog />} />
          <Route path="/updateblog/:blogid" caseSensitive={false} element={<Updateblog />} />
          <Route path="/profile/:userId" caseSensitive={false} element={<Profile currentuser={userid} socket={socket} />} />
          <Route path="/user/blogs/:userId" caseSensitive={false} element={<Mypost />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer className="mt-5" />
    </>
  );
}

export default App;
