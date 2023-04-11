import {
	Container,
	Heading,
	Stack,
	StackDivider,
	Text,
	Divider,
	Skeleton,
	Button,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import CartService from '../../services/CartService';
import OrderItem from '../../components/orders/OrderItem';
import { UserState } from '../../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import handleAuthError from '../../protect';

const CartPage = () => {
	const [cart, setCart] = React.useState([]);
	const [totalPrice, setTotalPrice] = React.useState(0);
	const [loading, setLoading] = React.useState(true);
	const { user } = UserState();

	const navigate = useNavigate();

	useEffect(() => {
		CartService.getCart()
			.then((res) => {
				setCart(res);
				setLoading(false);
			})
			.catch((err) => {
				handleAuthError(err, navigate);
				console.log(err);
			});
	}, [user, navigate]);

	useEffect(() => {
		if (cart.items) {
			let total = 0;
			cart.items.forEach((item) => {
				total += item.sellingPrice;
			});
			setTotalPrice(total);
		}
	}, [cart]);

	const removeFromCart = (id) => {
		CartService.removeFromCart(id)
			.then((res) => {
				setCart(res);
				navigate(0);
			})
			.catch((err) => {
				handleAuthError(err, navigate);
				console.log(err);
			});
	};

	return (
		<Container>
			<Heading>Shopping Cart</Heading>
			<Divider className="my-4" />
			{loading ? (
				<Skeleton height="20px" />
			) : (
				<>
					<Stack divider={<StackDivider />} spacing="4">
						{cart.items.length > 0 ? (
							cart.items.map((item) => (
								<div key={item._id}>
									<OrderItem item={item} />
									<Button
										colorScheme="red"
										variant="ghost"
										className="mt-2"
										onClick={() => removeFromCart(item._id)}
									>
										Remove
									</Button>
								</div>
							))
						) : (
							<Text>Your cart is empty</Text>
						)}
					</Stack>
					<Divider className="my-4" />
					<div className="flex justify-end">
						<Stack>
							<Text pt="2" fontSize="xl">
								Total Price: ${totalPrice}
							</Text>
							<Button colorScheme="blue">
								Proceed to Checkout
							</Button>
						</Stack>
					</div>
				</>
			)}
		</Container>
	);
};

export default CartPage;
