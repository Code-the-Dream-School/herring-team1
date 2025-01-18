// This page is the main search page where users can search for organizations based on services, zip code, and keyword.
// It displays a list of organizations and allows users to navigate through the pages of results.
// Users can also add organizations to their favorites and view more details about an organization by clicking on a card.

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm.jsx';
import OrganizationList from './OrganizationList.jsx';
import Pagination from './Pagination.jsx';
import { searchOrganizations, getAllOrganizations } from '../../utils/apiReqests';
import SelectedFilters from './SelectedFilters.jsx';
import { getServiceIcon } from '../../utils/FormatServices.jsx';

const SearchPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useState({
    services: [],
    zip_code: '',
    keyword: '',
  });
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Fetch organizations for the current page
  const fetchOrganizations = async (page = 1) => {
    setLoading(true);
    try {
      const data = await getAllOrganizations(page);
      if (data && data.organizations) {
        setOrganizations(data.organizations);
        setCurrentPage(data.current_page || 1);
        setTotalPages(data.total_pages || 1);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch organizations when the component mounts or the current page changes
  useEffect(() => {
    fetchOrganizations(currentPage);
  }, [currentPage]);

  // Handle search with the given parameters and page
  const handleSearch = async (params, page = 1) => {
    setLoading(true);
    setSearchPerformed(true);
    try {
      const data = await searchOrganizations({ ...params, page });
      if (data && data.organizations) {
        setOrganizations(
          data.organizations.map((org) => ({
            ...org,
            org_services: org.services
              ? org.services.split(',').map((serviceName) => ({
                  name: serviceName.trim(),
                  icon: getServiceIcon(serviceName.trim()),
                }))
              : [],
            requests: org.requests
              ? org.requests.split(',').map((requestTitle) => ({
                  title: requestTitle.trim(),
                }))
              : [],
            logo: org.logo ? { url: org.logo } : null,
          }))
        );
        setCurrentPage(data.current_page || 1);
        setTotalPages(data.total_pages || Math.ceil(data.total_count / 6));
        setSearchParams(params);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Search error:', error);
      setOrganizations([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (searchParams.zip_code || searchParams.keyword || searchParams.services.length > 0) {
      handleSearch(searchParams, page);
    } else {
      fetchOrganizations(page);
    }
  };

  // Handle removing a service from the search parameters
  const handleRemoveService = (service) => {
    const updatedServices = searchParams.services.filter((s) => s !== service);
    const updatedParams = { ...searchParams, services: updatedServices };
    setSearchParams(updatedParams);
    handleSearch(updatedParams);
  };

  // Toggle favorite status for an organization
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id) ? prevFavorites.filter((favId) => favId !== id) : [...prevFavorites, id]
    );
  };

  // Handle card click to navigate to the organization's details page
  const handleCardClick = (id) => {
    navigate(`/organizations/${id}`);
  };

  // Handle service change in the search form
  const handleServiceChange = (services) => {
    const updatedParams = { ...searchParams, services };
    setSearchParams(updatedParams);
    handleSearch(updatedParams);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[80%] mx-auto">
        <h4>Find volunteer opportunities</h4>

        <SearchForm
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          handleServiceChange={handleServiceChange}
          onSearch={handleSearch}
        />
        <SelectedFilters
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          handleRemoveService={handleRemoveService}
        />
        <div className="mt-8">
          {searchPerformed && organizations.length === 0 ? (
            <div>No Organizations found.</div>
          ) : (
            <>
              <OrganizationList
                organizations={organizations}
                toggleFavorite={toggleFavorite}
                handleCardClick={handleCardClick}
                favorites={favorites}
              />
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
