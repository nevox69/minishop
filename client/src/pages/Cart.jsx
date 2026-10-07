import { useCart } from "../context/CartContext";

const Cart = (props) => {
  const { dispatch, cart } = useCart();

  const totalPrice = cart.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-950 p-8 text-white">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {/* Cart Item */}
          {cart.map((carts) => {
            return (
              <div className="flex items-center gap-4 rounded-xl bg-gray-900 p-4">
                <img
                  src={carts.image}
                  alt="Product"
                  className="h-24 w-24 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{carts.title}</h2>
                  <p className="mt-1 text-gray-400">${carts.price}</p>
                </div>

                <button
                  className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-500"
                  onClick={() =>
                    dispatch({ type: "Remove_cart", payload: carts._id })
                  }
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        {/* Cart Summary */}
        <div className="h-fit rounded-xl bg-gray-900 p-6">
          <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

          <div className="mb-3 flex justify-between text-gray-400">
            <span>Subtotal</span>
            <span>${totalPrice}</span>
          </div>

          <button className="w-full rounded-lg bg-blue-600 py-3 font-medium hover:bg-blue-500">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
