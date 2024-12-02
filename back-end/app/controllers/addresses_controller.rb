class AddressesController < ApplicationController
  before_action :set_address, only: [:show, :update, :destroy]

  # GET /addresses
  def index
    if params[:organization_id].present?
      @addresses = Address.where(addressable_id: params[:organization_id], addressable_type: 'Organization')
    elsif params[:volunteer_id].present?
      @addresses = Address.where(addressable_id: params[:volunteer_id], addressable_type: 'Volunteer')
    else
      @addresses = Address.all
    end
    render json: @addresses
  end

  # GET /addresses/:id
  def show
    render json: @address
  end

  # POST /addresses
  def create
    @address = Address.new(address_params)

    if @address.save
      render json: @address, status: :created, location: @address
    else
      render json: @address.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /addresses/:id
  def update
    if @address.update(address_params)
      render json: @address
    else
      render json: @address.errors, status: :unprocessable_entity
    end
  end

  # DELETE /addresses/:id
  def destroy
    @address.destroy
    render json: { message: "Address deleted successfully." }, status: :ok
  end

  # Find addresses for a specific organization
  def for_organization
    @organization = Organization.find(params[:organization_id])
    @addresses = @organization.addresses
    render json: @addresses
  end

  private

  def set_address
    @address = Address.find(params[:id])
  end

  # Params for update
  def address_params
    params.require(:address).permit(:address, :city, :state, :zip_code, :addressable_type, :addressable_id)
  end
end
