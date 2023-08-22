const Header = (props) => {
  return (
    <header>
      <p>{props.title}</p>
      </header>
  )
} 
Header.defaultProps ={
  title:"To do list" 
}
export default Header