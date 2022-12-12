import React, { useState, useEffect } from "react";
import WPAPI from "wpapi";

const App = () => {
 // Initialize the state for the posts and the current page
 const [posts, setPosts] = useState([]);
 const [page, setPage] = useState(1);

 // Fetch the posts when the page changes
 useEffect(() => {
	// Initialize the WPAPI client
	const wp = new WPAPI({
 	endpoint: "http://your-site.com/wp-json"
	});

	// Get the posts for the current page
	wp.posts().page(page).then(posts => {
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

   	return (
     	<div className="post" key={post.id}>
       	<h2>{title}</h2>
       	<p>{excerpt}</p>
       	<a href={link}>Read More</a>
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
