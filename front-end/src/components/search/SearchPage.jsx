//This page is the main search page where users can search for organizations based on services, zip code, and keyword.
//  It displays a list of organizations and allows users to navigate through the pages of results.
//  Users can also add organizations to their favorites and view more details about an organization by clicking on a card.
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoading(true);
      try {
        const data = await getAllOrganizations(currentPage);
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
      const data = await searchOrganizations({ ...params, page: currentPage });
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
    setCurrentPage(page);
    handleSearch(searchParams);
  };

  const handleRemoveService = (service) => {
    const updatedServices = searchParams.services.filter((s) => s !== service);
    const updatedParams = { ...searchParams, services: updatedServices };
    setSearchParams(updatedParams);
    handleSearch(updatedParams);
  };

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id) ? prevFavorites.filter((favId) => favId !== id) : [...prevFavorites, id]
    );
  };

  const handleCardClick = (id) => {
    navigate(`/organizations/${id}`);
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
