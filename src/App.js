import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import AllProductsPage from './pages/products/AllProductsPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import AuthPage from './pages/AuthPage';
import Navbar from './components/Navbar';

function App() {
	return (
		<UserProvider>
			<div className="App">
				<Navbar />
				<Routes>
					<Route path="/" element={<AllProductsPage />} />
					<Route
						path="/details/:id"
						element={<ProductDetailPage />}
					/>
					<Route path="/login" element={<AuthPage />} />
				</Routes>
			</div>
		</UserProvider>
	);
}

export default App;
