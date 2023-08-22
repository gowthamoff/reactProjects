import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const PostForm = ({
  isEditing,
  handleSubmit,
  handleEdit,
  posts,
  postName,
  setPostName,
  postPass,
  setPostPass,
  postPhone,
  setPostPhone,
  postLocation,
  setPostLocation
}) => {
  function onlyNumbers(inputElement) {
    inputElement.value = inputElement.value.replace(/[^0-9]/, "");
  }

  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setPostName(post.username);
      setPostPass(post.password);
      setPostPhone(post.mobile);
      setPostLocation(post.location);
    }
  }, [post, setPostName, setPostPass, setPostPhone, setPostLocation]);

  function handleFormSubmit(event) {
    event.preventDefault();

    const inputName = document.getElementById("postName").value;
    const inputPass = document.getElementById("postPass").value;
    const inputPhone = document.getElementById("postPhone").value;
    const inputLocation = document.getElementById("postLocation").value;

    if (inputName.trim() === "" || inputPass.trim() === "" || inputPhone.trim() === "" || inputLocation.trim() === "") {
      alert("All fields are required!");
      return;
    }

    const inputValue = inputPhone;

    if (inputValue.length >= 1 && parseInt(inputValue[0]) < 6) {
      alert("The first digit must be greater than or equal to six.");
      document.getElementById("postPhone").focus();
      return;
    }

    if (inputValue.length < 10) {
      alert("The phone number must be at least 10 digits long.");
      document.getElementById("postPhone").focus();
      return;
    }

    if (!isEditing) {
      handleSubmit(event);
    } else {
      handleEdit(post.id);
    }
  }

  return (
    <main className="container">
      
      <h2 className="mt-3">{isEditing ? "Edit Post" : "New Post"}</h2>
     
      <form onSubmit={handleFormSubmit} className="form">
        <div className="mb-3">
          <label htmlFor="postName" className="form-label">
            User Name:
          </label>
          <input
            id="postName"
            type="text"
            maxLength={8}
            minLength={4}
            className="form-control"
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postPass" className="form-label">
            Password:
          </label>
          <input
            id="postPass"
            type="text"
            minLength={8}
            maxLength={16}
            className="form-control"
            value={postPass}
            onChange={(e) => setPostPass(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postPhone" className="form-label">
            Phone:
          </label>
          <input
            id="postPhone"
            type="text"
            className="form-control"
            maxLength={10}
            minLength={10}
            value={postPhone}
            onChange={(e) => setPostPhone(e.target.value)}
            onInput={(e) => {
              onlyNumbers(e.target);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postLocation" className="form-label">
            Location:
          </label>
          <input
            id="postLocation"
            type="text"
            minLength={3}
            maxLength={10}
            className="form-control"
            value={postLocation}
            onChange={(e) => setPostLocation(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update" : "Submit"}
        </button>
      </form>
    </main>
  );
};

export default PostForm;
