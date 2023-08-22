 const Search = ({search,setSearch}) => {
   return (
      <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='searchbox'>Search</label> 
        <input
        type='text'
        id='searchbox'
        placeholder="Search items"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        />
      </form>
   )
 }
 export default Search