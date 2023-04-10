import React from 'react';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';

const OrderItem = ({ item }) => {
	return (
		<Box key={item._id} className="flex justify-between items-center">
			<Stack className="flex">
				<Heading size="xs" textTransform="uppercase">
					{item.name}
				</Heading>
				<Text pt="2" fontSize="sm">
					Condition: {item.condition}
				</Text>
				<Text pt="2" fontSize="sm">
					Size: {item.size}
				</Text>
			</Stack>
			<div>
				<Text pt="2" fontSize="xl" color="blue.600">
					${item.sellingPrice}
				</Text>
			</div>
		</Box>
	);
};

export default OrderItem;
