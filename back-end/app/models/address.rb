class Address < ApplicationRecord
  belongs_to :addressable, polymorphic: true

  validates :address, presence: true, length: { maximum: 200 }
  validates :city, presence: true, length: { maximum: 100 }
  validates :state, presence: true, length: { maximum: 50 }
  validates :zip_code, presence: true, length: { maximum: 10 }
end
