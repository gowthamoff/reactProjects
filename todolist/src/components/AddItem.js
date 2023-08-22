import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react'
const AddItem = ({newItem,setNewItem,handleSubmit}) => {
  const inputRef = useRef()
  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor="addItem">Add Item</label>
        <input
        autoFocus 
        ref ={inputRef} 
        id = 'addItem'
        type= 'text'
        placeholder ='add Item'
        required
        value = {newItem}
        onChange ={(i) => setNewItem(i.target.value)}
        /> 
        <button
             type='submit'
             onClick={(e) => inputRef.current.focus()}
        >
        <FaPlus />
        </button>
    </form>
  )    
}
export default AddItem