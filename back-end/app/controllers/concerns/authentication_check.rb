module AuthenticationCheck
    extend ActiveSupport::Concern
    
    def is_auth_logged_in
      if current_auth.nil?
        render json: { message: "No auth is authenticated." },
          status: :unauthorized
      end
    end
end