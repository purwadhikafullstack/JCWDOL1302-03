'use client';

import api from '@/api/apiApp';
import { formatRupiah } from '@/app/utils/formatRupiah';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';

import {
  getCartByUserID,
  createCartItem,
  resetCartItems,
  updateCart,
} from '@/services/cart.service';
import { getDistanceStores } from '@/services/store.service';
import {
  updateCartItemsState,
  updateCartStoreState,
} from '@/lib/features/cart/cartSlice';
import toast from 'react-hot-toast';

type Props = {
  product: any;
};

interface Category {
  id: number;
  category: string;
}

const ProductDetails = ({ product }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const [isAllow, setIsAllow] = useState(false);
  const [stores, setStores] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    cart_id: '',
    product_id: product?.id,
    name: product?.name,
    description: product?.description,
    price: product.price,
    quantity: 0,
  });

  useEffect(() => {
    (async () => {
      if (!user.id || user.role !== 'User' || !user.verified) return;

      const dataCart = await getCartByUserID(Number(user.id));
      if (!dataCart.id) return;

      setFormData((prevFormData) => ({
        ...prevFormData,
        cart_id: dataCart.id,
      }));
      setIsAllow(true);

      const dataStores = await getDistanceStores({
        longitude: user.longitude,
        latitude: user.latitude,
      });
      setStores(dataStores);

      if (dataCart.store_id) {
        dispatch(updateCartStoreState({ store_id: dataCart.store_id }));
      }
    })();
  }, [dispatch, user]);

  type ChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;

  const handleChange = (e: ChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeStore = async (e: ChangeEvent) => {
    const newStoreId = e.target.value;
    if (!newStoreId) return;
    if (
      !confirm(
        `If you change the store it will delete all the items in the cart, do you want to continue?`,
      )
    )
      return;

    try {
      const resultUpdate = await updateCart(Number(formData.cart_id), {
        store_id: Number(newStoreId),
      });
      if (!resultUpdate) throw new Error('Update cart failed!');

      const resultReset = await resetCartItems(Number(formData.cart_id));
      if (!resultReset) throw new Error('Reset cart items failed!');

      dispatch(
        updateCartStoreState({
          store_id: Number(newStoreId),
        }),
      );
      dispatch(
        updateCartItemsState({
          itemsCount: 0,
          totalAmount: 0,
        }),
      );
      toast.success('Update store success');
    } catch (err) {
      console.error(err);
      toast.error('Update store failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const cartItem = await createCartItem(formData);
      if (!cartItem) throw new Error('Add to cart failed!');

      if (user.id) {
        const dataCart = await getCartByUserID(Number(user.id));
        dispatch(
          updateCartItemsState({
            itemsCount: dataCart.cartItems.length,
            totalAmount: dataCart.totalAmount,
          }),
        );
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        quantity: 1,
      }));
      toast.success('Add to cart success');
    } catch (err) {
      console.error(err);
      toast.error('Add to cart failed');
    }
  };

  const [categories, setCategories] = useState<Category[]>([]);

  const getListCategories = async () => {
    try {
      const result = await api.get('/api/categories/');
      setCategories(result.data.data);
      console.log(result);
    } catch (err) {
      console.log('Failed to fetch categories:', err);
    }
  };

  useEffect(() => {
    getListCategories();
  }, []);

  const categoryName = useMemo(() => {
    return categories.find((category) => category.id === product.category_id)
      ?.category;
  }, [categories, product.category_id]);

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <Image
            className="rounded-md w-full h-full object-cover"
            alt={product.name}
            src={
              product.image
                ? process.env.NEXT_PUBLIC_BASE_PRUDUCT_IMAGE_URL + product.image
                : '/default_img.jpg'
            }
            width="0"
            height="0"
            sizes="50vw"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <header>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-accentDark uppercase">
                {product.name}
              </h1>
              <p className="mt-4 text-2xl font-bold text-gray-900">
                {formatRupiah(product.price)}
              </p>
            </header>

            <div className="space-y-6 border-t border-gray-200 pt-4">
              <div className="space-y-4">
                <p className="text-2xl font-light text-gray-500">
                  Description:
                </p>
                <p className="text-lg">{product.description}</p>
              </div>
              <div></div>
              <div className="space-y-4">
                {isAllow && (
                  <div className="space-y-4">
                    <div>
                      <label className="form-label font-bold">Store</label>
                      <select
                        id="store_id"
                        name="store_id"
                        value={cart.store_id}
                        onChange={handleChangeStore}
                        className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                        required
                      >
                        {stores?.map((store) => (
                          <option key={store.id} value={store.id}>
                            {`${store.name}, ${(store.distance || 0).toFixed(2)} km`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-control" id="quantity">
                      <label className="form-label font-bold">Quantity </label>
                      <input
                        name="quantity"
                        placeholder="Quantity"
                        className="input w-1/2 mr-5"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        min={1}
                      />
                    </div>
                  </div>
                )}
                {isAllow && (
                  <button
                    className="w-full py-3 mt-8 text-lg font-medium uppercase bg-accentDark text-white rounded-md hover:bg-accent disabled:bg-gray-400 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={product.stock <= 0}
                  >
                    <span className="ml-5">Add to Cart</span>
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2"></div>
          </div>
        </form>
        <div>
          <ul className="space-y-2">
            <li>
              <span className="font-bold">Category: </span>
              {categoryName}
            </li>
            <li>
              <span className="font-bold">Stock: </span>
              {product.stock}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
