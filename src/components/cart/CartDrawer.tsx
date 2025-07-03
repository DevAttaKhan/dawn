"use client";
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { closeDrawer, removeItem, updateQuantity } from "@/store/cartSlice";
import Image from "next/image";

const CartDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.cart.open);
  const items = useSelector((state: RootState) => state.cart.items);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQtyChange = (id: string, qty: number) => {
    if (qty < 1) return;
    dispatch(updateQuantity({ id, quantity: qty }));
  };

  return (
    <Transition show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => dispatch(closeDrawer())}
      >
        {/* Overlay */}
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 transition-opacity" />
        </Transition.Child>

        {/* Drawer Panel */}
        <div className="fixed inset-0 flex justify-end">
          <Transition.Child
            as={React.Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="w-full max-w-md h-full bg-white shadow-xl flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-300">
                <Dialog.Title className="text-lg font-semibold">
                  Your Cart
                </Dialog.Title>
                <button
                  onClick={() => dispatch(closeDrawer())}
                  className="text-gray-400 hover:text-gray-700 focus:outline-none"
                  aria-label="Close cart"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {items.length === 0 ? (
                  <div className="text-gray-400 text-center py-12">
                    Your cart is empty.
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 items-center border-b border-gray-300 pb-4 last:border-b-0"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center border border-gray-300">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-gray-300 text-2xl">?</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate mb-1">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500 mb-1">
                          ${(item.price / 100).toFixed(2)}
                        </div>
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 text-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                            onClick={() =>
                              handleQtyChange(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) =>
                              handleQtyChange(item.id, Number(e.target.value))
                            }
                            className="w-12 text-center border border-gray-300 rounded px-1 py-1 text-sm focus:ring-2 focus:ring-purple-200"
                          />
                          <button
                            className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 text-lg text-gray-700 hover:bg-gray-100"
                            onClick={() =>
                              handleQtyChange(item.id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="text-xs text-red-500 hover:underline ml-2"
                        onClick={() => dispatch(removeItem(item.id))}
                        aria-label={`Remove ${item.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
              {/* Footer */}
              <div className="p-4 border-t border-gray-300 flex flex-col gap-3 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold text-lg">
                    ${(subtotal / 100).toFixed(2)}
                  </span>
                </div>
                <button
                  className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-900 transition disabled:opacity-50"
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CartDrawer;
