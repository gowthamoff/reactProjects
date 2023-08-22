import React, { useState } from "react";
import { Link } from "react-router-dom";

const Content = ({ posts,handleDelete }) => {
  const reversedPosts = [...posts].reverse();
  // const generateUniqueKey = () => {
  //   const timestamp = new Date().getTime();
  //   const randomNum = Math.floor(Math.random() * 1000);
  //   return `post-${timestamp}-${randomNum}`;
  // };

  //pagination
  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = reversedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(reversedPosts.length / postsPerPage);
  const visiblePages = 3;
  const renderPaginationItems = () => {
    const paginationItems = [];

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      if (
        pageNumber <= visiblePages || // First 3 pages
        pageNumber > totalPages - visiblePages || // Last 3 pages
        Math.abs(pageNumber - currentPage) <= 1 // Pages around the current page
      ) {
        paginationItems.push(
          <li
            key={`pagination-item-${pageNumber}`} // Use a more descriptive and unique key
            className={`page-item ${
              currentPage === pageNumber ? "active" : ""
            }`}
          >
            <button className="page-link" onClick={() => paginate(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        );
      }
    }

    return paginationItems;
  };

  return (
    <main>
      {currentPosts.length ? (
        <div>
          <table className="table table-striped text-center table-responsive table-bordered">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Password</th>
                <th>Phone Number</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post) => (
                <tr key={post.id}>
                  <td>{post.username}</td>
                  <td>{post.password}</td>
                  <td>{post.mobile}</td>
                  <td>{post.location}</td>
                  <td>
                    <Link to={`edit/${post.id}`}>
                      <button
                        className="btn btn-primary btn-sm" 
                      >
                        Edit
                      </button>
                      <span className="space02"></span>
                    </Link>
                     
                      <button
                        className="btn btn-danger btn-sm ml-2" 
                        onClick={()=>handleDelete(post.id)}
                      >
                        Delete
                      </button> 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav>
            <ul className="pagination justify-content-center">
              {renderPaginationItems()}
            </ul>
          </nav>
        </div>
      ) : (
        <p style={{ marginTop: "2rem" }}>Loading Please Wait</p>
      )}
    </main>
  );
};

export default Content;
