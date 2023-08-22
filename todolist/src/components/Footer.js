const Footer = ({ length }) => {
  let result; 
  if (length === 0) {
    result = "List is empty";
  } else if (length === 1) {
    result = "List has 1 item";
  } else {
    result = `List has ${length} items`; // Use backticks instead of single quotes
  }
  return (
    <footer>
      <p>{result}</p>
    </footer>
  );
}
export default Footer