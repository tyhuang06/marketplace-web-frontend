import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const UsedProductInfo = ({ product }) => {
	return (
		<Box>
			<Heading size="xs" textTransform="uppercase">
				{product.name}
			</Heading>
			<Text pt="2" fontSize="sm">
				Sold By: {product.storeId.storeName}
			</Text>
			<Text pt="2" fontSize="sm">
				${product.sellingPrice}
			</Text>
		</Box>
	);
};

export default UsedProductInfo;
