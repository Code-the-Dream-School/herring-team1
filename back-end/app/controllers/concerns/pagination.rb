module Pagination
  extend ActiveSupport::Concern

  included do
    def paginate(collection)
      page = params[:page] || 1
      per_page = params[:per_page] || 6
      paginated_collection = collection.page(page).per(per_page)

      {
        current_page: paginated_collection.current_page,
        total_pages: paginated_collection.total_pages,
        total_count: paginated_collection.total_count,
        collection: paginated_collection
      }
    end
  end
end
