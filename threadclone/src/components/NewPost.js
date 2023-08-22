const NewPost = ({
  handleSubmit,postTitle,setPostTitle,postBody,setPostBody
}) => {
  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
        id="postTitle"
        type="text"
        required
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postTitle">Post:</label>
        <input
          id="postBody"
          type='text' 
          required
          value={postBody}
          onChange={(i) => setPostBody(i.target.value) }
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default NewPost