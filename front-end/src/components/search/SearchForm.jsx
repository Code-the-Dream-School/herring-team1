import PropTypes from 'prop-types';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import DropdownMenu from './DropdownMenu.jsx';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught in ErrorBoundary: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

const SearchForm = ({
  searchParams = { services: [], zip_code: '', keyword: '' },
  setSearchParams,
  handleServiceChange,
  onSearch,
}) => {
  console.log('Rendering SearchForm with searchParams:', searchParams);

  return (
    <div className="bg-light_purple min-h-[20vh] flex flex-col justify-center items-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <DropdownMenu
          selectedServices={Array.isArray(searchParams.services) ? searchParams.services : [searchParams.services]}
          handleServiceChange={handleServiceChange}
          multiple
        />

        <div className="relative">
          <input
            type="text"
            placeholder="search by zip code"
            className="p-3 pl-10 pr-10 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
            value={searchParams.zip_code}
            onChange={(e) => {
              const newSearchParams = { ...searchParams, zip_code: e.target.value };
              console.log('Updated searchParams:', newSearchParams);
              setSearchParams(newSearchParams);
            }}
          />
          <MagnifyingGlassIcon
            className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={onSearch}
          />
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="search by keyword"
            className="p-3 pl-10 pr-10 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
            value={searchParams.keyword}
            onChange={(e) => {
              const newSearchParams = { ...searchParams, keyword: e.target.value };
              console.log('Updated searchParams:', newSearchParams);
              setSearchParams(newSearchParams);
            }}
          />
          <MagnifyingGlassIcon
            className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={onSearch}
          />
        </div>
      </div>
    </div>
  );
};

SearchForm.propTypes = {
  searchParams: PropTypes.shape({
    services: PropTypes.arrayOf(PropTypes.string).isRequired,
    zip_code: PropTypes.string,
    keyword: PropTypes.string,
  }).isRequired,
  setSearchParams: PropTypes.func.isRequired,
  handleServiceChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

const WrappedSearchForm = (props) => (
  <ErrorBoundary>
    <SearchForm {...props} />
  </ErrorBoundary>
);

export default WrappedSearchForm;
