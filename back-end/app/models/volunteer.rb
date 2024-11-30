class Volunteer < ApplicationRecord
    validates :auth_id, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true

    has_many :addresses, as: :addressable, dependent: :destroy

    accepts_nested_attributes_for :addresses, allow_destroy: true
end
