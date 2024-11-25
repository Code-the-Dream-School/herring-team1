class Volunteer < ApplicationRecord
    validates :auth_id, presence: true
    validates :first_name, presence: true
    validates :last_name, presence: true
    
    validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
end
