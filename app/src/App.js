import React, { useState, useEffect } from "react";
import WPAPI from "wpapi";

const App = () => {
 // Initialize the state for the products
 const [products, setProducts] = useState([]);

 // Fetch the products when the component is mounted
useEffect(() => {
	// Initialize the WPAPI client
	const wc = new WPAPI({
 	endpoint: "https://my-store.com/wp-json/wc/v3",
 	consumerKey: process.env.WC_CONSUMER_KEY,
 	consumerSecret: process.env.WC_CONSUMER_SECRET
	});

	// Get the products for the first page
	wc.products().per_page(12).page(1).then(products => {
 	setProducts(products);
	});
 }, []);

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
