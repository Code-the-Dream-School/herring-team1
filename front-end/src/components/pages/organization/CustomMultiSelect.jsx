import Select from 'react-select';
import PropTypes from 'prop-types';

const CustomMultiSelect = ({ options, field, form, isMulti, disabled }) => {
  const onChange = (option) => {
    form.setFieldValue(field.name, isMulti ? option.map((item) => item.value) : option.value);
  };

  const getValue = () => {
    if (!options) {
      return isMulti ? [] : '';
    }

    if (isMulti) {
      const valueArray = Array.isArray(field.value) ? field.value : [];
      return options.filter((option) => valueArray.includes(option.value));
    } else {
      return options.find((option) => option.value === field.value) || '';
    }
  };

  return (
    <Select
      className="w-full text-sm rounded-lg shadow-md"
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder="Select services..."
      options={options}
      isMulti={isMulti}
      isDisabled={disabled}
    />
  );
};

CustomMultiSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ]),
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  isMulti: PropTypes.bool,
  disabled: PropTypes.bool,
};

CustomMultiSelect.defaultProps = {
  isMulti: false,
};
export default CustomMultiSelect;
