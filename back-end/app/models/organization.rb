# Organization model represents an organization in the system.
class Organization < ApplicationRecord
  belongs_to :auth
  has_many :addresses, as: :addressable, dependent: :destroy
  has_many :org_services, dependent: :destroy
  has_many :services, through: :org_services
  has_many :requests, dependent: :destroy
  has_one_attached :logo

  accepts_nested_attributes_for :addresses, allow_destroy: true

  validates :auth_id, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
end
