class Auth < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :email, presence: true, uniqueness: true, email: true
  validates :password, password_strength: true
  validates :isOrganization, inclusion: { in: [true, false] }

  # connection with Organization or Volunteer
  has_one :organization, foreign_key: 'auth_id'
  has_one :volunteer, foreign_key: 'auth_id'

  validate :only_one_association

  private

  def only_one_association
    return unless organization.present? && volunteer.present?

    errors.add(:base, "You cannot be both an organization and a volunteer.")
  end
end
