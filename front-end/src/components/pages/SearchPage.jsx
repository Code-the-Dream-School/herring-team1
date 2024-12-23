import { useState, useEffect } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { fetchOrganizations, searchOrganizations } from '../../utils/apiReqests';
import { services } from '../../data/services';

const SearchPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [searchParams, setSearchParams] = useState({
    zip_code: '',
    keyword: '',
    services: [], // теперь это массив для нескольких сервисов
  });
  const [debouncedSearch, setDebouncedSearch] = useState(searchParams);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id) ? prevFavorites.filter((favId) => favId !== id) : [...prevFavorites, id]
    );
  };

  const handleCardClick = (id) => {
    navigate(`/organizations/${id}`);
  };

  // Fetch all organizations on page load
  useEffect(() => {
    const fetchAllOrganizations = async () => {
      setIsLoading(true);
      try {
        const result = await fetchOrganizations();
        setOrganizations(result.data);
        setError('');
      } catch (error) {
        console.error('Error fetching organizations:', error);
        setOrganizations([]);
        setError('No organizations found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllOrganizations();
  }, []);

  // Update debounced search params
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchParams);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Fetch filtered organizations based on search params
  useEffect(() => {
    const fetchFilteredOrganizations = async () => {
      setIsLoading(true);
      try {
        const result = await searchOrganizations(debouncedSearch);
        setOrganizations(result);
        setError('');
      } catch (error) {
        console.error('Error fetching organizations:', error);
        setOrganizations([]);
        setError('No Organization found');
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedSearch.zip_code || debouncedSearch.keyword || debouncedSearch.services.length > 0) {
      fetchFilteredOrganizations();
    }
  }, [debouncedSearch]);

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
        <div className="bg-light_purple min-h-[20vh] flex flex-col justify-center items-center p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div className="relative">
              <button
                className="p-3 pl-10 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 w-full text-left"
                onClick={() => setSearchParams({ ...searchParams, service: '' })}
              >
                {searchParams.services.length > 0 ? searchParams.services.join(', ') : 'Search by service'}
                <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
              </button>
              {searchParams.services.length === 0 && (
                <div className="absolute top-12 bg-white shadow-lg rounded-lg w-full z-10">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center p-2 hover:bg-gray-100">
                      <input
                        type="checkbox"
                        id={service.name}
                        checked={searchParams.services.includes(service.name)}
                        onChange={() => handleServiceChange(service.name)}
                        className="mr-2"
                      />
                      <label htmlFor={service.name} className="text-sm">
                        {service.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search by zip code"
                className="p-3 pl-10 pr-10 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
                value={searchParams.zip_code}
                onChange={(e) => setSearchParams({ ...searchParams, zip_code: e.target.value })}
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search by keyword"
                className="p-3 pl-10 pr-10 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
                value={searchParams.keyword}
                onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-center my-4">
            <p>{error}</p>
          </div>
        )}
        {/* Здесь выводим выбранные сервисы и параметры */}
        {(searchParams.zip_code || searchParams.keyword || searchParams.services.length > 0) && (
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
        )}

        <div className="p-6">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {organizations.length > 0 ? (
                organizations.map((org) => (
                  <div key={org.id} className="bg-white p-4 rounded-lg shadow-lg relative">
                    <button
                      onClick={() => toggleFavorite(org.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                    >
                      {favorites.includes(org.id) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="w-6 h-6"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          />
                        </svg>
                      )}
                    </button>
                    <div className="cursor-pointer" onClick={() => handleCardClick(org.id)}>
                      <h3 className="font-semibold text-xl">{org.name}</h3>
                      <p>{org.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">No organizations found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
