import { PrismaClient } from '@prisma/client';
import { IOrder, FilterOrder, ResultOrder} from '@/interfaces/order.interface';
import cron from 'node-cron'; 

const prisma = new PrismaClient();

const getOrdersByUserQuery = async (userID: number) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        user_id: userID,
      },
    });
    return orders
  } catch (e) {
    throw e;
  }
};

const createOrderQuery = async (data: IOrder) => {
  try {
    const {
      user_id,
      store_id,
      voucher_id,
      status,
      totalAmount,
      createdAt,
      updateAt,
    } = data;

        const order = await prisma.order.create({
            data: {
                user_id,
                store_id,
                voucher_id,
                status,
                totalAmount,
                createdAt, 
                updateAt
                
            }
        })

        return order

    } catch (err) {
        throw err
        
    }
}

const confirmOrderByUserQuery = async (id: number, status: string) => {
  try {
    await prisma.$transaction(async (prisma) => {
      const confirmOrder = await prisma.order.update({
        where: { id },
        data: {
          status,
        },
      });
      return confirmOrder;
    });
  } catch (e) {
    throw e;
  }
};

cron.schedule('0 0 */24 */2 *', async () => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: 'SHIPPED',
        updateAt: {
          lt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
      },
    });

    await Promise.all(
      orders.map((order) =>
        prisma.order.update({
          where: { id: order.id },
          data: {
            status: 'CONFIRMED BY USER',
          },
        }),
      ),
    );
  } catch (e) {
    console.error(e);
  }
});

const getOrderQuery = async ( 
  filters: FilterOrder,
): Promise<ResultOrder> => {
  try {
    const { user_id = '', page = 1, pageSize = 10 } = filters;
    const skip = Number(page) > 1 ? (Number(page) - 1) * Number(pageSize) : 0;
    const take = Number(pageSize);
    const userIdString = user_id.toString();

    const order = await prisma.order.findMany({
      include:{
        user: true,
        store: true
      },
      where: {
        status: { contains: userIdString },
      },
      skip,
      take,
    });

    const data = await prisma.order.aggregate({
      _count: {
        id: true,
      },
      where: {
        status: {
          contains: userIdString,
        },
      },
    });

    const count = data._count.id;
    const pages = Math.ceil(count / pageSize);
    return { order, pages };
  } catch (err) {
    throw err;
  }
};

const getOrderByIDQuery = async (id: number) => {
  try {
    const order = await prisma.order.findUnique({
      include: {
        user: true,
        store:true,
        
      },
      where: {
        id: Number(id),
      },
    });
    return order;
  } catch (err) {
    throw err;
  }
};

export {createOrderQuery, getOrderQuery, confirmOrderByUserQuery, getOrdersByUserQuery, getOrderByIDQuery}