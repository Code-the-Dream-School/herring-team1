class Organization < ApplicationRecord
  belongs_to :auth
  belongs_to :address, optional: true
  has_many :addresses, dependent: :destroy
  has_one_attached :logo

  validates :name, :website, :description, :mission, presence: true
  validates :website, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]) }
end
