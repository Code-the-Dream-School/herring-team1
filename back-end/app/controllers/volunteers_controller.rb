class VolunteersController < ApplicationController
  include AuthenticationCheck

  before_action :find_volunteer, only: [:show, :update, :destroy]
  before_action :authorize_volunteer, only: [:update, :destroy]

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
        address: @volunteer.address.as_json(only: [:id, :street, :city, :state, :zip_code])
      }
    }, status: :ok
  end

  # POST - create volunteer
  def create
    @volunteer = Volunteer.new(volunteer_params)
    @volunteer.auth_id = current_auth.id

    if @volunteer.save
      # Create address
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

  # UPDATE volunteer
  def update
    if @volunteer.update(volunteer_params)
      if params[:volunteer][:address].present?
        if @volunteer.address.present?
          @volunteer.address.update(address_params)
        else
          @volunteer.create_address(address_params)
        end
      end
      render json: { message: "Volunteer updated successfully",
                     volunteer: {
                       id: @volunteer.id,
                       auth_id: @volunteer.auth_id,
                       first_name: @volunteer.first_name,
                       last_name: @volunteer.last_name,
                       phone: @volunteer.phone,
                       about: @volunteer.about,
                       profile_img: @volunteer.profile_img,
                       email: @volunteer.auth.email,
                       address: @volunteer.address.as_json(only: [:id, :street, :city, :state, :zip_code])
                     } }, status: :ok
    else
      render json: { message: "Failed to update volunteer", errors: @volunteer.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE volunteer
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
      render json: volunteer.as_json(include: { address: {}, auth: { only: :email } }), status: :ok
    else
      render json: { message: 'You do not own an volunteer' }, status: :not_found
    end
  end

  private

  # Authorize volunteer actions
  def authorize_volunteer
    return if @volunteer.auth_id == current_auth.id

    render json: { message: "You are not authorized to perform this action" }, status: :forbidden
  end

  # Find volunteer by ID
  def find_volunteer
    @volunteer = Volunteer.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { message: "Volunteer not found" }, status: :not_found
  end

  # Params for update
  def volunteer_params
    params.require(:volunteer).permit(:first_name, :last_name, :phone, :about, :profile_img)
  end

  def address_params
    params.require(:volunteer).require(:address).permit(:street, :city, :state, :zip_code)
  end
end
