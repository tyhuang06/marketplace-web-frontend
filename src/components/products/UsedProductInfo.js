import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const UsedProductInfo = ({ product }) => {
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
			<Button colorScheme="blue" variant="ghost" className="mt-2">
				Add to Cart
			</Button>
		</>
	);
};

export default UsedProductInfo;
