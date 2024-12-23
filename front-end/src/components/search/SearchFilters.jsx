import PropTypes from 'prop-types';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import DropdownMenu from './DropdownMenu.jsx';

const SearchFilters = ({ searchParams, setSearchParams, handleServiceChange }) => {
  return (
    <div className="bg-light_purple min-h-[20vh] flex flex-col justify-center items-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <DropdownMenu selectedServices={searchParams.services} handleServiceChange={handleServiceChange} />

        <div className="relative">
          <input
            type="text"
            placeholder="search by zip code"
            className="p-3 pl-10 pr-10 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
            value={searchParams.zip_code}
            onChange={(e) => setSearchParams({ ...searchParams, zip_code: e.target.value })}
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="search by keyword"
            className="p-3 pl-10 pr-10 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
            value={searchParams.keyword}
            onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
};

SearchFilters.propTypes = {
  searchParams: PropTypes.shape({
    zip_code: PropTypes.string,
    keyword: PropTypes.string,
    services: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setSearchParams: PropTypes.func.isRequired,
  handleServiceChange: PropTypes.func.isRequired,
};

export default SearchFilters;
