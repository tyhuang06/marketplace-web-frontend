import { axiosDefault, jsonConfig } from '../axios';

const createUsedProduct = async (usedProduct) => {
	const response = await axiosDefault.post(
		'/usedproducts',
		usedProduct,
		jsonConfig
	);
	return response.data;
};

const getUsedProductById = async (id) => {
	const response = await axiosDefault.get(`/usedproducts/${id}`);
	return response.data;
};

const updateUsedProduct = async (id, usedProduct) => {
	const response = await axiosDefault.put(
		`/usedproducts/${id}`,
		usedProduct,
		jsonConfig
	);
	return response.data;
};

const deleteUsedProduct = async (id) => {
	const response = await axiosDefault.delete(`/usedproducts/${id}`);
	return response.data;
};

const getUsedProductsByStoreId = async (storeId) => {
	const response = await axiosDefault.get(`/usedproducts/store/${storeId}`);
	return response.data;
};

const getUsedProductByAsosId = async (asosId) => {
	const response = await axiosDefault.get(`/usedproducts/asos/${asosId}`);
	return response.data;
};

const UsedProductService = {
	createUsedProduct,
	getUsedProductById,
	updateUsedProduct,
	deleteUsedProduct,
	getUsedProductsByStoreId,
	getUsedProductByAsosId,
};

export default UsedProductService;
