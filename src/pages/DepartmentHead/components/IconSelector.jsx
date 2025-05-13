import React, { useEffect, useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import debounce from "lodash.debounce";

const IconSelector = ({ onSelect }) => {
  const [icons, setIcons] = useState([]);
  const [filteredIcons, setFilteredIcons] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const iconsPerPage = 60;

  useEffect(() => {
    fetch("/mdi-icons.json")
      .then((res) => res.json())
      .then((data) => {
        setIcons(data);
        setFilteredIcons(data);
      });
  }, []);

  // Debounced Search Handler
  const handleSearch = useMemo(
    () =>
      debounce((query) => {
        setFilteredIcons(
          icons.filter((icon) =>
            icon.toLowerCase().includes(query.toLowerCase())
          )
        );
        setCurrentPage(1); // reset to first page
      }, 300),
    [icons]
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
    handleSearch(e.target.value);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredIcons.length / iconsPerPage);
  const startIndex = (currentPage - 1) * iconsPerPage;
  const currentIcons = filteredIcons.slice(
    startIndex,
    startIndex + iconsPerPage
  );

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search icons..."
        className="p-2 border rounded w-full"
      />

      {/* Icon Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {currentIcons.map((iconName) => (
          <button
            className="flex items-center border-black !border-2 justify-center rounded-xl px-2 py-1"
            key={iconName}
            onClick={() => onSelect(iconName)}
            type="button"
          >
            <Icon icon={`mdi:${iconName}`} width="32" height="32" />
          </button>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mb-4">
        <button
          type="button"
          className="rounded-md !w-[10rem]"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          className="rounded-md !w-[10rem] "
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default IconSelector;
