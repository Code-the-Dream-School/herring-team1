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

    puts "Filtered Organizations: #{organizations.inspect}"  # Вывод в консоль

    # Check if any organizations were found, if not, render an error
    if organizations.empty?
      render_error('No search results found', :not_found)
    else
      render_organizations(organizations.uniq)
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

  # Extract organization IDs from addresses linked to organizations
  def filter_organization_ids(addresses)
    addresses.select { |address| address.addressable_type == 'Organization' }
             .map(&:addressable_id)
             .uniq
  end

  # Get organization IDs by matching service keywords
  def org_ids_by_service_keyword(keyword)
    Service.where('name ILIKE ?', "%#{keyword}%").includes(:org_services).map do |service|
      service.org_services.pluck(:organization_id)
    end.flatten.uniq
  end

  def render_organizations(organizations)
    render json: organizations.map { |org| format_organization(org) }
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
