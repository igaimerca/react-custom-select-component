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
    let defaultOptions = [
        "Purple",
        "Blue",
        "White",
        "Black",
        "Yellow",
        "Green",
    ]

    const handleSearch = (searchTerm) => {
        let newOptions;
        newOptions = options.filter(opt => opt?.toLowerCase().search(searchTerm?.toLowerCase()) !== -1);
        setOptions(newOptions)
        
        if (!searchTerm.length) {
            newOptions = defaultOptions.filter(opt => !selected.includes(opt))
            console.log(newOptions);
            setOptions(newOptions)
        }
    }

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
        <div onClick={() => setVisible(true)} className="flex flex-col gap-2">
            <div className="h-auto px-1 py-2 border-2 border-blue-500 rounded-sm shadow-md min-h-[3rem] w-80 flex flex-wrap gap-3 items-center">

                {selected &&
                    selected.map((option) => (
                        <span className="text-base rounded-sm">
                            <small className="px-2 py-1 bg-gray-400">{option}</small>
                            <small onClick={() => handleRemoveOption(option)} className="h-full px-2 py-1 bg-gray-400 cursor-not-allowed hover:bg-red-200 hover:text-red-800">
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
                className={`${!visible && "opacity-0"
                    } w-full py-3 mx-auto border-2 border-gray-200 rounded-lg dropdown top-11`}
            >
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
