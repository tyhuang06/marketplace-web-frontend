import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllProductsPage from './pages/products/AllProductsPage';
import ProductDetailPage from './pages/products/ProductDetailPage';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<AllProductsPage />} />
				<Route path="/details/:id" element={<ProductDetailPage />} />
			</Routes>
		</div>
	);
}

export default App;
