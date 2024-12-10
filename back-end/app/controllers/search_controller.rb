# This controller is responsible for searching organizations by zip code, keyword, and service.
class SearchController < ApplicationController
  def search
    zip_code = params[:zip_code]
    keyword = params[:keyword]
    service = params[:service]

    # Проверка: указан хотя бы один параметр
    if zip_code.blank? && keyword.blank? && service.blank?
      return render_error('At least one search parameter is required', :bad_request)
    end

    organizations = Organization.all

    # Поиск по почтовому индексу
    if zip_code.present?
      addresses = Address.where(zip_code: zip_code)
      if addresses.empty?
        return render_error("No organizations found for zip code: #{zip_code}", :not_found)
      end
      organizations = organizations.where(id: filter_organization_ids(addresses))
    end

    # Поиск по ключевому слову
    if keyword.present?
      organizations = organizations.where(
        'name ILIKE :keyword OR description ILIKE :keyword OR id IN (:service_org_ids)',
        keyword: "%#{keyword}%",
        service_org_ids: org_ids_by_service_keyword(keyword)
      )
    end

    # Поиск по сервису
    if service.present?
      organizations = organizations.joins(:org_services).where(org_services: { service_id: service })
      if organizations.empty?
        return render_error("No organizations found offering service: #{service}", :not_found)
      end
    end

    render_organizations(organizations.uniq)
  end

  private

  # ID организаций по почтовому индексу
  def filter_organization_ids(addresses)
    addresses.select { |address| address.addressable_type == 'Organization' }
             .map(&:addressable_id)
             .uniq
  end

  # ID организаций, предоставляющих услуги, совпадающие с ключевым словом
  def org_ids_by_service_keyword(keyword)
    Service.where('name ILIKE ?', "%#{keyword}%").includes(:org_services).map do |service|
      service.org_services.pluck(:organization_id)
    end.flatten.uniq
  end

  # Форматирование данных организаций
  def render_organizations(organizations)
    if organizations.empty?
      render_error('No organizations found', :not_found)
    else
      render json: organizations.map { |org| format_organization(org) }
    end
  end

  # Ошибка
  def render_error(message, status)
    render json: { error: message }, status: status
  end

  # Форматирование JSON для организации
  def format_organization(org)
    {
      name: org.name,
      request: org.description,
      logo: org.logo.attached? ? org.logo.url : 'placeholder_logo_url',
      services: org.org_services.map { |os| service_name(os.service_id) }
    }
  end

  # Название услуги по ID
  def service_name(service_id)
    service = Service.find_by(id: service_id)
    service ? service.name : 'Unknown service'
  end
end
