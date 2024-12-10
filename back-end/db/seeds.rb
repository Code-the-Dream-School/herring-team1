# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Service.create([
                 { name: 'Food service' },
                 { name: 'Transportation' },
                 { name: 'Education' },
                 { name: 'Sports&Recreation' },
                 { name: 'Attractions' },
                 { name: 'Housing&Facilities' },
                 { name: 'Legal&Advocacy' },
                 { name: 'Hobbies&Crafts' },
                 { name: 'Arts&Culture' },
                 { name: 'Health&Medicine' }
               ])

RequestStatus.create([
                       { request_status_name: 'open' },
                       { request_status_name: 'in-progress' },
                       { request_status_name: 'closed' },
                       { request_status_name: 'canceled' }
                     ])
