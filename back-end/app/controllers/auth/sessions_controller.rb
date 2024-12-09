class Auth::SessionsController < Devise::SessionsController
    respond_to :json
    skip_forgery_protection only: [:create]
  
    def destroy
      @logged_in_auth = current_auth
      super 
    end
  
    private
  
    def respond_with(resource, _opts = {})
      if resource.id.nil?
        render json: { message: 'Authentication failed.'}, status: :unauthorized
      else
        related_entity = resource.isOrganization ? Organization.find_by(auth_id: resource.id) : Volunteer.find_by(auth_id: resource.id)
        cookies["CSRF-TOKEN"] = { value: form_authenticity_token, secure: true, same_site: :None, partitioned: true }
        response.set_header('X-CSRF-Token', form_authenticity_token)        
        render json: { 
          message: 'You are logged in.',
          user: {
            id: resource.id,
            email: resource.email,
            isOrganization: resource.isOrganization,
            related_entity_id: related_entity&.id || nil 
          }
        }, status: :created
      end
    end
  
    def respond_to_on_destroy
      log_out_success && return if @logged_in_auth
  
      log_out_failure
    end
  
    def log_out_success
      # Rails.logger.info "Logging out user with ID: #{current_auth}"
      # cookies.delete(:_session_id, domain: :all, path: '/')
      # cookies.delete('CSRF-TOKEN', domain: :all, path: '/')
      # response.set_header('X-CSRF-Token', '')
      render json: { message: "You are logged out." }, status: :ok
    end
  
    def log_out_failure
      render json: { message: "Hmm nothing happened."}, status: :unauthorized
    end
  end
