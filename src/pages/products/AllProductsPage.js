import React, { useEffect, useState } from 'react';
import ProductService from '../../services/ProductService';

const AllProductsPage = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		ProductService.getAllProducts()
			.then((res) => {
				setProducts(res.products);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			{products.map((product) => (
				<div key={product.id}>
					<h1>{product.name}</h1>
					<img src={product.imageUrl} alt={product.name} />
					<p>{product.price.current.text}</p>
				</div>
			))}
		</div>
	);
};

export default AllProductsPage;
