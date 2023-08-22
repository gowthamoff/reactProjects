import Header from './components/Header'; 
import Footer from './components/Footer';
import Content from './components/Content';
import {useEffect, useState} from 'react';
import AddItem from './components/AddItem';
import Search from './components/Search';
import apiRequest from './components/apiRequest';

function App() {  
  const API_URL = 'http://localhost:3500/items'
  const [items,setItem] = useState([]); //to avoid crach while fetching data from local storage cd
  const [newItem,setNewItem] = useState('')
  const [search,setSearch] = useState('')
  const [fetchError,setFetchError] = useState(null)
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() =>
  {
    const fetchItems = async () => 
    {
      try {
        const response = await fetch(API_URL)//read operation
        if(!response.ok) throw Error("Data not received")
        //console.log(response)
        const listItems = await response.json()
        //console.log(listItems)
        setItem(listItems)
        setFetchError(null)
      }
      catch (err)
      {
        setFetchError(err.message)
      }finally {
        setIsLoading(false)
      }
    }
    setTimeout(()=>{ 
      (async () => await fetchItems())()
    },2000)},[])

   
  
  const handleCheck = async (id) =>{ //update operation
    const newitems = items.map((item) =>(
      item.id===id ? {...item,checked:!item.checked} : item
    ))
    setItem(newitems)
    //localStorage.setItem("todo_list",JSON.stringify(newitems))
     
    //update operation using server
    const myItem = newitems.filter((item) => item.id===id)
    const updateOptions = {
      method : 'PATCH',
      headers : {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({checked:myItem[0].checked})//give true or false
    }
    const UPDATE_URL = `${API_URL}/${id}`
    const result = await apiRequest(UPDATE_URL,updateOptions)
    if(result) setFetchError(result) //insert  operation
    }
 
    const handleDelete = async (id) =>
    {
      const newitem = items.filter((item)=>item.id!==id)
      setItem(newitem) 
     // localStorage.setItem("todo_list",JSON.stringify(newitem))
    
     const deleteOptions = {method : 'DELETE'}

    const DELETE_URL = `${API_URL}/${id}`
    const result = await apiRequest(DELETE_URL,deleteOptions)
    if(result) setFetchError(result) 
    } 

    const handleSubmit = (e) =>
    {
      e.preventDefault()// avoid reloading the page
      if(!newItem) return;
      console.log(newItem) 
      addItem(newItem)
      setNewItem('')
    }
 
    const addItem = async (item) =>{
      const id =items.length ? items[items.length -1].id +1 : 1
      const addNewItem = {id,checked:false,item}
      const listItems =[...items,addNewItem]
      setItem(listItems)

      const postOptions = {
        method : 'POST',
        headers : {
          'Content-Type':'application/json'
        },
        body:JSON.stringify(addNewItem)
      }
      const result = await apiRequest(API_URL,postOptions)
      if(result) setFetchError(result) //insert  operation

     // localStorage.setItem("todo_list",JSON.stringify(listItems))
    }
     
    useEffect(() => { // it will only load the data when the app start when we declare []
      JSON.parse(localStorage.getItem('todo_list'),[])
    })
    //
    useEffect(() => {
      console.log("Working")
    },[items]) //  it will work only when the items useStae works

  return ( 
    <div className="App "> 
    <Header title ='Gowtham'/> 
    <AddItem 
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
    /> 
    <Search
      search={search}
      setSearch={setSearch}
    />
      <main>
        {isLoading && <p> {`Loading items...`}</p>}
        {fetchError && <p> {`Error : ${fetchError}`}</p>}
           {!isLoading && !fetchError && <Content  
        items = {items.filter(item => ((item.item)
        .toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete} 
    />}
     </main>
    <Footer 
    length ={items.length}
    />
    </div>
    );
}

export default App;
