class VolunteersController < ApplicationController
    before_action :find_volunteer, only: [:show, :update, :destroy]
  
    # GET all volunteers
    def index
      @volunteers = Volunteer.includes(:addresses).all
      render json: @volunteers.as_json(include: :addresses)
    end
  
    # GET one volunteer
    def show
      render json: @volunteer.as_json(include: :addresses)
    end
  

    # UPDATE volunteer
    def update
        if @volunteer.update(volunteer_params)
        render json: { message: "Volunteer updated successfully", volunteer: @volunteer.as_json(include: :addresses) }, status: :ok
        else
        render json: { error: "Failed to update volunteer", details: @volunteer.errors.full_messages }, status: :unprocessable_entity
        end
    end

    # DELETE volunteer
    def destroy
        if @volunteer.destroy
        render json: { message: "Volunteer deleted successfully" }, status: :ok
        else
        render json: { error: "Failed to delete volunteer" }, status: :unprocessable_entity
        end
    end
    private
  
    # Find volunteer by ID
    def find_volunteer
      @volunteer = Volunteer.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Volunteer not found" }, status: :not_found
    end

    # Params for update
    def volunteer_params
        params.require(:volunteer).permit(:first_name, :last_name, :email, :about, :services, :profile_img, addresses_attributes: [:id, :address, :city, :state, :zip_code, :_destroy] )
    end
  end