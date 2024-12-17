class Volunteer < ApplicationRecord
  validates :auth_id, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true

  has_many :addresses, as: :addressable, dependent: :destroy
  has_many :volunteer_applications
  has_many :requests, through: :volunteer_applications

  accepts_nested_attributes_for :addresses, allow_destroy: true

  mount_uploader :profile_img, ImageUploader
end
