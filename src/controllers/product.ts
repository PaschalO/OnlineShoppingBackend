import {Request, Response} from "express";
import {Product} from "../utilities/types";
import {ProductStore} from "../models/product";

const store: ProductStore = new ProductStore();

const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            image: req.body.image,
            in_stock: req.body.in_stock
        }

        const newProduct: Product | null = await store.createProduct(product);
        res.status(200).json(newProduct);
    }
    catch (error) {
        res.status(400).json({message: `unable to create a product: ${error}`});
    }

}

const showAllProducts = async (req: Request, res: Response): Promise<void> => {
    const products: Product[] | null = await store.getAllProducts();
    res.status(200).json(products)
}

const showSingleProduct = async (req: Request, res: Response): Promise<void> => {
    const productId: number = parseInt(req.params.id);
    const product: Product | null = await store.getProductById(productId);
    res.status(200).json(product)
}

const showProductsByCategory = async (req: Request, res: Response): Promise<void> => {
    const productCategory: string = req.query.products as string;
    console.log(productCategory)
    const product: Product[] | null = await store.getProductByCategory(productCategory);
    res.status(200).json(product)
}

const showTopFivePopularProducts = async (req: Request, res: Response) => {
    const product: Product[] | null = await store.getTopFivePopularProducts();
    res.status(200).json(product)
}

const removeProduct = async (req: Request, res: Response) => {
    const productId: number = parseInt(req.params.id);
    const product: Product | null = await store.deleteProduct(productId);
    res.status(200).json('success');
}

export {
    showAllProducts,
    showSingleProduct,
    showProductsByCategory,
    showTopFivePopularProducts,
    removeProduct,
    createProduct
}

