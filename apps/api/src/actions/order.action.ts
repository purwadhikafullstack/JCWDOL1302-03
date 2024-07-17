import { createOrderQuery, confirmOrderByUserQuery, getOrdersByUserQuery, getOrderQuery, getOrderByIDQuery } from "@/queries/order.query"
import { IOrder, FilterOrder, ResultOrder } from "@/interfaces/order.interface"

const getOrdersByUserAction = async (userID: number) => {
  try {
    const orders = await getOrdersByUserQuery(userID);
    return orders;
  } catch (e) {
    throw e;
  }
};

const createOrderAction = async (data: IOrder ) => {
    try {
        const order = await createOrderQuery(data)

        return order
    } catch (err) {
        throw err
    }
}

const confirmOrderByUserAction = async (id: number) => {
  try {
    const confirmOrder = await confirmOrderByUserQuery(id, 'CONFIRMED BY USER');
    return confirmOrder;
  } catch (err) {
    throw err;
  }
};

const getOrderAction = async (
  filters: FilterOrder,
): Promise<ResultOrder> => {
  try {
    const order = await getOrderQuery(filters);

    return order;
  } catch (err) {
    throw err;
  }
};

const getOrderByIDAction = async (id: number) => {
  try {
    const order = await getOrderByIDQuery(id);

   

    return order;
  } catch (err) {
    throw err;
  }
};

export { createOrderAction, confirmOrderByUserAction, getOrdersByUserAction, getOrderAction, getOrderByIDAction}