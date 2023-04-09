import React from 'react';
import {
	Card,
	CardBody,
	CardFooter,
	Image,
	Stack,
	Heading,
	Text,
	Divider,
	ButtonGroup,
	Button,
} from '@chakra-ui/react';

const ProductCard = ({ product }) => {
	return (
		<Card maxW="sm">
			<CardBody>
				<Image
					src={`https://${product.imageUrl}`}
					alt={product.name}
					borderRadius="lg"
				/>
				<Stack mt="6" spacing="3">
					<Heading size="md">{product.name}</Heading>
					<Text>{product.brandName}</Text>
					<Text color="blue.600" fontSize="2xl">
						{product.price.current.text}
					</Text>
				</Stack>
			</CardBody>
			<Divider />
			<CardFooter>
				<ButtonGroup spacing="2">
					<Button variant="solid" colorScheme="blue">
						Buy used
					</Button>
					<Button variant="ghost" colorScheme="blue">
						Buy new
					</Button>
				</ButtonGroup>
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
