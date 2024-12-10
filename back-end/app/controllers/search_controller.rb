# This controller is responsible for searching organizations by zip code, keyword, and service.
class SearchController < ApplicationController
  def search
    zip_code = params[:zip_code]
    keyword = params[:keyword]
    service = params[:service]

    # Check for at least one search parameter
    return render_error('At least one search parameter is required', :bad_request) if zip_code.blank? && keyword.blank? && service.blank?

    organizations = Organization.all

    # Zip code search
    if zip_code.present?
      addresses = Address.where(zip_code: zip_code)
      return render_error("No organizations found for zip code: #{zip_code}", :not_found) if addresses.empty?

      organizations = organizations.where(id: filter_organization_ids(addresses))
    end

    # Keyword search
    if keyword.present?
      organizations = organizations.where(
        'name ILIKE :keyword OR description ILIKE :keyword OR id IN (:service_org_ids)',
        keyword: "%#{keyword}%",
        service_org_ids: org_ids_by_service_keyword(keyword)
      )
    end

    # Service search
    if service.present?
      organizations = organizations.joins(:org_services).where(org_services: { service_id: service })
      return render_error("No organizations found offering service: #{service}", :not_found) if organizations.empty?
    end

    render_organizations(organizations.uniq)
  end

  private

  # ID organizations by address
  def filter_organization_ids(addresses)
    addresses.select { |address| address.addressable_type == 'Organization' }
             .map(&:addressable_id)
             .uniq
  end

  # ID organizations by service keyword
  def org_ids_by_service_keyword(keyword)
    Service.where('name ILIKE ?', "%#{keyword}%").includes(:org_services).map do |service|
      service.org_services.pluck(:organization_id)
    end.flatten.uniq
  end

  def render_organizations(organizations)
    if organizations.empty?
      render_error('No organizations found', :not_found)
    else
      render json: organizations.map { |org| format_organization(org) }
    end
  end

  # Error response
  def render_error(message, status)
    render json: { error: message }, status: status
  end

  def format_organization(org)
    {
      name: org.name,
      request: org.description,
      logo: org.logo.attached? ? org.logo.url : 'placeholder_logo_url',
      services: org.org_services.map { |os| service_name(os.service_id) }
    }
  end

  def service_name(service_id)
    service = Service.find_by(id: service_id)
    service ? service.name : 'Unknown service'
  end
end
