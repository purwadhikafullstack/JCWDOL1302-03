import { PrismaClient, } from '@prisma/client';
import {
  FilterStock,
  IStock,
  ResultStock,
} from '@/interfaces/stock.interface';

const prisma = new PrismaClient();

const createStockQuery = async (data: IStock, token: any) => {
  try {

    const storeId = token.id
    const {product_id, description, quantity} = data;
    
    const productIdInt = parseInt(product_id as unknown as string, 10);
    const quantityIdInt = parseInt(quantity as unknown as string, 10);
   
   

    const stock = await prisma.inventory.create({
      data: {
        store_id : storeId,
        product_id: productIdInt,
        description,
        quantity: quantityIdInt,
      },
    });
    return stock;
  } catch (err) {
    throw err;
  }
};

const getStockQuery = async ( 
  filters: FilterStock,
): Promise<ResultStock> => {
  try {
    const { product_id = '', page = 1, pageSize = 10 } = filters;
    const skip = Number(page) > 1 ? (Number(page) - 1) * Number(pageSize) : 0;
    const take = Number(pageSize);
    
    const productIdString = product_id.toString();
    const stock = await prisma.inventory.findMany({
      include:{
        product: true,
        store: true
      },
      where: {
        description: { contains: productIdString },
      },
      skip,
      take,
    });

    const data = await prisma.inventory.aggregate({
      _count: {
        id: true,
      },
      where: {
        description: {
          contains: productIdString,
        },
      },
    });

    const count = data._count.id;
    const pages = Math.ceil(count / pageSize);
    return { stock, pages };
  } catch (err) {
    throw err;
  }
};

const getStockByIDQuery = async (id: number): Promise<IStock | null> => {
  try {
    const stock = await prisma.inventory.findUnique({
      include: {
        store: true,
        product:true
      },
      where: {
        id: Number(id),
      },
    });
    return stock;
  } catch (err) {
    throw err;
  }
};

const updateStockQuery = async (
  id: number,
  filters: {
    store_id?: number;
    description?: string;
    quantity?: number;

  },
): Promise<IStock> => {
  try {
    const updateStock = await prisma.inventory.update({
      where: { id },

      data: {
        ...filters,
      },
    });

    return updateStock;
  } catch (err) {
    throw err;
  }
};

const deleteStockQuery = async (id: number): Promise<IStock> => {
  try {
    const deleteStock = await prisma.inventory.delete({
      where: { id },
    });

    return deleteStock;
  } catch (err) {
    throw err;
  }
};


export {
  createStockQuery,
  getStockQuery,
  getStockByIDQuery,
  updateStockQuery,
  deleteStockQuery

};
