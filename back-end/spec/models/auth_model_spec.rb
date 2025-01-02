# Tests for the Auth model.
require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe Auth, type: :model do
  # Load services before all tests
  before(:all) do
    load Rails.root.join('db', 'seeds.rb')
  end

  it 'verifies that services are created' do
    expect(Service.count).to eq(10)
    expect(Service.pluck(:name)).to include(
      'Food service',
      'Transportation',
      'Education',
      'Sports&Recreation',
      'Attractions',
      'Housing&Facilities',
      'Legal&Advocacy',
      'Hobbies&Crafts',
      'Arts&Culture',
      'Health&Medicine'
    )
  end

  # Test validations
  describe 'validations' do
    it 'is valid with valid attributes' do
      auth = build(:auth, :organization)
      expect(auth).to be_valid
    end

    it 'is not valid without an email' do
      auth = build(:auth, email: nil)
      expect(auth).not_to be_valid
      expect(auth.errors[:email]).to include("can't be blank")
    end

    it 'is not valid with a duplicate email for organization' do
      create(:auth, :organization, email: 'test@example.com')
      auth = build(:auth, :organization, email: 'test@example.com')
      expect(auth).not_to be_valid
      expect(auth.errors[:email]).to include("has already been taken")
    end

    it 'is not valid with a duplicate email for volunteer' do
      create(:auth, :volunteer, email: 'test@example.com')
      auth = build(:auth, :volunteer, email: 'test@example.com')
      expect(auth).not_to be_valid
      expect(auth.errors[:email]).to include("has already been taken")
    end

    it 'is not valid with an invalid email format' do
      auth = build(:auth, email: 'invalid-email')
      expect(auth).not_to be_valid
      expect(auth.errors[:email]).to include("is invalid")
    end

    it 'is not valid with a weak password' do
      auth = build(:auth, password: 'weak', password_confirmation: 'weak')
      expect(auth).not_to be_valid
      expect(auth.errors[:password]).to include("is too weak")
    end

    it 'is not valid without isOrganization' do
      auth = build(:auth, isOrganization: nil)
      expect(auth).not_to be_valid
      expect(auth.errors[:isOrganization]).to include("is not included in the list")
    end
  end

  # Test associations
  describe 'associations' do
    it 'can have one organization' do
      auth = create(:auth, :organization)
      organization = create(:organization, auth: auth)
      auth.reload

      expect(organization.auth_id).to eq(auth.id)
      expect(organization.address).to be_present
      expect(organization.org_services.count).to be_between(1, 10)
    end

    it 'can have one volunteer' do
      auth = create(:auth, :volunteer)
      volunteer = create(:volunteer, auth: auth)

      expect(volunteer.auth_id).to eq(auth.id)
      expect(volunteer.address).to be_present
    end
  end

  # Test custom validation
  describe 'custom validation' do
    it 'is not valid with both organization and volunteer' do
      auth = build(:auth, :organization, :volunteer)

      expect(auth.id).to be_nil

      auth.build_organization(name: 'Test Org')
      expect(auth.organization.auth_id).to eq(auth.id)
      expect(auth.organization.id).to be_nil

      auth.build_volunteer(first_name: 'Test Volunteer')
      expect(auth.volunteer.auth_id).to eq(auth.id)
      expect(auth.volunteer.id).to be_nil

      expect(auth).not_to be_valid
      puts "Auth errors: #{auth.errors.full_messages}"
      expect(auth.errors[:base]).to include("You cannot be both an organization and a volunteer.")
    end
  end
end
# rubocop:enable Metrics/BlockLength
