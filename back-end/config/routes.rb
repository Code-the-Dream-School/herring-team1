Rails.application.routes.draw do
  devise_for :auth, path: 'auth', path_names: { sign_in: 'login', sign_out: 'logout' },
              controllers: {
                sessions: 'auth/sessions',
                registrations: 'auth/registrations'
              }

  resources :organizations

  get "up" => "rails/health#show", as: :rails_health_check
end
