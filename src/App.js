import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import AllProductsPage from './pages/products/AllProductsPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import SearchProductsPage from './pages/products/SearchProductsPage';
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
					<Route path="/search" element={<SearchProductsPage />} />
					<Route
						path="/search/:query"
						element={<SearchProductsPage />}
					/>
				</Routes>
			</div>
		</UserProvider>
	);
}

export default App;
