import { axiosDefault, jsonConfig } from '../axios';

const getOrders = async () => {
	const response = await axiosDefault.get('/order');
	return response.data;
};

const createOrder = async (order) => {
	const response = await axiosDefault.post('/order', order, jsonConfig);
	return response.data;
};

const getOrderById = async (id) => {
	const response = await axiosDefault.get(`/order/${id}`);
	return response.data;
};

const getOrdersByUserId = async (id) => {
	const response = await axiosDefault.get(`/order/user/${id}`);
	return response.data;
};

const updateOrderStatus = async (id, status) => {
	const response = await axiosDefault.put(
		`/order/${id}`,
		{ status },
		jsonConfig
	);
	return response.data;
};

const deleteOrder = async (id) => {
	const response = await axiosDefault.delete(`/order/${id}`);
	return response.data;
};

const OrderService = {
	getOrders,
	createOrder,
	getOrderById,
	getOrdersByUserId,
	updateOrderStatus,
	deleteOrder,
};

export default OrderService;
