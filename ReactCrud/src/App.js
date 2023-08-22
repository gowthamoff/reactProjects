import "./App.css";
import api from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./Components/Header";
import Content from "./Components/Content";
import PostForm from "./Components/PostForm";

function App() {
  const [posts, setPosts] = useState([]);

  const [postName, setPostName] = useState("");
  const [postPass, setPostPass] = useState("");
  const [postPhone, setPostPhone] = useState("");
  const [postLocation, setPostLocation] = useState("");

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await api.get(
        "https://fugk2m8ox2.execute-api.ap-south-1.amazonaws.com/dev/api/lookups?type=user"
      );
      setPosts(response.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: postName,
      password: postPass,
      user_role: "admin",
      active: 1,
      created_by: 23,
      mobile: postPhone,
      location: postLocation,
      designation: "dddd",
      division: "ddd",
      division_id: 1,
      email_id: "siufn@gmail.com",
      section_office: "oirnsf",
    };

    try {
      await api.post(
        "https://fugk2m8ox2.execute-api.ap-south-1.amazonaws.com/dev/api/users",
        newUser
      );

      fetchPosts();

      setPostName("");
      setPostPass("");
      setPostPhone("");
      setPostLocation("");
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const handleEdit = async (id) => {
    const updatedUser = {
      id: id,
      username: postName,
      password: postPass,
      user_role: "admin",
      active: 1,
      created_by: 23,
      mobile: postPhone,
      location: postLocation,
      designation: "sas",
      division: "sasa",
      division_id: 1,
      email_id: "gg@gmail.com",
      section_office: "kv",
    };

    try {
      await api.put(
        `https://fugk2m8ox2.execute-api.ap-south-1.amazonaws.com/dev/api/users`,
        updatedUser
      );

      fetchPosts();

      setPostName("");
      setPostPass("");
      setPostPhone("");
      setPostLocation("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(
        `https://fugk2m8ox2.execute-api.ap-south-1.amazonaws.com/dev/api/users/${id}`
      );

      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  return ( 
      <main className="container shadow-lg p-3 mb-5 bg-white rounded">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Content
                posts={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            }
          />
          <Route
            path="/post"
            index
            element={
              <PostForm
                isEditing={false} 
                postName={postName}
                setPostName={setPostName}
                postPass={postPass}
                setPostPass={setPostPass}
                postPhone={postPhone}
                setPostPhone={setPostPhone}
                postLocation={postLocation}
                setPostLocation={setPostLocation}
                handleSubmit={handleSubmit}
                posts={posts}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PostForm
                isEditing={true}  
                postName={postName}
                setPostName={setPostName}
                postPass={postPass}
                setPostPass={setPostPass}
                postPhone={postPhone}
                setPostPhone={setPostPhone}
                postLocation={postLocation}
                setPostLocation={setPostLocation} 
                handleEdit={handleEdit}
                posts={posts}
              />
            }
          />
        </Routes>
      </main>
    );
}

export default App;
