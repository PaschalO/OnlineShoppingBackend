import {Request, Response} from "express";
import {Product} from "../utilities/types";
import {ProductStore} from "../models/product";

const store = new ProductStore();

const showAllProducts = async (req: Request, res: Response) => {
    const products = await store.getAllProducts();
    res.status(200).json(products)
}

const showSingleProduct = async (req: Request, res: Response) => {
    const productId: number = req.body.id;
    const product = await store.getProductById(productId);
    res.status(200).json(product)
}

const showProductsByCategory = async (req: Request, res: Response) => {
    const productCategory: string = req.body.category;
    const product = await store.getProductByCategory(productCategory);
    res.status(200).json(product)
}

const showTopFivePopularProducts = async (req: Request, res: Response) => {
    const product = await store.getTopFivePopularProducts();
    res.status(200).json(product)
}

const deleteSingleProduct = async (req: Request, res: Response) => {
    const productId: number = req.body.id;
    const product = await store.deleteProduct(productId);
    res.status(200).json(product)
}

export {
    showAllProducts,
    showSingleProduct,
    showProductsByCategory,
    showTopFivePopularProducts,
    deleteSingleProduct
}

