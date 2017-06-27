Zhongyao114::Application.routes.draw do

  namespace :work do
    resources :prescription_details
    resources :prescriptions
    resources :efficacies
    resources :diseases
    resources :alias_names
    resources :medicines
  end  

end  