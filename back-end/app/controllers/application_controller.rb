class ApplicationController < ActionController::Base
    include ExceptionHandler

    before_action :set_cors_headers

    def set_cors_headers
        allowed_origins = ['http://127.0.0.1:5173', 'http://localhost:5173']
        origin = request.headers['Origin']
      
        if allowed_origins.include?(origin)
          headers['Access-Control-Allow-Origin'] = origin
        end
      
        headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD'
        headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, X-Requested-With'
        headers['Access-Control-Allow-Credentials'] = 'true'
      end
      
end
