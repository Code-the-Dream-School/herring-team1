class OrgService < ApplicationRecord
  belongs_to :organization
  belongs_to :service

  validates :organization_id, :service_id, presence: true
end
