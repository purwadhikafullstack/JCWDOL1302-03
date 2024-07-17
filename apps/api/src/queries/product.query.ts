import { PrismaClient, Product } from '@prisma/client';
import {
  FilterProduct,
  IProduct,
  ResultProduct,
} from '@/interfaces/product.interface';

const prisma = new PrismaClient();

const createProductQuery = async (
  data: IProduct,
  image: string,
  token: any,
) => {
  try {
    const adminId = token.id;
    const { name, description, price, category_id, stock } = data;

    const categoryIdInt = parseInt(category_id as unknown as string, 10);
    const priceFloat = parseFloat(price as unknown as string);
    const stockFloat = parseFloat(stock as unknown as string);

    const product = await prisma.product.create({
      data: {
        admin_id: adminId,
        name,
        description,
        price: priceFloat,
        category_id: categoryIdInt,
        image,
        stock: stockFloat,
      },
    });
    return product;
  } catch (err) {
    throw err;
  }
};

const getProductsQuery = async (
  filters: FilterProduct,
): Promise<ResultProduct> => {
  try {
    const { name = '', page = 1, pageSize = 10000 } = filters;
    const skip = Number(page) > 1 ? (Number(page) - 1) * Number(pageSize) : 0;
    const take = Number(pageSize);

    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      where: {
        name: { contains: name },
      },
      skip,
      take,
    });

    const data = await prisma.product.aggregate({
      _count: {
        id: true,
      },
      where: {
        name: {
          contains: name,
        },
      },
    });

    const count = data._count.id;
    const pages = Math.ceil(count / pageSize);
    return { products, pages };
  } catch (err) {
    throw err;
  }
};

const getProductByIDQuery = async (id: number): Promise<Product | null> => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        Inventory: {
          select: {
            quantity: true,
          },
        },
      },
    });
    return product;
  } catch (err) {
    throw err;
  }
};

const getProductsByAdminIDQuery = async (admin_id: number) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        admin_id: Number(admin_id),
      },
    });
    return products;
  } catch (e) {
    throw e;
  }
};

const updateProductQuery = async (
  id: number,
  filters: {
    admin_id?: number;
    name?: string;
    description?: string;
    price?: number;
    category_id?: number;
    image?: string;
    stock?: number; // Change this to number
  },
): Promise<IProduct> => {
  try {
    const updateProduct = await prisma.product.update({
      where: { id },
      data: {
        ...filters,
      },
    });
    return updateProduct;
  } catch (err) {
    throw err;
  }
};

const deleteProductQuery = async (id: number): Promise<IProduct> => {
  try {
    const deleteProduct = await prisma.product.delete({
      where: { id },
    });
    return deleteProduct;
  } catch (err) {
    throw err;
  }
};

export {
  createProductQuery,
  getProductsQuery,
  getProductByIDQuery,
  getProductsByAdminIDQuery,
  updateProductQuery,
  deleteProductQuery,
};
