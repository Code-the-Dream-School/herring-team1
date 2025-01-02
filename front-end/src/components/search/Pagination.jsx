import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  console.log('Rendering Pagination with currentPage:', currentPage, 'totalPages:', totalPages);

  if (!currentPage || !totalPages) {
    return null;
  }

  const pages = [];
  const maxPagesToShow = 5;
  const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(currentPage - halfMaxPagesToShow, 1);
  let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(endPage - maxPagesToShow + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} className="px-4 py-2 mx-1 rounded bg-gray-200">
          &laquo;
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
          className={`px-4 py-2 mx-1 rounded ${page === currentPage ? 'bg-purple-500 text-gray' : 'bg-gray-200'}`}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)} className="px-4 py-2 mx-1 rounded bg-gray-200">
          &raquo;
        </button>
      )}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
