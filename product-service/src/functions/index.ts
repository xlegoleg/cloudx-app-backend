import { default as getProductsList } from './get-products-list';
import { default as getProductsById } from './get-products-by-id';
import { default as createProduct } from './create-product';
import { default as catalogBatchProcess } from './catalog-batch-process';


const functions = {
    getProductsList,
    getProductsById,
    createProduct,
    catalogBatchProcess,
}

export default functions;
