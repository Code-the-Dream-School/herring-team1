# Model represents an volunteer's application to a specific request 
# The status reflects the current state of the application.
class VolunteerApplication < ApplicationRecord
  belongs_to :volunteer
  belongs_to :request

  validates :volunteer_id, uniqueness: { scope: :request_id, message: "You have already applied to this request." }

  enum application_status: {
    pending: 0,
    approved: 1,
    declined: 2,
    canceled: 3
  }

  validates :message, presence: true
end
