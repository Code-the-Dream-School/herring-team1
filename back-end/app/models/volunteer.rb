class Volunteer < ApplicationRecord
  belongs_to :auth, foreign_key: 'auth_id'
  has_one :address, dependent: :destroy

  validates :auth_id, presence: true, uniqueness: true
  validates :first_name, :last_name, :phone, :about, :profile_img, presence: true

  validates :phone, format: { with: /\A\+?\d{10,15}\z/, message: "must be a valid phone number" }
end
