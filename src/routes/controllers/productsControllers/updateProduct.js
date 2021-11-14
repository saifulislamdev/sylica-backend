import ProductModel from '../../../models/product';
const updateProduct = async (req, res) => {
	const _id = '61908707a497a1b2426b71c7';
	const product = {
		categories: ['pc-components'],
		subCategories: [],
		specifications: [
			{
				heading: 'General',
				rows: [
					[
						'Product Name',
						'64GB (4PK 16GB) 3200MHz DDR4 DIMM Desktop Memory Kit with RGB Lighting',
					],
					['Brand', 'PNY'],
					['Memory Capacity (per module)', '16 GB'],
					['Number of Modules', 4],
				],
			},
		],
		// specifications: [
		// 	{
		// 		heading: 'General',
		// 		rows: [
		// 			[
		// 				'Product Name',
		// 				'ENVY Desktop - Intel Core i7 - 16GB Memory - 1TB SSD',
		// 			],
		// 			['Brand', 'HP'],
		// 			['Model Number', 'MKGP3LL/A'],
		// 			['Color', 'Black'],
		// 		],
		// 	},

		// 	{
		// 		heading: 'Processor',
		// 		rows: [
		// 			['Processor Brand', 'Intel'],
		// 			['Processor Model', 'Intel 10th Generation Core i7'],
		// 			['Processor Cores', '8-core'],
		// 			['Processor Speed', '2.9 GHz'],
		// 		],
		// 	},
		// 	{
		// 		heading: 'Storage',
		// 		rows: [
		// 			['Storage Type', 'SSD'],
		// 			['Total Storage Capacity', '1024 GB'],
		// 		],
		// 	},
		// 	{
		// 		heading: 'Memory',
		// 		rows: [
		// 			['System Memory (RAM)', '16 GB'],
		// 			['Type of RAM', 'DDR4'],
		// 			['RAM Speed', '2933 megahertz'],
		// 		],
		// 	},
		// 	{
		// 		heading: 'Dimensions',
		// 		rows: [
		// 			['Height', '13.28 inches'],
		// 			['Width', '6.12 inches'],
		// 			['Depth', '11.97 inches'],
		// 			['Weight', '13.5 pounds'],
		// 		],
		// 	},
		// ],
	};

	const prod = await ProductModel.findOneAndUpdate({ _id }, product, {
		new: true,
	});

	res.json({ prod });
};

export default updateProduct;
