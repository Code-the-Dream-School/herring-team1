# This controller is responsible for handling search requests by zipcode, keywords and services
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

    puts "Filtered Organizations: #{organizations.inspect}"
    
    # Paginate the organizations collection
    paginated_organizations = organizations.page(params[:page]).per(params[:per_page] || 6)

    # Check if any organizations were found, if not, render an error
    if paginated_organizations.empty?
      render_error('No search results found', :not_found)
    else
      render_organizations(paginated_organizations)
    end
  end

  private

  # Check if all search parameters are missing
  def params_blank?
    zip_code.blank? && keyword.blank? && service.blank?
  end

  # Filter organizations by zip code
  def filter_by_zip_code(organizations)
    addresses = Address.where(zip_code: zip_code)
    return organizations.none if addresses.empty?

    # Get organization ids associated with the found addresses
    organization_ids = addresses.pluck(:organization_id).uniq
    organizations.where(id: organization_ids)
  end

  # Filter organizations by keyword
  def filter_by_keyword(organizations)
    keyword = params[:keyword].to_s.downcase
    keyword_pattern = "%#{keyword}%"
    organizations.where(
      'LOWER(name) LIKE :keyword OR LOWER(description) LIKE :keyword OR id IN (:service_org_ids)',
      keyword: keyword_pattern,
      service_org_ids: org_ids_by_service_keyword(keyword)
    )
  end

  # Filter organizations by service
  def filter_by_service(organizations)
    service = params[:service].to_s.downcase
    service_pattern = "%#{service}%"
    service_ids = Service.where('LOWER(name) LIKE ?', service_pattern).pluck(:id)
    return organizations.none if service_ids.empty?

    organizations.joins(:org_services).where(org_services: { service_id: service_ids })
  end

  # Extract organization IDs from addresses linked to organizations
  def filter_organization_ids(addresses)
    addresses.select { |address| address.addressable_type == 'Organization' }
             .map(&:addressable_id)
             .uniq
  end

  # Get organization IDs by matching service keywords
  def org_ids_by_service_keyword(keyword)
    Service.where('LOWER(name) LIKE ?', "%#{keyword}%").includes(:org_services).map do |service|
      service.org_services.pluck(:organization_id)
    end.flatten.uniq
  end

  def render_organizations(organizations)
    render json: {
      current_page: organizations.current_page,
      total_pages: organizations.total_pages,
      total_count: organizations.total_count,
      organizations: organizations.map { |org| format_organization(org) }
    }
  end

  def format_organization(org)
    services = org.services.pluck(:name)
    {
      id: org.id, # Ensure to include the organization ID
      name: org.name,
      logo: org.logo&.attached? ? org.logo.url : 'https://via.placeholder.com/100?text=Logo',
      request: org.description,
      services: services.join(', ')
    }
  end

  def service_name(service_id)
    service = Service.find_by(id: service_id)
    service ? service.name : 'Unknown service'
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

  def render_error(message, status)
    render json: { error: message }, status: status
  end
end
