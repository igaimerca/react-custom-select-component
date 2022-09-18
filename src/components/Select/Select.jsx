import React from "react";
import { useRef } from "react";
import { useState } from "react";

function Select() {
  let [visible, setVisible] = useState(false);
  let [selected, setSelected] = useState([]);
  let [options, setOptions] = useState([
    "Purple",
    "Blue",
    "White",
    "Black",
    "Yellow",
    "Green",
  ]);
  let defaultOptions = ["Purple", "Blue", "White", "Black", "Yellow", "Green"];

  const handleSearch = (searchTerm) => {
    let newOptions;
    newOptions = options.filter(
      (opt) => opt?.toLowerCase().search(searchTerm?.toLowerCase()) !== -1
    );
    setOptions(newOptions);

    if (!searchTerm.length) {
      newOptions = defaultOptions.filter((opt) => !selected.includes(opt));
      console.log(newOptions);
      setOptions(newOptions);
    }
  };

  const handleOptionClick = (option) => {
    setSelected([...selected, option]);
    let filteredOptions = options.filter((opt) => opt !== option);
    setOptions(filteredOptions);
  };

  const handleRemoveOption = (option) => {
    setOptions([...options, option]);
    let filteredOptions = selected.filter((opt) => opt !== option);
    setSelected(filteredOptions);
  };

  return (
    <div className="flex flex-col gap-2 w-96">
      <div onClick={() => setVisible(true)} className="h-auto p-2 border-2 border-gray-300 rounded-lg min-h-[3rem] flex flex-wrap gap-3 items-center">
        {selected &&
          selected.map((option, i) => (
            <span key={i} className="text-lg">
              <small className="px-2 py-1 bg-gray-300">{option}</small>
              <small
                onClick={() => handleRemoveOption(option)}
                className="h-full px-2 py-1 bg-gray-300 cursor-not-allowed hover:bg-red-200 hover:text-red-800"
              >
                X
              </small>
            </span>
          ))}

        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          className="h-full outline-none"
          placeholder="Search..."
        />
      </div>
      <div
        className={`${
          visible ? "opacity-100" : "opacity-0"
        } relative w-full -mt-10 py-3 mx-auto border-2 border-gray-200 rounded-lg dropdown top-11`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setVisible(false)}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="absolute w-6 h-6 text-white bg-gray-400 rounded-full cursor-pointer -top-2 -right-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <ul>
          {options &&
            options.map((option, i) => (
              <li
                key={i}
                onClick={() => handleOptionClick(option)}
                className="p-2 hover:bg-blue-100 hover:cursor-pointer"
              >
                {option}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Select;
