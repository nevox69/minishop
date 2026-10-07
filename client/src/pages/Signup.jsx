import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/signup", {
        name,
        email,
        password,
      });

      console.log(response.data);

      setName("");
      setEmail("");
      setPassword("");

      console.log("Before navigate");

      navigate("/login");

      console.log("After navigate");
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-96"
        onSubmit={submitHandler}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

        <div className="mb-4">
          <label className="block mb-2">Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-2 rounded"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 p-2 rounded"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
