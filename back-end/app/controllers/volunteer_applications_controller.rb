# rubocop:disable Metrics/CyclomaticComplexity
class VolunteerApplicationsController < ApplicationController
  before_action :set_volunteer_application, only: [:update, :destroy]
  before_action :set_organization, only: [:update]
  before_action :authorize_user, only: [:update]
  before_action :set_volunteer, only: [:create, :update, :destroy]
  before_action :authorize_volunteer, only: [:create, :destroy]

  def index
    # Filtering
    query_object = VolunteerApplication.includes(request: :org_service, volunteer: {})

    query_object = query_object.where(volunteer_id: params[:volunteer_id]) if params[:volunteer_id]

    if params[:organization_id]
      query_object = query_object.joins(request: :org_service)
                                 .where(org_services: { organization_id: params[:organization_id] })
    end

    query_object = query_object.where(application_status: params[:application_status]) if params[:application_status]

    if params[:volunteer_name]
      query_object = query_object.joins(:volunteer)
                                 .where('volunteers.first_name ILIKE ? OR volunteers.last_name ILIKE ?', "%#{params[:volunteer_name]}%", "%#{params[:volunteer_name]}%")
    end

    # Sorting
    if params[:sort]
      sort_params = params[:sort].split(',').join(' ')
      query_object = query_object.order(sort_params)
    else
      query_object = query_object.order(created_at: :desc)
    end

    # Pagination
    page = params[:page].to_i.positive? ? params[:page].to_i : 1
    limit = params[:limit].to_i.positive? ? params[:limit].to_i : 12
    offset = (page - 1) * limit
    query_object = query_object.limit(limit).offset(offset)

    total_count = query_object.count

    applications = query_object.map do |application|
      {
        id: application.id,
        volunteer_id: application.volunteer_id,
        application_status: application.application_status,
        message: application.message,
        created_at: application.created_at,
        updated_at: application.updated_at,
        volunteer: {
          first_name: application.volunteer&.first_name,
          last_name: application.volunteer&.last_name,
          phone: application.volunteer&.phone,
          about: application.volunteer&.about,
          profile_img: application.volunteer&.profile_img,
          address: application.volunteer&.address
        },
        request: {
          id: application.request&.id,
          title: application.request&.title,
          description: application.request&.description,
          status: application.request&.status,
          org_service_id: application.request&.org_service_id,
          organization_id: application.request&.org_service&.organization_id
        }
      }
    end

    render json: { applications: applications, total_count: total_count }, status: :ok
  end

  def create
    @volunteer_application = VolunteerApplication.new(volunteer_application_params)
    @volunteer_application.application_status = 0 # Default status

    if @volunteer_application.save
      render json: @volunteer_application, status: :created
    else
      render json: @volunteer_application.errors, status: :unprocessable_entity
    end
  end

  def update
    if current_auth.volunteer
      if @volunteer_application.update(message: params[:volunteer_application][:message])
        render json: @volunteer_application, status: :ok
      else
        render json: { errors: @volunteer_application.errors.full_messages }, status: :unprocessable_entity
      end
    elsif current_auth.organization
      if params[:volunteer_application][:application_status]
        status = params[:volunteer_application][:application_status].to_i
        if status >= 0 && status <= 3
          if @volunteer_application.update(application_status: status)
            render json: @volunteer_application, status: :ok
          else
            render json: { errors: @volunteer_application.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { error: 'Invalid application_status.' }, status: :unprocessable_entity
        end
      else
        render json: { error: 'application_status is required.' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Unauthorized user' }, status: :unauthorized
    end
  end

  def destroy
    if @volunteer_application.destroy
      render json: { message: "Application deleted successfully!" }, status: :ok
    else
      render json: { error: 'Failed to delete application.' }, status: :unprocessable_entity
    end
  end

  private

  def set_volunteer
    @volunteer = params[:volunteer_id].present? ? Volunteer.find_by(id: params[:volunteer_id]) : Volunteer.find_by(id: @volunteer_application&.volunteer_id)
    render json: { error: 'Volunteer not found.' }, status: :not_found unless @volunteer
  end

  def set_volunteer_application
    @volunteer_application = VolunteerApplication.find(params[:id])
    render json: { error: 'Volunteer Application not found.' }, status: :not_found unless @volunteer_application
    return unless params[:volunteer_id].present? && @volunteer_application.volunteer_id != params[:volunteer_id].to_i

    render json: { error: 'Unauthorized access.' }, status: :unauthorized
  end

  def set_organization
    @volunteer_application = VolunteerApplication.find(params[:id])
    organization_id = @volunteer_application.request&.org_service&.organization_id
    return if current_auth.organization.id == organization_id

    render json: { error: 'Unauthorized to update this application.' }, status: :unauthorized
  end

  def authorize_volunteer
    return true if @volunteer_application.nil?

    unless @volunteer_application.volunteer_id == params[:volunteer_id].to_i
      return render json: { error: 'Unauthorized access. Volunteer ID does not match the application.' },
                    status: :unauthorized
    end

    render json: { error: 'Volunteer not found.' }, status: :not_found unless @volunteer
    true
  end

  def authorize_user
    if current_auth.organization
      organization_id = @volunteer_application.request&.org_service&.organization_id
      render json: { error: 'Unauthorized access. You do not have permission to update this application.' }, status: :unauthorized unless organization_id == current_auth.organization.id
    elsif current_auth.volunteer
      unless @volunteer_application.volunteer_id == params[:volunteer_id].to_i
        return render json: { error: '2 Unauthorized access. Volunteer ID does not match the application.' }, status: :unauthorized
      end

      render json: { error: 'Volunteer not found.' }, status: :not_found unless @volunteer
    else
      render json: { error: 'Unauthorized access. User not found.' }, status: :unauthorized
    end
  end

  def volunteer_application_params
    params.require(:volunteer_application).permit(:volunteer_id, :request_id, :message, :application_status)
  end
end
# rubocop:enable Metrics/CyclomaticComplexity
