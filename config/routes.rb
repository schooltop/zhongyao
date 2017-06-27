Rails.application.routes.draw do
  
  devise_for :users, path: "web", path_names: { sign_in: 'login', sign_out: 'logout', password: 'secret', confirmation: 'verification', unlock: 'unblock', sign_up: 'cmon_let_me_in' }, controllers: { sessions: "web/sessions", registrations: "web/registrations", passwords: "web/passwords" }

  devise_scope :user do
    delete "/users/sign_out" => "devise/sessions#destroy"
  end

  root :to => 'dashboard#index'
  # match '/admin/ajax_bar' => 'website/ajax_bar/ajax_bar#ajax', :as => :ajax_bar, :via => [:post, :get]
end
