import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOrganizations, searchOrganizations } from '../../utils/apiReqests';
import SearchFilters from '../search/SearchFilters.jsx';
import SelectedFilters from '../search/SelectedFilters.jsx';
import OrganizationCard from '../search/OrganizationCard.jsx';
import Pagination from '../search/Pagination.jsx';

const SearchPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [allOrganizations, setAllOrganizations] = useState([]);
  const [searchParams, setSearchParams] = useState({
    zip_code: '',
    keyword: '',
    services: [],
  });
  const [debouncedSearch, setDebouncedSearch] = useState(searchParams);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchParams);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id) ? prevFavorites.filter((favId) => favId !== id) : [...prevFavorites, id]
    );
  };

  const handleCardClick = (id) => {
    navigate(`/organizations/${id}`);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Fetch all organizations on page load
  useEffect(() => {
    const fetchAllOrganizations = async () => {
      setIsLoading(true);
      try {
        const result = await fetchOrganizations();
        console.log('Fetched organizations:', result);
        setOrganizations(result.slice(0, 10));
        setTotalPages(Math.ceil(result.length / 10));
        setError('');
      } catch (error) {
        console.error('Error fetching organizations:', error);
        setOrganizations([]);
        setAllOrganizations([]);
        setTotalPages(1);
        setError('No organizations found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllOrganizations();
  }, []);

  // Fetch filtered organizations based on search params
  useEffect(() => {
    const fetchFilteredOrganizations = async () => {
      setIsLoading(true);
      try {
        const result = await searchOrganizations(debouncedSearch);
        setOrganizations(result.slice((currentPage - 1) * 10, currentPage * 10));
        setTotalPages(Math.ceil(result.length / 10));
        setError('');
        setHasSearched(true);
      } catch (error) {
        console.error('Error fetching filtered organizations:', error);
        setOrganizations([]);
        setTotalPages(1);
        setError('No organizations found');
        setHasSearched(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedSearch.zip_code || debouncedSearch.keyword || debouncedSearch.services.length > 0) {
      fetchFilteredOrganizations();
    } else {
      setOrganizations(allOrganizations.slice((currentPage - 1) * 10, currentPage * 9));
      setTotalPages(Math.ceil(allOrganizations.length / 10));
      setHasSearched(false);
    }
  }, [debouncedSearch, allOrganizations, currentPage]);

  const handleServiceChange = (serviceName) => {
    setSearchParams((prevParams) => {
      const services = prevParams.services.includes(serviceName)
        ? prevParams.services.filter((service) => service !== serviceName)
        : [...prevParams.services, serviceName];

      return { ...prevParams, services };
    });
  };

  const handleRemoveService = (serviceName) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      services: prevParams.services.filter((service) => service !== serviceName),
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-[80%] mx-auto">
        <h4>Find volunteer opportunities</h4>
        <SearchFilters
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          handleServiceChange={handleServiceChange}
        />
        {error && hasSearched && (
          <div className="text-red-500 text-center my-4">
            <p>{error}</p>
          </div>
        )}
        <SelectedFilters
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          handleRemoveService={handleRemoveService}
        />
        <div className="p-6">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {organizations.length > 0
                  ? organizations.map((org) => (
                      <OrganizationCard
                        key={org.id}
                        org={org}
                        toggleFavorite={toggleFavorite}
                        handleCardClick={handleCardClick}
                        favorites={favorites}
                      />
                    ))
                  : hasSearched && <div className="text-center">No organizations found</div>}
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
