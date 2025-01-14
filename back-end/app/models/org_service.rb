# app/models/org_service.rb
# Class representing the relationship between Organization and Service
class OrgService < ApplicationRecord
  belongs_to :organization
  belongs_to :service
  has_many :requests, dependent: :destroy

  validates :organization_id, :service_id, presence: true
end
