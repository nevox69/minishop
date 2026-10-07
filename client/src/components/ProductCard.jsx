import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const ProductCard = (props) => {
  const { userId } = useAuth();
  const [showEdit, setShowEdit] = useState(false);

  const { dispatch, cart } = useCart();
  const inCart = cart.some((item) => item._id === props.product._id);

  const cartFun = () => {
    if (!inCart) {
      dispatch({
        type: "Add_Cart",
        payload: props.product._id,
      });
    } else {
      dispatch({
        type: "Remove_cart",
        payload: props.product._id,
      });
    }
  };

  //Edit form store
  const [title, setTitle] = useState(props.product.title);
  const [price, setPrice] = useState(props.product.price);
  const [description, setDescription] = useState(props.product.description);
  const [image, setImage] = useState(props.product.image);
  const [category, setCategory] = useState(props.product.category);

  const handleEdit = async () => {
    setShowEdit(true);
    console.log(showEdit);
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/products/${props.product._id}`);
      await props.onUpdate();

      console.log(response.data);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  const editFrom = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/products/${props.product._id}`, {
        title,
        price,
        description,
        image,
        category,
      });

      console.log(response.data);
      await props.onUpdate();
      setShowEdit(false);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  return (
    <>
      <div className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-gray-700 hover:shadow-2xl">
        {/* Product Image */}
        <div className="aspect-[4/3] overflow-hidden bg-gray-800">
          <img
            src={props.product.image}
            alt={props.product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="p-5">
          {/* Title + Category */}
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-xl font-bold text-white">
              {props.product.title}
            </h2>

            <span className="shrink-0 rounded-full bg-gray-800 px-3 py-1 text-xs font-medium text-gray-400">
              {props.product.category}
            </span>
          </div>

          {/* Price */}
          <p className="mt-3 text-xl font-bold text-green-400">
            ${props.product.price}
          </p>

          {/* Description */}
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-400">
            {props.product.description}
          </p>

          {/* Add / Remove Cart */}
          <div className="mt-5 border-t border-gray-800 pt-4">
            <button
              onClick={cartFun}
              className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white transition active:scale-95 ${
                inCart
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-green-600 hover:bg-green-500"
              }`}
            >
              {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>

          {/* Owner Actions */}
          {String(props.product.user) === userId && (
            <div className="mt-5 flex gap-3 border-t border-gray-800 pt-4">
              <button
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 active:scale-95"
                onClick={handleEdit}
              >
                Edit
              </button>

              <button
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-500 active:scale-95"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Popup */}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <form
            className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl"
            onSubmit={editFrom}
          >
            <h2 className="mb-6 text-2xl font-bold text-white">Edit Product</h2>

            {/* Title */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Title
              </label>

              <input
                type="text"
                placeholder="Enter product title"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Price
              </label>

              <input
                type="number"
                placeholder="Enter product price"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Description
              </label>

              <textarea
                rows="4"
                placeholder="Enter product description"
                className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Image */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Image URL
              </label>

              <input
                type="text"
                placeholder="Enter image URL"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Category
              </label>

              <input
                type="text"
                placeholder="Enter product category"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 rounded-lg border border-gray-700 px-4 py-2.5 font-medium text-gray-300 transition hover:bg-gray-800 active:scale-95"
                onClick={() => {
                  setShowEdit(false);
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-500 active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ProductCard;
