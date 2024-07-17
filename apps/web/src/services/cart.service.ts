import instance from '../utils/instances';

export const getCartByUserID = async (user_id: number) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(`/cart/user/${user_id}`, config);
    const cart = data?.data;
    return cart;
  } catch (err) {
    console.error(err);
  }
};

export const getCartByID = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(`/cart/${id}`, config);
    const cart = data?.data;
    return cart;
  } catch (err) {
    console.log(err);
  }
};
export const createCartItem = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/cart/item', formData, config);
    const cartItem = data?.data;
    return cartItem;
  } catch (err) {
    console.error(err);
  }
};

export const deleteCartItem = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.delete(`/cart/item/${id}`, config);
    const cartItem = data?.data;
    return cartItem;
  } catch (err) {
    console.log(err);
  }
};

export const updateCart = async (id: number, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(`/cart/${id}`, formData, config);
    const cart = data?.data;
    return cart;
  } catch (err) {
    console.error(err);
  }
};
export const deleteCart = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.delete(`/cart/${id}`, config);
    const cart = data?.data;
    return cart;
  } catch (err) {
    console.error(err);
  }
};

export const resetCartItems = async (cart_id: number) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await instance.delete(`/cart/items/${cart_id}`, config);
    return true;
  } catch (err) {
    console.error(err);
  }
};
