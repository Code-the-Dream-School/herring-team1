class SearchController < ApplicationController
  def search
    return render_error('At least one search parameter is required', :bad_request) if params_blank?

    organizations = Organization.all
    organizations = filter_by_zip_code(organizations) if params[:zip_code].present?
    organizations = filter_by_keyword(organizations) if params[:keyword].present?
    organizations = filter_by_service(organizations) if params[:service].present?

    paginated_organizations = organizations.page(params[:page]).per(params[:per_page] || 6)

    if paginated_organizations.empty?
      render_error('No search results found', :not_found)
    else
      render_organizations(paginated_organizations)
    end
  end

  private

  def params_blank?
    params[:zip_code].blank? && params[:keyword].blank? && Array(params[:service]).blank?
  end

  def filter_by_zip_code(organizations)
    zip_code = params[:zip_code]
    organization_ids = Address.where(zip_code: zip_code, organization_id: organizations.pluck(:id))
                              .pluck(:organization_id)
                              .uniq
    organizations.where(id: organization_ids)
  end

  def filter_by_keyword(organizations)
    keyword = "%#{params[:keyword].downcase}%"

    organizations_query = organizations.where(
      'LOWER(name) LIKE :keyword OR LOWER(description) LIKE :keyword OR LOWER(mission) LIKE :keyword',
      keyword: keyword
    )

    service_org_ids = Service.where('LOWER(name) LIKE ?', keyword)
                             .joins(:org_services)
                             .pluck('org_services.organization_id')

    address_org_ids = Address.where(
      'LOWER(street) LIKE :keyword OR LOWER(city) LIKE :keyword OR LOWER(state) LIKE :keyword OR LOWER(zip_code) LIKE :keyword',
      keyword: keyword
    ).pluck(:organization_id)

    organizations_query.or(
      organizations.where(id: service_org_ids + address_org_ids)
    )
  end

  def filter_by_service(organizations)
    selected_services = Array(params[:service]).map(&:downcase) # Преобразуем в массив

    valid_service_ids = Service.where('LOWER(name) IN (?)', selected_services).pluck(:id)
    return organizations.none if valid_service_ids.empty?

    organizations.joins(:org_services).where(org_services: { service_id: valid_service_ids })
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
      name: org.name,
      logo: org.logo&.attached? ? org.logo.url : 'https://via.placeholder.com/100?text=Logo',
      request: org.description,
      services: services.join(', ')
    }
  end

  def render_error(message, status)
    render json: { error: message }, status: status
  end
end
