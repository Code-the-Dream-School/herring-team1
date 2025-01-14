# Tests for the Organization model.
require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe Organization, type: :model do
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

  # Create an Auth instance before each test
  let(:auth) { create(:auth, :organization) }

  # Test validations
  describe 'validations' do
    it 'is valid with valid attributes' do
      organization = build(:organization, auth: auth)
      expect(organization).to be_valid
    end

    it 'is not valid without a name' do
      organization = build(:organization, auth: auth, name: nil)
      expect(organization).not_to be_valid
      expect(organization.errors[:name]).to include("can't be blank")
    end

    it 'is not valid without a website' do
      organization = build(:organization, auth: auth, website: nil)
      expect(organization).not_to be_valid
      expect(organization.errors[:website]).to include("can't be blank")
    end

    it 'is not valid without a phone number' do
      organization = build(:organization, auth: auth, phone: nil)
      expect(organization).not_to be_valid
      expect(organization.errors[:phone]).to include("can't be blank")
    end

    it 'is not valid without a description' do
      organization = build(:organization, auth: auth, description: nil)
      expect(organization).not_to be_valid
      expect(organization.errors[:description]).to include("can't be blank")
    end

    it 'is not valid without a mission' do
      organization = build(:organization, auth: auth, mission: nil)
      expect(organization).not_to be_valid
      expect(organization.errors[:mission]).to include("can't be blank")
    end

    it 'is not valid with an invalid phone number format' do
      organization = build(:organization, auth: auth, phone: 'invalid-phone')
      expect(organization).not_to be_valid
      expect(organization.errors[:phone]).to include("must be a valid phone number")
    end

    it 'is not valid without an auth_id' do
      organization = build(:organization, auth: nil)
      expect(organization).not_to be_valid
      expect(organization.errors[:auth_id]).to include("can't be blank")
    end

    it 'is not valid with a duplicate auth_id' do
      create(:organization, auth: auth)
      organization = build(:organization, auth: auth)
      expect(organization).not_to be_valid
      expect(organization.errors[:auth_id]).to include("has already been taken")
    end
  end

  # Test associations
  describe 'associations' do
    it 'belongs to an auth' do
      organization = create(:organization, auth: auth)
      expect(organization.auth).to eq(auth)
    end

    it 'has one address' do
      organization = create(:organization, auth: auth)
      address = create(:address, organization: organization)
      expect(organization.address).to eq(address)
    end

    it 'has many org_services' do
      organization = create(:organization, auth: auth)
      org_services = organization.org_services

      expect(org_services.count).to eq(3)
    end

    it 'has many services through org_services' do
      organization = create(:organization, auth: auth)
      org_services = organization.org_services
      expect(org_services.count).to eq(3)

      service_names = org_services.map { |os| os.service.name }
      predefined_services = Service.pluck(:name)
      service_names.each do |name|
        expect(predefined_services).to include(name)
      end
    end

    it 'has many requests through org_services' do
      organization = create(:organization, auth: auth)
      org_service_first = organization.org_services.first
      org_service_last = organization.org_services.last

      request1 = create(:request, org_service: org_service_first)
      request2 = create(:request, org_service: org_service_first)
      request3 = create(:request, org_service: org_service_last)
      expect(organization.requests).to include(request1, request2, request3)
      expect(request1.status).to eq('open')
      expect(request2.status).to eq('open')
      expect(request3.status).to eq('open')
    end
  end
end
# rubocop:enable Metrics/BlockLength
