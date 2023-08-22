import React from 'react'
import {Outlet,Link} from "react-router-dom"

const PostLayout = () => {
  return (
    <main> 
    <Link to="/postpage/1">Post 1</Link><br />
    <Link to="/postpage/2">Post 2</Link><br />
    <Link to="/postpage/3">Post 3</Link><br />
    <Link to="/postpage/newpost">Newposst</Link>
    <Outlet /> {/* nested  */}
   </main>
  )
}

export default PostLayout