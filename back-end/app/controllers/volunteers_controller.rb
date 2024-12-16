class VolunteersController < ApplicationController
  skip_before_action :verify_authenticity_token

  # before_action :find_volunteer, only: [:show, :update, :destroy]
  # before_action :authorize_volunteer, only: [:update, :destroy]

  # GET all volunteers
  def index
    @volunteers = Volunteer.includes(:addresses).all
    render json: @volunteers.as_json(include: :addresses)
  end

  # GET one volunteer
  def show
    @volunteer = Volunteer.find(params[:id])
    render json: @volunteer.as_json(include: :addresses)
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Volunteer not found" }, status: :not_found
  end

  # UPDATE volunteer
  def update
    @volunteer = Volunteer.find(params[:id])
    if @volunteer.update(volunteer_params)
      render json: { message: "Volunteer updated successfully", volunteer: @volunteer.as_json(include: :addresses) }, status: :ok
    else
      render json: { error: "Failed to update volunteer", details: @volunteer.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Volunteer not found" }, status: :not_found
  end

  # DELETE volunteer
  def destroy
    @volunteer = Volunteer.find(params[:id])
    if @volunteer.destroy
      render json: { message: "Volunteer deleted successfully" }, status: :ok
    else
      render json: { error: "Failed to delete volunteer" }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Volunteer not found" }, status: :not_found
  end

  private

  # Params for update
  def volunteer_params
    params.require(:volunteer).permit(
      :first_name, :last_name, :email, :phone, :about,
      addresses_attributes: [:id, :address, :city, :state, :zip_code, :_destroy]
    )
  end
end
