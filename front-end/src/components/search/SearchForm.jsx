import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import DropdownMenu from './DropdownMenu.jsx';
import OrganizationList from '../search/OrganizationList.jsx';
import { searchOrganizations } from '../../utils/apiReqests';
import { getServiceIcon } from '../../utils/FormatServices.jsx';

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
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async () => {
    setSearchPerformed(true);
    try {
      console.log('Searching organizations with params:', searchParams);
      const data = await searchOrganizations(searchParams);
      console.log('Search results:', data.organizations);
      setSearchResults(
        data.organizations.map((org) => ({
          ...org,
          org_services: org.services.split(',').map((serviceName) => ({
            name: serviceName.trim(),
            icon: getServiceIcon(serviceName.trim()),
          })),
        }))
      );
      if (onSearch) {
        onSearch(searchParams);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleServiceChangeAndSearch = (services) => {
    const newSearchParams = { ...searchParams, services };
    setSearchParams(newSearchParams);
    handleServiceChange(services);
    handleSearch();
  };

  const handleZipCodeChange = (e) => {
    const newSearchParams = { ...searchParams, zip_code: e.target.value };
    setSearchParams(newSearchParams);
  };

  const handleKeywordChange = (e) => {
    const newSearchParams = { ...searchParams, keyword: e.target.value };
    setSearchParams(newSearchParams);
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  return (
    <div className="bg-light_purple min-h-[20vh] flex flex-col justify-center items-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <DropdownMenu
          selectedServices={Array.isArray(searchParams.services) ? searchParams.services : [searchParams.services]}
          handleServiceChange={handleServiceChangeAndSearch}
          multiple
        />

        <div className="relative">
          <input
            type="text"
            placeholder="search by zip code"
            className="p-3 pl-10 pr-10 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
            value={searchParams.zip_code}
            onChange={handleZipCodeChange}
          />
          <MagnifyingGlassIcon
            className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={handleSearchClick}
          />
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="search by keyword"
            className="p-3 pl-10 pr-10 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
            value={searchParams.keyword}
            onChange={handleKeywordChange}
          />
          <MagnifyingGlassIcon
            className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={handleSearchClick}
          />
        </div>
      </div>
      <div className="w-full mt-4">
        {searchPerformed && searchResults.length > 0 && (
          <OrganizationList
            organizations={searchResults}
            toggleFavorite={() => {}}
            handleCardClick={() => {}}
            favorites={[]}
          />
        )}
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
