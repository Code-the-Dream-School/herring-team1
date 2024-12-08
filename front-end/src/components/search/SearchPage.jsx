import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const SearchPage = () => {
  const [searchByServices, setSearchByServices] = useState('');
  const [searchByZip, setSearchByZip] = useState('');
  const [searchByKeyword, setSearchByKeyword] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id) ? prevFavorites.filter((favId) => favId !== id) : [...prevFavorites, id]
    );
  };

  const handleSearch = async (type) => {
    setLoading(true);
    setError(null);
    let url = '';
    let queryParam = '';

    switch (type) {
      case 'services':
        url = '/search/services';
        queryParam = searchByServices;
        break;
      case 'zip':
        url = '/search/zip';
        queryParam = searchByZip;
        break;
      case 'keyword':
        url = '/search/keyword';
        queryParam = searchByKeyword;
        break;
      default:
        return;
    }

    try {
      const response = await fetch(`${url}?${type}=${encodeURIComponent(queryParam)}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data = await response.json();
      setOrganizations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-[80%] mx-auto">
        {/* Search Section */}
        <h4>Find volunteer opportunities</h4>
        <div className="bg-light_purple min-h-[20vh] flex flex-col justify-center items-center p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div className="relative">
              <input
                type="text"
                value={searchByServices}
                onChange={(e) => setSearchByServices(e.target.value)}
                placeholder="Search by services"
                className="p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
              />
              <MagnifyingGlassIcon
                onClick={() => handleSearch('services')}
                className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                value={searchByZip}
                onChange={(e) => setSearchByZip(e.target.value)}
                placeholder="Search by zip code"
                className="p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
              />
              <MagnifyingGlassIcon
                onClick={() => handleSearch('zip')}
                className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                value={searchByKeyword}
                onChange={(e) => setSearchByKeyword(e.target.value)}
                placeholder="Search by keyword"
                className="p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
              />
              <MagnifyingGlassIcon
                onClick={() => handleSearch('keyword')}
                className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Loading and Error Messages */}
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Organization Cards Section */}
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {organizations.map((org) => (
              <div key={org.id} className="bg-white p-4 rounded-lg shadow-lg relative">
                {/* Heart Icon for Favorites */}
                <button
                  onClick={() => toggleFavorite(org.id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                >
                  {favorites.includes(org.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
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
                  LOGO
                </div>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Services:</span> {org.services.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
