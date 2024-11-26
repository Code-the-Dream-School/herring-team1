class Volunteer < ApplicationRecord
    validates :auth_id, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
end
