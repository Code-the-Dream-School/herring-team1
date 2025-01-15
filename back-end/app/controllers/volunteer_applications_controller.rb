class VolunteerApplicationsController < ApplicationController
  before_action :set_volunteer_application, only: [:update, :destroy]
  before_action :set_organization, only: [:update]
  before_action :authorize_organization, only: [:update], if: -> { params[:organization_id].present? }
  before_action :set_volunteer, only: [:create, :update, :destroy]
  before_action :authorize_volunteer, only: [:create, :destroy, :update]

  def index
    if params[:organization_id]
      @volunteer_applications = VolunteerApplication.joins(request: :org_service)
                                                    .where(org_services: { organization_id: params[:organization_id] })
                                                    .includes(request: :org_service, volunteer: {})
      if @volunteer_applications.empty?
        render json: { error: 'No volunteer applications found for this organization' }, status: :not_found
        return
      end
    else
      @volunteer_applications = VolunteerApplication.includes(request: :org_service, volunteer: {}).all
    end

    render json: @volunteer_applications.map { |application|
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
          profile_img: application.volunteer&.profile_img
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
    }, status: :ok
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
    return render json: { error: 'Invalid application_status.' }, status: :unprocessable_entity if params[:volunteer_application][:application_status].to_i > 3

    if @volunteer_application.update(volunteer_application_params)
      render json: @volunteer_application, status: :ok
    else
      render json: { errors: @volunteer_application.errors.full_messages }, status: :unprocessable_entity
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
    @organization = Organization.find_by(id: @volunteer_application.request.organization_id)
    return if Organization

    render json: { error: 'Organization not found for this request.' }, status: :not_found
  end

  def authorize_volunteer
    return true if @volunteer_application.nil?

    return render json: { error: 'Unauthorized access. Volunteer ID does not match the application.' }, status: :unauthorized unless @volunteer_application.volunteer_id == params[:volunteer_id].to_i

    render json: { error: 'Volunteer not found.' }, status: :not_found unless @volunteer
    true
  end

  def authorize_organization
    unless @volunteer_application.request.organization_id == params[:organization_id].to_i
      return render json: { error: 'Unauthorized access. You do not have permission to update this application.' }, status: :unauthorized
    end

    if @volunteer_application.volunteer_id != params[:volunteer_id].to_i
      render json: { error: 'Volunteer ID does not match the application.' }, status: :unprocessable_entity
      return
    end

    return true if @organization && @organization.id == params[:organization_id].to_i

    render json: { error: 'Unauthorized access.' }, status: :unauthorized and return false
  end

  def volunteer_application_params
    params.require(:volunteer_application).permit(:volunteer_id, :request_id, :message, :application_status)
  end
end
