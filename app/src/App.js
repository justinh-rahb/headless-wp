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
 	  endpoint: "https://store.rahb.ca/wp-json/wp/v2/posts?_embed"
	});

	// Get the posts for the current page
	wp.posts(50).page(page).then(posts => {
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
	const featured_image_url = post.jetpack_featured_media_url;

   	return (
     	<div className="post" key={post.id}>
	<a href={link}>
	  <img src={featured_image_url} />
       	  <h2>{title}</h2>
	</a>
       	<p>{excerpt}</p>
     	</div>
   	);
 	})}
	</div>
 );

 // Add the pagination controls
 /*return (
	<div className="pagination">
 	<button onClick={() => setPage(page - 1)}>Previous</button>
 	<span>{page}</span>
 	<button onClick={() => setPage(page + 1)}>Next</button>
	</div>
 );*/
};

export default App;
