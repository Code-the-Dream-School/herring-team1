import PropTypes from 'prop-types';
import { XMarkIcon } from '@heroicons/react/20/solid';

const SelectedFilters = ({ searchParams, setSearchParams, handleRemoveService }) => {
  return (
    (searchParams.zip_code || searchParams.keyword || searchParams.services.length > 0) && (
      <div className="mt-4 bg-purple-100 p-4 rounded-lg">
        <h5 className="font-semibold">Selected Filters:</h5>
        <div className="flex flex-wrap gap-2">
          {searchParams.services.map((service, index) => (
            <span
              key={index}
              className="bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {service}
              <button onClick={() => handleRemoveService(service)} className="ml-2 text-red-500">
                <XMarkIcon className="w-4 h-4" />
              </button>
            </span>
          ))}
          {searchParams.zip_code && (
            <span className="bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center">
              {searchParams.zip_code}
              <button
                onClick={() => setSearchParams((prevParams) => ({ ...prevParams, zip_code: '' }))}
                className="ml-2 text-red-500"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </span>
          )}
          {searchParams.keyword && (
            <span className="bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center">
              {searchParams.keyword}
              <button
                onClick={() => setSearchParams((prevParams) => ({ ...prevParams, keyword: '' }))}
                className="ml-2 text-red-500"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </span>
          )}
        </div>
      </div>
    )
  );
};

SelectedFilters.propTypes = {
  searchParams: PropTypes.shape({
    zip_code: PropTypes.string,
    keyword: PropTypes.string,
    services: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setSearchParams: PropTypes.func.isRequired,
  handleRemoveService: PropTypes.func.isRequired,
};

export default SelectedFilters;
