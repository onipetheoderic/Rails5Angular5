Rails.application.routes.draw do
  resources :movies do 
  	get 'search', on: :collection#this is for the search method
  end

end
