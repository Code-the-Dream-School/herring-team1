# OrganizationsController handles actions related to managing organizations.
class OrganizationsController < ApplicationController
  before_action :set_organization, only: %i[show update destroy]

  # GET all organizations
  def index
    @organizations = Organization.includes(:addresses).all
    @organizations.each { |org| org.addresses.build }
    render json: @organizations.as_json(include: :addresses)
  end

  # GET one organization
  def show
    render json: @organization.as_json(include: :addresses)
  end

  # POST - create organization
  def create
    @organization = Organization.new(organization_params)

    if @organization.save
      render json: @organization, status: :created
    else
      render json: { errors: @organization.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # UPDATE organization
  def update
    if @organization.update(organization_params)
      @organization = Organization.find(params[:id])
      render json: @organization
    else
      render json: { errors: @organization.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE organization
  def destroy
    if @organization.destroy
      render json: { message: "Organization deleted successfully." }, status: :ok
    else
      render json: { error: "Failed to delete organization" }, status: :unprocessable_entity
    end
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
      addresses_attributes: [:id, :address, :city, :state, :zip_code, :_destroy]
    )
  end
end
