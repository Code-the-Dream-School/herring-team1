class OrganizationsController < ApplicationController
  before_action :set_organization, only: %i[show edit update destroy]

  def index
    @organizations = Organization.all
    @organization.addresses.build
    render json: @organizations
  end

  def show
    render json: @organization
  end

  def create
    @organization = Organization.new(organization_params)

    if @organization.save
      render json: @organization, status: :created
    else
      render json: { errors: @organization.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @organization.update(organization_params)
      render json: @organization
    else
      render json: { errors: @organization.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @organization.destroy
    render json: { message: "Organization deleted successfully." }
  end

  private

  # Set the organization for show, edit, update, and destroy actions
  def set_organization
    @organization = Organization.find(params[:id])
  end

  # Permit the necessary parameters, including nested addresses
  def organization_params
    params.require(:organization).permit(
      :auth_id, :name, :website, :description, :mission, :logo,
      addresses_attributes: [:address, :city, :state, :zip_code]
      )
  end
end
