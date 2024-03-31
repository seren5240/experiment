import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";

export type DropdownOption = {
  name: string;
  icon?: React.ComponentType;
};

export const Dropdown = ({
  options,
  selected,
  setSelected,
}: {
  options: DropdownOption[];
    selected: DropdownOption | undefined;
    setSelected: React.Dispatch<React.SetStateAction<DropdownOption | undefined>>;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className="relative inline-block grow">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full flex justify-between"
          type="button"
          onClick={() => setOpen(!open)}
        >
          {selected ? selected.name : "Select"}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${
            open ? "absolute mt-2" : "hidden"
          }`}
          role="menu"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {options.map((option) => {
              let Icon = option.icon;
              return (
                <li
                  key={option.name}
                  className="flex flex-row cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white pl-2 pr-2"
                >
                  {Icon && (
                    <div className="min-w-6 self-center">
                      <Icon />
                    </div>
                  )}
                  <p
                    className="block px-4 py-2 grow"
                    onClick={() => {
                      setSelected(option);
                      setOpen(false);
                    }}
                  >
                    {option.name}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </ClickAwayListener>
  );
};
