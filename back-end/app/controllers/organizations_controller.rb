# OrganizationsController handles the CRUD operations for organizations.
class OrganizationsController < ApplicationController
  before_action :set_organization, only: %i[show update destroy]

  # GET all organizations
  def index
    @organizations = Organization.includes(:addresses).all
    render json: @organizations.as_json(include: [:addresses, :org_services])
  end

  # GET one organization
  def show
    render json: @organization.as_json(include: [:addresses, :org_services])
  end

  # POST - create organization
  def create
    @organization = Organization.new(organization_params.except(:service_ids))

    if @organization.save
      if params[:organization][:service_ids].present?
        params[:organization][:service_ids].map do |service_id|
          OrgService.create(organization: @organization, service_id: service_id)
        end
      end

      render json: @organization.as_json(include: { org_services: { include: :service } }), status: :created
    else
      render json: { errors: @organization.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # UPDATE organization
  def update
    if @organization.update(organization_params.except(:service_ids))
      current_service_ids = @organization.org_services.pluck(:service_id)
      service_ids_to_add = params[:organization][:service_ids] - current_service_ids
      service_ids_to_remove = current_service_ids - params[:organization][:service_ids]

      service_ids_to_add.each do |service_id|
        OrgService.create(organization: @organization, service_id: service_id)
      end

      @organization.org_services.where(service_id: service_ids_to_remove).destroy_all

      @organization.reload
      render json: @organization.as_json(include: { org_services: { include: :service } }), status: :ok
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

  # GET available services for a specific organization
  def available_services
    @organization = Organization.find(params[:id])
    available_services = @organization.org_services.map(&:service)

    render json: available_services
  end

  private

  # Set the organization for show, edit, update, and destroy actions
  def set_organization
    @organization = Organization.includes(:addresses).find(params[:id])
  end

  # Permit the necessary parameters, including nested addresses
  def organization_params
    params.require(:organization).permit(
      :auth_id, :name, :website, :phone, :description, :mission, :logo, :email,
      addresses_attributes: [:id, :address, :city, :state, :zip_code, :_destroy],
      service_ids: []
    )
  end
end
