import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import Footer from "./components/Footer"; 
import EditPost from "./components/EditPost";
import "./index.css"; 
import {useEffect,useState} from "react"; 
import {Routes,Route,useNavigate} from 'react-router-dom' 
import {format} from 'date-fns'
import api from "./api/posts"
import useWindowSize from "./hooks/useWindowSize"; 

function App() {   
  const [posts,setPosts] = useState([]) //display records
  const [search,setSearch] = useState('')//input save
  const [searchResults,setSearchResults] = useState([])//search result after filter
  const [postTitle,setPostTitle] = useState('')
  const [postBody,setPostBody] = useState('')
  const [editTitle,setEditTitle] = useState('')
  const [editBody,setEditBody] = useState('') 
  const navigate = useNavigate()
  const {width} = useWindowSize()

  useEffect(()=>{
    const fetchPosts = async () => {
      try{
        const response = await api.get('/posts') //using axios
        setPosts(response.data) // it will return as json only
      }catch(err)
      {
        if(err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        }else{
          console.log(`Error: ${err.message}`)
        }
      }
    }
    fetchPosts()},[])

  

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id+1:1;
    const datetime = format(new Date(),'MMMM dd,yyyy'); 
    const newPost = {id,title:postTitle,datetime,body:postBody};
    try{
        const response = await api.post('/posts',newPost) //insert data using axios
        const allPosts = [...posts,response.data]
        setPosts(allPosts)
        setPostTitle('')
        setPostBody('')
        navigate("/")
    }catch(err)
      {
        if(err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        }else{
          console.log(`Error: ${err.message}`)
        }
    }
  }  

  const handleDelete = async(id) =>{
    try{
    await api.delete(`posts/${id}`) 
    const postsList = posts.filter(post => post.id !== id)
    setPosts(postsList)
    navigate("/")
    }catch(err)
    {
      if(err.response){
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      }else{
        console.log(`Error: ${err.message}`)
      }
  }
  } 

  const handleEdit = async (id) => { 
      const datetime = format(new Date(),'MMMM dd,yyyy'); 
      const updatedPost = {id,title:editTitle,datetime,body:editBody};
      try{
        const response = await api.put(`/posts/${id}`,updatedPost)
        setPosts(posts.map(post => post.id === id ? 
          {...response.data} : post)) 
        setEditTitle('')
        setEditBody('')
        navigate("/")
      }catch(err)
      { 
          console.log(`Error: ${err.message}`)
      }
    }
  

  useEffect(()=> { //search result
    const filteredResults = posts.filter((post)=>
    ((post.body).toLowerCase()).includes(search.toLowerCase())
 || ((post.title).toLowerCase()).includes(search.toLowerCase()) )
  
    setSearchResults(filteredResults.reverse());
    
  } ,[posts,search])  //it will work when newpost added and search happens
   
  
  return (
     <div className='App'>   
      <Header title="Thread Clone" width={width}/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
          <Route path="/" element = {
            <Home posts = {searchResults} /> } />
          <Route path="post">
              <Route index element = {
                  <NewPost 
                    postTitle = {postTitle}
                    setPostTitle = {setPostTitle}
                    postBody = {postBody}
                    setPostBody = {setPostBody} 
                    handleSubmit={handleSubmit}
                  /> } />
              <Route path =":id" element = {
                    <PostPage posts = {posts} handleDelete={handleDelete}/>
                  } /> 
          </Route> 
          <Route path = "/edit/:id" element = {
                <EditPost
                  posts={posts}
                  editTitle = {editTitle}
                  setEditTitle = {setEditTitle}
                  editBody = {editBody}
                  setEditBody = {setEditBody} 
                  handleEdit= {handleEdit}
                />}
          />
          <Route path='about' element = { <About /> } />
          <Route path='*' element = { <Missing /> } />
      </Routes>
      <Footer />
     </div>
  );
} 
export default App; 
