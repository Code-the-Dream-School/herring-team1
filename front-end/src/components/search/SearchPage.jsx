import { useState } from 'react';

const SearchPage = () => {
  const [results, setResults] = useState([]); // Массив для хранения результатов поиска

  // Функция для обработки поиска
  const handleSearch = () => {
    // Здесь добавьте логику поиска и обновления результатов
    setResults([
      {
        id: 1,
        organization: 'Helping Hands',
        request: 'Clothes donation',
        services: 'Donation center',
      },
      {
        id: 2,
        organization: 'Food Bank',
        request: 'Volunteer drivers needed',
        services: 'Delivery, Logistics',
      },
    ]);
  };

  return (
    <div className="bg-light_purple min-h-screen p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Find volunteer opportunities</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Поля поиска */}
          <input
            type="text"
            placeholder="Search by zipcode"
            className="border border-gray-300 p-2 rounded-lg w-full md:w-1/3"
          />
          <input
            type="text"
            placeholder="Search by services"
            className="border border-gray-300 p-2 rounded-lg w-full md:w-1/3"
          />
          <input
            type="text"
            placeholder="Search by keyword"
            className="border border-gray-300 p-2 rounded-lg w-full md:w-1/3"
          />
        </div>
        <button onClick={handleSearch} className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
          Search
        </button>
      </div>

      {/* Секция результатов */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <div key={result.id} className="bg-white p-4 rounded-lg shadow-lg relative">
            <div className="absolute top-4 right-4">
              <button className="text-red-500 hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
            <h3 className="text-lg font-bold">{result.organization}</h3>
            <p className="text-sm text-gray-700">Request: {result.request}</p>
            <p className="text-sm text-gray-700">Services: {result.services}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
