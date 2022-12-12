import React, { useState, useEffect } from "react";
import WPAPI from "wpapi";

const App = () => {
 // Initialize the state for the products and the current page
 const [products, setProducts] = useState([]);
 const [page, setPage] = useState(1);

 // Make the App component's state and functions available globally
 window.App = {
   state: {
     page: page
   },
   setPage: setPage
 };

 // Fetch the products when the page changes
 useEffect(() => {
	// Initialize the WPAPI client
	const wc = new WPAPI({
 	endpoint: "https://store.rahb.ca/wp-json/wc/v3",
 	consumerKey: process.env.WC_CONSUMER_KEY,
 	consumerSecret: process.env.WC_CONSUMER_SECRET
	});

	// Get the products for the current page
	wc.products().page(page).then(products => {
 	setProducts(products);
	});
 }, [page]);

 // Render the products on the page
 return (
	<div className="products">
 	{products.map(product => {
   	const title = product.name;
   	const excerpt = product.short_description;
   	const link = product.permalink;
   	const image = product.images[0].src;

   	return (
     	<div className="product" key={product.id}>
       	<a href={link}>
         	<img src={image} alt={title} />
         	<h2>{title}</h2>
         	<p>{excerpt}</p>
       	</a>
     	</div>
   	);
 	})}
	</div>
 );
};

export default App;
