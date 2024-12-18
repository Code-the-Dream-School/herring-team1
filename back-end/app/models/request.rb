# The Request model represents a request made by an organization for a specific service.
# It is associated with an organization, a service, and a request status.

class Request < ApplicationRecord
  belongs_to :org_service

  enum status: { open: 'open', in_progress: 'in-progress', closed: 'closed', canceled: 'canceled' }

  validates :title, :description, :org_service_id, presence: true
end
