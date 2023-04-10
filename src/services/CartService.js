import { axiosDefault, jsonConfig } from '../axios';

const getCart = async () => {
	const response = await axiosDefault.get('/cart');
	return response.data;
};

const addToCart = async (usedProductId) => {
	const response = await axiosDefault.post(
		'/cart/add',
		{ usedProductId },
		jsonConfig
	);
	return response.data;
};

const removeFromCart = async (usedProductId) => {
	const response = await axiosDefault.post(
		'/cart/remove',
		{ usedProductId },
		jsonConfig
	);
	return response.data;
};

const CartService = {
	getCart,
	addToCart,
	removeFromCart,
};

export default CartService;
