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
      register_success(resource)
    else
      register_failed(resource)
    end
  end

  def register_success(resource)
    # related_entity = resource.isOrganization ? Organization.find_by(auth_id: resource.id) : Volunteer.find_by(auth_id: resource.id)

    cookies["CSRF-TOKEN"] = { value: form_authenticity_token, secure: true, same_site: :None, partitioned: true }
    response.set_header('X-CSRF-Token', form_authenticity_token)

    render json: { 
      message: 'Signed up successfully.', 
      user: {
        id: resource.id,
        email: resource.email,
        isOrganization: resource.isOrganization
        # related_entity_id: related_entity&.id || nil 
      } 
    }, status: :created
  end

  def register_failed(resource)
    render json: { message: resource.errors.full_messages }, status: :bad_request
  end
end
