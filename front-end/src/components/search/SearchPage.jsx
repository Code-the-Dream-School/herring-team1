import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { searchOrganizations } from '../../utils/apiReqests';

const SearchPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [searchParams, setSearchParams] = useState({
    zip_code: '',
    keyword: '',
    service: '',
  });
  const [debouncedSearch, setDebouncedSearch] = useState(searchParams);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // check if user has searched

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id) ? prevFavorites.filter((favId) => favId !== id) : [...prevFavorites, id]
    );
  };

  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/organizations/${id}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchParams);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchParams]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      if (debouncedSearch.zip_code || debouncedSearch.keyword || debouncedSearch.service) {
        setIsLoading(true);
        setHasSearched(true); // change hasSearched to true when user has searched
        try {
          const result = await searchOrganizations(
            debouncedSearch.zip_code,
            debouncedSearch.keyword,
            debouncedSearch.service
          );
          if (result.length === 0) {
            setError('No organizations found');
            setOrganizations([]);
          } else {
            setOrganizations(result);
            setError('');
          }
        } catch (error) {
          console.error('Error fetching organizations:', error);
          setOrganizations([]);
          setError('No Organization found');
        } finally {
          setIsLoading(false);
        }
      } else {
        setOrganizations([]);
        setError('');
      }
    };

    fetchOrganizations();
  }, [debouncedSearch]);

  // check if user has searched
  const hasSearchParams = debouncedSearch.zip_code || debouncedSearch.keyword || debouncedSearch.service;

  return (
    <div className="min-h-screen">
      <div className="max-w-[80%] mx-auto">
        <h4>Find volunteer opportunities</h4>
        <div className="bg-light_purple min-h-[20vh] flex flex-col justify-center items-center p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by services"
                className="p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
                value={searchParams.service}
                onChange={(e) => setSearchParams({ ...searchParams, service: e.target.value })}
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by zip code"
                className="p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
                value={searchParams.zip_code}
                onChange={(e) => setSearchParams({ ...searchParams, zip_code: e.target.value })}
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by keyword"
                className="p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
                value={searchParams.keyword}
                onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>

        {!hasSearched && !hasSearchParams && (
          <div className="text-center my-4">
            <p>Enter your searching parameters</p>
          </div>
        )}

        {hasSearched && !hasSearchParams && (
          <div className="text-red-500 text-center my-4">
            <p>At least one parameter should be entered</p>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center my-4">
            <p>{error}</p>
          </div>
        )}

        <div className="p-6">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.isArray(organizations) && organizations.length > 0
                ? organizations.map((org) => (
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
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.35l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                          </svg>
                        )}
                      </button>
                      <h3 className="text-lg font-bold">{org.name}</h3>
                      <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-500">
                        {!org.logo && <span className="text-sm font-semibold text-center">LOGO</span>}
                      </div>
                      <p className="text-sm text-gray-700">
                        <span className="font-bold">Request:</span> {org.request}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-bold">Services:</span> {org.services.join(', ')}
                      </p>
                      <button onClick={() => handleCardClick(org.id)} className="text-sm text-blue-500 mt-4">
                        View Details &gt;
                      </button>
                    </div>
                  ))
                : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
