# The RequestStatus model represents the status of a request, such as 'open', 'closed', etc.
# It is used to track the progress or state of a request.

class RequestStatus < ApplicationRecord
  validates :request_status_name, presence: true, uniqueness: true
end
