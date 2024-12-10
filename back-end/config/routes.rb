Rails.application.routes.draw do
  devise_for :auth, path: 'auth', path_names: { sign_in: 'login', sign_out: 'logout' },
             controllers: {
               sessions: 'auth/sessions',
               registrations: 'auth/registrations'
             }

  resources :organizations do
    member do
      get :available_services
    end
    resources :requests, only: [:index, :show, :create, :update, :destroy]
  end

  resources :volunteers, only: [:index, :show, :update, :destroy]
  resources :addresses, only: [:index, :show, :create, :update, :destroy]
  resources :requests, only: [:index, :show]

  # Универсальный маршрут для поиска
  get '/search', to: 'search#search'

end
