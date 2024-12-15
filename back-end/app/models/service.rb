# app/models/service.rb
# Class representing a Service offered by an Organization
class Service < ApplicationRecord
  validates :name, presence: true
  has_many :org_services
  has_many :organizations, through: :org_services
end
