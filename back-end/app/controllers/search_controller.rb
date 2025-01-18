# This controller is responsible for handling search requests by zipcode, keywords and services
class SearchController < ApplicationController
  include Pagination

  def search
    organizations = Organization.all
    organizations = filter_by_zip_code(organizations) if zip_code.present?
    organizations = filter_by_keyword(organizations) if keyword.present?
    organizations = filter_by_service(organizations) if services.present?

    # Paginate the organizations collection
    paginated_organizations = paginate(organizations)

    # Check if any organizations were found, if not, render an error
    if paginated_organizations[:collection].empty?
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
    services = params[:services].map(&:downcase)
    service_ids = Service.where('LOWER(name) IN (?)', services).pluck(:id)
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

  def render_organizations(paginated_organizations)
    render json: {
      current_page: paginated_organizations[:current_page],
      total_pages: paginated_organizations[:total_pages],
      total_count: paginated_organizations[:total_count],
      organizations: paginated_organizations[:collection].map { |org| format_organization(org) }
    }
  end

  def format_organization(org)
    services = org.org_services.map { |os| os.service.name }.join(', ')
    requests = org.requests.pluck(:title).join(', ')
    {
      id: org.id,
      name: org.name,
      logo: org.logo ? org.logo.url : 'https://via.placeholder.com/100?text=Logo',
      description: org.description,
      requests: requests,
      services: services
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

  def services
    params[:services] || []
  end

  def render_error(message, status)
    render json: { error: message }, status: status
  end
end
