class VolunteersController < ApplicationController
    before_action :find_volunteer, only: [:show]
  
    # GET all volunteers
    def index
      @volunteers = Volunteer.all
      render json: @volunteers
    end
  
    # GET one volunteer
    def show
      render json: @volunteer
    end
  
    private
  
    def find_volunteer
      @volunteer = Volunteer.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Volunteer not found" }, status: :not_found
    end
  end