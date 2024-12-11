import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function InputWithLabel({ id, type = 'text', name, value, onChange, placeholder, autoFocus, children }) {
  const inputRef = useRef();

  // Automatically focus on the input field
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="form-group mb-2 ">
      <label htmlFor={id} className="form-label">
        {children}
      </label>
      <input
        className="form-control border border-gray-300 rounded px-3 py-1 w-full shadow-md shadow-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 focus:outline-none placeholder:text-small"
        ref={inputRef}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={children}
      />
    </div>
  );
}

InputWithLabel.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export default InputWithLabel;
