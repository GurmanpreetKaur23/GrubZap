import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(searchQuery);
    setSearchQuery("");
    navigate("/fooditems", { state: { dishName: searchQuery } });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white rounded-lg shadow-md py-3 px-2"
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        className="flex-grow border-none outline-none px-4 py-1"
      />
      <button
        type="submit"
        className="px-2 py-1 bg-amber-400 text-white rounded-md hover:bg-amber-500"
      >
        <i className="ri-search-line"></i>
      </button>
    </form>
  );
}
