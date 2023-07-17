import {Product} from "../utilities/types";

/*
* Mock data to be used for Product model test & endpoint tests
*
* */
export const productsData: Product[] =
    [
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
    ]