import React from 'react';
import { Link } from 'react-router-dom';
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
import { UserState } from '../../context/UserProvider';
import CreateUsedProductModal from './CreateUsedProductModal';

const ProductCard = ({ product }) => {
	const { user } = UserState();

	return (
		<>
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
						<Link to={`/details/${product.id}`}>
							<Button variant="solid" colorScheme="blue">
								View Details
							</Button>
						</Link>
						{user && user.isSeller && (
							<CreateUsedProductModal product={product} />
						)}
					</ButtonGroup>
				</CardFooter>
			</Card>
		</>
	);
};

export default ProductCard;
