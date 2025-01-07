class VolunteersController < ApplicationController
  include AuthenticationCheck

  before_action :is_auth_logged_in
  before_action :ensure_is_volunteer, only: [:create]
  before_action :find_volunteer, only: [:show, :update, :destroy, :upload_image]
  before_action :authorize_volunteer!, only: [:update, :destroy]

  # GET all volunteers
  def index
    @volunteers = Volunteer.includes(:auth, :address)

    render json: @volunteers.map { |volunteer|
      {
        id: volunteer.id,
        auth_id: volunteer.auth_id,
        first_name: volunteer.first_name,
        last_name: volunteer.last_name,
        phone: volunteer.phone,
        about: volunteer.about,
        profile_img: volunteer.profile_img,
        email: volunteer.auth.email,
        address: volunteer.address&.as_json(only: [:id, :street, :city, :state, :zip_code])
      }
    }, status: :ok
  end

  # GET one volunteer by ID
  def show
    render json: {
      volunteer: {
        id: @volunteer.id,
        auth_id: @volunteer.auth_id,
        first_name: @volunteer.first_name,
        last_name: @volunteer.last_name,
        phone: @volunteer.phone,
        about: @volunteer.about,
        profile_img: @volunteer.profile_img,
        email: @volunteer.auth.email,
        address: @volunteer.address&.as_json(only: [:id, :street, :city, :state, :zip_code]),
        created_at: @volunteer.created_at,
        updated_at: @volunteer.updated_at
      }
    }, status: :ok
  end

  # POST - create volunteer
  def create
    @volunteer = Volunteer.new(volunteer_params)
    @volunteer.auth_id = current_auth.id

    if @volunteer.save
      address = Address.create(address_params.merge(volunteer_id: @volunteer.id)) if params[:volunteer][:address].present?

      render json: {
        message: "Volunteer created successfully",
        volunteer: {
          id: @volunteer.id,
          auth_id: @volunteer.auth_id,
          first_name: @volunteer.first_name,
          last_name: @volunteer.last_name,
          phone: @volunteer.phone,
          about: @volunteer.about,
          profile_img: @volunteer.profile_img,
          email: @volunteer.auth.email,
          address: address&.as_json(only: [:id, :street, :city, :state, :zip_code])
        }
      }, status: :created
    else
      render json: { message: "Failed to create volunteer", errors: @volunteer.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT - update volunteer
  def update
    if @volunteer.update(volunteer_params)
      if params[:volunteer][:address].present?
        if @volunteer.address.present?
          @volunteer.address.update(address_params)
        else
          @volunteer.create_address(address_params)
        end
      end
      render json: {
        message: "Volunteer updated successfully",
        volunteer: {
          id: @volunteer.id,
          auth_id: @volunteer.auth_id,
          first_name: @volunteer.first_name,
          last_name: @volunteer.last_name,
          phone: @volunteer.phone,
          about: @volunteer.about,
          profile_img: @volunteer.profile_img,
          email: @volunteer.auth.email,
          address: @volunteer.address&.as_json(only: [:id, :street, :city, :state, :zip_code]),
          created_at: @volunteer.created_at,
          updated_at: @volunteer.updated_at
        }
      }, status: :ok
    else
      render json: { message: "Failed to update volunteer", errors: @volunteer.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE - delete volunteer
  def destroy
    if @volunteer.destroy
      render json: { message: "Volunteer deleted successfully" }, status: :ok
    else
      render json: { message: "Failed to delete volunteer", errors: @volunteer.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET my volunteer
  def my_volunteer
    volunteer = current_auth.volunteer

    if volunteer
      render json: {
        id: volunteer.id,
        auth_id: volunteer.auth_id,
        first_name: volunteer.first_name,
        last_name: volunteer.last_name,
        phone: volunteer.phone,
        about: volunteer.about,
        profile_img: volunteer.profile_img,
        email: volunteer.auth.email,
        address: volunteer.address&.as_json(only: [:id, :street, :city, :state, :zip_code]),
        created_at: volunteer.created_at,
        updated_at: volunteer.updated_at
      }, status: :ok
    else
      render json: { message: 'You do not own a volunteer profile' }, status: :not_found
    end
  end

  # POST - upload profile image
  def upload_image
    if params[:profile_img].present?
      @volunteer.profile_img = params[:profile_img]
      if @volunteer.save
        render json: { imageUrl: @volunteer.profile_img.url }, status: :ok
      else
        render json: { error: @volunteer.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'No image file provided' }, status: :unprocessable_entity
    end
  rescue Cloudinary::CarrierWave::UploadError => e
    handle_upload_error(e)
  end

  private

  # Authenticate volunteer
  def authorize_volunteer!
    return if @volunteer.auth_id == current_auth.id

    render json: { message: "You are not authorized to perform this action" }, status: :forbidden
  end

  # Find volunteer by ID
  def find_volunteer
    @volunteer = Volunteer.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { message: "Volunteer not found" }, status: :not_found
  end

  # Ensure user is not an organization
  def ensure_is_volunteer
    Rails.logger.info "isOrganization: #{current_auth.isOrganization}"
    return unless current_auth.isOrganization

    render json: { message: 'You registered as an organization, you cannot create a volunteer profile' }, status: :forbidden
  end

  # Strong parameters
  def volunteer_params
    params.require(:volunteer).permit(:first_name, :last_name, :phone, :about, :profile_img)
  end

  def address_params
    params.require(:volunteer).require(:address).permit(:street, :city, :state, :zip_code)
  end

  def handle_upload_error(error)
    Rails.logger.error "Cloudinary error: #{error.message}"
    render json: { error: "Cloudinary error: #{error.message}" }, status: :unprocessable_entity
  end
end
