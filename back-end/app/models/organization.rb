class Organization < ApplicationRecord
  belongs_to :auth
  has_many :addresses, dependent: :destroy
  accepts_nested_attributes_for :addresses, allow_destroy: true
  # has_one_attached :logo

  validates :name, :website, :description, :mission, presence: true
  validates :website, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]) }
end
