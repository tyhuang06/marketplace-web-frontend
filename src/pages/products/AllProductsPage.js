import React, { useEffect, useState } from 'react';
import { Container, Skeleton } from '@chakra-ui/react';
import ProductService from '../../services/ProductService';
import ProductCard from '../../components/products/ProductCard';
import SearchBox from '../../components/products/SearchBox';

const AllProductsPage = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		ProductService.getAllProducts()
			.then((res) => {
				setProducts(res.products);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Container maxW="1024px">
			<Skeleton isLoaded={!loading}>
				<SearchBox />
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</Skeleton>
		</Container>
	);
};

export default AllProductsPage;
