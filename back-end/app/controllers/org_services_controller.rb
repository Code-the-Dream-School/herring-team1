# OrgServicesController handles the CRUD operations for OrgServices
class OrgServicesController < ApplicationController
  include AuthenticationCheck

  before_action :is_auth_logged_in
  before_action :set_organization

  def create
    service_ids = params[:service_ids]
    @organization.services = Service.where(id: service_ids)

    if @organization.save
      render json: { message: 'Services updated successfully', services: @organization.services }, status: :ok
    else
      render json: { errors: @organization.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  # Find the organization by ID
  def set_organization
    @organization = Organization.find(params[:organization_id])
  end
end
