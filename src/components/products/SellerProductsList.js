import React, { useEffect } from 'react';
import {
	Card,
	CardBody,
	CardHeader,
	Heading,
	Stack,
	StackDivider,
} from '@chakra-ui/react';
import UsedProductService from '../../services/UsedProductService';
import UsedProductInfo from './UsedProductInfo';

const SellerProductsList = ({ storeId }) => {
	const [products, setProducts] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	useEffect(() => {
		// Get used products with store Id
		UsedProductService.getUsedProductsByStoreId(storeId)
			.then((res) => {
				setProducts(res);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [storeId]);

	return (
		<Card>
			<CardHeader>
				<Heading size="md">All Products</Heading>
			</CardHeader>

			<CardBody>
				{loading ? (
					<p>Loading...</p>
				) : (
					<Stack divider={<StackDivider />} spacing="4">
						{products.map((product) => (
							<UsedProductInfo
								product={product}
								key={product._id}
							/>
						))}
					</Stack>
				)}
			</CardBody>
		</Card>
	);
};

export default SellerProductsList;
