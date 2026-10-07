import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const formHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("category", category);

    try {
      console.log("📤 SENDING FORM DATA");

      const response = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ SERVER RESPONSE:", response.data);

      setTitle("");
      setPrice("");
      setDescription("");
      setImage(null);
      setCategory("");

      navigate("/");
    } catch (err) {
      console.log("🔥 FRONTEND ERROR:", err);
      console.log("STATUS:", err.response?.status);
      console.log("SERVER MESSAGE:", err.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-96"
        onSubmit={formHandler}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Add Product</h1>

        {/* TITLE */}
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

        {/* PRICE */}
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

        {/* DESCRIPTION */}
        <div className="mb-4">
          <label className="block mb-2">Description</label>

          <textarea
            placeholder="Enter product description"
            className="w-full border border-gray-300 p-2 rounded"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        {/* IMAGE */}
        <div className="mb-4">
          <label className="block mb-2">Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>

        {/* CATEGORY */}
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
