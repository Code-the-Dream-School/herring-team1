# Organization model represents an organization in the system.
class Organization < ApplicationRecord
  belongs_to :auth, foreign_key: 'auth_id'
  has_one :address, dependent: :destroy
  paginates_per 6

  has_many :org_services, dependent: :destroy
  has_many :services, through: :org_services
  has_many :requests, through: :org_services, dependent: :destroy

  validates :auth_id, presence: true, uniqueness: true
  validates :name, presence: true
  validates :website, presence: true
  validates :phone, presence: true
  validates :description, presence: true
  validates :mission, presence: true
  validates :phone, format: { with: /\A\+?\d{10,15}\z/, message: "must be a valid phone number" }

  mount_uploader :logo, ImageUploader

end
