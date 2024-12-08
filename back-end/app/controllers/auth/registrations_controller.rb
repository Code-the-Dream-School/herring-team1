class Auth::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  skip_forgery_protection only: [:create]

  before_action :configure_sign_up_params, only: [:create]

  private

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:isOrganization])
  end

  def respond_with(resource, _opts = {})
    if resource.persisted?
      handle_organization_creation(resource)
      handle_volunteer_creation(resource)
      register_success(resource)
    else
      register_failed(resource)
    end
  end

  def handle_organization_creation(resource)
    return unless resource.isOrganization?
  
    Organization.create!(
      auth_id: resource.id,
      email: resource.email
    )
  end

  def handle_volunteer_creation(resource)
    return if resource.isOrganization

    Volunteer.create!(
      auth_id: resource.id,
      email: resource.email
    )
    
  end

  def register_success(resource)
    cookies["CSRF-TOKEN"] = { value: form_authenticity_token, secure: true, same_site: :None, partitioned: true }
    response.set_header('X-CSRF-Token', form_authenticity_token)

    render json: { 
      message: 'Signed up successfully.', 
      user: {
        id: resource.id,
        email: resource.email,
        isOrganization: resource.isOrganization
      } 
    }, status: :created
  end

  def register_failed(resource)
    render json: { message: resource.errors.full_messages }, status: :bad_request
  end
end
