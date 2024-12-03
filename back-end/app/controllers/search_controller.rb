# This controller handles search operations.
class SearchController < ApplicationController
  # check if record not found
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::StatementInvalid, with: :invalid_query

  # search_by_zip_code using address model
  def search_by_zip_code
    zip_code = params[:zip_code]
    # check if zip_code is blank
    return render json: { error: 'zip_code is required' }, status: :bad_request if zip_code.blank?

    @addresses = Address.where(zip_code: zip_code).includes(:organization)
    @organizations = @addresses.map(&:organization).compact

    render json: @organizations
  end

  # search_by_keyword using organization model
  def search_by_keyword
    keyword = params[:keyword]
    # check if keyword is blank
    return render json: { error: 'keyword is required' }, status: :bad_request if keyword.blank?

    @organizations = Organization.where('name LIKE ? OR description LIKE ?', "%#{keyword}%", "%#{keyword}%")
    render json: @organizations
  end

  # search_by_services using organization model
  def search_by_services
    service = params[:service]
    # check if service is blank
    return render json: { error: 'service is required' }, status: :bad_request if service.blank?

    @organizations = Organization.where('services @> ?', "{#{service}}")
    render json: @organizations
  end

  private

  def record_not_found
    render json: { error: 'Record not found' }, status: :not_found
  end

  def invalid_query
    render json: { error: 'Invalid query' }, status: :bad_request
  end
end