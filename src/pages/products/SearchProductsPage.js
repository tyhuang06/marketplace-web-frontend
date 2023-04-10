import React, { useEffect, useState } from 'react';
import { Container, Text } from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ProductCard from '../../components/products/ProductCard';
import ProductService from '../../services/ProductService';
import SearchBox from '../../components/products/SearchBox';

const SearchProductsPage = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const { query } = useParams();

	useEffect(() => {
		// Get products with external API
		if (query) {
			ProductService.searchProducts(query)
				.then((res) => {
					setProducts(res.products);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setLoading(false);
		}
	}, [query]);

	return (
		<Container maxW="1024px">
			<Link to="/" className="text-xl mb-2 flex items-center">
				<ArrowLeftIcon className="w-6 h-6 mr-2" />
				<Text>View all Products</Text>
			</Link>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					{/* <InputGroup size="md" className="mb-4">
				<Input
					pr="5rem"
					type="text"
					placeholder="Search for products"
					onChange={(e) => setSearch(e.target.value)}
				/>
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="md" className="mr-2">
						Search
					</Button>
				</InputRightElement>
			</InputGroup> */}
					<SearchBox />
					<Text className="mb-2">Search Results for: {query}</Text>
					{products.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
							{products.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
								/>
							))}
						</div>
					) : (
						<p>No products found</p>
					)}
				</>
			)}
		</Container>
	);
};

export default SearchProductsPage;
