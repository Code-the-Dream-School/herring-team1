import Select from 'react-select';
import PropTypes from 'prop-types';

const CustomMultiSelect = ({ options, field, form, isMulti }) => {
  const onChange = (option) => {
    form.setFieldValue(field.name, isMulti ? option.map((item) => item.value) : option.value);
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : '';
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
};

CustomMultiSelect.defaultProps = {
  isMulti: false,
};
export default CustomMultiSelect;
