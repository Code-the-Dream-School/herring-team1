class Address < ApplicationRecord
  belongs_to :volunteer, optional: true
  belongs_to :organization, optional: true

  validate :belongs_to_only_one_entity

  validates :street, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :zip_code, presence: true

  private

  def belongs_to_only_one_entity
    if volunteer_id.present? && organization_id.present?
      errors.add(:base, "Address cannot belong to both a volunteer and an organization")
    elsif volunteer_id.blank? && organization_id.blank?
      errors.add(:base, "Address must belong to either a volunteer or an organization")
    end
  end
end
