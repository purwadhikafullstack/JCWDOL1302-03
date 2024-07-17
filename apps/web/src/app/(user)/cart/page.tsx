'use client';

import { formatRupiah } from '@/app/utils/formatRupiah';
import { truncateText } from '@/app/utils/truncateText';
import Container from '@/components/Container';
import { updateCartItemsState } from '@/lib/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  createCartItem,
  deleteCartItem,
  getCartByUserID,
  updateCart,
} from '@/services/cart.service';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdArrowBack } from 'react-icons/md';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalAmount: number;
}

const Cart = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [cart, setCart] = useState<any>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [updatedQuantity, setUpdatedQuantity] = useState<{
    [id: number]: number;
  }>({});

  useEffect(() => {
    (async () => {
      if (!user.id) return;
      const data = await getCartByUserID(Number(user.id));
      setCart(data);
    })();
  }, [user]);

  const handleRemoveCartItem = async (id: number) => {
    if (!confirm('Are you sure to remove your cart item?' || !id)) return;

    try {
      const cartItem = await deleteCartItem(id);
      if (!cartItem) throw new Error('Remove cart failed');

      if (user.id) {
        const dataCart = await getCartByUserID(Number(user.id));
        setCart(dataCart);
        dispatch(
          updateCartItemsState({
            itemsCount: dataCart.cartItems.lenght,
            totalAmount: dataCart.totalAmount,
          }),
        );
      }
      toast.success('Yay! Remove cart item success');
    } catch (err) {
      console.log(err);
      toast.error('Failed to remove your cart item!');
    }
  };

  const handleUpdateQuantity = async (id: number, quantity: number) => {
    try {
      const response = await updateCart(id, { quantity });
      if (!response) throw new Error('Update quantity failed');

      const updatedCart = await createCartItem(Number(user.id));
      setCart(updatedCart);
      dispatch(
        updateCartItemsState({
          itemsCount: updatedCart.cartItems.length,
          totalAmount: updatedCart.totalAmount,
        }),
      );
      toast.success('Quantity updated successfully!');
    } catch (err) {
      console.log(err);
      toast.error('Failed to update quantity!');
    }
  };

  return (
    <>
      <Container>
        <div>
          <h1 className="items-center text-3xl my-10 font-semibold tracking-tight text-gray-90">
            Shopping Cart
          </h1>
        </div>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
          <div className="col-span-2 justify-self-start font-bold">PRODUCT</div>
          <div className="justify-self-center font-bold">PRICE</div>
          <div className="justify-self-center font-bold">QUANTITY</div>
          <div className="justify-self-end font-bold">TOTAL</div>
        </div>

        {cart && cart.cartItems && cart.cartItems.length > 0 ? (
          cart.cartItems.map((item: CartItem) => (
            <div
              key={item.id}
              className="grid grid-cols-5 text-sm gap-4 py-2 items-center border-b border-gray-200"
            >
              <div className="col-span-2 justify-self-start">
                {truncateText(item.name)}
              </div>
              <div className="justify-self-center">
                {formatRupiah(item.price)}
              </div>
              <div className="justify-self-center">
                <input
                  type="number"
                  value={item.quantity}
                  // onChange={(e) =>
                  //   setUpdatedQuantity({ [item.id]: parseInt(e.target.value) })
                  // }
                  // onBlur={(e) =>
                  //   handleUpdateQuantity(item.id, updatedQuantity[item.id])
                  // }
                  className="w-20 text-center border"
                />
              </div>
              <div className="justify-self-end">
                {formatRupiah(item.price * item.quantity)}
              </div>
              <button
                onClick={() => handleRemoveCartItem(item.id)}
                className="text-red-500 underline justify-self-start"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-10">Your cart is empty.</div>
        )}
        <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
          <div className="w-[80px]"></div>
          <div className="text-sm flex flex-col gap-1 items-end">
            <div className="flex justify-between w-full text-base font-semibold space-x-8">
              <span>Subtotal</span>
              <span>{formatRupiah(cart && cart.totalAmount)}</span>
            </div>
            <button
              onClick={() => {
                router.push('/checkout');
              }}
              className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200 mt-2"
            >
              Checkout
            </button>
            <Link
              href={'/products'}
              className="text-slate-500 flex items-center gap-1 mt-2"
            >
              <MdArrowBack />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
