import { Product } from "../dataTypes/product";

/*
 * Mock data to be used for Product model test & endpoint tests
 *
 * */
export const productsData: Product[] = [
	{
		name: "Apple Laptop",
		price: 2499.99,
		category: "Electronics",
		description: "A brown laptop with 512GB, 16 RAM etc.",
		image: "https://www.apple.com/ca/shop/buy-mac/macbook-pro/14-inch",
		in_stock: false
	},
	{
		name: "HP Laptop",
		price: 1300.99,
		category: "Electronics",
		description: "A silver laptop with 512GB, 16 RAM etc.",
		image: "https://www.apple.com/ca/shop/buy-mac/macbook-pro/14-inch",
		in_stock: true
	},
	{
		name: "Microsoft Laptop",
		price: 1999.99,
		category: "Electronics",
		description: "A black laptop with 512GB, 16 RAM etc.",
		image: "https://www.apple.com/ca/shop/buy-mac/macbook-pro/14-inch",
		in_stock: true
	},
	{
		name: "Flour - Buckwheat, Dark",
		price: 37.54,
		category: "Books",
		description:
			"Transfer Right Foot Muscle with Subcu, Perc Endo Approach",
		image: "data:image/png;base64,ifx8r0cMSGVeeV",
		in_stock: true
	},
	{
		name: "Vinegar - Sherry",
		price: 16.28,
		category: "Automotive",
		description:
			"Revision of Infusion Dev in Lumsac Disc, Perc Endo Approach",
		image: "data:image/png;base64,iVBORw0KGgoA",
		in_stock: false
	},
	{
		name: "Apricots Fresh",
		price: 36.56,
		category: "Food",
		description:
			"Introduce Oth Therap Subst in Bil/Panc Tract, Via Opening",
		image: "data:image/png;base64,iZ1HZ3tTb58X52XePymwm5D",
		in_stock: false
	},
	{
		name: "Mustard - Pommery",
		price: 34.06,
		category: "Beauty",
		description: "Replacement of Left Rib with Autol Sub, Perc Approach",
		image: "data:image/png;base64msQlLBNLSMTiEm5hGXXDJ6qb3zJiLaIiJy1Zpjy58",
		in_stock: true
	},
	{
		name: "Beef Cheek Fresh",
		price: 12.25,
		category: "Beauty",
		description: "Female Reproductive System, Resection",
		image: "dYmUgSW1hZ2VSZWFkeXHJZTwAAAKGSUrooWFFBRVB4WMi7YVjipWgzEmp3D81m5MnsIVzS",
		in_stock: true
	},
	{
		name: "Tumeric",
		price: 35.29,
		category: "Books",
		description: "Reattachment of Left Tunica Vaginalis, Open Approach",
		image: "data:image/png;base64,iovMrpOJk4vrI/E1JiZzjF4cEbHp+HyIx+C2otggg==",
		in_stock: false
	}
];
