 import LineItem from "./LineItem"

const ItemsList = ({items,handleCheck,handleDelete}) => {
  return ( 
    <ul>     
      {items.map((item)=>  
        <LineItem
          item = {item}
          handleCheck={handleCheck}
          key={item.id}
          handleDelete={handleDelete}
        />
      )} 
    </ul>
  )
}

export default ItemsList