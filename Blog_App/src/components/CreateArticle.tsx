"use client";

import { useState } from "react";

function CreateArticle() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleCreateArticle = () => {
    fetch("http://localhost:3001/articles", {
      method: "POST",
      body: JSON.stringify({
        id: Math.floor(Math.random() * 1000).toString(),
        title: title,
        description: description,
      }),
    });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="bg-slate-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Create Article
        </h2>
        <form className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              placeholder="Enter title"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              placeholder="Enter description"
              rows="6"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleCreateArticle}
              className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateArticle;
