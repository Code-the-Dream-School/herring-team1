class Address < ApplicationRecord
  belongs_to :organization, optional: true
  belongs_to :volunteer, optional: true

  validates :address, presence: true, length: { maximum: 200 }
  validates :city, presence: true, length: { maximum: 100 }
  validates :state, presence: true, length: { maximum: 50 }
  validates :zip_code, presence: true, length: { maximum: 10 }
end