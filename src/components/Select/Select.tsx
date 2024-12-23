import { useState } from "react";
import "./Select.css";
import { SelectProps, User } from "types/types";

export const Select = <T extends unknown>({
  options,
  selectedOption,
  onOptionSelect,
  optionLayout,
  label,
  handleScroll,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  return (
    <div className="select-container">
      <button className="select-button" onClick={toggleDropdown}>
        {selectedOption ? label(selectedOption) : "Select an option"}
      </button>

      {isOpen && (
        <div
          className="dropdown"
          onClick={toggleDropdown}
          onScroll={handleScroll}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={(e) => {
                e.stopPropagation();
                onOptionSelect(option as User);
              }}
            >
              {optionLayout(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
