"use client";
import { resetCart } from "@/app/redux/cartSlice";
import CartItem from "./CartItem";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import emptyCart from "../assets/emptyCart.png";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Price from "./Price";
import { useEffect, useState } from "react";
import {  StateProps } from "@/types";
function Carts() {
  const { productData } = useSelector((state : StateProps) => state.cart);
  const dispatch = useDispatch();
  const [totalAmt, setTotalAmt] = useState(0);
  //Price calculation
  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item?.price * item?.qty;
      return price;
    });
    setTotalAmt(price);
  }, [productData]);

  const handleReset = () => {
    const confirmed = window.confirm("Are You sure to reset your cart ?");
    if(confirmed){
      dispatch(resetCart());
    }  
    
    toast.success("Cart resetted successfully");
  };
  return (
    <Container>
      {productData?.length > 0 ? (
        <div className="pb-20">
          <div
            className="w-full h-20 bg-[#f5f7f7] text-primeColor hidden lg:grid grid-cols-5
           place-content-center px-6 text-lg font-semibold "
          >
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {productData.map((item ) => (
              <div key={item?.id}>
                <CartItem item={item} />
              </div>
            ))}
          </div>
          <button
            onClick={handleReset}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset Cart
          </button>
          <div className="flex flex-col md:flex-row border  justify-between items-center gap-2 md:gap-0 p-4 ">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Coupon Number"
                className="w-44 lg:w-52  h-8  px-4 border text-primeColor"
              />
              <p className="text-lg font-semibold">Apply Coupon</p>
            </div>
            <p>Update cart</p>
          </div>
          <div className="max-w-7xl gap-4 flex justify-end mt-4 px-4 mx-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right ">
                Cart Totals
              </h1>
              <div>
                <p
                  className="flex items-center justify-between
                   border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium "
                >
                  Subtotal
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    <Price amount={totalAmt} />
                  </span>
                </p>
                <p
                  className="flex items-center justify-between
                   border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium "
                >
                  shipping charge
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    <Price amount={0} />
                  </span>
                </p>
                <p
                  className="flex items-center justify-between
                   border-[1px] border-gray-400  py-1.5 text-lg px-4 font-medium "
                >
                  Subtotal
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    <Price amount={totalAmt} />
                  </span>
                </p>
              </div>
              <div className="flex justify-end ">
                <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 pb-20 text-sm outline-none border-gray-400 "
        >
          <div>
            <Image
              src={emptyCart}
              alt="emptyCart"
              className="w-80 rounded-lg p-4 mx-auto"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex flex-col gap-4 items-center rounded-md shadow-lg">
            <h1 className="text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link
              href={"/"}
              className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-semibold text-lg text-gray-200 hover:text-white duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      )}
    </Container>
  );
}

export default Carts;
