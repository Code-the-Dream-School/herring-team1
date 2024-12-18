class SearchController < ApplicationController
  def search
    # Проверяем, есть ли хотя бы один параметр для поиска
    if params_blank?
      return render_error('At least one search parameter is required', :bad_request)
    end

   # Получаем все организации с сервисами
  organizations = Organization.includes(:services)  # Предзагрузка сервисов для каждой организации

  # Смотрим, сколько организаций до фильтрации
  puts "Total organizations before filtering: #{organizations.count}"

  organizations = filter_by_zip_code(organizations) if params[:zip_code].present?
  organizations = filter_by_keyword(organizations) if params[:keyword].present?
  organizations = filter_by_service(organizations) if params[:service].present?

  # Смотрим, сколько организаций после фильтрации
  puts "Total organizations after filtering: #{organizations.count}"

  # Если ничего не найдено, отправляем сообщение об ошибке
  if organizations.empty?
    render_error('No search results found', :not_found)
  else
    render_organizations(organizations.distinct)
  end
end

  private

  # Проверка, что все параметры поиска отсутствуют
  def params_blank?
    params[:zip_code].blank? && params[:keyword].blank? && params[:service].blank?
  end

  # Фильтрация организаций по zip-коду
  def filter_by_zip_code(organizations)
    zip_code = params[:zip_code]
    organization_ids = Address.where(zip_code: zip_code, organization_id: organizations.pluck(:id))
                              .pluck(:organization_id)
                              .uniq
    organizations.where(id: organization_ids)
  end

  # Фильтрация организаций по ключевому слову
  def filter_by_keyword(organizations)
    keyword = "%#{params[:keyword].downcase}%"
  
    # Фильтр по полям самой организации
    organizations_query = organizations.where(
      'LOWER(name) LIKE :keyword OR LOWER(description) LIKE :keyword OR LOWER(mission) LIKE :keyword',
      keyword: keyword
    )
  
    # Фильтр по связанным сервисам
    service_org_ids = Service.where('LOWER(name) LIKE ?', keyword)
                             .joins(:org_services)
                             .pluck('org_services.organization_id')
  
    # Фильтр по адресам
    address_org_ids = Address.where(
      'LOWER(street) LIKE :keyword OR LOWER(city) LIKE :keyword OR LOWER(state) LIKE :keyword OR LOWER(zip_code) LIKE :keyword',
      keyword: keyword
    ).pluck(:organization_id)
  
    # Объединение всех найденных записей
    organizations_query.or(
      organizations.where(id: service_org_ids + address_org_ids)
    )
  end

  # Фильтрация организаций по сервису
  def filter_by_service(organizations)
    service_name = "%#{params[:service]}%"
    service_ids = Service.where('name ILIKE ?', service_name).pluck(:id)
    organizations.joins(:org_services).where(org_services: { service_id: service_ids })
  end

  # Форматирование ответа с организациями
  def render_organizations(organizations)
    render json: organizations.map { |org| format_organization(org) }
  end

  # Форматирование организации для вывода
  def format_organization(org)
    services = org.services.pluck(:name)  # Получаем имена сервисов
    puts "Organization #{org.name} has services: #{services.inspect}"  # Добавляем вывод для диагностики
    {
      name: org.name,
      logo: org.logo&.attached? ? org.logo.url : 'https://via.placeholder.com/100?text=Logo',
      request: org.description,
      services: services.join(', ')  # Возвращаем имена сервисов
    }
  end

  # Форматирование адреса
  def format_address(address)
    "#{address.street}, #{address.city}, #{address.state}, #{address.zip_code}"
  end

  # Возвращаем ошибку в случае неправильного запроса
  def render_error(message, status)
    render json: { error: message }, status: status
  end
end
