Kaminari.configure do |config|
  config.default_per_page = 6  
  config.max_per_page = 50      
  config.window = 4             
  config.outer_window = 0       
  config.left = 2
  config.right = 2
  config.page_method_name = :per_page_kaminari
end
