import React, { useEffect } from 'react';
import {
	Card,
	CardBody,
	CardHeader,
	Button,
	Stack,
	StackDivider,
} from '@chakra-ui/react';
import UsedProductService from '../../services/UsedProductService';
import UsedProductInfo from './UsedProductInfo';

const SellerProductsList = (props) => {
	const { storeId, isSelf } = props;
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
		<>
			{!loading &&
				products.map((product) => (
					<Card key={product._id} className="mb-2">
						<CardHeader>
							{isSelf ? <Button>Edit Product</Button> : null}
						</CardHeader>

						<CardBody>
							<Stack divider={<StackDivider />} spacing="4">
								<UsedProductInfo product={product} />
							</Stack>
						</CardBody>
					</Card>
				))}
		</>
	);
};

export default SellerProductsList;
