import rapidApi from '../axios';

const defaultConfig = {
	params: {
		store: 'US',
		offset: '0',
		categoryId: '4209',
		limit: '50',
		country: 'US',
		sort: 'freshness',
		currency: 'USD',
		sizeSchema: 'US',
		lang: 'en-US',
	},
};

const getAllProducts = async () => {
	const response = await rapidApi.get('/products/v2/list', defaultConfig);
	return response.data;
};

const getProductById = async (pid) => {
	console.log('triggerd request');
	const config = {
		params: {
			id: pid,
			lang: 'en-US',
			store: 'US',
			sizeSchema: 'US',
			currency: 'USD',
		},
	};

	const response = await rapidApi.get(`/products/v3/detail`, config);
	console.log(response);
	return response.data;
};

const ProductService = {
	getAllProducts,
	getProductById,
};

export default ProductService;
