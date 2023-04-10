import React from 'react';
import { Box, Heading, Text, Button, useToast } from '@chakra-ui/react';
import { UserState } from '../../context/UserProvider';
import CartService from '../../services/CartService';

const UsedProductInfo = ({ product }) => {
	const { user } = UserState();

	const toast = useToast();

	const addToCart = () => {
		CartService.addToCart(product._id)
			.then((res) => {
				toast({
					title: 'Added to cart',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});
			})
			.catch((err) => {
				toast({
					title: 'Error!',
					description: err.response.data,
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});
			});
	};

	return (
		<>
			<Box>
				<Heading size="xs" textTransform="uppercase">
					{product.name}
				</Heading>
				<Text pt="2" fontSize="sm">
					Sold By: {product.storeId.storeName}
				</Text>
				<Text pt="2" fontSize="sm">
					Condition: {product.condition}
				</Text>
				<Text pt="2" fontSize="sm">
					Size: {product.size}
				</Text>
				<Text pt="2" fontSize="sm" colorScheme="blue">
					${product.sellingPrice}
				</Text>
			</Box>
			{user && (
				<Button
					colorScheme="blue"
					variant="ghost"
					className="mt-2"
					onClick={addToCart}
				>
					Add to Cart
				</Button>
			)}
		</>
	);
};

export default UsedProductInfo;
