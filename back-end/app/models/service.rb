# app/models/service.rb
# Class representing a Service offered by an Organization
class Service < ApplicationRecord
  validates :name, presence: true
end
