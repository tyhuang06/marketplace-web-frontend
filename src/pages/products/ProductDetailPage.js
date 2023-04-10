import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Image, Stack, Text, Heading } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
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
			<Link to="/" className="text-xl mb-2 flex items-center">
				<ArrowLeftIcon className="w-6 h-6 mr-2" />
				<Text>View all Products</Text>
			</Link>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className="flex flex-col">
					<Heading size="lg" className="mb-4">
						{product.name}
					</Heading>
					<div className="flex flex-row">
						<div className="">
							<Image
								src={`https://${product.media.images[0].url}`}
								alt={product.name}
								borderRadius="lg"
							/>
							<Stack mt="6" spacing="3">
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
				</div>
			)}
		</Container>
	);
};

export default ProductDetailPage;
