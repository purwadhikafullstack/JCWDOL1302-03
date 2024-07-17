import { httpException } from '@/exceptions/http.exception';
import {
  FilterStock,
  IStock,
  ResultStock,
} from '@/interfaces/stock.interface';
import { createStockQuery, updateStockQuery, getStockByIDQuery, getStockQuery, deleteStockQuery } from '@/queries/stock.query';
import { Product } from '@prisma/client';


const createStockAction = async (data: IStock, token: any ) => {
    try {
        const product = await createStockQuery(data, token)

        return product
    } catch (err) {
        throw err
    }
}

const updateStockAction = async (id: number, filters: {
    store_id?: number
    product_id?: number
    description?: string
    quantity?: number
}) =>{
    try {
        const updateStock = await updateStockQuery (id, filters)

        return updateStock
    } catch (err) {
        throw err
    }
}

const getStockAction = async ( 
  filters: FilterStock,
): Promise<ResultStock> => {
  try {
    const stock = await getStockQuery(filters);

    return stock;
  } catch (err) {
    throw err;
  }
};

const getStockByIDAction = async (id: number): Promise<IStock | null> => {
  try {
    const stock = await getStockByIDQuery(id);

    if (!stock) throw new httpException(404, 'Data not found');

    return stock;
  } catch (err) {
    throw err;
  }
};

const deleteStockAction = async (id: number): Promise<IStock> => {
  try {
    const deleteProduct = await deleteStockQuery(id);

    return deleteProduct;
  } catch (err) {
    throw err;
  }
};



export {
  createStockAction,
  getStockAction,
  getStockByIDAction,
  updateStockAction,
  deleteStockAction
};
