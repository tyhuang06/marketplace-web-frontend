import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllProductsPage from './pages/products/AllProductsPage';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<AllProductsPage />} />
			</Routes>
		</div>
	);
}

export default App;
