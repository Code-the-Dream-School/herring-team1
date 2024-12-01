# Organization model represents an organization in the system.
class Organization < ApplicationRecord
  belongs_to :auth
  has_many :addresses, as: :addressable, dependent: :destroy
  accepts_nested_attributes_for :addresses, allow_destroy: true
  # has_one_attached :logo

  accepts_nested_attributes_for :addresses, allow_destroy: true

  validates :auth_id, :name, presence: true
  validates :website, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]) }
end
