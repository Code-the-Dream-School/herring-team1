class VolunteerApplicationsController < ApplicationController
  before_action :set_volunteer_application, only: [:show, :update, :destroy]
  before_action :set_organization, only: [:update]
  before_action :authorize_organization, only: [:update], if: -> { params[:organization_id].present? }
  before_action :set_volunteer, only: [:create, :update, :destroy]
  before_action :authorize_volunteer, only: [:create, :destroy, :update], unless: -> { params[:application_status].present? }

  # GET /volunteer_applications
  # GET /volunteer_applications?organization_id={{organization_id}}
  def index
    if params[:organization_id]
      @volunteer_applications = VolunteerApplication.joins(:request)
                                                    .where(requests: { organization_id: params[:organization_id] })
                                                    .includes(:request)
      return render json: { error: 'No volunteer applications found for this organization' }, status: :not_found if @volunteer_applications.empty?

      render json: @volunteer_applications.as_json(include: :request)
    else
      @volunteer_applications = VolunteerApplication.all

      render json: @volunteer_applications
    end
  end

  # GET /volunteer_applications/:id
  def show
    render json: @volunteer_application
  end

  # POST /volunteers/:volunteer_id/volunteer_applications
  def create
    @volunteer_application = VolunteerApplication.new(volunteer_application_params)
    @volunteer_application.volunteer_id = @volunteer.id # current logged-in
    @volunteer_application.application_status = 0 # Default status

    if @volunteer_application.save
      render json: @volunteer_application, status: :created
    else
      render json: @volunteer_application.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /volunteers/:volunteer_id/volunteer_applications/:id
  # PATCH/PUT /volunteer_applications/:id
  def update
    if params[:volunteer_application][:application_status].to_i > 3
      render json: { error: 'Invalid application_status.' }, status: :unprocessable_entity
      return
    end

    if @volunteer_application.update(volunteer_application_params)
      render json: @volunteer_application, status: :ok
    else
      render json: { errors: @volunteer_application.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /volunteers/:volunteer_id/volunteer_applications/:id
  # DELETE /volunteer_applications/:id
  def destroy
    if @volunteer_application.destroy
      render json: { message: "Application deleted successfully!" }, status: :ok
    else
      render json: { error: 'Failed to delete application.' }, status: :unprocessable_entity
    end
  end

  private

  def set_volunteer
    if @volunteer_application.nil?
      @volunteer = Volunteer.find_by(id: params[:volunteer_id]) if params[:volunteer_id].present?
    else
      @volunteer = Volunteer.find_by(id: @volunteer_application.volunteer_id)
    end

    return if @volunteer

    render json: { error: 'Volunteer not found.' }, status: :not_found
  end

  def set_volunteer_application
    @volunteer_application = VolunteerApplication.find(params[:id])
    render json: { error: 'Volunteer Application not found.' }, status: :not_found unless @volunteer_application

    return unless params[:volunteer_id].present? && @volunteer_application.volunteer_id != params[:volunteer_id].to_i

    render json: { error: 'Unauthorized access.' }, status: :unauthorized
  end

  def set_organization
    @organization = Organization.find_by(id: @volunteer_application.request.organization_id)

    return if @organization

    render json: { error: 'Organization not found for this request.' }, status: :not_found
  end

  def authorize_volunteer
    return true if @volunteer_application.nil?

    if @volunteer_application.volunteer_id != params[:volunteer_id].to_i
      render json: { error: 'Unauthorized access. Volunteer ID does not match the application.' }, status: :unauthorized
      return
    end

    unless @volunteer
      render json: { error: 'Volunteer not found.' }, status: :not_found
      return
    end
    true
  end

  def authorize_organization
    request_organization_id = @volunteer_application.request.organization_id
    if request_organization_id != params[:organization_id].to_i
      render json: { error: 'Unauthorized access. You do not have permission to update this application.' }, status: :unauthorized
      return
    end

    if @volunteer_application.volunteer_id != params[:volunteer_id].to_i
      render json: { error: 'Volunteer ID does not match the application.' }, status: :unprocessable_entity
      return
    end

    return true if @organization && @organization.id == params[:organization_id].to_i

    render json: { error: 'Unauthorized access.' }, status: :unauthorized and return false
  end

  attr_reader :current_user

  def volunteer_application_params
    if current_user == @organization || params[:id].nil?
      params.require(:volunteer_application).permit(:volunteer_id, :request_id, :application_status, :message)
    else
      params.require(:volunteer_application).permit(:volunteer_id, :request_id, :message)
    end
  end
end
