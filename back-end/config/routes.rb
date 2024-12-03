Rails.application.routes.draw do
  devise_for :auth, path: 'auth', path_names: { sign_in: 'login', sign_out: 'logout' },
              controllers: {
                sessions: 'auth/sessions',
                registrations: 'auth/registrations'
              }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # search_by_zip_code using address model
  get 'search/zip', to: 'search#search_by_zip_code'

  # search by keyword using organization model
  get 'search/keyword', to: 'search#search_by_keyword'

  # search by services using organization model
  get 'search/services', to: 'search#search_by_services'

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
