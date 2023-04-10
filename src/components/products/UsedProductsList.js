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

const UsedProductsList = ({ asosId }) => {
	const [products, setProducts] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	useEffect(() => {
		// Get used products with asos Id
		UsedProductService.getUsedProductsByAsosId(asosId)
			.then((res) => {
				setProducts(res);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [asosId]);

	return (
		<div>
			{loading ? (
				<p>Loading...</p>
			) : (
				<Card>
					<CardHeader>
						<Heading size="md">Used Products</Heading>
					</CardHeader>

					<CardBody>
						<Stack divider={<StackDivider />} spacing="4">
							{products.map((product) => (
								<UsedProductInfo
									product={product}
									key={product._id}
								/>
							))}
						</Stack>
					</CardBody>
				</Card>
			)}
		</div>
	);
};

export default UsedProductsList;
