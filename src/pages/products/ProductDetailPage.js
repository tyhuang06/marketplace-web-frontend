import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Image, Stack, Text, Heading } from '@chakra-ui/react';
import parse from 'html-react-parser';
import ProductService from '../../services/ProductService';
import UsedProductsList from '../../components/products/UsedProductsList';

const ProductDetailPage = () => {
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		// Get product details with external API
		ProductService.getProductById(id)
			.then((res) => {
				setProduct(res);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	return (
		<Container maxW="1024px">
			<Link to="/">View all Products</Link>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className="flex flex-row">
					<div className="">
						<Image
							src={`https://${product.media.images[0].url}`}
							alt={product.name}
							borderRadius="lg"
						/>
						<Stack mt="6" spacing="3">
							<Heading size="md">{product.name}</Heading>
							<Text>Brand: {product.brand.name}</Text>
							<Text>Product Info: </Text>
							<Text className="pl-4">
								{parse(product.info.aboutMe)}
							</Text>
							<Text>Price: {product.price.current.text}</Text>
						</Stack>
					</div>
					<div className="w-2/5">
						<UsedProductsList asosId={product.id} />
					</div>
				</div>
			)}
		</Container>
	);
};

export default ProductDetailPage;
