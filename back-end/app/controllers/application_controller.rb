class ApplicationController < ActionController::Base
    include ExceptionHandler
    protect_from_forgery with: :exception
    before_action :set_cors_headers
    
    # rescue_from ActionController::InvalidAuthenticityToken, with: :handle_invalid_authenticity_token

    def set_cors_headers
        allowed_origins = ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://careconnectproject.onrender.com:3000', 'https://careconnectproject.onrender.com:3000']
        origin = request.headers['Origin']
      
        if allowed_origins.include?(origin)
          headers['Access-Control-Allow-Origin'] = origin
        end
      
        headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD'
        headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, X-Requested-With'
        headers['Access-Control-Allow-Credentials'] = 'true'
    end

  # def handle_invalid_authenticity_token
  #   render json: { 
  #     message: "This action is only available to logged-in users." 
  #   }, status: :unauthorized
  # end      
end
