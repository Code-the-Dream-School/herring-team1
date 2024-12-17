# This controller manages requests, including creating, showing, updating,
# and deleting requests. It supports operations for both organizations and public users.

class RequestsController < ApplicationController
  before_action :set_organization, only: [:create, :show, :update, :destroy]
  before_action :set_org_service, only: [:create]
  before_action :set_request, only: [:show, :update, :destroy]
  before_action :authorize_request_owner, only: [:update, :destroy]

  # GET /requests
  def index
    if params[:organization_id]
      @requests = Request.where(organization: params[:organization_id])
      if @requests.empty?
        render json: { error: 'No requests found for this organization' }, status: :not_found
        return
      end
    else
      @requests = Request.all
    end

    render json: @requests, include: { org_service: { include: :service } }
  end

  # GET /requests/:id
  def show
    @request = Request.find_by(id: params[:id])

    if @request.nil?
      render json: { error: 'Request not found' }, status: :not_found
    else
      render json: @request, include: { org_service: { include: :service } }
    end
  end

  # POST /organizations/:id/requests
  def create
    @org_service = OrgService.find_by(id: params[:request][:org_service_id])

    if @org_service.nil? || @org_service.organization_id != @organization.id
      render json: { error: 'Invalid service for this organization' }, status: :unprocessable_entity
      return
    end

    @request = @org_service.requests.new(request_params)

    if @request.save
      render json: {
        message: "Request created successfully.",
        request: @request.as_json(include: { org_service: { include: :service } })
      }, status: :created
    else
      render json: { errors: @request.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT/PATCH  /organizations/:id/requests/:id
  def update
    @org_service = @request.org_service

    if @org_service.organization_id != @organization.id
      render json: { error: 'Invalid service for this organization' }, status: :unprocessable_entity
      return
    end

    if @request.update(request_params)
      render json: {
        message: "Request updated successfully.",
        request: @request.as_json(include: { org_service: { include: :service } })
      }, status: :ok
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
    return if @request.org_service.organization_id == @organization&.id

    render json: { error: 'Request does not belong to this organization' }, status: :forbidden
  end

  def request_params
    params.require(:request).permit(:title, :description, :status, :org_service_id)
  end
end
