import React, { useState, useEffect } from "react";
import WPAPI from "wpapi";

const App = () => {
 // Initialize the state for the posts and the current page
 const [posts, setPosts] = useState([]);
 const [page, setPage] = useState(1);

 // Make the App component's state and functions available globally
 window.App = {
   state: {
     page: page
   },
   setPage: setPage
 };

 // Fetch the posts when the page changes
 useEffect(() => {
  // Initialize the WPAPI client
  const wp = new WPAPI({
    endpoint: "https://blog.rahb.ca/wp-json"
  });

  // Get the posts for the current page, including the featured media
  wp.posts().page(page)._embed().then(posts => {
    setPosts(posts);
  });
 }, [page]);

 // Render the posts on the page
 return (
  <div className="posts">
    {posts.map(post => {
      const title = post.title.rendered;
      const excerpt = post.excerpt.rendered;
      const link = post.link;

      // Get the featured image data from the post
      const featuredImage = post._embedded['wp:featuredmedia'][0];
      const imageUrl = featuredImage.media_details.sizes.full.source_url;

      return (
        <div className="post" key={post.id}>
          <img src={imageUrl} alt={title} />
          <h2>
            <a href={link}>{title}</a>
          </h2>
          <p>{excerpt}</p>
        </div>
      );
    })}
  </div>
 );

 // Add the pagination controls
 return (
  <div className="pagination">
    <button onClick={() => setPage(page - 1)}>Previous</button>
    <span>{page}</span>
    <button onClick={() => setPage(page + 1)}>Next</button>
  </div>
 );
};

export default App;
