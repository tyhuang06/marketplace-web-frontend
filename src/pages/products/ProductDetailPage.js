import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Image, Stack, Text, Heading } from '@chakra-ui/react';
import parse from 'html-react-parser';
import ProductService from '../../services/ProductService';

const ProductDetailPage = () => {
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		ProductService.getProductById(id)
			.then((res) => {
				setProduct(res);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	console.log(product);
	return (
		<Container maxW="1024px">
			<Link to="/">View all Products</Link>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div>
					<Image
						src={`https://${product.media.images[0].url}`}
						alt={product.name}
						borderRadius="lg"
					/>
					<Stack mt="6" spacing="3">
						<Heading size="md">{product.name}</Heading>
						<Text>{product.brandName}</Text>
						<Text>{parse(product.info.aboutMe)}</Text>
					</Stack>
				</div>
			)}
		</Container>
	);
};

export default ProductDetailPage;
