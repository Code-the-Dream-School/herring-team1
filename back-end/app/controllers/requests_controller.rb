# This controller manages requests, including creating, showing, updating,
# and deleting requests. It supports operations for both organizations and public users.

# rubocop:disable Metrics/AbcSize

class RequestsController < ApplicationController
  before_action :set_organization, only: [:create, :show, :update, :destroy]
  before_action :set_org_service, only: [:create]
  before_action :set_request, only: [:show, :update, :destroy]
  before_action :authorize_request_owner, only: [:update, :destroy]

  # GET /requests
  def index
    @requests = Request.all
    render json: @requests
  end

  # GET /requests/:id
  def show
    @request = if @organization
                 @organization.requests.find(params[:id])
               else
                 Request.find_by(id: params[:id])
               end
    render json: @request, include: { org_service: { include: :service }, request_status: {} }
  end

  # POST /organizations/:id/requests
  def create
    @org_service = OrgService.find_by(id: params[:request][:org_service_id])

    if @org_service.nil? || @org_service.organization_id != @organization.id
      render json: { error: 'Invalid service for this organization' }, status: :unprocessable_entity
      return
    end

    @request = @organization.requests.new(request_params.merge(request_status_id: default_status.id))

    if @request.save
      render json: @request, status: :created, include: { org_service: { include: :service }, request_status: {} }
    else
      render json: { errors: @request.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT/PATCH  /organizations/:id/requests/:id
  def update
    if @request.update(request_params)
      render json: @request, status: :ok, include: { org_service: { include: :service }, request_status: {} }
    else
      render json: { errors: @request.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /organizations/:id/requests/:id
  def destroy
    if @request.destroy
      render json: { message: 'Request successfully deleted' }, status: :ok
    else
      render json: { error: 'Failed to delete request' }, status: :unprocessable_entity
    end
  end

  private

  def set_organization
    @organization = Organization.find_by(id: params[:organization_id]) if params[:organization_id]
  end

  def set_request
    @request = Request.find_by(id: params[:id])
    render json: { error: 'Request not found' }, status: :not_found unless @request
  end

  def set_org_service
    @org_service = OrgService.find_by(service_id: params[:request][:org_service_id])
  end

  def authorize_request_owner
    return if @request.organization_id == @organization&.id

    render json: { error: 'Request does not belong to this organization' }, status: :forbidden
  end

  def default_status
    @default_status ||= RequestStatus.find_by(request_status_name: 'open')
  end

  def request_params
    params.require(:request).permit(:title, :description, :org_service_id, :organization_id)
  end
end
# rubocop:enable Metrics/AbcSize
