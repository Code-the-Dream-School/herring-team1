# This controller handles search operations. It provides three methods to search organizations by zip code, keyword, and services.
class SearchController < ApplicationController
  # Handle exceptions
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::StatementInvalid, with: :invalid_query

  # Search organizations by zip code
  def search_by_zip_code
    zip_code = params[:zip_code]
    return render_bad_request('zip_code is required') if zip_code.blank?

    addresses = Address.where(zip_code: zip_code)
    organizations = filter_organizations(addresses)

    

    render_organizations(organizations)

  end


  # Search organizations by keyword
  def search_by_keyword
    keyword = params[:keyword]
    return render_bad_request('keyword is required') if keyword.blank?

    organizations = Organization.where('name LIKE ? OR description LIKE ?', "%#{keyword}%", "%#{keyword}%")
    render_organizations(organizations)
  end

  # Search organizations by services
  def search_by_services
    service = params[:service]
    return render_bad_request('service is required') if service.blank?

    organizations = Organization.where('services @> ?', "{#{service}}")
    render_organizations(organizations)
  end

  private

  # Filter organizations from addresses
  def filter_organizations(addresses)
    addresses.select { |address| address.addressable_type == 'Organization' }
             .map(&:addressable)
             .uniq
  end

  # Render organizations or handle case if no organizations found
  def render_organizations(organizations)
    if organizations.empty?
      render json: { error: 'No organizations found' }, status: :not_found
    else
      render json: organizations
    end
  end

  # Render bad request error with a custom message
  def render_bad_request(message)
    render json: { error: message }, status: :bad_request
  end

  # Handle ActiveRecord::RecordNotFound exceptions
  def record_not_found
    render json: { error: 'Record not found' }, status: :not_found
  end

  # Handle invalid query errors
  def invalid_query
    render json: { error: 'Invalid query' }, status: :bad_request
  end
end
