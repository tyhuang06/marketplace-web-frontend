import React, { useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UsedProductService from '../../services/UsedProductService';

const EditProductModal = ({ product }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [name, setName] = useState(product.name);
	const [sellingPrice, setSellingPrice] = useState(product.sellingPrice);
	const [condition, setCondition] = useState(product.condition);
	const [size, setSize] = useState(product.size);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const toast = useToast();

	const format = (val) => `$` + val;
	const parse = (val) => val.replace(/^\$/, '');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		UsedProductService.updateUsedProduct(product._id, {
			name,
			sellingPrice,
			condition,
			size,
		})
			.then((res) => {
				toast({
					title: 'Used Product Updated!',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});

				onClose();
				setLoading(false);
				navigate(0);
			})
			.catch((err) => {
				toast({
					title: 'Error updating used product.',
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});

				onClose();
				setLoading(false);
			});
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		setLoading(true);

		UsedProductService.deleteUsedProduct(product._id)
			.then((res) => {
				toast({
					title: 'Used Product Deleted!',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});

				onClose();
				setLoading(false);
				navigate(0);
			})
			.catch((err) => {
				toast({
					title: 'Error deleting used product.',
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});
			});
	};

	return (
		<>
			<Button onClick={onOpen}>Edit</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Used Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl id="name" isRequired className="mb-2">
							<FormLabel>Name</FormLabel>
							<Input
								placeholder="Name for your used product"
								onChange={(e) => setName(e.target.value)}
								value={name}
							/>
						</FormControl>

						<FormControl
							id="sellingPrice"
							isRequired
							className="mb-2"
						>
							<FormLabel>Selling Price</FormLabel>
							<NumberInput
								onChange={(valueString) =>
									setSellingPrice(parse(valueString))
								}
								value={format(sellingPrice)}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</FormControl>

						<FormControl id="size" isRequired className="mb-2">
							<FormLabel>Size</FormLabel>
							<Input
								placeholder="Size of your used product"
								onChange={(e) => setSize(e.target.value)}
								value={size}
							/>
						</FormControl>

						<FormControl id="condition" isRequired className="mb-2">
							<FormLabel>Condition</FormLabel>
							<Input
								placeholder="Condition of your used product"
								onChange={(e) => setCondition(e.target.value)}
								value={condition}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="red"
							mr={3}
							onClick={handleDelete}
							isLoading={loading}
						>
							Delete
						</Button>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={handleSubmit}
							isLoading={loading}
						>
							Update
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default EditProductModal;
