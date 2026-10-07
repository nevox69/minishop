import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/products", {
        title,
        price,
        description,
        image,
        category,
      });

      console.log(response);

      setTitle("");
      setPrice("");
      setDescription("");
      setImage("");
      setCategory("");

      navigate("/");
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-96"
        onSubmit={formHandler}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Add Product</h1>

        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter product title"
            className="w-full border border-gray-300 p-2 rounded"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <input
            type="number"
            placeholder="Enter product price"
            className="w-full border border-gray-300 p-2 rounded"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            placeholder="Enter product description"
            className="w-full border border-gray-300 p-2 rounded"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Image</label>
          <input
            type="text"
            placeholder="Enter image URL"
            className="w-full border border-gray-300 p-2 rounded"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">Category</label>
          <input
            type="text"
            placeholder="Enter product category"
            className="w-full border border-gray-300 p-2 rounded"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded active:scale-95"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
