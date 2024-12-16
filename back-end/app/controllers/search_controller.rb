# This controller is responsible for handling search requests by zipcode, keywords and servicesclass SearchController < ApplicationController
class SearchController < ApplicationController
  def search
    # Check if all parameters are blank
    if params_blank?
      render_error('At least one search parameter is required', :bad_request)
      return
    end

    organizations = Organization.all
    organizations = filter_by_zip_code(organizations) if zip_code.present?
    organizations = filter_by_keyword(organizations) if keyword.present?
    organizations = filter_by_service(organizations) if service.present?

    # Check if any organizations were found, if not, render an error
    if organizations.empty?
      render_error('No search results found', :not_found)
    else
      # Apply pagination
      paginated_organizations = organizations.page(params[:page]).per(params[:per_page] || 9)

      render json: {
        organizations: render_organizations(paginated_organizations),
        meta: {
          current_page: paginated_organizations.current_page,
          total_pages: paginated_organizations.total_pages,
          total_count: paginated_organizations.total_count
        }
      }
    end
  end

  private

  def render_organizations(organizations)
    organizations.map { |org| format_organization(org) }
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

  # Check if all search parameters are missing
  def params_blank?
    zip_code.blank? && keyword.blank? && service.blank?
  end

  # Filter organizations by zip code
  def filter_by_zip_code(organizations)
    addresses = Address.where(zip_code: zip_code)
    return organizations.none if addresses.empty?

    # Get organization ids associated with the found addresses
    organization_ids = addresses.select { |address| address.addressable_type == 'Organization' }
                                .map(&:addressable_id)
                                .uniq
    organizations.where(id: organization_ids)
  end

  # Filter organizations by keyword
  def filter_by_keyword(organizations)
    organizations.where(
      'name ILIKE :keyword OR description ILIKE :keyword OR id IN (:service_org_ids)',
      keyword: "%#{keyword}%",
      service_org_ids: org_ids_by_service_keyword(keyword)
    )
  end

  # Filter organizations by service
  def filter_by_service(organizations)
    service_ids = Service.where('name ILIKE ?', "%#{service}%").pluck(:id)
    return organizations.none if service_ids.empty?

    organizations.joins(:org_services).where(org_services: { service_id: service_ids })
  end

  def render_error(message, status)
    render json: { error: message }, status: status
  end

  # Retrieve zip_code parameter
  def zip_code
    params[:zip_code]
  end

  # Retrieve keyword parameter
  def keyword
    params[:keyword]
  end

  # Retrieve service parameter
  def service
    params[:service]
  end
end
