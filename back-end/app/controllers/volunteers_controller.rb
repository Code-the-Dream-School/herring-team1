class VolunteersController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET all volunteers
  def index
    @volunteers = Volunteer.includes(:addresses).all
    render json: @volunteers.as_json(include: :addresses)
  end

  # GET one volunteer
  def show
    @volunteer = find_volunteer
    render json: @volunteer.as_json(include: :addresses)
  rescue ActiveRecord::RecordNotFound
    render_not_found
  end

  # UPDATE volunteer
  def update
    @volunteer = find_volunteer
    if @volunteer.update(volunteer_params)
      render json: { message: "Volunteer updated successfully", volunteer: @volunteer.as_json(include: :addresses) }, status: :ok
    else
      render json: { error: "Failed to update volunteer", details: @volunteer.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render_not_found
  end

  # DELETE volunteer
  def destroy
    @volunteer = find_volunteer
    if @volunteer.destroy
      render json: { message: "Volunteer deleted successfully" }, status: :ok
    else
      render json: { error: "Failed to delete volunteer" }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render_not_found
  end

  def upload_image
    @volunteer = find_volunteer
    return render_not_found unless @volunteer

    if params[:profile_img].present?
      process_image_upload
    else
      render json: { error: 'No image file provided' }, status: :unprocessable_entity
    end
  rescue Cloudinary::CarrierWave::UploadError => e
    handle_upload_error(e)
  end

  private

  def find_volunteer
    Volunteer.find(params[:id])
  end

  def render_not_found
    render json: { error: "Volunteer not found" }, status: :not_found
  end

  def process_image_upload
    Rails.logger.info "Uploading for Volunteer ID: #{@volunteer.id}"
    Rails.logger.info "Profile Image: #{params[:profile_img].inspect}"

    @volunteer.profile_img = params[:profile_img]
    if @volunteer.save
      render json: { imageUrl: @volunteer.profile_img.url }, status: :ok
    else
      render json: { error: @volunteer.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def handle_upload_error(error)
    Rails.logger.error "Cloudinary error: #{error.message}"
    render json: { error: "Cloudinary error: #{error.message}" }, status: :unprocessable_entity
  end

  # Params for update
  def volunteer_params
    params.require(:volunteer).permit(
      :first_name, :last_name, :email, :phone, :about, :profile_img,
      addresses_attributes: [:id, :address, :city, :state, :zip_code, :_destroy]
    )
  end
end
