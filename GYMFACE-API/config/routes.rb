Rails.application.routes.draw do
  resources :klasses, only: :index
  resources :users, only: [:show, :create, :update]
  resources :user_klasses, only: [:create]

  post '/login', to: 'users#login'
  post '/logout', to: 'users#logout'
  delete '/user_klasses', to: 'user_klasses#destroy'

end
