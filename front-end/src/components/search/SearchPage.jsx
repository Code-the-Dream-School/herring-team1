import { useState, useEffect } from 'react';
import SearchForm from './SearchForm.jsx';
import OrganizationList from './OrganizationList.jsx';
import Pagination from './Pagination.jsx';
import { searchOrganizations, getAllOrganizations } from '../../utils/apiReqests';
import SelectedFilters from './SelectedFilters.jsx';

const SearchPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useState({
    services: [],
    zip_code: '',
    keyword: '',
  });
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        console.log('Fetching organizations...');
        const data = await getAllOrganizations(currentPage);
        console.log('Fetched organizations:', data);
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

    fetchOrganizations();
  }, [currentPage]);

  const handleSearch = async (params) => {
    setLoading(true);
    try {
      console.log('Searching organizations with params:', params);
      const data = await searchOrganizations({ ...params, page: currentPage });
      console.log('Search results:', data);
      if (data && data.organizations) {
        setOrganizations(data.organizations);
        setCurrentPage(data.current_page || 1);
        setTotalPages(data.total_pages || 1);
        setSearchParams(params);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    console.log('Page change to:', page);
    setCurrentPage(page);
  };

  const handleRemoveService = (service) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      services: prevParams.services.filter((s) => s !== service),
    }));
  };

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id) ? prevFavorites.filter((favId) => favId !== id) : [...prevFavorites, id]
    );
  };

  const handleCardClick = (id) => {
    console.log('Card clicked:', id);
    // Add your logic for handling card click here
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
          handleServiceChange={(services) => setSearchParams({ ...searchParams, services })}
          onSearch={() => handleSearch(searchParams)}
        />
        <SelectedFilters
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          handleRemoveService={handleRemoveService}
        />
        <div className="mt-8">
          {organizations.length > 0 ? (
            <>
              <OrganizationList
                organizations={organizations}
                toggleFavorite={toggleFavorite}
                handleCardClick={handleCardClick}
                favorites={favorites}
              />
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          ) : (
            <div>No organizations found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
