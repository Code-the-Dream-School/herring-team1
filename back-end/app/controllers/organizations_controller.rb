# OrganizationsController handles the CRUD operations for organizations.
class OrganizationsController < ApplicationController
  include AuthenticationCheck
  include Pagination

  before_action :is_auth_logged_in, except: [:index, :show]
  before_action :ensure_is_organization, only: [:create]
  before_action :set_organization, only: %i[show update destroy]
  before_action :authorize_organization, only: [:update, :destroy]

  # GET all organizations
  def index
    @organizations = Organization.includes(:auth, :org_services, :address, org_services: :service)
    paginated_organizations = paginate(@organizations)

    render json: {
      current_page: paginated_organizations[:current_page],
      total_pages: paginated_organizations[:total_pages],
      total_count: paginated_organizations[:total_count],
      organizations: paginated_organizations[:collection].map do |organization|
        {
          id: organization.id,
          auth_id: organization.auth_id,
          name: organization.name,
          website: organization.website,
          phone: organization.phone,
          description: organization.description,
          mission: organization.mission,
          logo: organization.logo,
          email: organization.auth.email,
          org_services: organization.org_services.map do |org_service|
            {
              id: org_service.id,
              service_id: org_service.service_id,
              name: org_service.service.name
            }
          end,
          address: organization.address&.as_json(only: [:id, :street, :city, :state, :zip_code])
        }
      end
    }, status: :ok
  end

  # GET one organization
  def show
    render json: {
      organization: @organization.as_json(only: [:id, :auth_id, :name, :website, :phone, :description, :mission, :logo]).merge(
        email: @organization.auth.email,
        org_services: @organization.org_services.map do |org_service|
          {
            id: org_service.id,
            service_id: org_service.service_id,
            name: org_service.service.name
          }
        end,
        address: @organization.address.as_json(only: [:id, :street, :city, :state, :zip_code])
      )
    }, status: :ok
  end

  # POST - create organization
  def create
    # reate organization
    @organization = Organization.new(organization_params)
    @organization.auth_id = current_auth.id
    # create address

    if @organization.save
      # Add services if exist
      if params[:organization][:service_ids].present?
        service_ids = params[:organization][:service_ids]
        service_ids.each do |service_id|
          OrgService.create(organization: @organization, service_id: service_id)
        end
      end

      # Create address
      Address.create(address_params.merge(organization_id: @organization.id)) if params[:organization][:address].present?

      render json: {
        message: "Organization created successfully.",
        organization: @organization.as_json(only: [:id, :auth_id, :name, :website, :phone, :description, :mission, :logo]).merge(
          email: @organization.auth.email,
          org_services: @organization.org_services.map do |org_service|
            {
              id: org_service.id,
              service_id: org_service.service_id,
              name: org_service.service.name
            }
          end,
          address: @organization.address.as_json(only: [:id, :street, :city, :state, :zip_code])
        )
      }, status: :created
    else
      render json: { message: "Failed to create organization", errors: @organization.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # UPDATE organization
  # rubocop:disable Metrics/CyclomaticComplexity
  def update
    # update organization
    if @organization.update(organization_params)
      # update address if present
      if params[:organization][:address].present?
        if @organization.address.present?
          @organization.address.update(address_params)
        else
          @organization.create_address(address_params)
        end
      end

      # update OrgServices if present
      if params[:organization][:service_ids].present?
        current_service_ids = @organization.org_services.pluck(:service_id)

        # Find services that need to be removed (which exist, but are no longer in the new ones)
        services_to_remove = current_service_ids - params[:organization][:service_ids].map(&:to_i)
        # Find the services that need to be added (which are in the new ones, but not in the old ones)
        services_to_add = params[:organization][:service_ids].map(&:to_i) - current_service_ids

        # Removing old connections (and requests related to those services)
        @organization.org_services.where(service_id: services_to_remove).each do |org_service|
          org_service.requests.destroy_all
          org_service.destroy
        end

        # Adding new connections
        services_to_add.each do |service_id|
          OrgService.create(organization: @organization, service_id: service_id)
        end
      elsif params[:organization][:service_ids].empty?
        # If no services are selected, remove all existing connections and their associated requests
        @organization.org_services.each do |org_service|
          org_service.requests.destroy_all
          org_service.destroy
        end
      end

      render json: {
        message: "Organization updated successfully.",
        organization: @organization.as_json(only: [:id, :auth_id, :name, :website, :phone, :description, :mission, :logo]).merge(
          email: @organization.auth.email,
          org_services: @organization.org_services.map do |org_service|
            {
              id: org_service.id,
              service_id: org_service.service_id,
              name: org_service.service.name
            }
          end,
          address: @organization.address.as_json(only: [:id, :street, :city, :state, :zip_code])
        )
      }, status: :ok
    else
      render json: { message: "Failed to update organization", errors: @organization.errors.full_messages }, status: :unprocessable_entity
    end
  end
  # rubocop:enable Metrics/CyclomaticComplexity

  # DELETE organization
  def destroy
    ActiveRecord::Base.transaction do
      @organization.org_services.each do |org_service|
        Request.where(org_service_id: org_service.id).destroy_all
      end

      @organization.org_services.destroy_all

      @organization.destroy!

      render json: { message: "Organization deleted successfully." }, status: :ok
    end
  rescue StandardError => e
    render json: { message: "Failed to delete organization", errors: e.message }, status: :unprocessable_entity
  end

  # GET available services for a specific organization
  def available_services
    @organization = Organization.find(params[:id])
    available_services = @organization.org_services.map(&:service)

    render json: available_services
  end

  def my_organization
    organization = current_auth.organization

    if organization
      render json: {
        organization: organization.as_json(only: [:id, :auth_id, :name, :website, :phone, :description, :mission, :logo]).merge(
          email: organization.auth.email,
          org_services: organization.org_services.map do |org_service|
            {
              id: org_service.id,
              service_id: org_service.service_id,
              name: org_service.service.name
            }
          end,
          address: organization.address.as_json(only: [:id, :street, :city, :state, :zip_code])
        )
      }, status: :ok
    else
      render json: { message: 'You do not own an organization' }, status: :not_found
    end
  end

  def upload_logo
    if params[:logo].present?
      @organization = Organization.find(params[:id])
      @organization.logo = params[:logo]

      if @organization.save
        render json: { imageUrl: @organization.logo.url }, status: :ok
      else
        render json: { error: @organization.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'No logo file provided' }, status: :unprocessable_entity
    end
  end

  private

  # Set the organization for show, edit, update, and destroy actions
  def set_organization
    @organization = Organization.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { message: 'Organization not found' }, status: :not_found
  end

  # Authorize organization actions
  def authorize_organization
    return if @organization.auth_id == current_auth.id

    render json: { message: "You are not authorized to perform this action" }, status: :forbidden
  end

  # Check isOrganization == true
  def ensure_is_organization
    return if current_auth.isOrganization

    render json: { message: 'You register your account as volunteer, you can not create organization' }, status: :forbidden
  end

  # Permit the necessary parameters
  def organization_params
    params.require(:organization).permit(:name, :website, :phone, :description, :mission, :logo)
  end

  def address_params
    params.require(:organization).require(:address).permit(:street, :city, :state, :zip_code)
  end
end
# rubocop:enable Metrics/AbcSize
