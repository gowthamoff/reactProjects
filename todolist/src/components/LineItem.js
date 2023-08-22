 
import {FaTrashAlt} from "react-icons/fa";

const LineItem = ({item,handleCheck,handleDelete}) => {
  return (
    <li className='item'>  
      <input 
      type='checkbox'
      onChange={()=> handleCheck(item.id)}
      checked={item.checked} 
      />
      <label 
      style = {(item.checked)? {textDecoration:'line-through'} : null}
      onDoubleClick={()=>handleCheck(item.id)}>
      {item.item}
      </label>
      <FaTrashAlt role="button" onClick={()=>handleDelete(item.id)} tabIndex="0"/>
    </li>
  )
}

export default LineItem