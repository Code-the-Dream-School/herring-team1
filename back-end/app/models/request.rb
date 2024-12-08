# The Request model represents a request made by an organization for a specific service.
# It is associated with an organization, a service, and a request status.

class Request < ApplicationRecord
  belongs_to :org_service
  belongs_to :request_status
  belongs_to :organization

  validates :title, :description, :org_service_id, :request_status_id, presence: true
end
