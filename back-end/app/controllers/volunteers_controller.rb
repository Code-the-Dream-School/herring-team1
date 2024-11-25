class VolunteersController < ApplicationController
    def index
        @volunteers = Volunteer.all
        render json: @volunteers
    end
end
