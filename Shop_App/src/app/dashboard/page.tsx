"use client";
import Container from "@/components/Container";
import axios from "axios";
import { ChangeEvent, useState } from "react";

function Dashboard() {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChangeProduct = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleCreateProduct = () => {
    axios({
      method: "POST",
      url: "http://localhost:3004/products",
      data: {
        id: Math.floor(Math.random() * 1000).toString(),
        image: newProduct.image,
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
          Create New Product
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            onChange={handleChangeProduct}
            name="title"
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-white"
            type="text"
            placeholder="Product Title"
          />
          <input
            onChange={handleChangeProduct}
            name="price"
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-white"
            type="text"
            placeholder="Price"
          />
          <input
            onChange={handleChangeProduct}
            name="image"
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-white"
            type="text"
            placeholder="Image URL"
          />
        </div>
        <textarea
          onChange={handleChangeProduct}
          name="description"
          placeholder="Product Description"
          className="mt-4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-white w-full h-24 resize-none"
        ></textarea>
        <button
          onClick={handleCreateProduct}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          Create Product
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
