import React, { useEffect, useState } from 'react';
import { Container } from '@chakra-ui/react';
import ProductService from '../../services/ProductService';
import ProductCard from '../../components/products/ProductCard';

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
		<Container maxW="1024px">
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</Container>
	);
};

export default AllProductsPage;
