"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.set("title", search);
    router.push(`/store?${currentSearchParams.toString()}`);
  };

  return (
    <div>
      <input
        onChange={(e) => setSearch(e.target.value)}
        className="bg-slate-400 p-2 rounded-xl"
        type="text"
        placeholder="search"
      />
      <button
        onClick={handleSearch}
        className="bg-sky-500 text-white p-2 rounded-xl"
      >
        search
      </button>
    </div>
  );
}

export default Search;
