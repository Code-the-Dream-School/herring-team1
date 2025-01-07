//This component displays a dropdown menu for selecting services.
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { services } from '../../data/services';

const DropdownMenu = ({ selectedServices, handleServiceChange }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (service) => {
    const newSelectedServices = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    handleServiceChange(newSelectedServices);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`p-3 pl-10 pr-10 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 w-full text-left ${
          selectedServices.length === 0 ? 'text-gray-400' : 'text-black'
        }`}
        onClick={toggleDropdown}
      >
        {selectedServices.length > 0 ? 'selected services' : 'search by service'}
        <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
      </button>
      {isDropdownVisible && (
        <div className="absolute top-12 bg-white shadow-lg rounded-lg w-full z-10">
          <ul className="p-3">
            {services.map((service) => (
              <li key={service.name} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.name)}
                  onChange={() => handleSelect(service.name)}
                  className="mr-2"
                />
                {service.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

DropdownMenu.propTypes = {
  selectedServices: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleServiceChange: PropTypes.func.isRequired,
};

export default DropdownMenu;
