import { httpException } from '@/exceptions/http.exception';
import {
  FilterProduct,
  IProduct,
  ResultProduct,
} from '@/interfaces/product.interface';
import {
  createProductQuery,
  getProductsQuery,
  getProductByIDQuery,
  updateProductQuery,
  deleteProductQuery,
  getProductsByAdminIDQuery,
} from '@/queries/product.query';
import { Product } from '@prisma/client';

const createProductAction = async (data: IProduct, image: string, token: any ) => {
    try {
        const product = await createProductQuery(data, image, token)

    return product;
  } catch (err) {
    throw err;
  }
};

const updateProductAction = async (id: number, filters: {
    admin_id?: number
    name?: string
    description?: string
    price?: number
    category_id?: number
    image?: string
    stock?: string

}) =>{
    try {
        const updateProduct = await updateProductQuery (id, filters)

        return updateProduct
    } catch (err) {
        throw err
    }
}

const getProductsAction = async (
  filters: FilterProduct,
): Promise<ResultProduct> => {
  try {
    const product = await getProductsQuery(filters);

    return product;
  } catch (err) {
    throw err;
  }
};

const getProductByIDAction = async (id: number): Promise<Product | null> => {
  try {
    const product = await getProductByIDQuery(id);

    if (!product) throw new httpException(404, 'Data not found');

    return product;
  } catch (err) {
    throw err;
  }
};

const getProductByAdminIDAction = async (admin_id: number) => {
  try {
    const products = await getProductsByAdminIDQuery(admin_id);
    if (!products)
      throw new httpException(404, `Products from id ${admin_id} not found`);
    return products;
  } catch (e) {
    throw e;
  }
};

const deleteProductAction = async (id: number): Promise<IProduct> => {
  try {
    const deleteProduct = await deleteProductQuery(id);

    return deleteProduct;
  } catch (err) {
    throw err;
  }
};

export {
  createProductAction,
  getProductsAction,
  getProductByIDAction,
  getProductByAdminIDAction,
  updateProductAction,
  deleteProductAction,
};
